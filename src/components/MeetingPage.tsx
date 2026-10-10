import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  Check,
  CheckCircle2,
  ArrowLeft,
  Globe,
  User,
  Mail,
  Building,
  MessageSquare,
  Download,
  Sparkles,
  ExternalLink,
  ChevronRight,
  PhoneCall,
  Laptop,
  AlertTriangle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { LicenseModal } from './LicenseModal';

interface MeetingPageProps {
  onBackToHome: () => void;
  onNavigateContact?: () => void;
  onOpenLicense?: () => void;
}

interface MeetingType {
  id: string;
  title: string;
  duration: string;
  badge?: string;
  description: string;
  idealFor: string;
}

const MEETING_TYPES: MeetingType[] = [
  {
    id: 'intro',
    title: '15-Min Intro & Feasibility Call',
    duration: '15 Mins',
    badge: 'Quick Chat',
    description: 'Fast discovery call to discuss high-level project feasibility, developer availability, or general tech queries.',
    idealFor: 'Initial introductions, quick sanity check, hiring screening',
  },
  {
    id: 'discovery',
    title: '30-Min Strategy & Scope Session',
    duration: '30 Mins',
    badge: 'Most Popular',
    description: 'Deep dive into your project requirements, proposed architecture (React, Node, Cloud), milestones, and budget expectations.',
    idealFor: 'MVP scoping, full-stack roadmap, contracting offers',
  },
  {
    id: 'deepdive',
    title: '45-Min Technical Deep Dive',
    duration: '45 Mins',
    badge: 'In-Depth',
    description: 'Comprehensive technical review, system architecture breakdown, code walkthrough, or senior technical interview.',
    idealFor: 'System design review, complex architectures, team interviews',
  },
];

const TIMEZONES = [
  { label: 'India Standard Time (IST) - UTC+5:30', value: 'Asia/Kolkata', tzShort: 'IST' },
  { label: 'US Eastern Time (EDT/EST) - UTC-4/5', value: 'America/New_York', tzShort: 'EST' },
  { label: 'US Pacific Time (PDT/PST) - UTC-7/8', value: 'America/Los_Angeles', tzShort: 'PST' },
  { label: 'Greenwich Mean / UK (GMT/BST) - UTC+0/1', value: 'Europe/London', tzShort: 'GMT' },
  { label: 'Central European Time (CET/CEST) - UTC+1/2', value: 'Europe/Berlin', tzShort: 'CET' },
  { label: 'Singapore & HK (SGT/HKT) - UTC+8:00', value: 'Asia/Singapore', tzShort: 'SGT' },
  { label: 'Australian Eastern (AEST) - UTC+10:00', value: 'Australia/Sydney', tzShort: 'AEST' },
  { label: 'Coordinated Universal Time (UTC)', value: 'UTC', tzShort: 'UTC' },
];

const TIME_SLOTS = [
  '10:00 AM',
  '11:00 AM',
  '11:45 AM',
  '02:00 PM',
  '03:00 PM',
  '04:15 PM',
  '05:30 PM',
  '07:00 PM',
  '08:30 PM',
  '09:30 PM',
];

