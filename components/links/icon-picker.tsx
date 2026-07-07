'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { linkIcons, type LinkIconId } from '@/lib/link-icons'

interface IconPickerProps {
  value: LinkIconId | null
  onChange: (value: LinkIconId | null) => void
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={cn(
          'flex size-9 items-center justify-center rounded-full border text-xs text-muted-foreground transition-colors',
          value === null ? 'border-primary ring-1 ring-primary' : 'border-border hover:bg-muted/50',
        )}
        aria-label="Sem ícone"
      >
        —
      </button>
      {linkIcons.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          aria-label={label}
          aria-pressed={value === id}
          className={cn(
            'relative flex size-9 items-center justify-center rounded-full border transition-colors',
            value === id ? 'border-primary bg-primary/10 ring-1 ring-primary' : 'border-border hover:bg-muted/50',
          )}
        >
          <Icon className="size-4" />
          {value === id && (
            <Check className="absolute -right-1 -top-1 size-3 rounded-full bg-primary text-primary-foreground" />
          )}
        </button>
      ))}
    </div>
  )
}