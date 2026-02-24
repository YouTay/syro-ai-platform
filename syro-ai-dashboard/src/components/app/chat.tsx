"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Send, Sparkles, RefreshCcw } from "lucide-react";

import { apiGet, apiPost } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Msg = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: string;
};

type HistoryResponse = {
  conversation_id: string;
  messages: Array<{
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
    timestamp: string;
  }>;
};

export default function Chat({ agentId, systemPrompt }: { agentId: number; systemPrompt: string }) {
  const conversationId = useMemo(() => `agent:${agentId}`, [agentId]);

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const endRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !pending, [input, pending]);

  async function loadHistory() {
    setLoadingHistory(true);
    try {
      const data = await apiGet<HistoryResponse>(`/conversations/${encodeURIComponent(conversationId)}/messages`);

      // Falls keine Messages da sind (z.B. neue Conversation), zeigen wir ein freundliches Intro
      if (!data.messages || data.messages.length === 0) {
        setMessages([
          {
            id: "intro",
            role: "assistant",
            content: "Hi — I’m your agent. Ask me anything.",
          },
        ]);
      } else {
        setMessages(
          data.messages.map((m) => ({
            id: m.id,
            role: m.role,
            content: m.content,
            timestamp: m.timestamp,
          }))
        );
      }
    } catch (e: any) {
      // Wenn Conversation noch nicht existiert (404), ist das ok -> Startzustand
      if (String(e?.message || "").toLowerCase().includes("not found")) {
        setMessages([
          {
            id: "intro",
            role: "assistant",
            content: "Hi — I’m your agent. Ask me anything.",
          },
        ]);
      } else {
        toast.error(e?.message ?? "Failed to load chat history.");
        setMessages([
          {
            id: "intro",
            role: "assistant",
            content: "Hi — I’m your agent. Ask me anything.",
          },
        ]);
      }
    } finally {
      setLoadingHistory(false);
    }
  }

  useEffect(() => {
    loadHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pending, loadingHistory]);

  async function send() {
    const text = input.trim();
    if (!text) return;

    setInput("");

    // Optimistic UI: sofort User message anzeigen
    const optimisticUser: Msg = { id: `local-${Date.now()}`, role: "user", content: text };
    setMessages((prev) => [...prev, optimisticUser]);

    setPending(true);
    try {
      const res = await apiPost<{ response: string }>(`/agents/${agentId}/chat`, { message: text });

      const assistantMsg: Msg = {
        id: `local-${Date.now()}-a`,
        role: "assistant",
        content: res.response ?? "",
      };
      setMessages((prev) => [...prev, assistantMsg]);

      // Optional: Nach dem Send nochmal History syncen (damit IDs/timestamps aus Azure kommen)
      // Für Portfolio reicht es, aber dadurch stimmt es immer 1:1 mit Azure.
      await loadHistory();
    } catch (e: any) {
      toast.error(e?.message ?? "Chat request failed.");
      setMessages((prev) => [
        ...prev,
        { id: `local-${Date.now()}-err`, role: "assistant", content: "Sorry — something went wrong. Please try again." },
      ]);
    } finally {
      setPending(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSend) void send();
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px] animate-slideUp">
      <Card className="rounded-2xl glass shadow-glass border-gray-200/60 overflow-hidden">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="border-b border-gray-200/50 glass px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center shadow-soft2">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 leading-tight">Chat with Agent</div>
                <div className="text-xs text-gray-500 leading-tight">
                  Conversation ID: <span className="font-mono text-[10px]">{conversationId}</span>
                </div>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="rounded-lg" 
              onClick={loadHistory} 
              disabled={loadingHistory || pending}
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          <div className="h-[540px] overflow-y-auto bg-white/50 backdrop-blur px-6 py-5 space-y-4 flex-1">
            {loadingHistory && (
              <div className="text-sm text-gray-500 text-center py-8 animate-pulse">Loading conversation…</div>
            )}

            {!loadingHistory &&
              messages.map((m) => (
                <div key={m.id} className={cn("flex animate-slideUp", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[75%] rounded-xl px-4 py-3 text-sm shadow-soft border transition-all duration-300",
                      m.role === "user"
                        ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white border-none shadow-soft2 hover:shadow-glass"
                        : m.role === "system"
                        ? "glass border-gray-200/50"
                        : "glass border-gray-200/50"
                    )}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
                    {m.timestamp && (
                      <div className={cn("mt-2 text-[11px]", m.role === "user" ? "text-white/70" : "text-gray-500")}>
                        {new Date(m.timestamp).toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}

            {pending && (
              <div className="flex justify-start">
                <div className="max-w-[75%] rounded-xl px-4 py-3 text-sm shadow-soft border glass animate-pulse">
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="inline-block h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
                    Agent is thinking…
                  </div>
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

          <div className="border-t border-gray-200/50 glass p-5">
            <div className="flex gap-3">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask the agent anything… (Enter to send, Shift+Enter for new line)"
                className="min-h-[44px] max-h-[120px] resize-none rounded-lg border-gray-200/50 bg-white/50 text-sm text-gray-900 backdrop-blur-sm focus:bg-white/80 transition-all"
              />
              <Button
                onClick={() => void send()}
                disabled={!canSend}
                variant="gradient"
                className="rounded-lg self-end flex-shrink-0"
              >
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl glass shadow-glass border-gray-200/60 h-fit">
        <CardContent className="p-6 space-y-4">
          <div>
            <div className="text-sm font-semibold text-gray-900 mb-1">System Prompt</div>
            <div className="text-xs text-gray-600">Defines the agent's personality and behavior</div>
          </div>
          <div className="rounded-lg border border-gray-200/50 glass p-4 text-xs text-gray-700 whitespace-pre-wrap max-h-[200px] overflow-y-auto leading-relaxed font-mono">
            {systemPrompt}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
