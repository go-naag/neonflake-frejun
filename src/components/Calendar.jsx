import { useState } from 'react';
import React from 'react';

function Calendar({ onDateChange, onClose }) {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [view, setView] = useState('calendar');
  const [fromDate, setFromDate] = useState(currentDate.toISOString().split('T')[0]);
  const [toDate, setToDate] = useState(currentDate.toISOString().split('T')[0]);
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

  const formatDateString = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

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
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthDays - i)
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        isToday: i === currentDate.getDate() && 
                 month === currentDate.getMonth() && 
                 year === currentDate.getFullYear(),
        date: new Date(year, month, i)
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i)
      });
    }

    return days;
  };

  const handleDateSelect = (date) => {
    const formattedDate = formatDateString(date);
    setSelectedDate(date);
    setFromDate(date.toISOString().split('T')[0]);
    setToDate(date.toISOString().split('T')[0]);
    onDateChange(formattedDate);
    onClose();
  };

  const handleCustomRangeSelect = (option) => {
    const today = new Date();
    let start = new Date();
    let end = new Date();

    switch (option.id) {
      case 'today':
        break;
      case 'yesterday':
        start.setDate(today.getDate() - 1);
        end = new Date(start);
        break;
      case 'thisWeek':
        start.setDate(today.getDate() - today.getDay());
        break;
      case 'lastWeek':
        start.setDate(today.getDate() - today.getDay() - 7);
        end.setDate(today.getDate() - today.getDay() - 1);
        break;
      case 'thisMonth':
        start.setDate(1);
        break;
      case 'lastMonth':
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case 'thisYear':
        start = new Date(today.getFullYear(), 0, 1);
        break;
      case 'lastYear':
        start = new Date(today.getFullYear() - 1, 0, 1);
        end = new Date(today.getFullYear() - 1, 11, 31);
        break;
    }

    const range = `${formatDateString(start)} - ${formatDateString(end)}`;
    onDateChange(range);
    onClose();
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
                onClick={() => handleCustomRangeSelect(option)}
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

            <div className="grid grid-cols-7 gap-1">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-400 py-1">
                  {day}
                </div>
              ))}
              {generateCalendarDays().map((day, index) => (
                <button
                  key={index}
                  className={`p-2 text-center rounded-lg hover:bg-gray-50 ${
                    !day.isCurrentMonth ? 'text-gray-400' : 
                    day.isToday ? 'bg-indigo-50 text-indigo-600 font-medium' : 
                    'text-gray-700'
                  }`}
                  onClick={() => handleDateSelect(day.date)}
                >
                  {day.day}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Custom Range Footer */}
      {view === 'calendar' && (
        <div className="p-4 border-t">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">From</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
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
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 font-medium"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
              onClick={() => {
                const range = `${formatDateString(new Date(fromDate))} - ${formatDateString(new Date(toDate))}`;
                onDateChange(range);
                onClose();
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;