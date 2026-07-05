'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import {
  Field,
  FieldContent,
  FieldTitle,
  FieldDescription,
} from '@/components/ui/field'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui/toggle-group'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import type { ProfileSettings } from '@/hooks/use-profile-settings'

interface ButtonsTypographySectionProps {
  settings: ProfileSettings
  onChange: <K extends keyof ProfileSettings>(key: K, value: ProfileSettings[K], debounceMs?: number) => void
}

export function ButtonsTypographySection({ settings, onChange }: ButtonsTypographySectionProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Buttons & typography</CardTitle>
        <CardDescription>
          Control the shape of your link buttons and page font.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 pt-3">
          <span className="text-sm font-medium">Button style</span>
          <ToggleGroup
            type="multiple"
            value={[settings.button_style]}
            onValueChange={(v) => v[0] && onChange('button_style', v[0], 0)}
            variant="outline"
            className="w-full *:flex-1"
          >
            <ToggleGroupItem value="rounded">Rounded</ToggleGroupItem>
            <ToggleGroupItem value="square">Square</ToggleGroupItem>
            <ToggleGroupItem value="pill">Pill</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Font family</FieldTitle>
            <FieldDescription>Applied across your public page.</FieldDescription>
          </FieldContent>
          <Select value={settings.font} onValueChange={(v) => onChange('font', v as string, 0)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sans">Sans (default)</SelectItem>
              <SelectItem value="serif">Serif</SelectItem>
              <SelectItem value="mono">Monospace</SelectItem>
              <SelectItem value="rounded">Rounded</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </CardContent>
    </Card>
  )
}