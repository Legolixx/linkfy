export type EventRow = {
  id: string
  link_id: string | null
  event_type: 'view' | 'click'
  referrer: string | null
  country: string | null
  device: string | null
  created_at: string
}

export type LinkRow = {
  id: string
  title: string
  enabled: boolean
}

export type DashboardData = {
  totalViews: number
  totalClicks: number
  ctr: number
  activeLinks: number
  dailyActivity: { date: string; views: number; clicks: number }[]
  recentActivity: { id: string; label: string; time: string }[]
  topPerformingLinks: { id: string; title: string; clicks: number }[]
  trafficSources: { source: string; visitors: number; percent: number }[]
  topCountries: { country: string; visitors: number; percent: number }[]
  devices: { type: string; percent: number }[]
  linkPerformance: { id: string; title: string; clicks: number; ctr: number }[]
}

function extractSource(referrer: string | null): string {
  if (!referrer) return 'Direct'
  try {
    const hostname = new URL(referrer).hostname.replace('www.', '')
    return hostname
  } catch {
    return 'Direct'
  }
}

function toPercentList<T extends { count: number }>(
  entries: T[],
): (T & { percent: number })[] {
  const total = entries.reduce((sum, e) => sum + e.count, 0)
  return entries.map((e) => ({
    ...e,
    percent: total > 0 ? Math.round((e.count / total) * 100) : 0,
  }))
}

function timeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diffMs / 60000)
  if (minutes < 1) return 'agora'
  if (minutes < 60) return `${minutes}m atrás`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h atrás`
  const days = Math.floor(hours / 24)
  return `${days}d atrás`
}

export function aggregateDashboardData(
  events: EventRow[],
  links: LinkRow[],
  rangeDays: number,
): DashboardData {
  const linkById = new Map(links.map((l) => [l.id, l]))

  const views = events.filter((e) => e.event_type === 'view')
  const clicks = events.filter((e) => e.event_type === 'click')

  const totalViews = views.length
  const totalClicks = clicks.length
  const ctr = totalViews > 0 ? Math.round((totalClicks / totalViews) * 1000) / 10 : 0
  const activeLinks = links.filter((l) => l.enabled).length

  // --- gráfico diário ---
  const dayBuckets = new Map<string, { views: number; clicks: number }>()
  for (let i = rangeDays - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    dayBuckets.set(key, { views: 0, clicks: 0 })
  }
  for (const e of events) {
    const key = e.created_at.slice(0, 10)
    const bucket = dayBuckets.get(key)
    if (!bucket) continue
    if (e.event_type === 'view') bucket.views++
    else bucket.clicks++
  }
  const dailyActivity = Array.from(dayBuckets.entries()).map(([date, v]) => ({ date, ...v }))

  // --- atividade recente (10 mais recentes, view + click) ---
  const recentActivity = [...events]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 10)
    .map((e) => {
      const label =
        e.event_type === 'click'
          ? `Clique em ${e.link_id ? linkById.get(e.link_id)?.title ?? 'link removido' : 'link'}`
          : `Página visitada via ${extractSource(e.referrer)}`
      return { id: e.id, label, time: timeAgo(e.created_at) }
    })

  // --- top links (por clique) ---
  const clicksByLink = new Map<string, number>()
  for (const e of clicks) {
    if (!e.link_id) continue
    clicksByLink.set(e.link_id, (clicksByLink.get(e.link_id) ?? 0) + 1)
  }
  const topPerformingLinks = Array.from(clicksByLink.entries())
    .map(([id, count]) => ({ id, title: linkById.get(id)?.title ?? 'Link removido', clicks: count }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 5)

  // --- traffic sources ---
  const sourceCounts = new Map<string, number>()
  for (const e of views) {
    const src = extractSource(e.referrer)
    sourceCounts.set(src, (sourceCounts.get(src) ?? 0) + 1)
  }
  const trafficSources = toPercentList(
    Array.from(sourceCounts.entries())
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5),
  ).map((s) => ({ source: s.source, visitors: s.count, percent: s.percent }))

  // --- países ---
  const countryCounts = new Map<string, number>()
  for (const e of views) {
    if (!e.country) continue
    countryCounts.set(e.country, (countryCounts.get(e.country) ?? 0) + 1)
  }
  const topCountries = toPercentList(
    Array.from(countryCounts.entries())
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5),
  ).map((c) => ({ country: c.country, visitors: c.count, percent: c.percent }))

  // --- devices ---
  const deviceCounts = new Map<string, number>()
  for (const e of views) {
    const d = e.device ?? 'desktop'
    deviceCounts.set(d, (deviceCounts.get(d) ?? 0) + 1)
  }
  const devices = toPercentList(
    Array.from(deviceCounts.entries()).map(([type, count]) => ({ type, count })),
  ).map((d) => ({ type: d.type, percent: d.percent }))

  // --- performance por link (tabela) ---
  const linkPerformance = links.map((l) => {
    const linkClicks = clicksByLink.get(l.id) ?? 0
    return {
      id: l.id,
      title: l.title,
      clicks: linkClicks,
      ctr: totalViews > 0 ? Math.round((linkClicks / totalViews) * 1000) / 10 : 0,
    }
  })

  return {
    totalViews,
    totalClicks,
    ctr,
    activeLinks,
    dailyActivity,
    recentActivity,
    topPerformingLinks,
    trafficSources,
    topCountries,
    devices,
    linkPerformance,
  }
}