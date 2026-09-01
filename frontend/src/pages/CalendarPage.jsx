import React from 'react';
import CalendarView from '../components/CalendarView';
import TimezoneOverlay from '../components/TimezoneOverlay';

export default function CalendarPage({ meetings, onSelectMeeting }) {
  return (
    <div className="space-y-6">
      <TimezoneOverlay />
      <CalendarView meetings={meetings} onSelectMeeting={onSelectMeeting} />
    </div>
  );
}
