"use client";

import { useMemo, useState } from "react";
import { caesarTransform, normalizeShift } from "../lib/caesar";

export default function Page() {
  const [mode, setMode] = useState("encrypt");
  const [shift, setShift] = useState(3);
  const [text, setText] = useState("Meet me at the old bridge at 9.");
  const [preserveCase, setPreserveCase] = useState(true);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    return caesarTransform(text, shift, mode, preserveCase);
  }, [text, shift, mode, preserveCase]);

  const normalizedShift = normalizeShift(shift);

  async function handleCopy() {
    if (!navigator?.clipboard) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate via-[#0c1428] to-ink px-5 py-10 text-fog">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-lime">
            Caesar Cipher Lab
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Encrypt and decrypt in seconds. No setup, no noise.
            </h1>
            <p className="max-w-2xl text-sm text-fog/80 md:text-base">
              Tune the shift, paste any text, and copy the result. Built for
              quick use wherever you deploy it.
            </p>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 rounded-full bg-black/40 p-1 text-xs">
                {[
                  { id: "encrypt", label: "Encrypt" },
                  { id: "decrypt", label: "Decrypt" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setMode(item.id)}
                    className={`rounded-full px-4 py-2 transition ${
                      mode === item.id
                        ? "bg-lime text-ink"
                        : "text-fog/70 hover:text-fog"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 text-xs text-fog/70">
                <input
                  type="checkbox"
                  checked={preserveCase}
                  onChange={(event) => setPreserveCase(event.target.checked)}
                  className="h-4 w-4 rounded border-white/30 bg-transparent text-lime focus:ring-lime"
                />
                Preserve case
              </label>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="grid gap-2">
                <label className="text-xs uppercase tracking-[0.3em] text-fog/60">
                  Input
                </label>
                <textarea
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  rows={7}
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-fog outline-none transition focus:border-lime/60"
                  placeholder="Enter message to transform"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-xs uppercase tracking-[0.3em] text-fog/60">
                  Output
                </label>
                <div className="relative">
                  <textarea
                    readOnly
                    value={output}
                    rows={7}
                    className="w-full resize-none rounded-2xl border border-white/10 bg-black/60 p-4 text-sm text-lime/90 outline-none"
                  />
                  <button
                    onClick={handleCopy}
                    className="absolute right-3 top-3 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-fog/70 transition hover:border-lime/60 hover:text-white"
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <aside className="flex h-full flex-col gap-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-fog/60">
                    Shift
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold text-white">
                    {normalizedShift}
                  </h2>
                </div>
                <input
                  type="number"
                  min={0}
                  max={25}
                  value={shift}
                  onChange={(event) => setShift(Number(event.target.value))}
                  className="w-20 rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-center text-sm text-fog outline-none focus:border-lime/60"
                />
              </div>
              <input
                type="range"
                min={0}
                max={25}
                value={shift}
                onChange={(event) => setShift(Number(event.target.value))}
                className="mt-6 w-full accent-lime"
              />
              <p className="mt-4 text-sm text-fog/70">
                Shift wraps around the alphabet. Only letters change; everything
                else stays as-is.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <h3 className="text-lg font-semibold text-white">Quick tips</h3>
              <ul className="mt-3 space-y-2 text-sm text-fog/70">
                <li>Use small shifts for easy demo messages.</li>
                <li>Keep the case toggle on to preserve readability.</li>
                <li>Copy the output and share it anywhere.</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
