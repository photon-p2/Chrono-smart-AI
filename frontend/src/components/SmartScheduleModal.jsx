import React, { useState } from 'react';
import { X, Sparkles, Clock, Globe2, ShieldCheck, CheckCircle2, ChevronRight, AlertCircle, Calendar } from 'lucide-react';
import { fetchAISuggestions, createMeeting, mockUsersList } from '../services/api';

export default function SmartScheduleModal({ isOpen, onClose, onMeetingCreated }) {
  const [title, setTitle] = useState('Quarterly AI Architecture Review');
  const [duration, setDuration] = useState(45);
  const [priority, setPriority] = useState('high');
  const [preferredTimeOfDay, setPreferredTimeOfDay] = useState('morning');
  const [selectedParticipants, setSelectedParticipants] = useState(mockUsersList);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(0);

  if (!isOpen) return null;

  const toggleParticipant = (user) => {
    if (selectedParticipants.some(p => p.id === user.id)) {
      setSelectedParticipants(selectedParticipants.filter(p => p.id !== user.id));
    } else {
      setSelectedParticipants([...selectedParticipants, user]);
    }
  };

  const handleRunAIScheduler = async () => {
    setLoading(true);
    const result = await fetchAISuggestions({
      participants: selectedParticipants,
      duration: Number(duration),
      priority,
      preferredTimeOfDay
    });
    setSuggestions(result.suggestions || []);
    setSelectedSlotIndex(0);
    setLoading(false);
  };

  const handleConfirmMeeting = async () => {
    if (!suggestions || suggestions.length === 0) return;
    const slot = suggestions[selectedSlotIndex];

    const meetingPayload = {
      title,
      description: `AI-Optimized meeting scheduled via ChronoSmart AI. Score: ${slot.score}/100.`,
      organizer: { name: 'Alex Rivera', email: 'alex@chronosmart.ai', timezone: 'America/New_York' },
      attendees: selectedParticipants.map(p => ({
        name: p.name,
        email: p.email,
        timezone: p.timezone,
        status: 'pending',
        avatar: p.avatar
      })),
      startTime: slot.startTime,
      endTime: slot.endTime,
      duration: Number(duration),
      location: { type: 'virtual', provider: 'Google Meet', url: 'https://meet.google.com/smart-ai-' + Date.now().toString().slice(-4) },
      priority,
      bufferBefore: slot.recommendedBufferBefore || 15,
      bufferAfter: slot.recommendedBufferAfter || 15,
      aiScore: slot.score
    };

    await createMeeting(meetingPayload);
    onMeetingCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <h2 className="font-extrabold text-lg">AI Smart Time Suggestion Engine</h2>
              <p className="text-xs text-indigo-100 font-medium">Multi-timezone availability & weighted pattern optimization</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/20 text-white/80 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Form Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Meeting Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Duration & Buffer</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 dark:text-slate-100"
              >
                <option value={15}>15 mins (+ 15m Buffer)</option>
                <option value={30}>30 mins (+ 15m Buffer)</option>
                <option value={45}>45 mins (+ 15m Buffer)</option>
                <option value={60}>60 mins (+ 15m Buffer)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 dark:text-slate-100"
              >
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent Priority</option>
              </select>
            </div>
          </div>

          {/* Participant Selector across Timezones */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              Select Participants & Timezone Overlaps
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {mockUsersList.map((user) => {
                const isSelected = selectedParticipants.some(p => p.id === user.id);
                return (
                  <div
                    key={user.id}
                    onClick={() => toggleParticipant(user)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold truncate leading-tight">{user.name}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{user.timezone}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Run AI Analysis CTA */}
          {!suggestions && (
            <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
              <Sparkles className="w-10 h-10 text-indigo-500 mx-auto mb-3 animate-bounce" />
              <h3 className="font-bold text-slate-800 dark:text-white text-base">Ready to compute optimal windows</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-4">
                The algorithm will scan calendars, apply timezone conversion, verify 15m buffer windows, and score optimal overlap slots.
              </p>
              <button
                onClick={handleRunAIScheduler}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 text-sm transition"
              >
                {loading ? 'Computing AI Suggestions...' : 'Run AI Optimization Algorithm'}
              </button>
            </div>
          )}

          {/* AI Suggestions Visualization */}
          {suggestions && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  Top Recommended Windows ({suggestions.length} Found)
                </h3>
                <button
                  onClick={handleRunAIScheduler}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Re-evaluate
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suggestions.map((slot, index) => {
                  const isSelected = selectedSlotIndex === index;
                  const startDate = new Date(slot.startTime);

                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedSlotIndex(index)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/60 ring-2 ring-indigo-500/30'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {startDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-black bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm">
                          Score: {slot.score}/100
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-800 dark:text-slate-100 font-bold text-base mb-3">
                        <Clock className="w-4 h-4 text-indigo-500" />
                        <span>
                          {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                          {new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {/* Score Breakdown Bar */}
                      <div className="space-y-1 mb-3 text-[10px]">
                        <div className="flex justify-between font-semibold text-slate-500">
                          <span>Availability (40%)</span>
                          <span>{slot.breakdown.availability}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${slot.breakdown.availability}%` }} />
                        </div>
                      </div>

                      {/* Reasons bullets */}
                      <ul className="space-y-1">
                        {slot.reasons.slice(0, 2).map((r, idx) => (
                          <li key={idx} className="text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 transition"
          >
            Cancel
          </button>

          {suggestions && (
            <button
              onClick={handleConfirmMeeting}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 text-sm transition"
            >
              <span>Dispatch & Sync Calendar</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
