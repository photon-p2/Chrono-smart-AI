const express = require('express');
const router = express.Router();

// GET /api/admin/analytics
router.get('/analytics', (req, res) => {
  res.json({
    metrics: {
      totalMeetingsScheduled: 1240,
      conflictFreePercentage: 97.4,
      avgSchedulingTimeSavedMinutes: 18.5,
      bufferComplianceRate: 94.2,
      activeUsersCount: 382
    },
    weeklyStats: [
      { day: 'Mon', scheduled: 42, optimized: 40 },
      { day: 'Tue', scheduled: 58, optimized: 56 },
      { day: 'Wed', scheduled: 65, optimized: 63 },
      { day: 'Thu', scheduled: 48, optimized: 47 },
      { day: 'Fri', scheduled: 32, optimized: 31 }
    ],
    integrationHealth: [
      { service: 'Google Calendar API v3', status: 'Healthy', latency: '45ms' },
      { service: 'Microsoft Graph API', status: 'Healthy', latency: '62ms' },
      { service: 'Redis Availability Cache', status: 'Healthy', latency: '2ms' },
      { service: 'Socket.io Server', status: 'Connected', activeSockets: 48 }
    ]
  });
});

module.exports = router;
