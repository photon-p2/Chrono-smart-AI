import React, { useState } from 'react';
import { X, Clock, Video, Globe2, CheckCircle2, UserCheck, ShieldCheck, FileText, CheckSquare, Plus } from 'lucide-react';

export default function MeetingDetailsModal({ meeting, onClose, onRsvp }) {
  const [actionItems, setActionItems] = useState(meeting?.actionItems || []);
  const [newTask, setNewTask] = useState('');

  if (!meeting) return null;

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    setActionItems([...actionItems, { task: newTask, assignedTo: 'Alex Rivera', completed: false }]);
    setNewTask('');
  };

  const toggleTask = (index) => {
    const updated = [...actionItems];
    updated[index].completed = !updated[index].completed;
    setActionItems(updated);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-500 text-white">
              Score: {meeting.aiScore}/100
            </span>
            <span className="text-xs font-semibold text-slate-400">15m Buffer Reserved</span>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h2 className="font-extrabold text-2xl text-slate-900 dark:text-white mb-2">{meeting.title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{meeting.description}</p>
          </div>

          {/* Time & Virtual Link */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="text-xs font-semibold text-slate-400">Scheduled Window</p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {new Date(meeting.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                  {new Date(meeting.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Video className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="text-xs font-semibold text-slate-400">Location / Video Link</p>
                <a
                  href={meeting.location?.url || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Join {meeting.location?.provider || 'Google Meet'}
                </a>
              </div>
            </div>
          </div>

          {/* Attendees RSVP Status */}
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3">Attendees & RSVP Status</h3>
            <div className="space-y-2">
              {meeting.attendees.map((a, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <img src={a.avatar} alt={a.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{a.name}</p>
                      <p className="text-[10px] text-slate-400">{a.timezone}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    a.status === 'accepted' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400'
                  }`}>
                    {a.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Items */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-indigo-500" />
                Action Items & Tasks
              </h3>
            </div>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new action item..."
                className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none text-slate-800 dark:text-slate-100"
              />
              <button
                onClick={handleAddTask}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            </div>

            <div className="space-y-2">
              {actionItems.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleTask(idx)}
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/40 transition"
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <span className={`text-xs font-medium ${item.completed ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2 rounded-xl text-xs transition"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
