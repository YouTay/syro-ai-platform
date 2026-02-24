"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { apiGet } from "@/lib/api";
import type { AgentOut } from "@/lib/types";

import AgentCard from "@/components/app/agent-card";
import CreateAgentDialog from "@/components/app/create-agent-dialog";
import { AgentsSkeleton } from "@/components/app/skeletons";

export default function AgentsPage() {
  const [agents, setAgents] = useState<AgentOut[] | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const list = await apiGet<AgentOut[]>("/agents");
      setAgents(list);
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to load agents.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Agents</h1>
          <p className="text-base text-slate-600 mt-2">
            Create and manage your AI agents with custom system prompts and chat capabilities
          </p>
        </div>

        <CreateAgentDialog onCreated={load} />
      </div>

      {loading ? (
        <AgentsSkeleton />
      ) : agents && agents.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {agents.map((a) => (
            <AgentCard key={a.id} agent={a} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-soft2 p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7C3AED]/10 to-[#2563EB]/5 mb-4">
            <div className="text-2xl">🤖</div>
          </div>
          <div className="text-lg font-semibold text-slate-900">No agents yet</div>
          <div className="text-sm text-slate-600 mt-2">
            Click "Create Agent" above to add your first AI assistant.
          </div>
        </div>
      )}
    </div>
  );
}
