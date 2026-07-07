// components/appearance/live-preview.tsx
'use client'

import { Globe, AtSign, Share2, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { themePresets, accentColors } from '@/lib/mock-data'
import { getLinkIcon } from '@/lib/link-icons'
import type { ProfileSettings } from '@/hooks/use-profile-settings'
import type { Link } from '@/hooks/use-links'

const buttonStyleMap: Record<string, string> = {
  rounded: 'rounded-xl',
  square: 'rounded-none',
  pill: 'rounded-full',
}

interface LivePreviewProps {
  settings: ProfileSettings
  links: Link[]
}

export function LivePreview({ settings, links }: LivePreviewProps) {
  const activeTheme = themePresets.find((t) => t.id === settings.theme) ?? themePresets[0]
  const activeAccent =
    accentColors.find((a) => a.id === settings.accent_color)?.value ?? accentColors[0].value
  const visibleLinks = links.filter((l) => l.enabled).slice(0, 5)


  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Live preview</CardTitle>
        <CardDescription>Updates as you edit.</CardDescription>
      </CardHeader>
      <CardContent className="pt-5">
        <div
          className="flex flex-col items-center gap-5 rounded-2xl border border-border p-6"
          style={{ background: activeTheme.bg, color: activeTheme.fg }}
        >
          <Avatar size="lg" className="size-16">
            <AvatarImage src={settings.avatar_url ?? '/placeholder.svg'} alt={settings.display_name} />
            <AvatarFallback>{settings.display_name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-center gap-1.5 text-center">
            <span className="font-semibold">{settings.display_name}</span>
            <span className="text-xs opacity-70">@{settings.username}</span>
            <p className="text-xs leading-relaxed opacity-80 text-pretty">{settings.bio}</p>
          </div>

          {settings.show_socials && (
            <div className="flex items-center gap-4 opacity-80">
              <Globe className="size-5" />
              <AtSign className="size-5" />
              <Share2 className="size-5" />
            </div>
          )}

          <div className="flex w-full flex-col gap-2.5">
            {visibleLinks.length === 0 ? (
              <p className="py-4 text-center text-xs opacity-60">Add links to see them here.</p>
            ) : (
              visibleLinks.map((link) => {
                const iconMeta = getLinkIcon(link.icon)
                return (
                  <div
                    key={link.id}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2.5 text-xs font-medium',
                      buttonStyleMap[settings.button_style],
                    )}
                    style={{ background: activeAccent, color: '#fff' }}
                  >
                    {iconMeta && <iconMeta.Icon className="size-3.5 shrink-0" />}
                    <span className="flex-1 truncate">{link.title}</span>
                    <ExternalLink className="size-3.5 shrink-0 opacity-80" />
                  </div>
                )
              })
            )}
          </div>

          {settings.show_branding && <span className="text-[10px] opacity-50">Made with Linkfy</span>}
        </div>
      </CardContent>
    </Card>
  )
}