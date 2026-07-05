// components/appearance/appearance-editor-skeleton.tsx
export function AppearanceEditorSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-40 animate-pulse rounded-xl border bg-muted/40" />
        ))}
      </div>
      <div className="h-96 animate-pulse rounded-xl border bg-muted/40" />
    </div>
  )
}