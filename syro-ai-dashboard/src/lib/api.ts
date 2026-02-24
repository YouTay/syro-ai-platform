import { getToken } from "@/lib/auth";

const BASE_URL = "http://127.0.0.1:8080";

type ApiErrorPayload = { detail?: string; message?: string } | any;

function buildHeaders(extra?: HeadersInit): HeadersInit {
  const token = getToken();
  const base: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    base.Authorization = `Bearer ${token}`;
  }

  return { ...base, ...(extra as any) };
}

async function parseError(res: Response): Promise<string> {
  try {
    const data: ApiErrorPayload = await res.json();
    return data?.detail || data?.message || `Request failed (${res.status})`;
  } catch {
    return `Request failed (${res.status})`;
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    headers: buildHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    const msg = await parseError(res);
    throw new Error(msg);
  }

  return (await res.json()) as T;
}

export async function apiPost<T>(path: string, body: any): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const msg = await parseError(res);
    throw new Error(msg);
  }

  const text = await res.text();
  return (text ? JSON.parse(text) : {}) as T;
}
