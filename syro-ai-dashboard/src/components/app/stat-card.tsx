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
  const dot = accent === "purple" ? "bg-purple-600" : "bg-blue-600";
  const bgAccent = accent === "purple" ? "bg-purple-50" : "bg-blue-50";

  return (
    <Card className={cn("rounded-xl shadow-soft border border-gray-200 hover:shadow-soft2 transition-all duration-300", bgAccent)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-medium text-gray-600 uppercase tracking-wider">{title}</div>
          <div className={cn("h-2.5 w-2.5 rounded-full", dot)} />
        </div>
        <div className="text-3xl font-bold tracking-tight text-gray-900">
          {value}
        </div>
        <div className="mt-3 text-sm text-gray-600">{hint}</div>
      </CardContent>
    </Card>
  );
}
