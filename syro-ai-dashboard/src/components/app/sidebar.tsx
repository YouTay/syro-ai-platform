"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Bot, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/agents", label: "Agents", icon: Bot },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-72 flex-col border-r border-slate-200 bg-white min-h-screen sticky top-0">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#2563EB] shadow-soft" />
          <div className="leading-tight">
            <div className="font-semibold tracking-tight">SYRO AI</div>
            <div className="text-xs text-slate-500">Platform • Phase 1</div>
          </div>
        </Link>
      </div>

      <Separator />

      <nav className="p-3 space-y-1">
        {nav.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                active
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4",
                  active ? "text-[#7C3AED]" : "text-slate-500"
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-4">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 shadow-soft">
          <div className="text-sm font-medium">Tip</div>
          <div className="text-xs text-slate-500 mt-1">
            Erstelle einen Agenten mit klarer System-Prompt, dann teste ihn im Chat.
          </div>
        </div>
      </div>
    </aside>
  );
}
