export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
        <p className="text-base text-slate-600 mt-2">Manage your workspace and preferences</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-soft2 p-8">
        <div className="flex items-start gap-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7C3AED]/10 to-[#2563EB]/5">
            <span className="text-xl">🚀</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Coming Soon</h2>
            <p className="text-sm text-slate-600 mt-2">
              Settings page is in development for Phase 2. Soon you'll be able to manage billing, team members, model configurations, usage analytics, and more.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <div className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
                <span>Billing & Plans</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <div className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
                <span>Team Management</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <div className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
                <span>Model Settings</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <div className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
                <span>Usage Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
