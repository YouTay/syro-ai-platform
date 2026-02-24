const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://syro-ai-platform.purpletree-5220b03f.westeurope.azurecontainerapps.io";

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      msg = data?.detail || data?.message || msg;
    } catch {}
    throw new Error(msg);
  }

  return res.json();
}
