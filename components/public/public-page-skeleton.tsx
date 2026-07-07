// components/public/public-page-skeleton.tsx
export function PublicPageSkeleton() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-5 px-6 py-16">
      <div className="size-20 animate-pulse rounded-full bg-muted/40" />
      <div className="flex flex-col items-center gap-2">
        <div className="h-4 w-32 animate-pulse rounded bg-muted/40" />
        <div className="h-3 w-20 animate-pulse rounded bg-muted/40" />
      </div>
      <div className="flex w-full max-w-sm flex-col gap-2.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 animate-pulse rounded-xl bg-muted/40" />
        ))}
      </div>
    </main>
  )
}