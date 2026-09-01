import React from 'react';
import { BarChart3, TrendingUp, Clock, Zap, ShieldCheck, PieChart } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">Calendar Efficiency Analytics</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Deep insights into time savings, buffer compliance, and team meeting health</p>
      </div>

      {/* Main KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Conflict Reduction</span>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-2">97.4%</p>
          <p className="text-xs text-slate-500 mt-1">Zero overlapping schedule conflicts</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Average Time Saved / User</span>
          <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-2">18.5 mins</p>
          <p className="text-xs text-slate-500 mt-1">Eliminated email back-and-forth</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Buffer Compliance Score</span>
          <p className="text-3xl font-black text-purple-600 dark:text-purple-400 mt-2">94.2%</p>
          <p className="text-xs text-slate-500 mt-1">Automated 15m buffer enforcement</p>
        </div>
      </div>

      {/* Weekly Efficiency Breakdown Chart simulation */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-4">Weekly Time Savings Breakdown (Hours)</h3>
        <div className="grid grid-cols-5 gap-4 items-end h-48 border-b border-slate-200 dark:border-slate-800 pb-4">
          {[
            { day: 'Mon', hours: 3.2, score: 94 },
            { day: 'Tue', hours: 4.8, score: 98 },
            { day: 'Wed', hours: 5.5, score: 96 },
            { day: 'Thu', hours: 4.1, score: 92 },
            { day: 'Fri', hours: 2.9, score: 90 }
          ].map((item) => (
            <div key={item.day} className="flex flex-col items-center gap-2 h-full justify-end">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{item.hours}h</span>
              <div
                className="w-full bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-xl transition-all"
                style={{ height: `${(item.hours / 6) * 100}%` }}
              />
              <span className="text-xs font-semibold text-slate-500">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
