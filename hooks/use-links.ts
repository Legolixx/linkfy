'use client'

import { useCallback, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export type Link = {
  id: string
  title: string
  url: string
  enabled: boolean
  position: number
  clicks: number
}

export type LinkInput = {
  title: string
  url: string
}

export function useLinks(profileId: string, initialLinks: Link[]) {
  const [links, setLinks] = useState<Link[]>(initialLinks)
  const [error, setError] = useState<string | null>(null)

  async function createLink(input: LinkInput) {
    const supabase = createClient()
    const nextPosition = links.length > 0 ? Math.max(...links.map((l) => l.position)) + 1 : 0

    // otimista: gera um id temporário só pra UI reagir na hora
    const tempId = crypto.randomUUID()
    const optimisticLink: Link = {
      id: tempId,
      title: input.title,
      url: input.url,
      enabled: true,
      position: nextPosition,
      clicks: 0,
    }
    setLinks((prev) => [optimisticLink, ...prev])

    const { data, error: insertError } = await supabase
      .from('links')
      .insert({ profile_id: profileId, title: input.title, url: input.url, position: nextPosition })
      .select()
      .single()

    if (insertError || !data) {
      setError('Falha ao criar o link.')
      setLinks((prev) => prev.filter((l) => l.id !== tempId)) // desfaz o otimista
      return
    }

    // troca o registro otimista pelo real vindo do banco (com id de verdade)
    setLinks((prev) => prev.map((l) => (l.id === tempId ? (data as Link) : l)))
  }

  async function updateLink(id: string, patch: Partial<LinkInput>) {
    const supabase = createClient()
    const previous = links
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)))

    const { error: updateError } = await supabase.from('links').update(patch).eq('id', id)
    if (updateError) {
      setError('Falha ao atualizar o link.')
      setLinks(previous) // reverte
    }
  }

  async function toggleLink(id: string, enabled: boolean) {
    await updateLink(id, { enabled } as Partial<LinkInput> & { enabled: boolean })
  }

  async function deleteLink(id: string) {
    const supabase = createClient()
    const previous = links
    setLinks((prev) => prev.filter((l) => l.id !== id))

    const { error: deleteError } = await supabase.from('links').delete().eq('id', id)
    if (deleteError) {
      setError('Falha ao excluir o link.')
      setLinks(previous)
    }
  }

  async function duplicateLink(id: string) {
    const original = links.find((l) => l.id === id)
    if (!original) return
    await createLink({ title: `${original.title} (copy)`, url: original.url })
  }

  const reorderLinks = useCallback(
    async (orderedIds: string[]) => {
      const previous = links
      const reordered = orderedIds
        .map((id, index) => {
          const link = links.find((l) => l.id === id)
          return link ? { ...link, position: index } : null
        })
        .filter((l): l is Link => l !== null)

      setLinks(reordered) // atualiza a UI imediatamente

      const supabase = createClient()
      // atualiza a posição de cada link em paralelo
      const results = await Promise.all(
        reordered.map((link) => supabase.from('links').update({ position: link.position }).eq('id', link.id)),
      )

      if (results.some((r) => r.error)) {
        setError('Falha ao salvar a nova ordem.')
        setLinks(previous)
      }
    },
    [links],
  )

  return { links, error, createLink, updateLink, toggleLink, deleteLink, duplicateLink, reorderLinks }
}