// components/appearance/appearance-editor-loader.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AppearanceEditor } from './appearance-editor'
import type { ProfileSettings } from '@/hooks/use-profile-settings'

export async function AppearanceEditorLoader() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('display_name, username, bio, avatar_url, theme, accent_color, button_style, font, show_socials, show_branding')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) redirect('/onboarding')

  const { data: links } = await supabase
    .from('links')
    .select('id, title, enabled, icon')
    .eq('profile_id', user.id)
    .order('position')

  return (
    <AppearanceEditor
      userId={user.id}
      initialProfile={profile as ProfileSettings}
      links={links ?? []}
    />
  )
}