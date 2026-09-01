import React from 'react';
import { Clock, Video, Users, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';

export default function MeetingsPage({ meetings, onSelectMeeting, onOpenSmartSchedule }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">Meeting Management & History</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Track RSVPs, virtual room links, buffer compliance, and action items</p>
        </div>

        <button
          onClick={onOpenSmartSchedule}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md"
        >
          + Schedule New Meeting
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {meetings.map((meeting) => (
          <div
            key={meeting._id}
            onClick={() => onSelectMeeting(meeting)}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500 transition cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 uppercase">
                  {meeting.priority} PRIORITY
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white">
                  Score: {meeting.aiScore}/100
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">15m Buffer Compliance</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">{meeting.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{meeting.description}</p>
            </div>

            <div className="flex items-center gap-6 text-xs text-slate-600 dark:text-slate-300 border-t md:border-t-0 border-slate-100 dark:border-slate-800 pt-3 md:pt-0 shrink-0">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span className="font-bold">
                  {new Date(meeting.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-indigo-500" />
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {meeting.location?.provider || 'Google Meet'}
                </span>
              </div>

              {/* Attendee Avatar Stack */}
              <div className="flex -space-x-2 overflow-hidden">
                {meeting.attendees.map((a, i) => (
                  <img
                    key={i}
                    src={a.avatar}
                    alt={a.name}
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
