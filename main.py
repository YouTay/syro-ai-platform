# main.py
# FastAPI + JWT (Bearer) + SQLite + Agents + Chat (OpenAI) + Azure Table Storage (Conversations/Messages)
# Run: python -m uvicorn main:app --host 127.0.0.1 --port 8080 --reload

import os
import uuid
from datetime import datetime, timedelta, timezone
from typing import Generator, List, Optional

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from openai import OpenAI
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, create_engine
from sqlalchemy.orm import Session, declarative_base, relationship, sessionmaker

# Azure Table Storage helper (exists already in your project)
from storage import get_table_client

# --------------------
# Config
# --------------------
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
JWT_SECRET = os.getenv("JWT_SECRET", "change-me-please")  # setze in .env!
JWT_ALG = "HS256"
JWT_EXP_HOURS = int(os.getenv("JWT_EXP_HOURS", "24"))
MODEL_NAME = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./app.db")

if not OPENAI_API_KEY:
    raise RuntimeError("Missing OPENAI_API_KEY in .env")

client = OpenAI(api_key=OPENAI_API_KEY)

# --------------------
# App
# --------------------
app = FastAPI(title="Syro AI Platform (Phase 1)")

# Optional: CORS (für lokales Frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://127.0.0.1",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------
# DB
# --------------------
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {},
    pool_pre_ping=True,
)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


def iso_utcnow() -> str:
    return utcnow().isoformat()


def _parse_iso(ts: Optional[str]) -> datetime:
    """
    Robust ISO parsing for sorting.
    If missing/invalid -> epoch, so it sorts first (safe fallback).
    """
    if not ts:
        return datetime.fromtimestamp(0, tz=timezone.utc)
    try:
        # Python parses 'YYYY-MM-DDTHH:MM:SS(.ms)+00:00'
        return datetime.fromisoformat(ts)
    except Exception:
        return datetime.fromtimestamp(0, tz=timezone.utc)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), default=utcnow, nullable=False)

    agents = relationship("Agent", back_populates="user", cascade="all, delete-orphan")


class Agent(Base):
    __tablename__ = "agents"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    name = Column(String, nullable=False)
    system_prompt = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), default=utcnow, nullable=False)

    user = relationship("User", back_populates="agents")


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --------------------
# Azure Table Storage (Conversations + Messages)
# --------------------
conversations_table = None
messages_table = None


def _conversation_id_for_user_agent(agent_id: int) -> str:
    """
    Portfolio-simple approach:
    - One conversation per user per agent.
    - Conversation RowKey = conversation_id
    - Messages PartitionKey = conversation_id
    """
    return f"agent:{agent_id}"


def _ensure_conversation_exists(*, user_id: int, agent: Agent) -> str:
    """
    Conversations:
      PartitionKey = user_id
      RowKey = conversation_id
      agent_id
      created_at (ISO)

    If not exists -> create conversation + one 'system' message (prompt).
    """
    assert conversations_table is not None
    assert messages_table is not None

    conversation_id = _conversation_id_for_user_agent(agent.id)

    try:
        conversations_table.get_entity(partition_key=str(user_id), row_key=conversation_id)
        return conversation_id
    except Exception:
        conversations_table.create_entity(
            {
                "PartitionKey": str(user_id),
                "RowKey": conversation_id,
                "agent_id": int(agent.id),
                "created_at": iso_utcnow(),
            }
        )

        # Optional: store system prompt once
        messages_table.create_entity(
            {
                "PartitionKey": conversation_id,
                "RowKey": str(uuid.uuid4()),
                "role": "system",
                "content": agent.system_prompt,
                "timestamp": iso_utcnow(),
            }
        )
        return conversation_id


def _save_message(*, conversation_id: str, role: str, content: str) -> None:
    """
    Messages:
      PartitionKey = conversation_id
      RowKey = message_id (UUID)
      role (user/assistant/system)
      content
      timestamp (ISO)
    """
    assert messages_table is not None
    messages_table.create_entity(
        {
            "PartitionKey": conversation_id,
            "RowKey": str(uuid.uuid4()),
            "role": role,
            "content": content,
            "timestamp": iso_utcnow(),
        }
    )


# --------------------
# Startup
# --------------------
@app.on_event("startup")
def on_startup() -> None:
    Base.metadata.create_all(bind=engine)

    global conversations_table, messages_table
    conversations_table = get_table_client("conversations")
    messages_table = get_table_client("messages")


# --------------------
# Auth
# --------------------
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
bearer_scheme = HTTPBearer()


def hash_pw(pw: str) -> str:
    return pwd_context.hash(pw)


def verify_pw(pw: str, pw_hash: str) -> bool:
    return pwd_context.verify(pw, pw_hash)


def create_token(email: str) -> str:
    now = utcnow()
    payload = {
        "sub": email,
        "iat": int(now.timestamp()),
        "exp": int((now + timedelta(hours=JWT_EXP_HOURS)).timestamp()),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)


