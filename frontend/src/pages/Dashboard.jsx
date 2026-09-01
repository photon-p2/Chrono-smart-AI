import React from 'react';
import { 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Video, 
  Calendar,
  AlertTriangle
} from 'lucide-react';
import TimezoneOverlay from '../components/TimezoneOverlay';
import CalendarView from '../components/CalendarView';

export default function Dashboard({ meetings, onOpenSmartSchedule, onSelectMeeting }) {
  const upcomingMeetings = meetings.filter(m => m.status === 'scheduled');

  return (
    <div className="space-y-6">
      {/* Top Banner Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-950 p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-indigo-200 mb-4 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            AI Smart Time Suggestions Engine Active
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">
            Welcome back, Alex!
          </h1>
          <p className="text-sm text-indigo-200 leading-relaxed mb-6">
            Your calendar efficiency score is <strong className="text-white">96/100</strong> today. All 3 team meetings are buffer-compliant with 100% timezone overlap coverage.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenSmartSchedule}
              className="bg-white text-indigo-950 font-extrabold px-5 py-2.5 rounded-xl shadow-lg hover:bg-indigo-50 text-sm transition transform active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Schedule New Meeting</span>
            </button>
          </div>
        </div>

        {/* Decorative background blur circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Efficiency Score</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">96%</p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            +4.2% from last week
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Buffer Compliance</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">100%</p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">15m Auto-buffer inserted</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Time Saved / Wk</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-purple-600">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">4.5 hrs</p>
          <p className="text-[11px] text-purple-600 font-semibold mt-1">Conflict-free AI scheduling</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Synced Calendars</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">Google & Outlook</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">2-Way Live Sync Active</p>
        </div>
      </div>

      {/* Live World Clock Timezone Widget */}
      <TimezoneOverlay />

      {/* Main Calendar View Section */}
      <CalendarView meetings={meetings} onSelectMeeting={onSelectMeeting} />
    </div>
  );
}
