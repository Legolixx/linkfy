// app/(protected)/links/page.tsx
import { Suspense } from 'react'
import { LinksPageLoader } from '@/components/links/links-page-loader'
import { LinksPageSkeleton } from '@/components/links/links-page-skeleton'

export default function LinksPage() {
  return (
    <Suspense fallback={<LinksPageSkeleton />}>
      <LinksPageLoader />
    </Suspense>
  )
}