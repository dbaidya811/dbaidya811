import React from 'react';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface MeetingPageProps {
  onBackToHome: () => void;
  onOpenLicense?: () => void;
}

interface MeetingType {
  id: string;
  title: string;
  tag: string;
  duration: string;
  description: string;
  features: string[];
  recommended?: boolean;
  calLink?: string;
}

const MEETING_TYPES: MeetingType[] = [
  {
    id: 'intro',
    title: 'Quick 15-Min Intro & Scoping',
    tag: 'Fast Connect',
    duration: '15 Min',
    description:
      'Initial project alignment, high-level feasibility review, and technical role introduction.',
    features: [
      'High-level project requirements check',
      'Tech stack compatibility evaluation',
      'Timeline & communication expectations',
    ],
    calLink: 'deep-baidya-rl5xmz/15-min-intro-feasibility-call',
  },
  {
    id: 'discovery',
    title: '30-Min Architecture & Project Discovery',
    tag: 'Most Popular',
    duration: '30 Min',
    description:
      'Deep dive into tech stack, database schema, Next.js architecture, and MVP deliverables.',
    features: [
      'System design & component architecture',
      'Database schema & state management plan',
      'MVP milestone breakdown & quote estimation',
    ],
    recommended: true,
    calLink: 'deep-baidya-rl5xmz/30-min-strategy-scope-session',
  },
  {
    id: 'deepdive',
    title: '45-Min Technical Deep Dive & System Design',
    tag: 'Comprehensive',
    duration: '45 Min',
    description:
      'Comprehensive technical review, API design, scalability consultation, and quote estimation.',
    features: [
      'End-to-end full-stack technical review',
      'Scalability, security & caching strategy',
      'In-depth contract proposal & roadmap',
    ],
    calLink: 'deep-baidya-rl5xmz/45-min-technical-deep-dive',
  },
];

const CheckIcon: React.FC = () => (
  <svg
    className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-white"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

// Cal.com inline embed. Loads the embed script once and initialises the
// inline booking UI for the given calLink inside this component. Shows a
// loading state until Cal injects its iframe into the target div.
const CalEmbed: React.FC<{ calLink: string }> = ({ calLink }) => {
  const namespace = React.useMemo(
    () => calLink.split('/').pop() || calLink.replace(/[^a-zA-Z0-9_-]/g, '-'),
    [calLink]
  );
  const divId = `my-cal-inline-${namespace}`;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const C = window as any;
    // Load the Cal embed loader (idempotent — only injects the script once).
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal = C.Cal || function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement('script')).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () {
            p(api, arguments);
          };
          const ns = ar[1];
          api.q = api.q || [];
          if (typeof ns === 'string') {
            cal.ns[ns] = cal.ns[ns] || api;
            p(cal.ns[ns], ar);
            p(cal, ['initNamespace', ns]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');

    C.Cal('init', namespace, { origin: 'https://app.cal.com' });
    C.Cal.config = C.Cal.config || {};
    C.Cal.config.forwardQueryParams = true;

    C.Cal.ns[namespace]('inline', {
      elementOrSelector: `#${divId}`,
      config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
      calLink,
    });

    C.Cal.ns[namespace]('ui', { hideEventTypeDetails: false, layout: 'month_view' });

    // Watch the target div; once Cal injects its iframe, hide the loader.
    const target = containerRef.current;
    if (!target) return;
    const inner = target.querySelector(`#${divId}`) || target;
    if (inner.querySelector('iframe')) {
      setLoaded(true);
      return;
    }
    const observer = new MutationObserver(() => {
      if (inner.querySelector('iframe')) {
        setLoaded(true);
        observer.disconnect();
      }
    });
    observer.observe(inner, { childList: true, subtree: true });
    // Safety fallback: hide loader after 8s regardless.
    const fallback = window.setTimeout(() => setLoaded(true), 8000);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [calLink, namespace, divId]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Cal embed target div — must exist for Cal to inject into */}
      <div id={divId} className="w-full min-h-[600px] sm:min-h-[680px]" />

      {/* Loading overlay until the iframe appears */}
      {!loaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white dark:bg-[#09090b]">
          <div className="w-9 h-9 rounded-full border-2 border-slate-200 dark:border-zinc-700 border-t-blue-600 animate-spin" />
          <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-zinc-400">
            Loading calendar…
          </p>
        </div>
      )}
    </div>
  );
};

