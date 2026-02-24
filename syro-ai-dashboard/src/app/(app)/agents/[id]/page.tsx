"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { apiGet } from "@/lib/api";
import type { AgentOut } from "@/lib/types";

import Chat from "@/components/app/chat";
import { AgentDetailSkeleton } from "@/components/app/skeletons";
import { Button } from "@/components/ui/button";

export default function AgentDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const agentId = Number(params.id);

  const [agent, setAgent] = useState<AgentOut | null>(null);
  const [loading, setLoading] = useState(true);

  const created = useMemo(() => {
    if (!agent?.created_at) return "—";
    return new Date(agent.created_at).toLocaleString();
  }, [agent?.created_at]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        // There is no GET /agents/{id}, so we fetch list and find.
        const list = await apiGet<AgentOut[]>("/agents");
        const found = list.find((x) => x.id === agentId) ?? null;
        if (!mounted) return;

        if (!found) {
          toast.error("Agent not found.");
          router.replace("/agents");
          return;
        }
        setAgent(found);
      } catch (e: any) {
        toast.error(e?.message ?? "Failed to load agent.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [agentId, router]);

  if (loading) return <AgentDetailSkeleton />;
  if (!agent) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-medium text-slate-600 uppercase tracking-wider">Agent</div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mt-1">{agent.name}</h1>
          <div className="mt-3 text-sm text-slate-600">
            Created <span className="font-medium text-slate-900">{created}</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
          onClick={() => router.push("/agents")}
        >
          ← Back to Agents
        </Button>
      </div>

      <Chat agentId={agent.id} systemPrompt={agent.system_prompt} />
    </div>
  );
}
