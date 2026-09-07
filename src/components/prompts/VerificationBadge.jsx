import Icon from '@/components/Icon';

// The review state of a community prompt, shown wherever the prompt is. A
// learner should be able to tell at a glance how much scrutiny a prompt has had.
const STATES = {
  pending: { label: 'Pending review', icon: 'hourglass', className: 'border-slate-300 bg-slate-50 text-slate-600' },
  ai_reviewed: { label: 'AI reviewed', icon: 'robot', className: 'border-indigo-300 bg-indigo-50 text-indigo-700' },
  verified: { label: 'Verified', icon: 'check-circle', className: 'border-green-300 bg-green-50 text-green-800' },
  rejected: { label: 'Rejected', icon: 'x-circle', className: 'border-red-300 bg-red-50 text-red-700' },
};

export default function VerificationBadge({ status, origin, className = '' }) {
  // Official prompts ship with the app; "verified" would understate them.
  if (origin === 'official') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full border border-indigo-300 bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 ${className}`}>
        <Icon name="shield" className="h-3 w-3" />
        Official
      </span>
    );
  }

  const state = STATES[status] || STATES.pending;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${state.className} ${className}`}>
      <Icon name={state.icon} className="h-3 w-3" />
      {state.label}
    </span>
  );
}
