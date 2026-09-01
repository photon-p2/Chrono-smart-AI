import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SmartScheduleModal from './components/SmartScheduleModal';
import MeetingDetailsModal from './components/MeetingDetailsModal';
import Dashboard from './pages/Dashboard';
import SchedulePage from './pages/SchedulePage';
import CalendarPage from './pages/CalendarPage';
import MeetingsPage from './pages/MeetingsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import AdminPage from './pages/AdminPage';
import { fetchMeetings } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [isSmartScheduleOpen, setIsSmartScheduleOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [meetings, setMeetings] = useState([]);

  const loadMeetings = async () => {
    const data = await fetchMeetings();
    setMeetings(data);
  };

  useEffect(() => {
    loadMeetings();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenSmartSchedule={() => setIsSmartScheduleOpen(true)}
        />

        <main className="p-8 max-w-7xl w-full mx-auto space-y-6">
          {activeTab === 'dashboard' && (
            <Dashboard
              meetings={meetings}
              onOpenSmartSchedule={() => setIsSmartScheduleOpen(true)}
              onSelectMeeting={(m) => setSelectedMeeting(m)}
            />
          )}

          {activeTab === 'schedule' && (
            <SchedulePage onMeetingCreated={loadMeetings} />
          )}

          {activeTab === 'calendar' && (
            <CalendarPage
              meetings={meetings}
              onSelectMeeting={(m) => setSelectedMeeting(m)}
            />
          )}

          {activeTab === 'meetings' && (
            <MeetingsPage
              meetings={meetings}
              onSelectMeeting={(m) => setSelectedMeeting(m)}
              onOpenSmartSchedule={() => setIsSmartScheduleOpen(true)}
            />
          )}

          {activeTab === 'analytics' && <AnalyticsPage />}

          {activeTab === 'settings' && <SettingsPage />}

          {activeTab === 'admin' && <AdminPage />}
        </main>
      </div>

      {/* Modals */}
      <SmartScheduleModal
        isOpen={isSmartScheduleOpen}
        onClose={() => setIsSmartScheduleOpen(false)}
        onMeetingCreated={loadMeetings}
      />

      <MeetingDetailsModal
        meeting={selectedMeeting}
        onClose={() => setSelectedMeeting(null)}
      />
    </div>
  );
}
