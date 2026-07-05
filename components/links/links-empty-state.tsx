// components/links/links-empty-state.tsx
'use client'

import { Plus, Search, Link2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '@/components/ui/empty'

interface LinksEmptyStateProps {
  hasQuery: boolean
  onCreate: () => void
}

export function LinksEmptyState({ hasQuery, onCreate }: LinksEmptyStateProps) {
  return (
    <Empty className="py-16">
      <EmptyHeader>
        <EmptyMedia variant="icon">{hasQuery ? <Search /> : <Link2 />}</EmptyMedia>
        <EmptyTitle>{hasQuery ? 'No links found' : 'No links yet'}</EmptyTitle>
        <EmptyDescription>
          {hasQuery
            ? 'Try a different search term to find what you\u2019re looking for.'
            : 'Create your first link to start building your Linkfy page.'}
        </EmptyDescription>
      </EmptyHeader>
      {!hasQuery && (
        <EmptyContent>
          <Button onClick={onCreate}>
            <Plus data-icon="inline-start" />
            Create Link
          </Button>
        </EmptyContent>
      )}
    </Empty>
  )
}