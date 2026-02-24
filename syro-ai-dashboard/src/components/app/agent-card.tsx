import Link from "next/link";
import type { AgentOut } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

export default function AgentCard({ agent }: { agent: AgentOut }) {
  const created = agent.created_at ? new Date(agent.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "—";

  return (
    <Link href={`/agents/${agent.id}`} className="group">
      <Card className="rounded-xl shadow-soft border border-gray-200 hover:shadow-soft2 hover:border-gray-300 transition-all duration-300 bg-white">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</div>
              <h3 className="mt-1.5 text-base font-semibold text-gray-900 truncate group-hover:text-purple-600 transition-colors">{agent.name}</h3>
            </div>

            <div className="h-9 w-9 flex-shrink-0 rounded-lg bg-purple-100 border border-purple-200 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-purple-600" />
            </div>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{agent.system_prompt || 'No description'}</p>
          
          <div className="pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-500">Created {created}</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
