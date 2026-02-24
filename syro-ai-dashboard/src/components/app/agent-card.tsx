import Link from "next/link";
import type { AgentOut } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

export default function AgentCard({ agent }: { agent: AgentOut }) {
  const created = agent.created_at ? new Date(agent.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "—";

  return (
    <Link href={`/agents/${agent.id}`} className="group">
      <Card className="rounded-2xl shadow-soft2 border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300 bg-white">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Agent</div>
              <h3 className="mt-2 text-base font-semibold text-slate-900 truncate group-hover:text-[#7C3AED] transition-colors">{agent.name}</h3>
            </div>

            <div className="h-10 w-10 flex-shrink-0 rounded-2xl bg-gradient-to-br from-[#7C3AED]/20 to-[#2563EB]/10 border border-slate-200 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-[#7C3AED]" />
            </div>
          </div>
          
          <p className="text-sm text-slate-500 line-clamp-2 mb-3">{agent.system_prompt || 'No description'}</p>
          
          <div className="pt-3 border-t border-slate-100">
            <div className="text-xs text-slate-400">Created {created}</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