def get_current_user(
    creds: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    token = creds.credentials

    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
        email = payload.get("sub")
        if not isinstance(email, str) or not email:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


# --------------------
# Schemas
# --------------------
class RegisterIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"


class MeOut(BaseModel):
    email: EmailStr
    created_at: datetime


class AgentCreateIn(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    system_prompt: str = Field(min_length=5, max_length=2000)


class AgentOut(BaseModel):
    id: int
    name: str
    system_prompt: str
    created_at: datetime


class ChatIn(BaseModel):
    message: str = Field(min_length=1, max_length=4000)


class ChatOut(BaseModel):
    response: str


class MessageOut(BaseModel):
    id: str
    role: str
    content: str
    timestamp: str


class ConversationMessagesOut(BaseModel):
    conversation_id: str
    messages: List[MessageOut]


# --------------------
# Routes
# --------------------
@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/auth/register", status_code=201)
def register(payload: RegisterIn, db: Session = Depends(get_db)):
    exists = db.query(User).filter(User.email == payload.email).first()
    if exists:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(email=payload.email, password_hash=hash_pw(payload.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"msg": "User created", "user_id": user.id}


@app.post("/auth/login", response_model=TokenOut)
def login(payload: LoginIn, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_pw(payload.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    token = create_token(user.email)
    return TokenOut(access_token=token)


@app.get("/auth/me", response_model=MeOut)
def me(user: User = Depends(get_current_user)):
    return MeOut(email=user.email, created_at=user.created_at)


@app.post("/agents", response_model=AgentOut, status_code=201)
def create_agent(payload: AgentCreateIn, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    agent = Agent(user_id=user.id, name=payload.name, system_prompt=payload.system_prompt)
    db.add(agent)
    db.commit()
    db.refresh(agent)
    return AgentOut(id=agent.id, name=agent.name, system_prompt=agent.system_prompt, created_at=agent.created_at)


@app.get("/agents", response_model=List[AgentOut])
def list_agents(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    agents = db.query(Agent).filter(Agent.user_id == user.id).order_by(Agent.created_at.desc()).all()
    return [AgentOut(id=a.id, name=a.name, system_prompt=a.system_prompt, created_at=a.created_at) for a in agents]


@app.post("/agents/{agent_id}/chat", response_model=ChatOut)
def chat(agent_id: int, payload: ChatIn, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    agent = db.query(Agent).filter(Agent.id == agent_id, Agent.user_id == user.id).first()
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")

    if conversations_table is None or messages_table is None:
        raise HTTPException(status_code=500, detail="Storage not initialized")

    conversation_id = _ensure_conversation_exists(user_id=user.id, agent=agent)

    _save_message(conversation_id=conversation_id, role="user", content=payload.message)

    # OpenAI integration unchanged
    try:
        completion = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": agent.system_prompt},
                {"role": "user", "content": payload.message},
            ],
            temperature=0.7,
        )
        text = completion.choices[0].message.content or ""

        _save_message(conversation_id=conversation_id, role="assistant", content=text)

        return ChatOut(response=text)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI error: {type(e).__name__}: {str(e)}")


# --------------------
# NEW: Load chat history from Azure Table Storage
# --------------------
@app.get("/conversations/{conversation_id}/messages", response_model=ConversationMessagesOut)
def get_conversation_messages(
    conversation_id: str,
    user: User = Depends(get_current_user),
):
    """
    Requirements:
    1) Ownership check:
       Conversations PartitionKey=user_id, RowKey=conversation_id
    2) Load messages:
       Messages PartitionKey=conversation_id
    3) Return sorted by timestamp asc
    """
    if conversations_table is None or messages_table is None:
        raise HTTPException(status_code=500, detail="Storage not initialized")

    # 1) Ownership check (only if conversation exists for this user)
    try:
        conversations_table.get_entity(partition_key=str(user.id), row_key=conversation_id)
    except Exception:
        # Don't leak whether the conversation exists for another user
        raise HTTPException(status_code=404, detail="Conversation not found")

    # 2) Load all messages for this conversation
    # Use PartitionKey filter for fast lookup
    pk = conversation_id
    entities = list(
        messages_table.query_entities(
            query_filter=f"PartitionKey eq '{pk}'"
        )
    )

    # 3) Normalize + sort
    msgs = []
    for e in entities:
        msgs.append(
            {
                "id": str(e.get("RowKey", "")),
                "role": str(e.get("role", "")),
                "content": str(e.get("content", "")),
                "timestamp": str(e.get("timestamp", "")),
            }
        )

    msgs.sort(key=lambda m: _parse_iso(m.get("timestamp")))

    return ConversationMessagesOut(
        conversation_id=conversation_id,
        messages=[MessageOut(**m) for m in msgs],
    )