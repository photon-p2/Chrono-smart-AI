import React, { useState } from 'react';
import { Sparkles, Clock, Globe2, CheckCircle2, ChevronRight } from 'lucide-react';
import { fetchAISuggestions, createMeeting, mockUsersList } from '../services/api';

export default function SchedulePage({ onMeetingCreated }) {
  const [title, setTitle] = useState('Global Engineering Architecture Sync');
  const [duration, setDuration] = useState(60);
  const [priority, setPriority] = useState('high');
  const [preferredTimeOfDay, setPreferredTimeOfDay] = useState('morning');
  const [selectedParticipants, setSelectedParticipants] = useState(mockUsersList);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(0);

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
    alert('Meeting successfully scheduled and synced across Google & Outlook calendars!');
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">AI Time Suggestion Engine</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Scans participant availability, timezone overlaps, and priority weights</p>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Time Preference</label>
            <select
              value={preferredTimeOfDay}
              onChange={(e) => setPreferredTimeOfDay(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 dark:text-slate-100"
            >
              <option value="morning">Morning Peak Productivity</option>
              <option value="afternoon">Afternoon Session</option>
            </select>
          </div>
        </div>

        {/* Participant Selection */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">Select Attendees</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {mockUsersList.map((user) => {
              const isSelected = selectedParticipants.some(p => p.id === user.id);
              return (
                <div
                  key={user.id}
                  onClick={() => toggleParticipant(user)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{user.timezone}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleRunAIScheduler}
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white font-bold py-3 rounded-2xl shadow-lg text-sm transition"
        >
          {loading ? 'Computing AI Suggestions...' : 'Run AI Optimization Algorithm'}
        </button>
      </div>

      {/* Suggestions Output */}
      {suggestions && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-base text-slate-900 dark:text-white">AI Candidate Windows</h2>
            <button onClick={handleConfirmMeeting} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md">
              <span>Book Selected Window</span>
              <ChevronRight className="w-4 h-4" />
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
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    isSelected ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/50 ring-2 ring-indigo-500/30' : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                      {startDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500 text-white">
                      Score: {slot.score}/100
                    </span>
                  </div>
                  <p className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                    {new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <ul className="space-y-1">
                    {slot.reasons.map((r, i) => (
                      <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
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
  );
}
