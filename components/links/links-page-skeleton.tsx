// components/links/links-page-skeleton.tsx
export function LinksPageSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-9 w-48 animate-pulse rounded-md bg-muted/40" />
      <div className="h-9 w-64 animate-pulse rounded-md bg-muted/40" />
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-14 animate-pulse rounded-xl border bg-muted/40" />
        ))}
      </div>
    </div>
  )
}