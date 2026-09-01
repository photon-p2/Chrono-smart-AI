const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ['admin', 'user', 'guest'], default: 'user' },
  avatar: { type: String },
  timezone: { type: String, default: 'America/New_York' },
  workHours: {
    start: { type: String, default: '09:00' },
    end: { type: String, default: '17:00' },
    days: { type: [Number], default: [1, 2, 3, 4, 5] } // Mon-Fri
  },
  calendarIntegration: {
    google: {
      connected: { type: Boolean, default: false },
      email: { type: String }
    },
    outlook: {
      connected: { type: Boolean, default: false },
      email: { type: String }
    }
  },
  preferences: {
    meetingDuration: { type: Number, default: 30 },
    bufferTime: { type: Number, default: 15 },
    defaultLocation: { type: String, default: 'Google Meet' }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
