// app/(protected)/appearance/page.tsx
import { Suspense } from 'react'
import { AppearanceEditorSkeleton } from '@/components/appearance/appearance-editor-skeleton'
import { AppearanceEditorLoader } from '@/components/appearance/appearance-editor-loader'

export default function AppearancePage() {
  return (
    <Suspense fallback={<AppearanceEditorSkeleton />}>
      <AppearanceEditorLoader />
    </Suspense>
  )
}