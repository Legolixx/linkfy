import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { aggregateDashboardData } from '@/lib/dashboard-analytics'
import { DashboardContent } from './dashboard-content'

const RANGE_DAYS: Record<string, number> = { '7d': 7, '30d': 30, '90d': 90 }

interface DashboardLoaderProps {
  searchParams: Promise<{ range?: string }>
}

export async function DashboardLoader({ searchParams }: DashboardLoaderProps) {
  const { range } = await searchParams
  const rangeKey = range && RANGE_DAYS[range] ? range : '7d'
  const rangeDays = RANGE_DAYS[rangeKey]

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name')
    .eq('id', user.id)
    .single()

  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - rangeDays)

  const { data: links } = await supabase
    .from('links')
    .select('id, title, enabled')
    .eq('profile_id', user.id)

  const { data: events } = await supabase
    .from('link_events')
    .select('id, link_id, event_type, referrer, country, device, created_at')
    .eq('profile_id', user.id)
    .gte('created_at', cutoff.toISOString())

  const data = aggregateDashboardData(events ?? [], links ?? [], rangeDays)

  return (
    <DashboardContent
      displayName={profile?.display_name ?? ''}
      data={data}
      currentRange={rangeKey}
    />
  )
}