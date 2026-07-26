import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface TopCountriesProps {
  items: { country: string; visitors: number; percent: number }[];
}

export function TopCountries({ items }: TopCountriesProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Principais países</CardTitle>
        <CardDescription>Origem dos visitantes por localização</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pt-4">
        {items.length === 0 ? (
          <p className="py-6 text-center text-xs text-muted-foreground">
            Nenhum dado de localização disponível ainda (disponível apenas em
            produção).
          </p>
        ) : (
          items.map((item) => (
            <div key={item.country} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">{item.country}</span>
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
