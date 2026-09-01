import React, { useState } from 'react';
import { Calendar, CheckCircle2, ShieldCheck, RefreshCw, Zap, Video, Mail, Lock } from 'lucide-react';

export default function SettingsPage() {
  const [googleConnected, setGoogleConnected] = useState(true);
  const [outlookConnected, setOutlookConnected] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const handleManualSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      alert('Manual 2-way sync completed across Google Calendar and Microsoft Graph APIs!');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">Integrations & Sync Management</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Connect Google Calendar, Microsoft Graph (Outlook), Zoom, and webhooks</p>
      </div>

      {/* Calendar Connections */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-slate-900 dark:text-white text-base">Calendar OAuth Provider Connections</h2>
          <button
            onClick={handleManualSync}
            disabled={syncing}
            className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold px-4 py-2 rounded-xl text-xs hover:bg-indigo-100 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Syncing...' : 'Force 2-Way Sync Now'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Google Calendar */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                G
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Google Calendar API v3</p>
                <p className="text-xs text-slate-500">alex.rivera@gmail.com</p>
              </div>
            </div>

            <button
              onClick={() => setGoogleConnected(!googleConnected)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                googleConnected ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {googleConnected ? 'Connected' : 'Connect'}
            </button>
          </div>

          {/* Outlook Graph */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                O
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Microsoft Graph (Outlook)</p>
                <p className="text-xs text-slate-500">alex.rivera@outlook.com</p>
              </div>
            </div>

            <button
              onClick={() => setOutlookConnected(!outlookConnected)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                outlookConnected ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {outlookConnected ? 'Connected' : 'Connect'}
            </button>
          </div>
        </div>
      </div>

      {/* Video Conferencing */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="font-extrabold text-slate-900 dark:text-white text-base">Video Room Auto-Generation Providers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl border border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/40">
            <p className="text-sm font-bold text-slate-900 dark:text-white">Google Meet (Default)</p>
            <p className="text-xs text-emerald-600 font-semibold mt-1">Auto-generates room link</p>
          </div>
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <p className="text-sm font-bold text-slate-900 dark:text-white">Zoom API</p>
            <p className="text-xs text-slate-500 mt-1">Connected via JWT Key</p>
          </div>
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <p className="text-sm font-bold text-slate-900 dark:text-white">Microsoft Teams</p>
            <p className="text-xs text-slate-500 mt-1">Connected via Graph API</p>
          </div>
        </div>
      </div>
    </div>
  );
}
