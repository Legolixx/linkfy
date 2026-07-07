'use client'

import { useState } from 'react'
import { Smile } from 'lucide-react'
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react'

import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'

interface EmojiPickerButtonProps {
  inputRef: React.RefObject<HTMLInputElement | null> // ajustado
  value: string
  onChange: (value: string) => void
}

export function EmojiPickerButton({ inputRef, value, onChange }: EmojiPickerButtonProps) {
  const [open, setOpen] = useState(false)

  function handleEmojiClick(emojiData: EmojiClickData) {
    const input = inputRef.current
    if (!input) {
      onChange(value + emojiData.emoji)
      setOpen(false)
      return
    }

    // insere o emoji na posição exata do cursor, não só no final
    const start = input.selectionStart ?? value.length
    const end = input.selectionEnd ?? value.length
    const next = value.slice(0, start) + emojiData.emoji + value.slice(end)
    onChange(next)
    setOpen(false)

    // devolve o foco e reposiciona o cursor depois do emoji inserido
    requestAnimationFrame(() => {
      input.focus()
      const cursorPos = start + emojiData.emoji.length
      input.setSelectionRange(cursorPos, cursorPos)
    })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" variant="ghost" size="icon-sm" aria-label="Adicionar emoji">
          <Smile className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto border-none p-0" align="end">
        <EmojiPicker onEmojiClick={handleEmojiClick} theme={Theme.AUTO} height={350} width={300} />
      </PopoverContent>
    </Popover>
  )
}