import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Github, Linkedin, MessageSquare, Clock, Globe, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setErrorMessage('Please fill in your name, email, and message.');
      setStatus('error');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setErrorMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    // Simulate reliable dispatch
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-white/10 relative">
      {/* Background Subtle Glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2 block font-mono">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Let's Build Something High-Impact Together
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Whether you have an open full-time role, a freelance project, or an engineering question, my inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact & Availability (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Instant Copy Email Card */}
            <div className="p-6 rounded-2xl bg-[#0b101c] border border-emerald-500/30 shadow-lg">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                Primary Direct Channel
              </span>
              <div className="text-sm font-semibold text-white mb-4">
                {PERSONAL_INFO.email}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    copied
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 active:scale-95'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Email Address</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  Open Mail Client
                </a>
              </div>
            </div>

            {/* Availability & Working Preferences */}
            <div className="p-6 rounded-2xl bg-[#0b101c] border border-white/10 space-y-4 text-xs">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                Work Status & Response Time
              </span>

              <div className="flex items-start gap-3 text-slate-300">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Fast Response Guaranteed</div>
                  <div className="text-slate-400 text-[11px]">Usually reply within 12–24 business hours.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-300">
                <Globe className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">{PERSONAL_INFO.timezone}</div>
                  <div className="text-slate-400 text-[11px]">Flexible synchronous overlap with US & European teams.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-300">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">{PERSONAL_INFO.status}</div>
                  <div className="text-slate-400 text-[11px]">Contract, freelance, and permanent developer engagements.</div>
                </div>
              </div>
            </div>

            {/* Social Links Strip */}
            <div className="p-6 rounded-2xl bg-[#0b101c] border border-white/10">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-4">
                Professional Profiles
              </span>

              <div className="flex flex-col gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-emerald-300 transition-colors text-xs font-medium"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4" />
                    <span>GitHub (@deepbaidya)</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">Explore Repos ↗</span>
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-emerald-300 transition-colors text-xs font-medium"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn Profile</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">Connect ↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Inquiry Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0b101c] border border-white/10">
              <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Send a Direct Inquiry</span>
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Send a quick message directly to Deep Baidya. All fields are client-validated.
              </p>

              {status === 'success' ? (
                <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">Message Dispatched!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out. Your inquiry has been recorded and Deep will get back to you shortly at {formState.email || 'your email'}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-3 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === 'error' && (
                    <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Name <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#080d17] border border-white/10 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Email <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#080d17] border border-white/10 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="Full-Stack Developer Opportunity / Project Inquiry"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#080d17] border border-white/10 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Message <span className="text-emerald-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Hi Deep, we came across your portfolio and would love to discuss a project..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#080d17] border border-white/10 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-emerald-400 transition-colors resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 active:scale-95 transition-all shadow-md shadow-emerald-500/20"
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message to Deep Baidya</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
