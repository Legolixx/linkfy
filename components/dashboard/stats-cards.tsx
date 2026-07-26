import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DashboardData } from "@/lib/dashboard-analytics";

export function StatsCards({ data }: { data: DashboardData }) {
  const stats = [
    {
      label: "Total de Visualizações",
      value: data.totalViews.toLocaleString(),
    },
    { label: "Total de Cliques", value: data.totalClicks.toLocaleString() },
    { label: "Taxa de Cliques", value: `${data.ctr}%` },
    { label: "Links Ativos", value: data.activeLinks.toString() },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.label}>
          <CardContent className="flex flex-col gap-1 pt-4">
            <span className="text-xs text-muted-foreground">{s.label}</span>
            <span className={cn("text-2xl font-semibold tabular-nums")}>
              {s.value}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
