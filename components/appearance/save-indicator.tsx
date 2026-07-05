'use client'

import { Loader2, Check, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SaveStatus } from '@/hooks/use-profile-settings'

interface SaveIndicatorProps {
  status: SaveStatus
}

export function SaveIndicator({ status }: SaveIndicatorProps) {
  if (status === 'idle') return null

  return (
    <div
      className={cn(
        'flex items-center gap-1.5 text-xs font-medium transition-opacity',
        status === 'error' ? 'text-destructive' : 'text-muted-foreground',
      )}
    >
      {status === 'saving' && (
        <>
          <Loader2 className="size-3.5 animate-spin" />
          Salvando...
        </>
      )}
      {status === 'saved' && (
        <>
          <Check className="size-3.5" />
          Salvo
        </>
      )}
      {status === 'error' && (
        <>
          <AlertCircle className="size-3.5" />
          Erro ao salvar
        </>
      )}
    </div>
  )
}