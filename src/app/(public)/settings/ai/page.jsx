'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Icon from '@/components/Icon';
import { ErrorState, LoginGate, SkeletonCard, SuccessNote } from '@/components/ui/States';

const SHELL = 'mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8';

export default function AIConnectionsPage() {
  const { status } = useSession();
  const [state, setState] = useState({ loading: true, error: '', catalog: [], connections: [], encryptionReady: true });
  const [note, setNote] = useState('');

  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: '' }));
    fetch('/api/ai/providers')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Could not load your AI connections'))))
      .then((d) => setState({ loading: false, error: '', ...d }))
      .catch((e) => setState((s) => ({ ...s, loading: false, error: e.message })));
  }, []);

  useEffect(() => {
    if (status === 'authenticated') load();
  }, [status, load]);

  function flash(message) {
    setNote(message);
    setTimeout(() => setNote(''), 2500);
  }

  if (status === 'loading') {
    return <div className={`${SHELL} py-12`}><SkeletonCard lines={3} /></div>;
  }
  if (status !== 'authenticated') {
    return (
      <div className={`${SHELL} py-12`}>
        <h1 className="text-3xl font-bold">AI connections</h1>
        <div className="mt-6"><LoginGate message="Log in to connect an AI provider." /></div>
      </div>
    );
  }

  const connectionFor = (id) => state.connections.find((c) => c.provider === id);

  return (
    <div className={`${SHELL} py-12`}>
      <h1 className="text-3xl font-bold">AI connections</h1>
      <p className="mt-2 text-slate-600">
        Bring your own AI provider. Your key is encrypted before it is stored, never sent to the
        browser again, and used only for the actions you run.
      </p>

      {note && <div className="mt-4"><SuccessNote>{note}</SuccessNote></div>}

      {!state.encryptionReady && !state.loading && (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          <p className="font-semibold">This server cannot store keys yet.</p>
          <p className="mt-1">
            Set <code className="rounded bg-amber-100 px-1">AI_ENCRYPTION_KEY</code> in the
            environment (see <code className="rounded bg-amber-100 px-1">.env.example</code>) and
            restart. Until then, AI actions run in demo mode with sample data.
          </p>
        </div>
      )}

      {state.loading ? (
        <div className="mt-8 space-y-4"><SkeletonCard lines={2} /><SkeletonCard lines={2} /></div>
      ) : state.error ? (
        <div className="mt-8"><ErrorState message={state.error} onRetry={load} /></div>
      ) : (
        <div className="mt-8 space-y-4">
          {state.catalog.map((p) => (
            <ProviderCard
              key={p.id}
              provider={p}
              connection={connectionFor(p.id)}
              disabled={!state.encryptionReady}
              onChanged={(message) => {
                if (message) flash(message);
                load();
              }}
            />
          ))}
        </div>
      )}

      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
        <p className="flex items-center gap-2 font-semibold text-slate-700">
          <Icon name="shield" className="h-4 w-4" />How your key is handled
        </p>
        <ul className="mt-3 space-y-1.5">
          <li>· Encrypted with AES-256-GCM before it touches the database.</li>
          <li>· Never returned by any API — the page only ever shows a masked hint.</li>
          <li>· Used only to run the actions you trigger, from the server.</li>
          <li>· Deleting a connection removes the stored key immediately.</li>
        </ul>
      </div>
    </div>
  );
}

