"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

import { apiGet } from "@/lib/api";
import { clearToken } from "@/lib/auth";
import type { MeOut } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Topbar() {
  const router = useRouter();
  const [me, setMe] = useState<MeOut | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await apiGet<MeOut>("/auth/me");
        if (mounted) setMe(data);
      } catch {
        clearToken();
        router.replace("/login");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [router]);

  function onLogout() {
    clearToken();
    toast.success("Logged out.");
    router.replace("/login");
  }

  return (
    <header className="sticky top-0 z-20 glass shadow-soft border-b border-gray-200/50">
      <div className="px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="md:hidden font-semibold tracking-tight">
          <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">Syro</span>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-medium text-gray-500">Signed in as</div>
            <div className="text-sm font-medium text-gray-900">
              {loading ? <Skeleton className="h-4 w-44" /> : me?.email ?? "—"}
            </div>
          </div>

          <Button 
            variant="outline" 
            className="rounded-lg" 
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
