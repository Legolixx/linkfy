'use client'

import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { LinksSearch } from './links-search'
import { LinksList } from './links-list'
import { LinksEmptyState } from './links-empty-state'
import { LinkFormDialog } from './link-form-dialog'
import { useLinks, type Link } from '@/hooks/use-links'

interface LinksPageClientProps {
  profileId: string
  initialLinks: Link[]
}

export function LinksPageClient({ profileId, initialLinks }: LinksPageClientProps) {
  const { links, createLink, updateLink, toggleLink, deleteLink, duplicateLink, reorderLinks, error } = useLinks(
    profileId,
    initialLinks,
  )

  const [query, setQuery] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Link | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return links
    return links.filter((l) => l.title.toLowerCase().includes(q) || l.url.toLowerCase().includes(q))
  }, [links, query])

  const activeCount = links.filter((l) => l.enabled).length

  function openCreate() {
    setEditing(null)
    setDialogOpen(true)
  }

  function openEdit(link: Link) {
    setEditing(link)
    setDialogOpen(true)
  }

  async function handleSubmit(input: { title: string; url: string }) {
    if (editing) {
      await updateLink(editing.id, input)
    } else {
      await createLink(input)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Links" description={`${links.length} links · ${activeCount} active`}>
        <Button size="sm" onClick={openCreate}>
          <Plus data-icon="inline-start" />
          Create Link
        </Button>
      </PageHeader>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <LinksSearch value={query} onChange={setQuery} />

      {filtered.length > 0 ? (
        <LinksList
          links={filtered}
          onToggle={toggleLink}
          onEdit={openEdit}
          onDelete={deleteLink}
          onDuplicate={duplicateLink}
          onReorder={reorderLinks}
        />
      ) : (
        <LinksEmptyState hasQuery={query.trim().length > 0} onCreate={openCreate} />
      )}

      <LinkFormDialog open={dialogOpen} onOpenChange={setDialogOpen} editing={editing} onSubmit={handleSubmit} />
    </div>
  )
}