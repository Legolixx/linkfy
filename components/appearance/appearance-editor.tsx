'use client'

import { useProfileSettings, type ProfileSettings } from '@/hooks/use-profile-settings'
import type { Link } from '@/hooks/use-links' // ← importa o tipo real, remove a interface local
import { ProfileSection } from './profile-section'
import { ThemeSection } from './theme-section'
import { ButtonsTypographySection } from './buttons-typography-section'
import { DisplayOptionsSection } from './display-options-section'
import { LivePreview } from './live-preview'
import { SaveIndicator } from './save-indicator'

interface AppearanceEditorProps {
  userId: string
  initialProfile: ProfileSettings
  links: Link[]
}

export function AppearanceEditor({ userId, initialProfile, links }: AppearanceEditorProps) {
  const { settings, update, setLocal, status } = useProfileSettings(userId, initialProfile)

  return (
    <div className="flex flex-col gap-6">
      <SaveIndicator status={status} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-6">
          <ProfileSection userId={userId} settings={settings} onChange={update} setLocal={setLocal} />
          <ThemeSection settings={settings} onChange={update} />
          <ButtonsTypographySection settings={settings} onChange={update} />
          <DisplayOptionsSection settings={settings} onChange={update} />
        </div>

        <div className="lg:sticky lg:top-8 lg:h-fit">
          <LivePreview settings={settings} links={links} />
        </div>
      </div>
    </div>
  )
}