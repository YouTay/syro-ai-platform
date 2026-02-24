"use client";

import Sidebar from "@/components/app/sidebar";
import Topbar from "@/components/app/topbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white relative">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 min-w-0">
            <Topbar />
            <main className="p-6 lg:p-8 bg-white">
              <div className="animate-fadeUp">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
