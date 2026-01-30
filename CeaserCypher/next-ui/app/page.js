'use client';

import { useState, useMemo } from 'react';
import { encrypt, decrypt } from '../lib/caesar';

export default function CaesarCipherApp() {
  const [inputText, setInputText] = useState('');
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState('encrypt');
  const [copied, setCopied] = useState(false);

  const outputText = useMemo(() => {
    if (!inputText.trim()) return '';
    return mode === 'encrypt' ? encrypt(inputText, shift) : decrypt(inputText, shift);
  }, [inputText, shift, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-40 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 tracking-tight">
              Caesar Cipher
            </h1>
            <p className="text-xl text-slate-300 mb-2">
              Encrypt and decrypt messages instantly
            </p>
            <p className="text-sm text-slate-500">
              A classical substitution cipher technique
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
            <div className="flex gap-2 p-6 border-b border-slate-700/50 bg-slate-800/30">
              <button
                onClick={() => setMode('encrypt')}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  mode === 'encrypt'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-slate-700/40 text-slate-300 hover:bg-slate-700/60'
                }`}
              >
                🔒 Encrypt
              </button>
              <button
                onClick={() => setMode('decrypt')}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  mode === 'decrypt'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-slate-700/40 text-slate-300 hover:bg-slate-700/60'
                }`}
              >
                🔓 Decrypt
              </button>
            </div>

            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
                  Input Text
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter your message here..."
                  className="flex-1 w-full p-4 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                  rows={6}
                />
                <button
                  onClick={handleClear}
                  className="mt-3 w-full py-2 px-4 rounded-lg bg-slate-700/40 text-slate-300 hover:bg-slate-700/60 transition-colors font-medium text-sm"
                >
                  Clear
                </button>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
                  Output Text
                </label>
                <div className="flex-1 p-4 bg-slate-900/50 border border-slate-600/50 rounded-lg text-slate-300 font-mono text-sm overflow-y-auto">
                  {outputText || (
                    <span className="text-slate-500">
                      {inputText ? 'Processing...' : 'Enter text to see result'}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleCopy}
                  disabled={!outputText}
                  className={`mt-3 w-full py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${
                    copied
                      ? 'bg-green-600 text-white'
                      : outputText
                      ? 'bg-blue-600/30 text-blue-300 hover:bg-blue-600/50 border border-blue-500/50'
                      : 'bg-slate-700/20 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {copied ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
            </div>

            <div className="px-6 sm:px-8 py-8 border-t border-slate-700/50 bg-slate-800/20">
              <label className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide flex items-center gap-2">
                <span>🔑 Shift Value</span>
                <span className="ml-auto text-lg font-bold text-blue-400">{shift}</span>
              </label>
              
              <div className="flex gap-4 items-center">
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={shift}
                  onChange={(e) => setShift(Number(e.target.value))}
                  className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    max="25"
                    value={shift}
                    onChange={(e) => {
                      const val = Math.max(0, Math.min(25, Number(e.target.value)));
                      setShift(val);
                    }}
                    className="w-20 px-3 py-2 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-center font-mono"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-13 gap-1 text-xs">
                {Array.from({ length: 26 }, (_, i) => (
                  <div
                    key={i}
                    className={`py-2 px-1 rounded text-center font-mono font-bold transition-all ${
                      i < shift
                        ? 'bg-blue-600/40 text-blue-300'
                        : i === shift
                        ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                        : 'bg-slate-700/40 text-slate-500'
                    }`}
                  >
                    {i}
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 sm:px-8 py-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-t border-slate-700/50">
              <div className="flex gap-3">
                <span className="text-xl">💡</span>
                <div>
                  <p className="text-sm font-semibold text-slate-300 mb-1">
                    How it works
                  </p>
                  <p className="text-xs text-slate-400">
                    The Caesar cipher shifts each letter by the selected amount. Shift 1 means A→B, B→C, etc. Use the same shift value to decrypt what you encrypted.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 text-slate-500 text-sm">
            <p>Built with Next.js • Cryptography 101</p>
          </div>
        </div>
      </div>
    </div>
  );
}