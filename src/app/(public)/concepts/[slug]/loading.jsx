export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <div className="hidden lg:block">
          <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />
        </div>
        <div className="min-w-0 space-y-4">
          <div className="h-9 w-2/3 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-4/6 animate-pulse rounded bg-slate-100" />
          <div className="mt-6 h-40 w-full animate-pulse rounded-xl bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
