const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting');
const smartScheduler = require('../services/SmartScheduler');

// Mock in-memory meetings seed data if MongoDB is disconnected
let memoryMeetings = [
  {
    _id: 'm1',
    title: 'Product Strategy & Roadmap Sync',
    description: 'Q3 feature prioritization and AI scheduler module architecture review.',
    organizer: { name: 'Alex Rivera', email: 'alex@chronosmart.ai', timezone: 'America/New_York' },
    attendees: [
      { name: 'Sarah Chen', email: 'sarah@chronosmart.ai', timezone: 'Asia/Tokyo', status: 'accepted', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
      { name: 'David Miller', email: 'david@chronosmart.ai', timezone: 'Europe/London', status: 'accepted', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
      { name: 'Elena Rostova', email: 'elena@chronosmart.ai', timezone: 'America/Los_Angeles', status: 'pending', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' }
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

// GET /api/meetings - List all meetings
router.get('/', async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ startTime: 1 });
    res.json(meetings.length > 0 ? meetings : memoryMeetings);
  } catch (err) {
    res.json(memoryMeetings);
  }
});

// GET /api/meetings/suggestions - AI Smart Time Optimization Suggestions
router.post('/suggestions', (req, res) => {
  const { participants, duration, priority, preferredTimeOfDay, targetDate } = req.body;

  const sampleParticipants = participants && participants.length > 0 ? participants : [
    { name: 'Alex Rivera (NYC)', timezone: 'America/New_York' },
    { name: 'Sarah Chen (Tokyo)', timezone: 'Asia/Tokyo' },
    { name: 'David Miller (London)', timezone: 'Europe/London' }
  ];

  const suggestions = smartScheduler.findOptimalSlots(
    sampleParticipants,
    duration || 30,
    { priority: priority || 'high', preferredTimeOfDay: preferredTimeOfDay || 'morning' },
    targetDate ? new Date(targetDate) : new Date()
  );

  res.json({
    success: true,
    totalSuggestions: suggestions.length,
    suggestions
  });
});

// POST /api/meetings - Create new meeting
router.post('/', async (req, res) => {
  try {
    const newMeetingData = {
      _id: 'm_' + Date.now(),
      ...req.body,
      status: 'scheduled',
      aiScore: req.body.aiScore || 94
    };

    memoryMeetings.unshift(newMeetingData);

    try {
      const meeting = new Meeting(newMeetingData);
      await meeting.save();
    } catch (e) {
      // Memory fallback active
    }

    res.status(201).json({ success: true, meeting: newMeetingData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/meetings/:id/rsvp - Update RSVP status
router.put('/:id/rsvp', (req, res) => {
  const { id } = req.params;
  const { status, attendeeEmail } = req.body;

  const meeting = memoryMeetings.find(m => m._id === id);
  if (meeting) {
    const attendee = meeting.attendees.find(a => a.email === attendeeEmail);
    if (attendee) {
      attendee.status = status;
    }
  }

  res.json({ success: true, meeting });
});

// DELETE /api/meetings/:id - Cancel meeting
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  memoryMeetings = memoryMeetings.filter(m => m._id !== id);
  res.json({ success: true, message: 'Meeting cancelled successfully' });
});

module.exports = router;
