'use client'

import { useCallback, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export type UsernameStatus = 'idle' | 'checking' | 'available' | 'taken' | 'invalid' | 'same'

const USERNAME_REGEX = /^[a-z0-9_]{3,20}$/

export function useUsernameAvailability(userId: string, currentUsername: string) {
  const [status, setStatus] = useState<UsernameStatus>('idle')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const requestIdRef = useRef(0)

  const check = useCallback(
    (value: string) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      const normalized = value.trim().toLowerCase()

      if (normalized === currentUsername) {
        setStatus('same')
        return
      }

      if (!USERNAME_REGEX.test(normalized)) {
        setStatus('invalid')
        return
      }

      setStatus('checking')
      const thisRequestId = ++requestIdRef.current

      timeoutRef.current = setTimeout(async () => {
        const supabase = createClient()
        const { data } = await supabase
          .from('profiles')
          .select('id')
          .eq('username', normalized)
          .maybeSingle()

        // ignora resposta se já veio uma checagem mais nova depois dessa
        if (thisRequestId !== requestIdRef.current) return

        setStatus(data && data.id !== userId ? 'taken' : 'available')
      }, 500)
    },
    [currentUsername, userId],
  )

  return { status, check }
}