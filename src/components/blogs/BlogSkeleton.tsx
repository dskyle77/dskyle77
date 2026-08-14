export default function BlogSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Featured Card Skeleton */}
      <div className="rounded-2xl border border-hairline bg-ink-raised/40 p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="aspect-video w-full rounded-xl bg-ink-soft/80 lg:col-span-6" />
          <div className="flex flex-col justify-between space-y-4 lg:col-span-6">
            <div className="space-y-3">
              <div className="h-6 w-32 rounded-full bg-ink-soft/80" />
              <div className="h-8 w-3/4 rounded bg-ink-soft/80" />
              <div className="h-4 w-full rounded bg-ink-soft/60" />
              <div className="h-4 w-5/6 rounded bg-ink-soft/60" />
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-16 rounded bg-ink-soft/60" />
              <div className="h-6 w-16 rounded bg-ink-soft/60" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-xl border border-hairline bg-ink-raised/40 p-5 sm:p-6"
          >
            <div className="space-y-4">
              <div className="aspect-video w-full rounded-lg bg-ink-soft/80" />
              <div className="flex justify-between">
                <div className="h-3 w-20 rounded bg-ink-soft/60" />
                <div className="h-3 w-16 rounded bg-ink-soft/60" />
              </div>
              <div className="h-6 w-4/5 rounded bg-ink-soft/80" />
              <div className="space-y-2">
                <div className="h-3.5 w-full rounded bg-ink-soft/50" />
                <div className="h-3.5 w-3/4 rounded bg-ink-soft/50" />
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-hairline/40 flex justify-between">
              <div className="h-5 w-24 rounded bg-ink-soft/50" />
              <div className="h-4 w-16 rounded bg-ink-soft/50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
