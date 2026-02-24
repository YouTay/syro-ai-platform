import { getToken } from "@/lib/auth";

const PROD_API = "https://syro-ai-platform.purpletree-5220b03f.westeurope.azurecontainerapps.io";
const LOCAL_API = "http://127.0.0.1:8080";

function resolveApiBase() {
  // In the browser: decide by hostname
  if (typeof window !== "undefined") {
    const h = window.location.hostname;
    const isLocal = h === "localhost" || h === "127.0.0.1";
    return isLocal ? LOCAL_API : PROD_API;
  }

  // During build/SSR: prefer env, else prod
  return process.env.NEXT_PUBLIC_API_BASE_URL || PROD_API;
}

const API_BASE = resolveApiBase().replace(/\/+$/, "");

function authHeaders() {
  const t = getToken?.();
  return t ? { Authorization: `Bearer ${t}` } : {};
}

function url(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${p}`;
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      msg = data?.detail || data?.message || msg;
    } catch {}
    throw new Error(msg);
  }
  return res.json() as Promise<T>;
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(url(path), {
    method: "GET",
    headers: { ...authHeaders() },
  });
  return handle<T>(res);
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(url(path), {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(body),
  });
  return handle<T>(res);
}
