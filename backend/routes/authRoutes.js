const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_chronosmart_2026';

// Simulated current user profile
const mockUser = {
  id: 'u_101',
  name: 'Alex Rivera',
  email: 'alex@chronosmart.ai',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  timezone: 'America/New_York',
  workHours: { start: '09:00', end: '17:00', days: [1, 2, 3, 4, 5] },
  calendarIntegration: {
    google: { connected: true, email: 'alex.rivera@gmail.com' },
    outlook: { connected: true, email: 'alex.rivera@outlook.com' }
  },
  preferences: {
    meetingDuration: 30,
    bufferTime: 15,
    defaultLocation: 'Google Meet'
  }
};

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const token = jwt.sign({ id: mockUser.id, email: mockUser.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({
    success: true,
    token,
    user: mockUser
  });
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  res.json({ success: true, user: mockUser });
});

// POST /api/auth/google
router.post('/google', (req, res) => {
  mockUser.calendarIntegration.google.connected = true;
  mockUser.calendarIntegration.google.email = req.body.email || 'alex.rivera@gmail.com';
  res.json({ success: true, message: 'Google Calendar OAuth connected successfully', user: mockUser });
});

// POST /api/auth/microsoft
router.post('/microsoft', (req, res) => {
  mockUser.calendarIntegration.outlook.connected = true;
  mockUser.calendarIntegration.outlook.email = req.body.email || 'alex.rivera@outlook.com';
  res.json({ success: true, message: 'Microsoft Graph OAuth connected successfully', user: mockUser });
});

module.exports = router;
