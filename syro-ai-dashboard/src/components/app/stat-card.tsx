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
  const ring = accent === "purple" ? "ring-[#7C3AED]/20" : "ring-[#2563EB]/20";
  const dot = accent === "purple" ? "bg-[#7C3AED]" : "bg-[#2563EB]";

  return (
    <Card className={cn("rounded-2xl shadow-soft2 border-slate-200 ring-1", ring)}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-500">{title}</div>
          <div className={cn("h-2 w-2 rounded-full", dot)} />
        </div>
        <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          {value}
        </div>
        <div className="mt-2 text-xs text-slate-500">{hint}</div>
      </CardContent>
    </Card>
  );
}
