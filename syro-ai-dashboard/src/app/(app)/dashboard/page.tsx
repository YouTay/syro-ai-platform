"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

import { apiGet } from "@/lib/api";
import type { AgentOut } from "@/lib/types";

import StatCard from "@/components/app/stat-card";
import { DashboardSkeleton } from "@/components/app/skeletons";

const dummy = [
  { name: "Mon", value: 12 },
  { name: "Tue", value: 18 },
  { name: "Wed", value: 9 },
  { name: "Thu", value: 22 },
  { name: "Fri", value: 16 },
  { name: "Sat", value: 28 },
  { name: "Sun", value: 24 },
];

export default function DashboardPage() {
  const [agents, setAgents] = useState<AgentOut[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const list = await apiGet<AgentOut[]>("/agents");
        if (mounted) setAgents(list);
      } catch (e: any) {
        toast.error(e?.message ?? "Failed to load dashboard data.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const totalAgents = agents?.length ?? 0;
  const statusText = "Healthy";

  const lastActivity = useMemo(() => {
    if (!agents || agents.length === 0) return "—";
    const latest = agents[0]?.created_at;
    return latest ? new Date(latest).toLocaleString() : "—";
  }, [agents]);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-base text-slate-600">
          Overview of your Syro AI workspace
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Agents"
          value={String(totalAgents)}
          hint="Your configured assistants"
          accent="purple"
        />
        <StatCard
          title="Last Activity"
          value={lastActivity}
          hint="Platform status"
          accent="blue"
        />
        <StatCard
          title="System Status"
          value={statusText}
          hint="Backend operational"
          accent="purple"
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-soft2 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Weekly Usage
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Agent interactions over the past week
            </p>
          </div>

          <div className="text-xs text-slate-500 text-right">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#7C3AED]" />
                <span className="font-medium">Usage</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dummy} margin={{ top: 10, right: 18, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="syroGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} width={28} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '0.75rem', 
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#7C3AED"
                fill="url(#syroGrad)"
                strokeWidth={2.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
