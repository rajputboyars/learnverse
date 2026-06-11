'use client';

export default function PrintButton({ label = 'Download / Print' }) {
  return (
    <button
      onClick={() => window.print()}
      className="no-print rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700"
    >
      🖨 {label}
    </button>
  );
}
