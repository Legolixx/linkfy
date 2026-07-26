import { Smartphone, Monitor, Tablet } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const deviceIcons: Record<string, typeof Smartphone> = {
  mobile: Smartphone,
  desktop: Monitor,
  tablet: Tablet,
};

interface DevicesCardProps {
  items: { type: string; percent: number }[];
}

export function DevicesCard({ items }: DevicesCardProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Dispositivos</CardTitle>
        <CardDescription>Como os visitantes acessam sua página</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pt-4">
        {items.length === 0 ? (
          <p className="py-6 text-center text-xs text-muted-foreground">
            Nenhuma visualização ainda.
          </p>
        ) : (
          items.map((item) => {
            const Icon = deviceIcons[item.type] ?? Monitor;
            return (
              <div key={item.type} className="flex items-center gap-3">
                <Icon className="size-4 shrink-0 text-muted-foreground" />
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="capitalize font-medium">{item.type}</span>
                    <span className="text-muted-foreground">
                      {item.percent}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
