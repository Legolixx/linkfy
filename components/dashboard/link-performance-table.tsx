import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface LinkPerformanceTableProps {
  items: { id: string; title: string; clicks: number; ctr: number }[];
}

export function LinkPerformanceTable({ items }: LinkPerformanceTableProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Desempenho dos links</CardTitle>
        <CardDescription>
          Cliques e taxa de cliques (CTR) por link
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="py-2 font-medium">Link</th>
              <th className="py-2 text-right font-medium">Cliques</th>
              <th className="py-2 text-right font-medium">CTR</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b last:border-0">
                <td className="py-2.5 font-medium">{item.title}</td>
                <td className="py-2.5 text-right tabular-nums">
                  {item.clicks.toLocaleString()}
                </td>
                <td className="py-2.5 text-right tabular-nums text-muted-foreground">
                  {item.ctr}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
