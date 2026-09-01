import React from 'react';
import { Sparkles, Bell, Calendar as CalendarIcon, Sun, Moon, Search } from 'lucide-react';

export default function Header({ darkMode, setDarkMode, onOpenSmartSchedule }) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between">
      {/* Search & Quick Filter */}
      <div className="flex items-center gap-4 w-1/3">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search meetings, attendees, agendas..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 dark:text-slate-200 transition"
          />
        </div>
      </div>

      {/* Action Center */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSmartSchedule}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:opacity-90 text-white font-medium px-4 py-2 rounded-xl shadow-lg shadow-indigo-500/20 text-sm transition-all transform active:scale-95"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>Smart AI Schedule</span>
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl transition"
          title="Toggle Theme"
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="relative">
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
          </button>
        </div>

        {/* User Badge */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-800">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
            alt="Alex Rivera"
            className="w-9 h-9 rounded-xl object-cover ring-2 ring-indigo-500/30"
          />
          <div className="hidden md:block">
            <p className="text-sm font-semibold leading-none text-slate-800 dark:text-slate-100">Alex Rivera</p>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">America/New_York</p>
          </div>
        </div>
      </div>
    </header>
  );
}
