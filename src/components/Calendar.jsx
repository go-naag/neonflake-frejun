import { useState } from 'react';
import React from 'react';

function Calendar({ onDateChange, onClose }) {  const [selectedDate, setSelectedDate] = useState(new Date(2025, 4, 9)); // May 9, 2025
  const [view, setView] = useState('calendar');
  const [fromDate, setFromDate] = useState('9th May 2025');
  const [toDate, setToDate] = useState('9th May 2025');
  const [fromTime, setFromTime] = useState('00:00');
  const [toTime, setToTime] = useState('23:59');

  const customOptions = [
    { id: 'today', label: 'Today' },
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'thisWeek', label: 'This week' },
    { id: 'lastWeek', label: 'Last week' },
    { id: 'thisMonth', label: 'This month' },
    { id: 'lastMonth', label: 'Last month' },
    { id: 'thisYear', label: 'This year' },
    { id: 'lastYear', label: 'Last year' },
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days = [];

    // Previous month days
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({        day: i,
        isCurrentMonth: true,
        isToday: i === 9 && month === 4 && year === 2025 // May 9, 2025
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false
      });
    }

    return days;
  };

  return (
    <div className="absolute right-0 top-10 bg-white rounded-lg shadow-lg border w-[320px] z-50">
      {/* Calendar Header */}
      <div className="p-4 border-b">
        <div className="flex gap-2">
          <button
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              view === 'custom' 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setView('custom')}
          >
            Custom
          </button>
          <button
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              view === 'calendar' 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setView('calendar')}
          >
            Calendar
          </button>
        </div>
      </div>

      <div className="p-4">
        {view === 'custom' ? (
          <div className="space-y-1">
            {customOptions.map(option => (
              <button
                key={option.id}
                className="w-full text-left px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  onDateChange(`${option.label} Range`);
                  onClose();
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
                className="p-1 rounded-lg hover:bg-gray-50 text-gray-600"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="font-medium text-gray-900">
                {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </span>
              <button
                onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
                className="p-1 rounded-lg hover:bg-gray-50 text-gray-600"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-400 py-1">
                  {day}
                </div>
              ))}
              {generateCalendarDays().map((day, index) => (
                <button
                  key={index}
                  className={`p-2 text-center rounded-lg hover:bg-gray-50 ${
                    !day.isCurrentMonth ? 'text-gray-400' : 'text-gray-700'
                  } ${day.isToday ? 'bg-indigo-50 text-indigo-600 font-medium' : ''}`}
                  onClick={() => {
                    // Handle date selection
                  }}
                >
                  {day.day}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">From</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                  <input
                    type="time"
                    className="w-full mt-2 px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">To</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                  <input
                    type="time"
                    className="w-full mt-2 px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-50 flex justify-end gap-2 rounded-b-xl">
        <button
          className="px-4 py-2 rounded-lg text-gray-600 hover:bg-white font-medium"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
          onClick={() => {
            onDateChange(`${fromDate} - ${toDate}`);
            onClose();
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default Calendar;