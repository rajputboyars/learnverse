import Link from 'next/link';
import Icon from '@/components/Icon';

// The four states every async surface in the app needs, in one place so they
// look the same everywhere: loading, empty, error, success.

export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded-lg bg-slate-100 ${className}`} />;
}

export function SkeletonCard({ lines = 3 }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <Skeleton className="h-4 w-1/3" />
      <div className="mt-4 space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className={`h-3 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
        ))}
      </div>
    </div>
  );
}

export function EmptyState({ icon = 'seedling', title, description, action }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white/50 px-6 py-10 text-center">
      <Icon name={icon} className="mx-auto h-7 w-7 text-slate-300" />
      <p className="mt-3 font-semibold text-slate-700">{title}</p>
      {description && <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">{description}</p>}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}

export function ErrorState({ title = 'That did not work', message, onRetry, retryLabel = 'Try again' }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
      <p className="flex items-center gap-2 font-semibold text-red-800">
        <Icon name="error-circle" className="h-4 w-4" />
        {title}
      </p>
      {message && <p className="mt-1 text-sm text-red-700">{message}</p>}
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 rounded-lg border border-red-300 px-3 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100"
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}

export function SuccessNote({ children }) {
  return (
    <p className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-800">
      <Icon name="check-circle" className="h-4 w-4" />
      {children}
    </p>
  );
}

export function LoginGate({ message = 'Log in to run this.' }) {
  return (
    <div className="rounded-2xl border border-indigo-200 bg-indigo-50 px-5 py-4 text-sm">
      <p className="font-semibold text-indigo-900">{message}</p>
      <div className="mt-3 flex gap-2">
        <Link href="/login" className="rounded-lg border border-indigo-300 px-3 py-1.5 font-medium text-indigo-700 hover:bg-indigo-100">
          Login
        </Link>
        <Link href="/register" className="rounded-lg bg-indigo-600 px-3 py-1.5 font-medium text-white hover:bg-indigo-700">
          Sign up free
        </Link>
      </div>
    </div>
  );
}
