const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const { Server } = require('socket.io');

const authRoutes = require('./routes/authRoutes');
const meetingRoutes = require('./routes/meetingRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'ChronoSmart AI Scheduling Engine',
    timestamp: new Date().toISOString()
  });
});

// Real-time socket events
io.on('connection', (socket) => {
  console.log('⚡ Socket connected:', socket.id);

  socket.on('meeting_created', (data) => {
    io.emit('meeting_updated', { type: 'CREATED', data });
  });

  socket.on('meeting_rsvp', (data) => {
    io.emit('rsvp_changed', data);
  });

  socket.on('disconnect', () => {
    console.log('⚡ Socket disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 ChronoSmart AI Server running on port ${PORT}`);
});
