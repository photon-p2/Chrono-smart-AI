import React, { useState, useEffect } from 'react';
import { Globe2, Clock, MapPin } from 'lucide-react';

export default function TimezoneOverlay() {
  const [times, setTimes] = useState({});

  const zones = [
    { city: 'New York', label: 'EST (UTC-5)', zone: 'America/New_York' },
    { city: 'London', label: 'GMT (UTC+0)', zone: 'Europe/London' },
    { city: 'Tokyo', label: 'JST (UTC+9)', zone: 'Asia/Tokyo' },
    { city: 'Los Angeles', label: 'PST (UTC-8)', zone: 'America/Los_Angeles' }
  ];

  useEffect(() => {
    const updateClocks = () => {
      const updated = {};
      zones.forEach(z => {
        updated[z.city] = new Date().toLocaleTimeString('en-US', {
          timeZone: z.zone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
      });
      setTimes(updated);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          <Globe2 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Global Team Timezone Overlay</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Real-time local hours across primary participant nodes</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {zones.map((z) => (
          <div key={z.city} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
              <span>{z.city}</span>
              <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">{z.label}</span>
            </div>
            <p className="text-lg font-black text-indigo-600 dark:text-indigo-400 font-mono">
              {times[z.city] || '12:00:00 PM'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
