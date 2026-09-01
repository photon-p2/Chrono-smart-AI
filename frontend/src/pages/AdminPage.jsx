import React from 'react';
import { ShieldCheck, Activity, Server, Database, Users, AlertCircle, RefreshCcw } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">Admin Control & Integration Health</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">System metrics, background cron jobs, and database health audit</p>
      </div>

      {/* Integration Health Matrix */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-500" />
          Integration Health Status
        </h2>

        <div className="space-y-3">
          {[
            { name: 'Google Calendar API v3 Endpoint', status: 'Healthy', latency: '45ms', uptime: '99.98%' },
            { name: 'Microsoft Graph API (Outlook)', status: 'Healthy', latency: '62ms', uptime: '99.95%' },
            { name: 'Redis Availability Cache Cluster', status: 'Healthy', latency: '2ms', uptime: '100.00%' },
            { name: 'Socket.io Real-Time Dispatcher', status: 'Active (48 Sockets)', latency: '8ms', uptime: '99.99%' },
            { name: 'Node-cron Background Scheduler', status: 'Running 5 Jobs', latency: 'N/A', uptime: '100.00%' }
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</p>
                  <p className="text-[10px] text-slate-400">Latency: {item.latency}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-500">{item.uptime} Uptime</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Cron Jobs */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="font-extrabold text-slate-900 dark:text-white text-base">Active Background Cron Schedules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <span className="text-[10px] font-mono bg-indigo-100 dark:bg-indigo-950 text-indigo-600 px-2 py-0.5 rounded font-bold">
              */5 * * * *
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1">Calendar Sync & Reminders</h4>
            <p className="text-xs text-slate-500">Executes background 2-way sync across Google & Outlook every 5 mins.</p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <span className="text-[10px] font-mono bg-purple-100 dark:bg-purple-950 text-purple-600 px-2 py-0.5 rounded font-bold">
              */15 * * * *
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1">Redis Availability Cache Update</h4>
            <p className="text-xs text-slate-500">Refreshes pre-computed participant free/busy slots in Redis.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
