export type LinkItem = {
  id: string
  title: string
  url: string
  clicks: number
  enabled: boolean
}

export const profile = {
  displayName: 'Alex Rivera',
  username: 'alexrivera',
  bio: 'Product designer & indie hacker. Building tools for creators. Sharing what I learn along the way.',
  avatar: '/avatar-portrait.png',
}

export const stats = [
  { label: 'Total Views', value: '48,290', delta: '+12.5%', trend: 'up' as const },
  { label: 'Total Clicks', value: '12,847', delta: '+8.2%', trend: 'up' as const },
  { label: 'Click Rate', value: '26.6%', delta: '-1.4%', trend: 'down' as const },
  { label: 'Active Links', value: '9', delta: '+2', trend: 'up' as const },
]

export const links: LinkItem[] = [
  {
    id: '1',
    title: 'My Personal Website',
    url: 'https://alexrivera.design',
    clicks: 3241,
    enabled: true,
  },
  {
    id: '2',
    title: 'Latest YouTube Video',
    url: 'https://youtube.com/watch?v=demo',
    clicks: 2870,
    enabled: true,
  },
  {
    id: '3',
    title: 'Newsletter — The Weekly Craft',
    url: 'https://theweeklycraft.com',
    clicks: 1984,
    enabled: true,
  },
  {
    id: '4',
    title: 'Buy My Design System Kit',
    url: 'https://gumroad.com/l/design-kit',
    clicks: 1523,
    enabled: true,
  },
  {
    id: '5',
    title: 'Book a 1:1 Consultation',
    url: 'https://cal.com/alexrivera',
    clicks: 921,
    enabled: false,
  },
  {
    id: '6',
    title: 'Follow me on X',
    url: 'https://x.com/alexrivera',
    clicks: 738,
    enabled: true,
  },
]

export const recentActivity = [
  { id: 'a1', label: 'New click on', target: 'My Personal Website', time: '2m ago' },
  { id: 'a2', label: 'Profile viewed from', target: 'Instagram', time: '11m ago' },
  { id: 'a3', label: 'New click on', target: 'Latest YouTube Video', time: '24m ago' },
  { id: 'a4', label: 'New subscriber via', target: 'Newsletter', time: '1h ago' },
  { id: 'a5', label: 'New click on', target: 'Buy My Design System Kit', time: '3h ago' },
]

export const trafficSources = [
  { source: 'Instagram', visitors: 18420, percent: 38 },
  { source: 'X (Twitter)', visitors: 11240, percent: 23 },
  { source: 'Direct', visitors: 8730, percent: 18 },
  { source: 'TikTok', visitors: 6110, percent: 13 },
  { source: 'YouTube', visitors: 3790, percent: 8 },
]

export const countries = [
  { country: 'United States', code: 'US', visitors: 15230, percent: 32 },
  { country: 'United Kingdom', code: 'GB', visitors: 7840, percent: 16 },
  { country: 'Germany', code: 'DE', visitors: 5210, percent: 11 },
  { country: 'Canada', code: 'CA', visitors: 4390, percent: 9 },
  { country: 'Australia', code: 'AU', visitors: 3120, percent: 6 },
]

export const devices = [
  { type: 'Mobile', percent: 68 },
  { type: 'Desktop', percent: 26 },
  { type: 'Tablet', percent: 6 },
]

export const chartBars = [
  32, 45, 38, 52, 48, 61, 55, 67, 59, 72, 64, 78, 70, 83, 76, 88, 81, 92, 85, 79,
  90, 86, 95, 88, 97, 91, 84, 93, 89, 98,
]

export const themePresets = [
  { id: 'minimal', name: 'Minimal', bg: 'oklch(1 0 0)', fg: 'oklch(0.205 0 0)' },
  { id: 'midnight', name: 'Midnight', bg: 'oklch(0.205 0 0)', fg: 'oklch(0.985 0 0)' },
  { id: 'sand', name: 'Sand', bg: 'oklch(0.96 0.01 90)', fg: 'oklch(0.3 0.02 60)' },
  { id: 'forest', name: 'Forest', bg: 'oklch(0.28 0.04 155)', fg: 'oklch(0.97 0 0)' },
]

export const accentColors = [
  { id: 'graphite', value: 'oklch(0.205 0 0)' },
  { id: 'blue', value: 'oklch(0.55 0.18 250)' },
  { id: 'emerald', value: 'oklch(0.6 0.14 160)' },
  { id: 'amber', value: 'oklch(0.72 0.15 70)' },
  { id: 'rose', value: 'oklch(0.62 0.2 15)' },
]
