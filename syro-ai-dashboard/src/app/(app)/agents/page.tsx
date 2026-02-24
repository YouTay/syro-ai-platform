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
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Agents</h1>
          <p className="text-sm text-slate-500 mt-1">
            Create and manage your AI agents (system prompts + chat)
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
        <div className="rounded-2xl border border-slate-200 bg-white shadow-soft2 p-8 text-center">
          <div className="text-sm font-medium">No agents yet</div>
          <div className="text-sm text-slate-500 mt-1">
            Click “Create Agent” to add your first assistant.
          </div>
        </div>
      )}
    </div>
  );
}
