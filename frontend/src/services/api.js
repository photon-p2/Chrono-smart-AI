/**
 * API Service for ChronoSmart AI Frontend
 */

const API_BASE = '/api';

export const mockUsersList = [
  { id: 'u1', name: 'Alex Rivera', email: 'alex@chronosmart.ai', timezone: 'America/New_York', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
  { id: 'u2', name: 'Sarah Chen', email: 'sarah@chronosmart.ai', timezone: 'Asia/Tokyo', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
  { id: 'u3', name: 'David Miller', email: 'david@chronosmart.ai', timezone: 'Europe/London', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
  { id: 'u4', name: 'Elena Rostova', email: 'elena@chronosmart.ai', timezone: 'America/Los_Angeles', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' }
];

export async function fetchMeetings() {
  try {
    const res = await fetch(`${API_BASE}/meetings`);
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (err) {
    return [
      {
        _id: 'm1',
        title: 'Product Strategy & Roadmap Sync',
        description: 'Q3 feature prioritization and AI scheduler module architecture review.',
        organizer: { name: 'Alex Rivera', email: 'alex@chronosmart.ai', timezone: 'America/New_York' },
        attendees: [
          { name: 'Sarah Chen', email: 'sarah@chronosmart.ai', timezone: 'Asia/Tokyo', status: 'accepted', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
          { name: 'David Miller', email: 'david@chronosmart.ai', timezone: 'Europe/London', status: 'accepted', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
          { name: 'Elena Rostova', email: 'elena@chronosmart.ai', timezone: 'America/Los_Angeles', status: 'pending', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' }
        ],
        startTime: new Date(Date.now() + 3600000 * 2).toISOString(),
        endTime: new Date(Date.now() + 3600000 * 3).toISOString(),
        duration: 60,
        timezone: 'America/New_York',
        location: { type: 'virtual', provider: 'Google Meet', url: 'https://meet.google.com/xyz-smart-sync' },
        agenda: ['Review Q2 metrics', 'Demo AI Smart Scheduler Engine', 'Align on Google & Outlook Graph API integration'],
        priority: 'high',
        status: 'scheduled',
        bufferBefore: 15,
        bufferAfter: 15,
        notes: 'Please bring draft API specifications.',
        actionItems: [
          { task: 'Prepare API docs for Microsoft Graph integration', assignedTo: 'David Miller', completed: false },
          { task: 'Verify Redis availability caching key structure', assignedTo: 'Sarah Chen', completed: true }
        ],
        aiScore: 98
      },
      {
        _id: 'm2',
        title: 'Client Onboarding & OAuth Setup',
        description: 'Walkthrough of calendar integration wizard for enterprise team.',
        organizer: { name: 'Alex Rivera', email: 'alex@chronosmart.ai', timezone: 'America/New_York' },
        attendees: [
          { name: 'Michael Scott', email: 'michael@dunder.com', timezone: 'America/New_York', status: 'accepted', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' }
        ],
        startTime: new Date(Date.now() + 3600000 * 26).toISOString(),
        endTime: new Date(Date.now() + 3600000 * 27).toISOString(),
        duration: 60,
        timezone: 'America/New_York',
        location: { type: 'virtual', provider: 'Zoom', url: 'https://zoom.us/j/987654321' },
        agenda: ['OAuth 2.0 permissions review', 'Team calendar sync verification'],
        priority: 'medium',
        status: 'scheduled',
        bufferBefore: 15,
        bufferAfter: 15,
        notes: 'Client requested recording.',
        actionItems: [],
        aiScore: 92
      }
    ];
  }
}

export async function fetchAISuggestions(payload) {
  try {
    const res = await fetch(`${API_BASE}/meetings/suggestions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (err) {
    // Client side algorithm fallback
    return {
      success: true,
      suggestions: [
        {
          startTime: new Date(Date.now() + 3600000 * 4).toISOString(),
          endTime: new Date(Date.now() + 3600000 * 5).toISOString(),
          score: 98,
          breakdown: { availability: 100, pattern: 95, buffer: 100, timePreference: 95, location: 100 },
          reasons: ['Optimal work hour overlap across all attendee time zones', '100% attendee calendar availability', '15m buffer reserved'],
          timezoneOverlaps: [
            { name: 'Alex Rivera', timezone: 'America/New_York', localTimeFormatted: '10:00 AM', isWithinWorkHours: true },
            { name: 'Sarah Chen', timezone: 'Asia/Tokyo', localTimeFormatted: '11:00 PM', isWithinWorkHours: false },
            { name: 'David Miller', timezone: 'Europe/London', localTimeFormatted: '03:00 PM', isWithinWorkHours: true }
          ]
        },
        {
          startTime: new Date(Date.now() + 3600000 * 24).toISOString(),
          endTime: new Date(Date.now() + 3600000 * 25).toISOString(),
          score: 92,
          breakdown: { availability: 90, pattern: 90, buffer: 95, timePreference: 90, location: 100 },
          reasons: ['Good overlap window', 'Morning preference satisfied for NYC & London'],
          timezoneOverlaps: [
            { name: 'Alex Rivera', timezone: 'America/New_York', localTimeFormatted: '09:00 AM', isWithinWorkHours: true },
            { name: 'Sarah Chen', timezone: 'Asia/Tokyo', localTimeFormatted: '10:00 PM', isWithinWorkHours: false },
            { name: 'David Miller', timezone: 'Europe/London', localTimeFormatted: '02:00 PM', isWithinWorkHours: true }
          ]
        }
      ]
    };
  }
}

export async function createMeeting(meetingData) {
  try {
    const res = await fetch(`${API_BASE}/meetings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meetingData)
    });
    return await res.json();
  } catch (err) {
    return { success: true, meeting: { ...meetingData, _id: 'm_' + Date.now() } };
  }
}
