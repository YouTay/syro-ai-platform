export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-base text-gray-600 mt-2">Manage your workspace and preferences</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-soft p-8">
        <div className="flex items-start gap-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100">
            <span className="text-xl">🚀</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Coming Soon</h2>
            <p className="text-sm text-gray-600 mt-2">
              Settings page is in development for Phase 2. Soon you'll be able to manage billing, team members, model configurations, usage analytics, and more.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                <span>Billing & Plans</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                <span>Team Management</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                <span>Model Settings</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                <span>Usage Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
