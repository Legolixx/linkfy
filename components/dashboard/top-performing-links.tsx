import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface TopPerformingLinksProps {
  items: { id: string; title: string; clicks: number }[];
}

export function TopPerformingLinks({ items }: TopPerformingLinksProps) {
  const max = Math.max(...items.map((i) => i.clicks), 1);

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Links com melhor desempenho</CardTitle>
        <CardDescription>
          Seus links mais clicados neste período
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pt-4">
        {items.length === 0 ? (
          <p className="py-6 text-center text-xs text-muted-foreground">
            Nenhum clique ainda.
          </p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">{item.title}</span>
                <span className="text-muted-foreground">
                  {item.clicks.toLocaleString()} clicks
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(item.clicks / max) * 100}%` }}
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
