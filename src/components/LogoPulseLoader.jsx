export default function LogoPulseLoader() {
  return (
    <>
      <style>{`
        @keyframes lv-logo-pulse {
          0%, 100% { transform: scale(1);    box-shadow: 0 0 0   0  rgba(79,70,229,0.50); }
          50%       { transform: scale(1.18); box-shadow: 0 0 24px 8px rgba(79,70,229,0.25); }
        }
        @keyframes lv-bar-sweep {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(450%); }
        }
      `}</style>

      <div
        className="flex min-h-[60vh] flex-col items-center justify-center"
        role="status"
        aria-label="Loading"
      >
        {/* Pulsing L box */}
        <div
          style={{ animation: 'lv-logo-pulse 1.2s ease-in-out infinite' }}
          className="grid h-16 w-16 place-items-center rounded-2xl bg-indigo-600 text-3xl font-extrabold text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40"
        >
          L
        </div>

        {/* Wordmark */}
        <p className="mt-4 text-xl font-bold text-slate-800 dark:text-slate-100">
          Learnverse
        </p>

        {/* Sweeping progress bar */}
        <div className="mt-4 h-[3px] w-36 overflow-hidden rounded-full bg-indigo-100 dark:bg-slate-800">
          <div
            className="h-full w-1/3 rounded-full bg-indigo-500"
            style={{ animation: 'lv-bar-sweep 1.3s ease-in-out infinite' }}
          />
        </div>
      </div>
    </>
  );
}
