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
    <aside className="hidden md:flex w-72 flex-col border-r border-gray-200 bg-white min-h-screen sticky top-0">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-purple-600" />
          <div className="leading-tight">
            <div className="font-bold text-purple-600 text-lg">Syro</div>
          </div>
        </Link>
      </div>

      <Separator className="bg-gray-200" />

      <nav className="p-4 space-y-2">
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
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                active
                  ? "bg-purple-50 text-purple-900"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4",
                  active ? "text-purple-600" : "text-gray-500"
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-4 space-y-4 border-t border-gray-200">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-soft">
          <div className="text-sm font-medium text-gray-900">Tip</div>
          <div className="text-xs text-gray-600 mt-2">
            Create agents with clear prompts, then test in chat.
          </div>
        </div>
        <div className="text-xs text-gray-500 text-center">
          Made by Youssef Tayachi
        </div>
      </div>
    </aside>
  );
}
