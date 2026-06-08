export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
      <div className="mt-4 flex items-start gap-4">
        <div className="h-12 w-12 animate-pulse rounded bg-slate-200" />
        <div className="flex-1 space-y-2">
          <div className="h-8 w-1/2 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
        </div>
      </div>
      <div className="mt-10 space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-2xl border border-slate-200 bg-slate-50" />
        ))}
      </div>
    </div>
  );
}
