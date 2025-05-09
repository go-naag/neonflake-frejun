import { useState } from 'react';
import Calendar from './Calendar';
import UserCallsTable from './UserCallsTable';
import React from 'react';

function Dashboard() {  const [dateRange, setDateRange] = useState('9 May 2025');
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <>
      {/* Filters */}      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <select className="px-3 py-1.5 bg-white border rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[120px]">
            <option>All Teams</option>
          </select>          <select className="px-3 py-1.5 bg-white border rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[120px]">
            <option>All Users</option>
          </select>
          <select className="px-3 py-1.5 bg-white border rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[120px]">
            <option>All Lists</option>
          </select>
          <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
            Clear filters
          </button>
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowCalendar(!showCalendar)}
            className="px-3 py-1.5 bg-white border rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2 text-sm"
          >
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {dateRange}
          </button>
          {showCalendar && (
            <Calendar
              onDateChange={(newRange) => setDateRange(newRange)}
              onClose={() => setShowCalendar(false)}
            />
          )}
        </div>
      </div>      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h3 className="text-gray-500 font-medium mb-2">Incoming calls</h3>
              <p className="text-3xl font-semibold text-gray-900">0</p>
            </div>
            <div>
              <h3 className="text-gray-500 font-medium mb-2">Outgoing calls</h3>
              <p className="text-3xl font-semibold text-gray-900">0</p>
            </div>
          </div>        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow">
          <div>
            <h3 className="text-gray-500 font-medium mb-2">Missed calls</h3>
            <p className="text-3xl font-semibold text-gray-900">0</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow">
          <div>
            <h3 className="text-gray-500 font-medium mb-2">Unique calls</h3>
            <p className="text-3xl font-semibold text-gray-900">0</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow">
          <div>
            <h3 className="text-gray-500 font-medium mb-2">Total duration</h3>
            <p className="text-3xl font-semibold text-gray-900">0m</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-gray-500 font-medium mb-2">Total duration</h3>
              <p className="text-3xl font-semibold text-gray-900">0m</p>
            </div>
            <div>
              <h3 className="text-gray-500 font-medium mb-2">Avg duration</h3>
              <p className="text-3xl font-semibold text-gray-900">0m</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-500 font-medium">CALL VOLUME</h3>
            <select className="text-sm text-gray-600 border rounded-lg px-2 py-1">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-48 flex items-end justify-between">
            <div className="flex-1 border-b border-l h-full relative">
              <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-between text-xs text-gray-400 -ml-6">
                <span>100</span>
                <span>80</span>
                <span>60</span>
                <span>40</span>
                <span>20</span>
                <span>0</span>
              </div>
            </div>
          </div>
          <div className="flex gap-6 mt-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Total Calls</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Answered Calls</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span className="text-sm text-gray-600">Unanswered Calls</span>
            </div>
          </div>
        </div>
      </div>

      {/* User Calls Table */}
      <div className="mt-8">
        <UserCallsTable />
      </div>
    </>
  );
}

export default Dashboard;