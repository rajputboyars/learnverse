'use client';

import Icon from '@/components/Icon';

/**
 * Renders a template's declared inputs. Templates own their field list, so a new
 * quick action needs no form code at all — it just declares inputs and appears.
 */
export default function PromptForm({ template, values, onChange, disabled }) {
  if (!template?.inputs?.length) return null;

  function set(name, value) {
    onChange({ ...values, [name]: value });
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {template.inputs.map((field) => {
        const value = values[field.name] ?? field.default ?? '';
        const id = `${template.id}-${field.name}`;
        const wide = field.type === 'textarea';

        return (
          <div key={field.name} className={wide ? 'sm:col-span-2' : ''}>
            <label htmlFor={id} className="block text-sm font-medium text-slate-700">
              {field.label}
              {field.required && <span className="ml-1 text-red-500">*</span>}
            </label>

            {field.type === 'select' ? (
              <select
                id={id}
                value={value}
                disabled={disabled}
                onChange={(e) => set(field.name, e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400 disabled:opacity-60"
              >
                {field.options.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                id={id}
                rows={3}
                value={value}
                disabled={disabled}
                placeholder={field.placeholder}
                onChange={(e) => set(field.name, e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400 disabled:opacity-60"
              />
            ) : (
              <input
                id={id}
                type="text"
                value={value}
                disabled={disabled}
                placeholder={field.placeholder}
                onChange={(e) => set(field.name, e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400 disabled:opacity-60"
              />
            )}
          </div>
        );
      })}

      <p className="sm:col-span-2 flex items-center gap-1.5 text-xs text-slate-400">
        <Icon name="lightbulb" className="h-3 w-3" />
        You answer a few fields; the full prompt is written for you.
      </p>
    </div>
  );
}
