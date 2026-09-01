# ChronoSmart AI - Smart Meeting Scheduler with Time Optimization

An enterprise-grade, full-stack meeting scheduling application with AI-powered time optimization, multi-timezone overlays, Google Calendar & Microsoft Graph (Outlook) integrations, buffer time compliance, and real-time Socket.io updates.

---

## 🌟 Key Features

1. **Smart AI Time Suggestion Engine (`SmartScheduler.js`)**:
   - Multi-participant slot overlapping across timezones (NYC, Tokyo, London, LA, etc.)
   - Weighted score calculation (Availability 40%, Pattern history 20%, Buffer compliance 15%, Time of day preference 15%, Location 10%)
   - Automated 15-30 min buffer insertion
   - Priority-based scheduling (Medium / High / Urgent)

2. **2-Way Calendar Sync Hooks**:
   - Google Calendar API v3
   - Microsoft Graph API (Outlook)

3. **Interactive UI / UX**:
   - Built with React, Tailwind CSS, and Lucide Icons
   - Dark mode toggle with custom glassmorphism styling
   - Week, Month, and Day interactive calendar grid
   - Real-time world clock timezone converter overlay
   - Action item & task tracking per meeting

4. **Production Architecture & Deployment**:
   - Node.js + Express backend with REST APIs & Socket.io server
   - MongoDB / Mongoose schemas with memory fallback support
   - Docker & Docker Compose orchestration (Frontend + Backend + MongoDB + Redis + Nginx)

---

## 🚀 Quick Start (Local Development)

### 1. Install dependencies
```bash
# In project root:
npm install

# Backend dependencies:
cd backend && npm install

# Frontend dependencies:
cd ../frontend && npm install
```

### 2. Launch Development Servers
```bash
# Run backend and frontend concurrently from root:
npm run dev
```

- **Frontend UI**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/health

---

## 🐳 Docker Deployment

To launch the complete containerized stack (MongoDB, Redis, Express Backend, Vite Frontend, and Nginx reverse proxy):

```bash
docker-compose up -d --build
```

Access the application at http://localhost.
