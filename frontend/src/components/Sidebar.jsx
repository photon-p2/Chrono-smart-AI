import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Calendar, 
  Users, 
  BarChart3, 
  Settings, 
  ShieldCheck, 
  Globe2, 
  Zap, 
  Clock
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'schedule', label: 'AI Time Optimizer', icon: Sparkles, badge: 'AI' },
    { id: 'calendar', label: 'Calendar Views', icon: Calendar },
    { id: 'meetings', label: 'Meeting Manager', icon: Users },
    { id: 'analytics', label: 'Efficiency Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Integrations & Sync', icon: Settings },
    { id: 'admin', label: 'Admin Control', icon: ShieldCheck }
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div>
        {/* Brand */}
        <div className="p-6 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white font-bold text-lg">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 dark:text-white tracking-tight leading-none text-lg">
              Chrono<span className="text-indigo-600 dark:text-indigo-400">Smart</span>
            </h1>
            <span className="text-[10px] font-semibold tracking-widest text-indigo-500 uppercase">AI Time Engine</span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-200/50 dark:border-indigo-800/50'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Integration Status widget */}
      <div className="p-4 m-4 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl text-white shadow-xl border border-indigo-900/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            2-Way Calendar Sync
          </span>
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
        </div>
        <p className="text-[11px] text-slate-300 mb-3 leading-snug">
          Google & Outlook Graph APIs active. Next auto-sync in 3 mins.
        </p>
        <button
          onClick={() => setActiveTab('settings')}
          className="w-full text-center py-1.5 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-lg text-xs font-medium transition"
        >
          Manage Connections
        </button>
      </div>
    </aside>
  );
}