const formatLocalDate = (d: Date): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const MeetingPage: React.FC<MeetingPageProps> = ({
  onBackToHome,
  onNavigateContact,
  onOpenLicense,
}) => {
  // Local License Modal state
  const [isLicenseOpen, setIsLicenseOpen] = useState<boolean>(false);

  // 1. Meeting Type Selection
  const [selectedType, setSelectedType] = useState<MeetingType>(MEETING_TYPES[1]); // 30-min default

  // Current Date string (YYYY-MM-DD), Tomorrow Date string, and Max Date string (strictly up to 14 days ahead)
  const todayStr = useMemo(() => formatLocalDate(new Date()), []);
  const tomorrowStr = useMemo(() => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return formatLocalDate(t);
  }, []);
  const maxDateStr = useMemo(() => {
    const max = new Date();
    max.setDate(max.getDate() + 14); // Strictly up to 14 days maximum
    return formatLocalDate(max);
  }, []);

  // 2. Generate Next 14 Available Days dynamically starting strictly from TOMORROW (Window: Day 1 to Day 14)
  // CURRENT DATE CANNOT BE BOOKED & DATES BEYOND 14 DAYS CANNOT BE BOOKED
  const availableDates = useMemo(() => {
    const dates: { dateStr: string; dayName: string; monthName: string; dayNumber: number; isWeekend: boolean }[] = [];
    const base = new Date();

    // STRICT: Start from tomorrow (offset = 1) up to maximum 14 days ahead (offset = 14)
    for (let offset = 1; offset <= 14; offset++) {
      const d = new Date();
      d.setDate(base.getDate() + offset);

      const dayOfWeek = d.getDay(); // 0 is Sunday, 6 is Saturday
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      const dayNumber = d.getDate();
      const dateStr = formatLocalDate(d);

      dates.push({ dateStr, dayName, monthName, dayNumber, isWeekend });
    }
    return dates;
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0]?.dateStr || tomorrowStr);
  const [selectedTime, setSelectedTime] = useState<string>('03:00 PM');
  const [selectedTimezone, setSelectedTimezone] = useState<string>('Asia/Kolkata');

  // 3. Attendee Details
  const [attendeeName, setAttendeeName] = useState<string>('');
  const [attendeeEmail, setAttendeeEmail] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [platform, setPlatform] = useState<'Google Meet' | 'Zoom' | 'Phone Call'>('Google Meet');
  const [meetingTopic, setMeetingTopic] = useState<string>('');
  const [budgetSlab, setBudgetSlab] = useState<string>('₹75,000 – ₹2,00,000 (INR)');

  // 4. Booking Flow Status
  const [status, setStatus] = useState<'idle' | 'booking' | 'confirmed'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Date selection with strict anti-current-date guard and 14-day limit guard
  const handleSelectDate = (dateVal: string) => {
    if (dateVal <= todayStr) {
      setErrorMessage('Same-day bookings are not permitted. Please schedule your meeting at least 1 day in advance (starting from tomorrow).');
      return;
    }
    if (dateVal > maxDateStr) {
      setErrorMessage(`Bookings cannot be scheduled more than 14 days in advance. Please select a date within the next 14 days (up to ${maxDateStr}).`);
      return;
    }
    setErrorMessage('');
    setSelectedDate(dateVal);
  };

  // Auto-scroll to top when page opens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Form Validation and Booking Simulation
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendeeName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(attendeeEmail.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!selectedDate || selectedDate <= todayStr) {
      setErrorMessage('Same-day and past bookings are not permitted. Please schedule your meeting at least 1 day in advance (starting from tomorrow).');
      return;
    }
    if (selectedDate > maxDateStr) {
      setErrorMessage(`Bookings cannot be scheduled more than 14 days in advance. Please select a date within the next 14 days (up to ${maxDateStr}).`);
      return;
    }
    if (!selectedTime) {
      setErrorMessage('Please select a time slot.');
      return;
    }

    setErrorMessage('');
    setStatus('booking');

    setTimeout(() => {
      setStatus('confirmed');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 900);
  };

  // Google Calendar URL Generator
  const googleCalendarUrl = useMemo(() => {
    const title = encodeURIComponent(`${selectedType.title} with Deep Baidya`);
    const details = encodeURIComponent(
      `Meeting with Deep Baidya (Full-Stack Engineer)\n` +
      `Format: ${platform} (Link: https://meet.google.com/deep-baidya-call)\n` +
      `Topic: ${meetingTopic || 'Project Discovery & Architecture'}\n` +
      `Budget: ${budgetSlab}\n` +
      `Attendee: ${attendeeName} (${attendeeEmail})`
    );
    const location = encodeURIComponent(platform === 'Google Meet' ? 'https://meet.google.com/deep-baidya-call' : platform);

    // Format ISO dates if possible
    const dateFormatted = selectedDate.replace(/-/g, '');
    const dates = `${dateFormatted}T100000Z/${dateFormatted}T103000Z`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  }, [selectedType, platform, meetingTopic, budgetSlab, attendeeName, attendeeEmail, selectedDate]);

  // ICS File Download Generator
  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Deep Baidya//Portfolio Meeting Scheduler//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${selectedType.title} - Deep Baidya`,
      `DESCRIPTION:Meeting between Deep Baidya and ${attendeeName}.\\nAgenda: ${meetingTopic || 'Discovery Meeting'}\\nPlatform: ${platform}`,
      `LOCATION:${platform === 'Google Meet' ? 'https://meet.google.com/deep-baidya-call' : platform}`,
      `STATUS:CONFIRMED`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Meeting-Deep-Baidya-${selectedDate}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setStatus('idle');
    setAttendeeName('');
    setAttendeeEmail('');
    setCompanyName('');
    setMeetingTopic('');
    setErrorMessage('');
  };

  const selectedDateObj = availableDates.find((d) => d.dateStr === selectedDate);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* ========================================================================= */}
        {/* TOP BAR / BREADCRUMB NAVIGATION                                           */}
        {/* ========================================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-5 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm font-medium transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Calendar Open · Instant Confirmation</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CONFIRMED SUCCESS VIEW                                                    */}
        {/* ========================================================================= */}
        <AnimatePresence mode="wait">
          {status === 'confirmed' ? (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="max-w-2xl mx-auto my-6 p-8 sm:p-10 rounded-3xl bg-zinc-50/80 dark:bg-zinc-900/80 border border-emerald-500/30 dark:border-emerald-500/20 shadow-2xl text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold block mb-1">
                Booking Confirmed
              </span>
              <h2 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                You&apos;re Scheduled with Deep Baidya!
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 max-w-md mx-auto leading-relaxed">
                A calendar invitation has been prepared for <strong className="text-zinc-900 dark:text-white">{attendeeEmail}</strong>.
              </p>

              {/* Summary Details Card */}
              <div className="my-6 p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-left space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80 text-xs sm:text-sm">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    Session Type
                  </span>
                  <span className="font-bold text-zinc-900 dark:text-white">{selectedType.title}</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80 text-xs sm:text-sm">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-indigo-500" />
                    Date & Time
                  </span>
                  <span className="font-bold text-zinc-900 dark:text-white">
                    {selectedDateObj?.dayName}, {selectedDateObj?.dayNumber} {selectedDateObj?.monthName} @ {selectedTime}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80 text-xs sm:text-sm">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-emerald-500" />
                    Timezone
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-white">{selectedTimezone}</span>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-blue-500" />
                    Meeting Platform
                  </span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{platform}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span>Add to Google Calendar</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <button
                  type="button"
                  onClick={handleDownloadICS}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .ICS File</span>
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-4 text-xs">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer underline"
                >
                  Book another slot
                </button>
                <span className="text-zinc-300 dark:text-zinc-700">·</span>
                <button
                  type="button"
                  onClick={onBackToHome}
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
                >
                  Return to Portfolio
                </button>
              </div>
            </motion.div>
          ) : (
            /* ===================================================================== */
            /* BOOKING SCHEDULER VIEW (2-COLUMN LAYOUT)                             */
            /* ===================================================================== */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* =================================================================== */}
              {/* LEFT COLUMN: INTERACTIVE CALENDAR & TIME SLOTS (7 COLS)             */}
              {/* =================================================================== */}
              <div className="lg:col-span-7 space-y-6">
                {/* Header */}
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold block mb-1">
                    Direct Calendar Booking
                  </span>
                  <h1 className="font-['Outfit'] text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                    Schedule a Meeting with Deep Baidya
                  </h1>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                    Pick a duration, choose a date and time slot that suits your schedule. You will receive an instant Google Meet link and calendar invitation.
                  </p>
                </div>

                {/* Step 1: Select Meeting Format */}
                <div className="p-5 rounded-3xl bg-zinc-50/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80">
                  <div className="flex items-center gap-2 mb-3.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
                      1
                    </span>
                    <h3 className="font-['Outfit'] text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                      Select Meeting Duration
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {MEETING_TYPES.map((type) => {
                      const isSelected = selectedType.id === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setSelectedType(type)}
                          className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                            isSelected
                              ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 ring-1 ring-blue-500/30'
                              : 'bg-white dark:bg-zinc-950 border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700'
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white">
                                {type.title}
                              </span>
                              {type.badge && (
                                <span
                                  className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold ${
                                    isSelected
                                      ? 'bg-blue-600 text-white'
                                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                                  }`}
                                >
                                  {type.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                              {type.description}
                            </p>
                          </div>

                          <div className="shrink-0 flex items-center gap-1 text-xs font-mono font-semibold text-zinc-600 dark:text-zinc-300 mt-0.5">
                            <Clock className="w-3.5 h-3.5 text-blue-500" />
                            <span>{type.duration}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Date Selector */}
                <div className="p-5 rounded-3xl bg-zinc-50/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
                        2
                      </span>
                      <h3 className="font-['Outfit'] text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                        Choose a Date
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      Next 14 Days Only
                    </span>
                  </div>

                  {/* Anti-Current Date & 14-Day Limit Restriction Notice */}
                  <div className="mb-3.5 flex items-start gap-2.5 px-3 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-800 dark:text-amber-300 text-xs leading-relaxed">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div>
                      <span className="font-bold">Strict 14-Day Advance Window:</span>{' '}
                      Same-day bookings are disabled. Meetings can only be booked from tomorrow up to 14 days maximum (available from <span className="font-mono font-semibold">{tomorrowStr}</span> to <span className="font-mono font-semibold">{maxDateStr}</span>).
                    </div>
                  </div>

                  {/* Horizontal Scrollable Date Carousel */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                    {/* Visual Disabled Today Pill */}
                    <div
                      className="flex-none w-[68px] sm:w-[74px] p-2.5 rounded-2xl border border-dashed text-center flex flex-col items-center gap-0.5 opacity-45 bg-zinc-100 dark:bg-zinc-900/80 border-zinc-300 dark:border-zinc-700 cursor-not-allowed select-none"
                      title="Current date booking is strictly disabled"
                    >
                      <span className="text-[10px] font-mono uppercase font-bold text-rose-500 dark:text-rose-400">
                        Today
                      </span>
                      <span className="text-lg font-['Outfit'] font-black leading-none my-0.5 line-through text-zinc-400 dark:text-zinc-600">
                        {new Date().getDate()}
                      </span>
                      <span className="text-[9px] font-mono font-bold uppercase text-zinc-500 dark:text-zinc-400">
                        Blocked
                      </span>
                    </div>

                    {availableDates.map((item) => {
                      const isSelected = selectedDate === item.dateStr;
                      return (
                        <button
                          key={item.dateStr}
                          type="button"
                          onClick={() => handleSelectDate(item.dateStr)}
                          className={`flex-none w-[68px] sm:w-[74px] p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                            isSelected
                              ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20 scale-103'
                              : 'bg-white dark:bg-zinc-950 border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-800 dark:text-zinc-200'
                          }`}
                        >
                          <span
                            className={`text-[11px] font-mono uppercase font-semibold ${
                              isSelected ? 'text-blue-100' : 'text-zinc-500'
                            }`}
                          >
                            {item.dayName}
                          </span>
                          <span className="text-lg font-['Outfit'] font-black leading-none my-0.5">
                            {item.dayNumber}
                          </span>
                          <span
                            className={`text-[10px] font-mono ${
                              isSelected ? 'text-blue-200' : 'text-zinc-400'
                            }`}
                          >
                            {item.monthName}
                          </span>
                        </button>
                      );
                    })}

                    {/* Visual Day 15+ Beyond Limit Pill */}
                    <div
                      className="flex-none w-[68px] sm:w-[74px] p-2.5 rounded-2xl border border-dashed text-center flex flex-col items-center justify-center gap-0.5 opacity-40 bg-zinc-100 dark:bg-zinc-900/80 border-zinc-300 dark:border-zinc-700 cursor-not-allowed select-none"
                      title="Bookings beyond 14 days are strictly locked"
                    >
                      <span className="text-[10px] font-mono uppercase font-bold text-zinc-500 dark:text-zinc-400">
                        Day 15+
                      </span>
                      <span className="text-sm font-['Outfit'] font-bold leading-none my-0.5 text-zinc-400 dark:text-zinc-600">
                        —
                      </span>
                      <span className="text-[9px] font-mono font-bold uppercase text-rose-500 dark:text-rose-400">
                        Locked
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 3: Timezone & Time Slots */}
                <div className="p-5 rounded-3xl bg-zinc-50/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
                        3
                      </span>
                      <h3 className="font-['Outfit'] text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                        Select a Time Slot
                      </h3>
                    </div>

                    {/* Timezone Selector */}
                    <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-950 px-2.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs">
                      <Globe className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <select
                        value={selectedTimezone}
                        onChange={(e) => setSelectedTimezone(e.target.value)}
                        className="bg-transparent text-zinc-900 dark:text-zinc-200 font-medium focus:outline-none cursor-pointer text-xs"
                      >
                        {TIMEZONES.map((tz) => (
                          <option key={tz.value} value={tz.value} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                            {tz.tzShort} · {tz.value.split('/')[1] || tz.value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Grid of Time Slots */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2 px-2.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer border text-center ${
                            isSelected
                              ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                              : 'bg-white dark:bg-zinc-950 border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-800 dark:text-zinc-200'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* =================================================================== */}
              {/* RIGHT COLUMN: ATTENDEE FORM & CONFIRMATION (5 COLS)                 */}
              {/* =================================================================== */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-3xl bg-zinc-50/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-md shadow-zinc-950/5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
                      4
                    </span>
                    <h3 className="font-['Outfit'] text-base font-bold text-zinc-900 dark:text-white">
                      Your Details & Agenda
                    </h3>
                  </div>

                  {/* Booking Summary Pill */}
                  <div className="mb-5 p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/60 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-blue-900 dark:text-blue-200 block">
                        {selectedType.duration} on {selectedDateObj?.dayName}, {selectedDateObj?.dayNumber} {selectedDateObj?.monthName}
                      </span>
                      <span className="text-[11px] text-blue-700/80 dark:text-blue-300/80 font-mono">
                        {selectedTime} ({selectedTimezone})
                      </span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  </div>

                  <form onSubmit={handleConfirmBooking} className="space-y-4">
                    {/* Error Message */}
                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-xs">
                        {errorMessage}
                      </div>
                    )}

                    {/* Name */}
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={attendeeName}
                          onChange={(e) => setAttendeeName(e.target.value)}
                          placeholder="e.g. Alex Miller"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-zinc-400"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Work or Personal Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={attendeeEmail}
                          onChange={(e) => setAttendeeEmail(e.target.value)}
                          placeholder="alex@company.com"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-zinc-400"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Company or Project Name (Optional)
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Stripe, Stealth Startup"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-zinc-400"
                        />
                      </div>
                    </div>

                    {/* Video Platform Preference */}
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Preferred Meeting Platform
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['Google Meet', 'Zoom', 'Phone Call'] as const).map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setPlatform(p)}
                            className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                              platform === p
                                ? 'bg-blue-600 border-blue-600 text-white'
                                : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300'
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Budget Slab (INR / ₹) */}
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Project Budget (INR / ₹)
                      </label>
                      <select
                        value={budgetSlab}
                        onChange={(e) => setBudgetSlab(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                      >
                        <option value="₹25,000 – ₹75,000 (INR)">₹25,000 – ₹75,000 (INR)</option>
                        <option value="₹75,000 – ₹2,00,000 (INR)">₹75,000 – ₹2,00,000 (INR)</option>
                        <option value="₹2,00,000 – ₹5,00,000 (INR)">₹2,00,000 – ₹5,00,000 (INR)</option>
                        <option value="₹5,00,000+ (INR)">₹5,00,000+ (INR)</option>
                        <option value="Full-Time Engineering Role">Full-Time Engineering Role</option>
                        <option value="Flexible / Discussion Only">Flexible / Discussion Only</option>
                      </select>
                    </div>

                    {/* Agenda / Topic */}
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        What would you like to discuss?
                      </label>
                      <textarea
                        rows={3}
                        value={meetingTopic}
                        onChange={(e) => setMeetingTopic(e.target.value)}
                        placeholder="e.g. We are building a Next.js SaaS and need full-stack architecture support..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-zinc-400 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === 'booking'}
                      className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20 cursor-pointer active:scale-98"
                    >
                      {status === 'booking' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Reserving Your Slot...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Confirm {selectedType.duration} Meeting</span>
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>



        {/* License Modal */}
        <LicenseModal
          isOpen={isLicenseOpen}
          onClose={() => setIsLicenseOpen(false)}
        />
      </div>
    </div>
  );
};
