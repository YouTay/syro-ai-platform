import Link from "next/link";
import type { AgentOut } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

export default function AgentCard({ agent }: { agent: AgentOut }) {
  const created = agent.created_at ? new Date(agent.created_at).toLocaleString() : "—";

  return (
    <Link href={`/agents/${agent.id}`}>
      <Card className="rounded-2xl shadow-soft2 border-slate-200 hover:shadow-soft transition">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-slate-500">Agent</div>
              <div className="mt-1 text-lg font-semibold tracking-tight">{agent.name}</div>
              <div className="mt-2 text-xs text-slate-500">Created: {created}</div>
            </div>

            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#7C3AED]/15 to-[#2563EB]/15 border border-slate-200 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-[#7C3AED]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
