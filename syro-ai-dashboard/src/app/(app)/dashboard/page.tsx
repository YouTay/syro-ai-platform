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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          Overview of your Syro workspace
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
          hint="Placeholder"
          accent="blue"
        />
        <StatCard
          title="Status"
          value={statusText}
          hint="Backend /health"
          accent="purple"
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-soft2 p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">
              Weekly Usage (placeholder)
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Dummy chart for portfolio visuals
            </div>
          </div>

          <div className="text-xs text-slate-500">
            Accents:{" "}
            <span className="text-[#7C3AED] font-medium">Syro Purple</span> /{" "}
            <span className="text-[#2563EB] font-medium">Azure Blue</span>
          </div>
        </div>

        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dummy} margin={{ top: 10, right: 18, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="syroGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity={0.25} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={28} />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#7C3AED"
                fill="url(#syroGrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