const MeetingCard: React.FC<{
  type: MeetingType;
  index: number;
  selected: boolean;
  onSelect: () => void;
  onConnect: () => void;
}> = ({ type, index, selected, onSelect, onConnect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`group relative w-full rounded-2xl border p-5 xs:p-6 sm:p-7 cursor-pointer select-none transition-colors duration-300 ${
        selected
          ? 'bg-blue-50/70 dark:bg-blue-950/20 border-blue-500/80 dark:border-blue-500/60 shadow-lg shadow-blue-500/10'
          : 'bg-white dark:bg-[#18181b] border-slate-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-800'
      }`}
    >
      {/* RECOMMENDED ribbon on the top edge */}
      {type.recommended && (
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center px-3 py-1 rounded-md bg-indigo-600 text-white text-[10px] xs:text-xs font-bold uppercase tracking-wider shadow-md">
          Recommended
        </span>
      )}

      <div className="flex items-start gap-3 xs:gap-4">
        {/* Selection circle */}
        <div
          className={`mt-0.5 shrink-0 w-5 h-5 xs:w-6 xs:h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            selected
              ? 'bg-blue-600 border-blue-600'
              : 'bg-transparent border-slate-300 dark:border-zinc-600 group-hover:border-blue-400'
          }`}
        >
          {selected && <CheckIcon />}
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-['Outfit'] text-slate-900 dark:text-white text-base xs:text-lg sm:text-xl font-bold tracking-tight">
              {type.title}
            </h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 text-[10px] xs:text-xs font-medium">
              {type.tag}
            </span>
          </div>

          <p className="mt-1.5 text-slate-600 dark:text-zinc-400 text-xs xs:text-sm leading-relaxed">
            {type.description}
          </p>

          <ul className="mt-3 space-y-1.5">
            {type.features.map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs xs:text-sm text-slate-700 dark:text-zinc-300"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onConnect();
            }}
            className={`mt-4 xs:mt-5 inline-flex items-center gap-2 px-4 xs:px-5 py-2 xs:py-2.5 rounded-full text-xs xs:text-sm font-semibold transition-all ${
              selected
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/30'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 hover:bg-slate-200 dark:hover:bg-zinc-700'
            }`}
          >
            {type.calLink ? 'Connect' : 'Coming soon'} for {type.duration}
            {type.calLink && <ArrowRight className="w-3.5 h-3.5 xs:w-4 xs:h-4" />}
          </button>
        </div>

        {/* Right: duration + Direct 1:1 */}
        <div className="shrink-0 text-right">
          <div className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm xs:text-base">
            {type.duration}
          </div>
          <div className="text-slate-400 dark:text-zinc-500 text-[10px] xs:text-xs mt-0.5">
            Direct 1:1
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const MeetingPage: React.FC<MeetingPageProps> = () => {
  const [selectedId, setSelectedId] = React.useState<string>('discovery');
  const [bookingType, setBookingType] = React.useState<MeetingType | null>(null);

  const handleConnect = (type: MeetingType) => {
    setSelectedId(type.id);
    if (type.calLink) {
      setBookingType(type);
    }
  };

  // When a session is being booked, show its Cal.com inline embed.
  if (bookingType) {
    return (
      <div className="min-h-screen w-full bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 relative overflow-x-hidden font-sans p-[5px] transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 xs:py-8 sm:py-10">
          {/* Booking header */}
          <div className="mb-4 xs:mb-6">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <CalendarCheck className="w-4 h-4 xs:w-5 xs:h-5" />
              <span className="font-mono text-xs xs:text-sm font-semibold uppercase tracking-wider">
                {bookingType.duration} · Direct 1:1
              </span>
            </div>
            <h1 className="mt-1 font-['Outfit'] text-xl xs:text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              {bookingType.title}
            </h1>
          </div>

          {/* Cal.com inline embed */}
          <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden">
            <CalEmbed key={bookingType.id} calLink={bookingType.calLink as string} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 relative overflow-x-hidden font-sans p-[5px] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 xs:py-8 sm:py-10">
        {/* 3 selectable meeting option cards */}
        <div className="space-y-5 xs:space-y-6 sm:space-y-8">
          {MEETING_TYPES.map((type, i) => (
            <MeetingCard
              key={type.id}
              type={type}
              index={i}
              selected={selectedId === type.id}
              onSelect={() => setSelectedId(type.id)}
              onConnect={() => handleConnect(type)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
