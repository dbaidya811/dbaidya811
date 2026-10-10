import React, { useState } from 'react';
import { X, ShieldCheck, Copy, Check, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface LicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MIT_LICENSE_TEXT = `MIT License

Copyright (c) 2025 Deep Baidya

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

export const LicenseModal: React.FC<LicenseModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(MIT_LICENSE_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 overflow-hidden z-10 my-8"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold tracking-wide uppercase">
                  Verified Open Source
                </div>
                <h2 className="font-['Outfit'] text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                  Software License — MIT
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-5 leading-relaxed">
              This portfolio codebase and associated project components are licensed under the standard{' '}
              <strong className="text-zinc-900 dark:text-white">MIT License</strong>. You are free to explore, learn from, and adapt the code for personal or commercial endeavors with attribution.
            </p>

            {/* Key Permissions Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5 text-xs">
              <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
                <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Permissions</span>
                </div>
                <ul className="text-[11px] text-zinc-600 dark:text-zinc-400 space-y-0.5 font-sans">
                  <li>• Commercial use</li>
                  <li>• Modification</li>
                  <li>• Distribution</li>
                  <li>• Private use</li>
                </ul>
              </div>

              <div className="p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40">
                <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 font-bold mb-1">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Conditions</span>
                </div>
                <ul className="text-[11px] text-zinc-600 dark:text-zinc-400 space-y-0.5 font-sans">
                  <li>• License & copyright notice inclusion</li>
                </ul>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
                <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold mb-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Limitations</span>
                </div>
                <ul className="text-[11px] text-zinc-600 dark:text-zinc-400 space-y-0.5 font-sans">
                  <li>• No liability</li>
                  <li>• No warranty</li>
                </ul>
              </div>
            </div>

            {/* Raw License Text Box */}
            <div className="relative rounded-2xl bg-zinc-950 text-zinc-300 p-4 border border-zinc-800 text-xs font-mono max-h-52 overflow-y-auto scrollbar-thin">
              <pre className="whitespace-pre-wrap leading-relaxed select-all font-mono text-[11px]">
                {MIT_LICENSE_TEXT}
              </pre>
            </div>

            {/* Actions Bar */}
            <div className="mt-5 flex items-center justify-between gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <span className="text-[11px] font-mono text-zinc-500">
                Author: {PERSONAL_INFO.name}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy License</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-950 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
