const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  organizer: {
    name: String,
    email: String,
    timezone: String
  },
  attendees: [{
    name: String,
    email: String,
    timezone: String,
    status: { type: String, enum: ['accepted', 'declined', 'pending', 'maybe'], default: 'pending' },
    avatar: String
  }],
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  duration: { type: Number, required: true }, // in minutes
  timezone: { type: String, default: 'America/New_York' },
  location: {
    type: { type: String, default: 'virtual' }, // virtual or physical
    url: String,
    provider: String // 'Google Meet', 'Zoom', 'Microsoft Teams'
  },
  agenda: [String],
  priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
  recurrence: { type: String, enum: ['none', 'daily', 'weekly', 'monthly'], default: 'none' },
  status: { type: String, enum: ['scheduled', 'ongoing', 'completed', 'cancelled'], default: 'scheduled' },
  bufferBefore: { type: Number, default: 15 },
  bufferAfter: { type: Number, default: 15 },
  notes: { type: String },
  actionItems: [{
    task: String,
    assignedTo: String,
    completed: { type: Boolean, default: false },
    dueDate: Date
  }],
  aiScore: { type: Number, default: 95 }
}, { timestamps: true });

MeetingSchema.index({ startTime: 1, status: 1 });

module.exports = mongoose.model('Meeting', MeetingSchema);
