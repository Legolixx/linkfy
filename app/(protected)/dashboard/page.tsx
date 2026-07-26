// app/(protected)/dashboard/page.tsx
import { Suspense } from 'react'
import { DashboardLoader } from '@/components/dashboard/dashboard-loader'
import { DashboardSkeleton } from '@/components/dashboard/dashboard-skeleton'

interface DashboardPageProps {
  searchParams: Promise<{ range?: string }>
}

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardLoader searchParams={searchParams} />
    </Suspense>
  )
}