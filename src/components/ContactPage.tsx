import React, { useState, useEffect } from 'react';
import {
  Mail,
  Copy,
  Check,
  Send,
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  ArrowUpRight,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactPageProps {
  onBackToHome: () => void;
  onNavigateSection?: (sectionId: string) => void;
  onNavigateMeeting?: () => void;
  onOpenLicense?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onBackToHome,
  onNavigateSection,
  onNavigateMeeting,
  onOpenLicense,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: 'Full-Stack Web App',
    budget: '₹75,000 – ₹2,00,000 (INR)',
    timeline: 'Within 1 Month',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');

  // Live Local Time calculation for Deep's timezone (India / UTC+5:30)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        setCurrentTime(timeStr);
      } catch {
        setCurrentTime(new Date().toLocaleTimeString());
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const services = [
    'Full-Stack Web App',
    'Next.js & React Frontend',
    'Backend & REST/GraphQL API',
    'System Architecture',
    'Full-Time Engineering Role',
  ];

  const budgets = [
    '₹25,000 – ₹75,000 (INR)',
    '₹75,000 – ₹2,00,000 (INR)',
    '₹2,00,000 – ₹5,00,000 (INR)',
    '₹5,00,000+ (INR)',
    'Full-Time Role',
    'Flexible',
  ];
  const timelines = ['Urgent (< 2 weeks)', 'Within 1 Month', '1–3 Months', 'Flexible'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim()) {
      setErrorMessage('Please enter your name.');
      setFormStatus('error');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      setFormStatus('error');
      return;
    }
    if (!formState.message.trim() || formState.message.trim().length < 10) {
      setErrorMessage('Please include a brief message (minimum 10 characters).');
      setFormStatus('error');
      return;
    }

    setFormStatus('sending');
    setErrorMessage('');

    // Simulate fast dispatch
    setTimeout(() => {
      setFormStatus('success');
    }, 900);
  };

  const handleResetForm = () => {
    setFormState({
      name: '',
      email: '',
      service: 'Full-Stack Web App',
      budget: '₹75,000 – ₹2,00,000 (INR)',
      timeline: 'Within 1 Month',
      message: '',
    });
    setFormStatus('idle');
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* ========================================================================= */}
        {/* TOP BREADCRUMB / BACK TO HOME BUTTON                                     */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between gap-3 mb-8 sm:mb-12">
          <motion.button
            type="button"
            onClick={onBackToHome}
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Portfolio</span>
          </motion.button>

          {onNavigateMeeting && (
            <button
              type="button"
              onClick={onNavigateMeeting}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Meeting Page</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* ========================================================================= */}
        {/* PAGE HEADER                                                              */}
        {/* ========================================================================= */}
        <div className="mb-10 sm:mb-14">
          <h1 className="font-['Outfit'] text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
            Let&apos;s build something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400">
              extraordinary
            </span>
          </h1>
          <p className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base lg:text-lg text-zinc-600 dark:text-zinc-400 font-['Plus_Jakarta_Sans'] leading-relaxed">
            Have a project in mind, an engineering role, or need architectural consultation?
            Send a direct inquiry below or reach out via email. I typically respond within 24 hours.
          </p>

          {/* Timezone & Location Bar */}
          <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              <span>Kolkata, India · Remote Globally</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span>Local Time: <strong className="text-zinc-800 dark:text-zinc-200">{currentTime || '03:30 PM'}</strong> (IST, UTC+5:30)</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN 2-COLUMN SECTION                                                     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ===================================================================== */}
          {/* LEFT COLUMN: INTERACTIVE INQUIRY FORM (7 COLS)                        */}
          {/* ===================================================================== */}
          <div className="lg:col-span-7 bg-zinc-50/70 dark:bg-zinc-900/60 rounded-3xl p-6 sm:p-8 lg:p-10 border border-zinc-200/80 dark:border-zinc-800/80 shadow-lg shadow-zinc-950/5 relative overflow-hidden backdrop-blur-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-['Outfit'] text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                  Send a Message
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Direct message delivered straight to Deep&apos;s personal inbox.
                </p>
              </div>
              <div className="w-9 h-9 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200/50 dark:border-blue-800/50">
                <MessageSquare className="w-4.5 h-4.5" />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <motion.div
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-10 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-['Outfit'] text-2xl font-bold text-zinc-900 dark:text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
                    Thank you, <strong className="text-zinc-900 dark:text-white">{formState.name}</strong>.
                    Your inquiry has been received. I will review it and reply to{' '}
                    <span className="font-mono text-blue-600 dark:text-blue-400">{formState.email}</span> within 24 hours.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3 justify-center">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-5 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                    >
                      Send Another Message
                    </button>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}?subject=Direct%20Inquiry%20from%20${encodeURIComponent(formState.name)}`}
                      className="px-5 py-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-xs sm:text-sm hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Open in Mail App</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              ) : (
                <form key="form-inputs" onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Your Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Service Needed Selector */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Inquiry Type / Service
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {services.map((srv) => {
                        const isSelected = formState.service === srv;
                        return (
                          <button
                            type="button"
                            key={srv}
                            onClick={() => setFormState({ ...formState, service: srv })}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
                            }`}
                          >
                            {srv}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget & Timeline Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Estimated Budget (INR / ₹)
                      </label>
                      <select
                        value={formState.budget}
                        onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                      >
                        {budgets.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Target Timeline
                      </label>
                      <select
                        value={formState.timeline}
                        onChange={(e) => setFormState({ ...formState, timeline: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                      >
                        {timelines.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        Project Details / Message <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[11px] text-zinc-400 font-mono">
                        {formState.message.length} chars
                      </span>
                    </div>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell me about your product goals, timeline, existing stack, or engineering requirements..."
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-y"
                    />
                  </div>

                  {/* Submit Button & Direct Mail Link */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-blue-600/20 active:scale-98 cursor-pointer disabled:opacity-60"
                    >
                      {formStatus === 'sending' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Inquiry</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`mailto:${PERSONAL_INFO.email}?subject=Project%20Inquiry%20via%20Portfolio&body=Hi%20Deep,%0D%0A%0D%0AI'd%20like%20to%20discuss...`}
                      className="text-xs text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-1 transition-colors self-start sm:self-center"
                    >
                      <span>Prefer your default mail app? Click here</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>

          {/* ===================================================================== */}
          {/* RIGHT COLUMN: DIRECT CHANNELS, FAST CALENDAR & SOCIALS (5 COLS)       */}
          {/* ===================================================================== */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Email Card */}
            <div className="p-6 rounded-3xl bg-zinc-50/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-md shadow-zinc-950/5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold block mb-2">
                Primary Inbox
              </span>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="min-w-0">
                  <div className="font-mono text-sm sm:text-base font-semibold text-zinc-900 dark:text-white truncate">
                    {PERSONAL_INFO.email}
                  </div>
                  <div className="text-xs text-zinc-500 mt-0.5">
                    Checked daily · 100% response rate
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-zinc-200/80 hover:bg-zinc-300/80 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=Hello%20Deep!`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open Mail</span>
                </a>
              </div>
            </div>

            {/* Book a Strategy Meeting Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900/10 via-blue-900/10 to-transparent dark:from-indigo-950/40 dark:via-blue-950/20 dark:to-transparent border border-indigo-200/60 dark:border-indigo-800/60 shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Discovery Meeting</span>
                  </span>
                  <h3 className="font-['Outfit'] text-lg font-bold text-zinc-900 dark:text-white">
                    Book a 15–30 Min Strategy Call
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                    Need to scope an MVP, discuss technical architecture, or explore a contract role? Let&apos;s talk live.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-indigo-200/40 dark:border-indigo-800/40 flex items-center justify-between">
                <div className="text-[11px] font-mono text-zinc-500">
                  Google Meet / Zoom
                </div>
                {onNavigateMeeting ? (
                  <button
                    type="button"
                    onClick={onNavigateMeeting}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>Open Calendar & Slots</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <a
                    href={`mailto:${PERSONAL_INFO.email}?subject=Schedule%20a%20Meeting%20with%20Deep%20Baidya&body=Hi%20Deep,%0D%0A%0D%0AI'd%20love%20to%20schedule%20a%2015-30%20minute%20meeting%20with%20you.%0D%0A%0D%0ATopic:%0D%0APreferred%20Dates%20/%20Times:`}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Request Meeting</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>


      </div>
    </div>
  );
};
