"use client";

import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface PerformanceChartProps {
  dailyActivity: { date: string; views: number; clicks: number }[];
}

export function PerformanceChart({ dailyActivity }: PerformanceChartProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Desempenho</CardTitle>
        <CardDescription>
          Visualizações e cliques no período selecionado
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-5">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={dailyActivity}>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10 }}
              tickFormatter={(v) => v.slice(5)}
            />
            <Tooltip />
            <Bar dataKey="views" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            <Bar
              dataKey="clicks"
              fill="var(--muted-foreground)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
