'use client';

import { useMemo, useState } from 'react';
import { decrypt, encrypt } from '../lib/caesar';

const clampShift = (value) => {
  const num = Number.parseInt(value, 10);
  if (Number.isNaN(num)) return 0;
  return Math.min(25, Math.max(0, num));
};

export default function HomePage() {
  const [inputText, setInputText] = useState('');
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState('encrypt');

  const outputText = useMemo(() => {
    if (!inputText) return '';
    return mode === 'encrypt'
      ? encrypt(inputText, shift)
      : decrypt(inputText, shift);
  }, [inputText, shift, mode]);

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-4 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Ceaser Cypher</h1>
        <p className="text-slate-600">
          Paste text, set a shift, then encrypt or decrypt.
        </p>
      </header>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="shift" className="text-sm font-medium text-slate-700">
              Shift
            </label>
            <input
              id="shift"
              type="number"
              min={0}
              max={25}
              value={shift}
              onChange={(event) => setShift(clampShift(event.target.value))}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Mode</span>
            <div className="flex gap-2">
              <button
                type="button"
                className={`flex-1 rounded-md border px-4 py-2 text-sm font-medium transition ${
                  mode === 'encrypt'
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-slate-300 bg-white text-slate-700'
                }`}
                onClick={() => setMode('encrypt')}
              >
                Encrypt
              </button>
              <button
                type="button"
                className={`flex-1 rounded-md border px-4 py-2 text-sm font-medium transition ${
                  mode === 'decrypt'
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-slate-300 bg-white text-slate-700'
                }`}
                onClick={() => setMode('decrypt')}
              >
                Decrypt
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="input" className="text-sm font-medium text-slate-700">
              Input
            </label>
            <textarea
              id="input"
              rows={7}
              placeholder="Paste text to encrypt or decrypt..."
              value={inputText}
              onChange={(event) => setInputText(event.target.value)}
              className="w-full resize-none rounded-md border border-slate-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="output" className="text-sm font-medium text-slate-700">
              Output
            </label>
            <textarea
              id="output"
              rows={7}
              readOnly
              value={outputText}
              className="w-full resize-none rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-base"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            className="rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            onClick={() => setMode('encrypt')}
          >
            Encrypt
          </button>
          <button
            type="button"
            className="rounded-md border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            onClick={() => setMode('decrypt')}
          >
            Decrypt
          </button>
        </div>
      </section>
    </main>
  );
}
