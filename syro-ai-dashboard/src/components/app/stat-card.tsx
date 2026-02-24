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
  const bgAccent = accent === "purple" ? "from-purple-500/5 to-purple-400/5" : "from-blue-500/5 to-blue-400/5";

  return (
    <Card className={cn("rounded-2xl glass shadow-soft border-gray-200/60 hover:shadow-glass hover:scale-102 transition-all duration-300 bg-gradient-to-br", bgAccent, "animate-slideUp")}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-medium text-gray-600 uppercase tracking-wider">{title}</div>
          <div className={cn("h-2.5 w-2.5 rounded-full blur-sm", dot, "opacity-60 group-hover:opacity-100 transition-opacity")} />
        </div>
        <div className="text-3xl font-bold tracking-tight text-gray-900">
          {value}
        </div>
        <div className="mt-3 text-sm text-gray-600">{hint}</div>
      </CardContent>
    </Card>
  );
}
