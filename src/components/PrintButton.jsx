'use client';

import Icon from '@/components/Icon';

export default function PrintButton({ label = 'Download / Print' }) {
  return (
    <button
      onClick={() => window.print()}
      className="no-print rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700"
    >
      <Icon name="print" className="mr-2 h-4 w-4" />{label}
    </button>
  );
}
