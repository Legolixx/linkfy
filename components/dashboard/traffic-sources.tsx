import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface TrafficSourcesProps {
  items: { source: string; visitors: number; percent: number }[];
}

export function TrafficSources({ items }: TrafficSourcesProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Fontes de tráfego</CardTitle>
        <CardDescription>De onde vêm seus visitantes</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pt-4">
        {items.length === 0 ? (
          <p className="py-6 text-center text-xs text-muted-foreground">
            Nenhuma visualização ainda.
          </p>
        ) : (
          items.map((item) => (
            <div key={item.source} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">{item.source}</span>
                <span className="text-muted-foreground">
                  {item.visitors.toLocaleString()} · {item.percent}%
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
