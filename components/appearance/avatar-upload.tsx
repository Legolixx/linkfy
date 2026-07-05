// components/appearance/avatar-upload.tsx
'use client'

import { useRef, useState } from 'react'
import { Camera, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const AVATAR_BUCKET = 'avatars'

interface AvatarUploadProps {
  userId: string
  displayName: string
  avatarUrl: string | null
  onUploaded: (url: string) => void
}

export function AvatarUpload({ userId, displayName, avatarUrl, onUploaded }: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Envie apenas JPG, PNG ou GIF.')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('Máximo de 2MB.')
      return
    }

    setError(null)
    setUploading(true)
    const supabase = createClient()

    try {
      const ext = file.name.split('.').pop()
      const path = `${userId}/avatar-${Date.now()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from(AVATAR_BUCKET)
        .upload(path, file, { upsert: true, cacheControl: '3600' })
      if (uploadError) throw uploadError

      const { data } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(path)

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: data.publicUrl })
        .eq('id', userId)
      if (updateError) throw updateError

      onUploaded(data.publicUrl)
    } catch (err) {
      console.error(err)
      setError('Falha ao enviar a imagem.')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="flex items-center gap-4">
      <Avatar size="lg" className="size-16">
        <AvatarImage src={avatarUrl ?? '/placeholder.svg'} alt={displayName} />
        <AvatarFallback>{displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/gif"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? <Loader2 className="animate-spin" /> : <Camera data-icon="inline-start" />}
          {uploading ? 'Enviando...' : 'Change picture'}
        </Button>
        <span className="text-xs text-muted-foreground">
          {error ?? 'JPG, PNG ou GIF. Máx 2MB.'}
        </span>
      </div>
    </div>
  )
}