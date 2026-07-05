// hooks/use-profile-settings.ts
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export type ProfileSettings = {
  display_name: string
  username: string
  bio: string
  avatar_url: string | null
  theme: string
  accent_color: string
  button_style: string
  font: string
  show_socials: boolean
  show_branding: boolean
}

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export function useProfileSettings(userId: string, initial: ProfileSettings) {
  const [settings, setSettings] = useState<ProfileSettings>(initial)
  const [status, setStatus] = useState<SaveStatus>('idle')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const supabase = createClient()

  // limpa o timeout se o componente desmontar no meio do debounce
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const persist = useCallback(
    async (patch: Partial<ProfileSettings>) => {
      setStatus('saving')
      const { error } = await supabase.from('profiles').update(patch).eq('id', userId)
      setStatus(error ? 'error' : 'saved')

      if (!error) {
        // volta pra "idle" depois de mostrar o "saved" por um instante
        setTimeout(() => setStatus('idle'), 1500)
      }
    },
    [supabase, userId],
  )

  const update = useCallback(
    <K extends keyof ProfileSettings>(key: K, value: ProfileSettings[K], debounceMs = 500) => {
      setSettings((prev) => ({ ...prev, [key]: value }))

      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      if (debounceMs === 0) {
        persist({ [key]: value } as Partial<ProfileSettings>)
      } else {
        timeoutRef.current = setTimeout(() => {
          persist({ [key]: value } as Partial<ProfileSettings>)
        }, debounceMs)
      }
    },
    [persist],
  )

  // usado pelo AvatarUpload, que já faz o update no banco sozinho
  // (só precisa sincronizar o estado local)
  const setLocal = useCallback(<K extends keyof ProfileSettings>(key: K, value: ProfileSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }, [])

  return { settings, update, setLocal, status }
}