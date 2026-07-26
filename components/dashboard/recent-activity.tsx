import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface RecentActivityProps {
  items: { id: string; label: string; time: string }[];
}

export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Atividade recente</CardTitle>
        <CardDescription>Últimas atividades na sua página</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col divide-y pt-2">
        {items.length === 0 ? (
          <p className="py-6 text-center text-xs text-muted-foreground">
            Nenhuma atividade ainda.
          </p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex flex-col gap-0.5 py-2.5 text-xs">
              <span>{item.label}</span>
              <span className="text-muted-foreground">{item.time}</span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
