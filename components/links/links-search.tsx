'use client'

import { Search } from 'lucide-react'
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/ui/input-group'

interface LinksSearchProps {
  value: string
  onChange: (value: string) => void
}

export function LinksSearch({ value, onChange }: LinksSearchProps) {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput
        placeholder="Search links..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputGroup>
  )
}