import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function StatCard({
  title,
  value,
  hint,
  accent,
}: {
  title: string;
  value: string;
  hint: string;
  accent: "purple" | "blue";
}) {
  const ring = accent === "purple" ? "ring-[#7C3AED]/10" : "ring-[#2563EB]/10";
  const dot = accent === "purple" ? "bg-[#7C3AED]" : "bg-[#2563EB]";
  const bgAccent = accent === "purple" ? "from-[#7C3AED]/5 to-transparent" : "from-[#2563EB]/5 to-transparent";

  return (
    <Card className={cn("rounded-2xl shadow-soft2 border border-slate-200 ring-1 hover:shadow-lg transition-all duration-300 bg-gradient-to-br", ring, bgAccent)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-medium text-slate-600 uppercase tracking-wider">{title}</div>
          <div className={cn("h-3 w-3 rounded-full", dot)} />
        </div>
        <div className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </div>
        <div className="mt-3 text-sm text-slate-500">{hint}</div>
      </CardContent>
    </Card>
  );
}
