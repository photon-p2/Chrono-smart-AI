import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Video, Globe2, ShieldCheck } from 'lucide-react';

export default function CalendarView({ meetings, onSelectMeeting }) {
  const [viewMode, setViewMode] = useState('week'); // 'month' | 'week' | 'day'
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      {/* Calendar Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-lg text-slate-900 dark:text-white">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Multi-calendar 2-Way Sync (Google & Outlook active)
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Month / Week / Day Selector */}
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex items-center gap-1 text-xs font-semibold">
            {['month', 'week', 'day'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 rounded-lg capitalize transition ${
                  viewMode === mode
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Week Grid View */}
      {viewMode === 'week' && (
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Week Header Row */}
            <div className="grid grid-cols-8 border-b border-slate-200 dark:border-slate-800 pb-3 text-center">
              <div className="text-xs font-bold text-slate-400 py-1">Time</div>
              {daysOfWeek.map((day, idx) => (
                <div key={day} className="text-xs font-bold text-slate-700 dark:text-slate-300 py-1">
                  <div>{day}</div>
                  <span className={`inline-block text-[11px] font-semibold mt-0.5 px-2 py-0.5 rounded-full ${
                    idx === 3 ? 'bg-indigo-600 text-white' : 'text-slate-500'
                  }`}>
                    {27 + idx}
                  </span>
                </div>
              ))}
            </div>

            {/* Hourly Grid Rows */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {hours.map((hour) => (
                <div key={hour} className="grid grid-cols-8 min-h-[64px] relative">
                  <div className="text-[11px] font-medium text-slate-400 pr-2 pt-1 text-right border-r border-slate-100 dark:border-slate-800">
                    {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
                  </div>

                  {daysOfWeek.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      className="border-r border-slate-100 dark:border-slate-800/60 p-1 relative hover:bg-indigo-50/20 dark:hover:bg-indigo-950/20 transition cursor-pointer"
                    >
                      {/* Render scheduled meeting card overlay */}
                      {dIdx === 3 && hour === 10 && (
                        <div
                          onClick={() => onSelectMeeting && onSelectMeeting(meetings[0])}
                          className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl p-2 shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer z-10"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 px-1.5 py-0.5 rounded">
                              High Priority
                            </span>
                            <span className="text-[10px] font-bold bg-emerald-400 text-slate-900 px-1.5 py-0.5 rounded-full">
                              Score: 98
                            </span>
                          </div>
                          <p className="text-xs font-bold leading-tight truncate">Product Strategy Sync</p>
                          <div className="flex items-center gap-1 text-[10px] text-indigo-100 mt-1">
                            <Clock className="w-3 h-3" />
                            <span>10:00 AM - 11:00 AM</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Month / Day Fallback cards list */}
      {viewMode !== 'week' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {meetings.map((meeting) => (
            <div
              key={meeting._id}
              onClick={() => onSelectMeeting && onSelectMeeting(meeting)}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:border-indigo-500 cursor-pointer transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  {meeting.priority.toUpperCase()} PRIORITY
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Score: {meeting.aiScore}/100
                </span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{meeting.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{meeting.description}</p>
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  <span>{new Date(meeting.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center gap-1 font-medium text-indigo-600 dark:text-indigo-400">
                  <Video className="w-4 h-4" />
                  <span>{meeting.location?.provider || 'Google Meet'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
