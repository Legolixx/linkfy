'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { themePresets, accentColors } from '@/lib/mock-data'
import type { ProfileSettings } from '@/hooks/use-profile-settings'

interface ThemeSectionProps {
  settings: ProfileSettings
  onChange: <K extends keyof ProfileSettings>(key: K, value: ProfileSettings[K], debounceMs?: number) => void
}

export function ThemeSection({ settings, onChange }: ThemeSectionProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Theme</CardTitle>
        <CardDescription>
          Pick a base theme and accent color for your page.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 pt-3">
          <span className="text-sm font-medium">Theme preset</span>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {themePresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onChange('theme', preset.id, 0)}
                aria-pressed={settings.theme === preset.id}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-xl border p-3 text-sm transition-colors',
                  settings.theme === preset.id
                    ? 'border-primary ring-1 ring-primary'
                    : 'border-border hover:bg-muted/50',
                )}
              >
                <span
                  className="flex h-14 w-full items-center justify-center rounded-lg border border-border"
                  style={{ background: preset.bg }}
                >
                  <span className="h-2 w-10 rounded-full" style={{ background: preset.fg }} />
                </span>
                <span className="font-medium">{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium">Accent color</span>
          <div className="flex flex-wrap gap-2.5">
            {accentColors.map((color) => (
              <button
                key={color.id}
                type="button"
                onClick={() => onChange('accent_color', color.id, 0)}
                aria-label={color.id}
                aria-pressed={settings.accent_color === color.id}
                className={cn(
                  'flex size-9 items-center justify-center rounded-full border transition-transform hover:scale-105',
                  settings.accent_color === color.id
                    ? 'ring-2 ring-ring ring-offset-2 ring-offset-background'
                    : 'border-border',
                )}
                style={{ background: color.value }}
              >
                {settings.accent_color === color.id && <Check className="size-4 text-white" />}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}