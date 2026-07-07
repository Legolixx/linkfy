// components/links/links-page-loader.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LinksPageClient } from './links-page-client'

export async function LinksPageLoader() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: links, error } = await supabase
    .from('links')
    .select('id, title, url, enabled, position, clicks, icon')
    .eq('profile_id', user.id)
    .order('position')

  if (error) {
    console.error('Erro ao carregar links:', error)
  }

  return <LinksPageClient profileId={user.id} initialLinks={links ?? []} />
}