function ProviderCard({ provider, connection, disabled, onChanged }) {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState(connection?.model || provider.defaultModel);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    setModel(connection?.model || provider.defaultModel);
  }, [connection?.model, provider.defaultModel]);

  async function call(action, options) {
    setBusy(action);
    setError('');
    try {
      const res = await fetch(options.url, options.init);
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body?.error || 'That did not work');
      return body;
    } catch (e) {
      setError(e.message);
      return null;
    } finally {
      setBusy('');
    }
  }

  async function connect(e) {
    e.preventDefault();
    const body = await call('connect', {
      url: '/api/ai/providers',
      init: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: provider.id, apiKey, model }),
      },
    });
    if (body) {
      setApiKey('');
      onChanged(`${provider.label} connected.`);
    }
  }

  async function test() {
    const body = await call('test', {
      url: '/api/ai/providers/test',
      init: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: provider.id }),
      },
    });
    if (body) {
      setTestResult(body);
      if (body.ok) onChanged(`${provider.label} is working.`);
      else setError(body.error);
    }
  }

  async function patch(update, message) {
    const body = await call('patch', {
      url: '/api/ai/providers',
      init: {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: provider.id, ...update }),
      },
    });
    if (body) onChanged(message);
  }

  async function disconnect() {
    const body = await call('delete', {
      url: `/api/ai/providers?provider=${provider.id}`,
      init: { method: 'DELETE' },
    });
    if (body) onChanged(`${provider.label} disconnected.`);
  }

  const statusPill = connection && (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${
        connection.status === 'ok'
          ? 'border-green-300 bg-green-50 text-green-800'
          : connection.status === 'failed'
            ? 'border-red-300 bg-red-50 text-red-700'
            : 'border-slate-300 bg-slate-50 text-slate-600'
      }`}
    >
      <Icon
        name={connection.status === 'ok' ? 'check-circle' : connection.status === 'failed' ? 'x-circle' : 'hourglass'}
        className="h-3 w-3"
      />
      {connection.status === 'ok' ? 'Working' : connection.status === 'failed' ? 'Failed' : 'Not tested'}
    </span>
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50">
            <Icon name={provider.icon} brand className="h-4 w-4" />
          </span>
          <div>
            <h2 className="flex items-center gap-2 font-semibold">
              {provider.label}
              {connection?.isDefault && (
                <span className="rounded-full border border-indigo-300 bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">
                  Default
                </span>
              )}
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              {connection ? `Key ${connection.keyHint} · ${connection.model}` : 'Not connected'}
              {provider.serverKey && !connection && ' · a server key is available as fallback'}
            </p>
          </div>
        </div>
        {statusPill}
      </div>

      {connection?.lastError && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{connection.lastError}</p>
      )}
      {error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      {testResult?.ok && (
        <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800">
          Connection works — replied using {testResult.model}.
        </p>
      )}

      {connection ? (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <select
            value={model}
            onChange={(e) => patch({ model: e.target.value }, 'Model updated.')}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-indigo-400"
          >
            {provider.models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <button onClick={test} disabled={busy === 'test'} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium hover:bg-slate-50 disabled:opacity-50">
            <Icon name={busy === 'test' ? 'spinner' : 'plug'} spin={busy === 'test'} className="mr-1.5 h-3.5 w-3.5" />
            Test connection
          </button>
          <button
            onClick={() => patch({ enabled: !connection.enabled }, connection.enabled ? 'Disabled.' : 'Enabled.')}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium hover:bg-slate-50"
          >
            {connection.enabled ? 'Disable' : 'Enable'}
          </button>
          {!connection.isDefault && (
            <button
              onClick={() => patch({ makeDefault: true }, `${provider.label} is now your default.`)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium hover:bg-slate-50"
            >
              Make default
            </button>
          )}
          <button onClick={disconnect} className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50">
            <Icon name="trash" className="mr-1.5 h-3.5 w-3.5" />Disconnect
          </button>
        </div>
      ) : (
        <form onSubmit={connect} className="mt-4 flex flex-wrap items-end gap-2">
          <div className="min-w-[16rem] flex-1">
            <label htmlFor={`key-${provider.id}`} className="block text-xs font-medium text-slate-600">
              API key
            </label>
            <input
              id={`key-${provider.id}`}
              type="password"
              autoComplete="off"
              value={apiKey}
              disabled={disabled}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Paste your key"
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400 disabled:opacity-60"
            />
          </div>
          <select
            value={model}
            disabled={disabled}
            onChange={(e) => setModel(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400 disabled:opacity-60"
          >
            {provider.models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <button
            type="submit"
            disabled={disabled || busy === 'connect' || apiKey.length < 8}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            <Icon name={busy === 'connect' ? 'spinner' : 'plug'} spin={busy === 'connect'} className="mr-1.5 h-3.5 w-3.5" />
            Connect
          </button>
          {provider.keysUrl && (
            <a
              href={provider.keysUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-500 hover:text-indigo-600"
            >
              Get a key <Icon name="external-link" className="h-3 w-3" />
            </a>
          )}
        </form>
      )}
    </div>
  );
}
