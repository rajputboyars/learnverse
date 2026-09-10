import { NT_SCOPES } from '@/data/jahia/nodeTypes';

/**
 * Which Jahia a lesson was written against, and where a type comes from.
 * "Written for", not "tested with": behaviour can shift between minor
 * versions, and the badge should not promise more than the lesson checked.
 */
export default function VersionBadge({ version = 'Jahia 8.x', scope, note }) {
  const s = scope ? NT_SCOPES[scope] : null;
  return (
    <span className="flex flex-wrap items-center gap-1.5">
      <span
        className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600"
        title={note || 'Menus and labels can differ between Jahia 8.0, 8.1 and 8.2'}
      >
        Written for {version}
      </span>
      {s && <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${s.tone}`}>{s.label}</span>}
    </span>
  );
}
