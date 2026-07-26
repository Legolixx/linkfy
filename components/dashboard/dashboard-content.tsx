import Link from "next/link";
import { Plus, Palette, BarChart3, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { TimeRangeToggle } from "./time-range-toggle";
import { StatsCards } from "./stats-cards";
import { PerformanceChart } from "./performance-chart";
import { RecentActivity } from "./recent-activity";
import { TopPerformingLinks } from "./top-performing-links";
import { TrafficSources } from "./traffic-sources";
import { TopCountries } from "./top-countries";
import { DevicesCard } from "./devices-card";
import { LinkPerformanceTable } from "./link-performance-table";
import type { DashboardData } from "@/lib/dashboard-analytics";

interface DashboardContentProps {
  displayName: string;
  data: DashboardData;
  currentRange: string;
}

export function DashboardContent({
  displayName,
  data,
  currentRange,
}: DashboardContentProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">
            Bem-vindo de volta, {displayName}
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe o desempenho da sua página Linkfy.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <TimeRangeToggle current={currentRange} />
          <Button asChild size="sm" variant="outline">
            <Link href="/appearance">
              <Palette data-icon="inline-start" />
              Editar Perfil
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/links">
              <Plus data-icon="inline-start" />
              Criar Link
            </Link>
          </Button>
        </div>
      </div>

      <StatsCards data={data} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <PerformanceChart dailyActivity={data.dailyActivity} />
        <RecentActivity items={data.recentActivity} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TrafficSources items={data.trafficSources} />
        <TopCountries items={data.topCountries} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
        <DevicesCard items={data.devices} />
        <LinkPerformanceTable items={data.linkPerformance} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TopPerformingLinks items={data.topPerformingLinks} />
        <Card>
          <CardHeader className="border-b">
            <CardTitle>Ações rápidas</CardTitle>
            <CardDescription>Volte rapidamente ao seu fluxo de trabalho.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 pt-4">
            <Button asChild variant="outline" className="justify-start">
              <Link href="/links">
                <Plus data-icon="inline-start" />
                Criar novo link
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/appearance">
                <Palette data-icon="inline-start" />
                Personalizar aparência
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/analytics">
                <BarChart3 data-icon="inline-start" />
                Ver análises
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/links">
                <ArrowUpDown data-icon="inline-start" />
                Reordenar links
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
