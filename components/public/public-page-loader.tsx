// components/public/public-page-loader.tsx
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { detectDevice } from '@/lib/device-detection'
import { getVisitorCountry } from '@/lib/geo'
import { PublicProfileView } from './public-profile-view'

interface PublicPageLoaderProps {
  params: Promise<{ username: string }>
}

export async function PublicPageLoader({ params }: PublicPageLoaderProps) {
  const { username } = await params // ← resolvido aqui dentro, já sob o Suspense
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select(
      'id, display_name, username, bio, avatar_url, theme, accent_color, button_style, font, show_socials, show_branding',
    )
    .eq('username', username)
    .single()

  if (!profile) notFound()

  const { data: links } = await supabase
    .from('links')
    .select('id, title, url, icon, position')
    .eq('profile_id', profile.id)
    .eq('enabled', true)
    .order('position')

  const headersList = await headers()
  const userAgent = headersList.get('user-agent')
  const country = await getVisitorCountry()
  const referrer = headersList.get('referer')

  supabase
    .from('link_events')
    .insert({
      profile_id: profile.id,
      event_type: 'view',
      referrer,
      country,
      device: detectDevice(userAgent),
    })
    .then(({ error }) => {
      if (error) console.error('Erro ao registrar view:', error)
    })

  return <PublicProfileView profile={profile} links={links ?? []} />
}