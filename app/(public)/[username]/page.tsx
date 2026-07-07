// app/(public)/[username]/page.tsx
import { Suspense } from 'react'
import { PublicPageLoader } from '@/components/public/public-page-loader'
import { PublicPageSkeleton } from '@/components/public/public-page-skeleton'

interface PublicPageProps {
  params: Promise<{ username: string }>
}

export default function PublicPage({ params }: PublicPageProps) {
  return (
    <Suspense fallback={<PublicPageSkeleton />}>
      <PublicPageLoader params={params} />
    </Suspense>
  )
}