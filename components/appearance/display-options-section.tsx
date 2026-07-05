'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import {
  Field,
  FieldContent,
  FieldTitle,
  FieldDescription,
} from '@/components/ui/field'
import type { ProfileSettings } from '@/hooks/use-profile-settings'

interface DisplayOptionsSectionProps {
  settings: ProfileSettings
  onChange: <K extends keyof ProfileSettings>(key: K, value: ProfileSettings[K], debounceMs?: number) => void
}

export function DisplayOptionsSection({ settings, onChange }: DisplayOptionsSectionProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Display options</CardTitle>
        <CardDescription>
          Toggle extra elements on your public page.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <Field orientation="horizontal" className="py-1">
          <FieldContent>
            <FieldTitle className='flex pt-3'>Social icons</FieldTitle>
            <FieldDescription>
              Show your social media icons under your bio.
            </FieldDescription>
          </FieldContent>
          <Switch
            checked={settings.show_socials}
            onCheckedChange={(checked) => onChange('show_socials', checked, 0)}
          />
        </Field>
        <Separator />
        <Field orientation="horizontal" className="py-1">
          <FieldContent>
            <FieldTitle className='flex pt-3'>Linkfy branding</FieldTitle>
            <FieldDescription>
              Display the &quot;Made with Linkfy&quot; badge.
            </FieldDescription>
          </FieldContent>
          <Switch
            checked={settings.show_branding}
            onCheckedChange={(checked) => onChange('show_branding', checked, 0)}
          />
        </Field>
      </CardContent>
    </Card>
  )
}