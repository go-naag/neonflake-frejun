import React, { useState } from 'react';

const Autodial = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Campaign status');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Table columns configuration
  const columns = [
    { header: 'Campaign', key: 'campaign' },
    { header: 'Created on', key: 'createdOn' },
    { header: 'Contacts', key: 'contacts' },
    { header: 'Reached', key: 'reached' },
    { header: 'Status', key: 'status' }
  ];

  // Empty state for initial load
  const campaigns = [];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Autodial campaigns</h1>
      </div>

      {/* Filters Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none w-40 px-3 py-2 bg-white border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer pr-10"
            >
              <option>Campaign status</option>
              <option>Active</option>
              <option>Paused</option>
              <option>Completed</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
          <button 
            onClick={() => setSelectedStatus('Campaign status')}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Clear all
          </button>
        </div>
        <div className="relative w-96">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search campaigns..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <svg 
            className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg border">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
        </table>

        {/* No Data State */}
        <div className="flex flex-col items-center justify-center py-16">
          <div className="mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">No data</p>
          <p className="text-gray-400 text-sm">No records found for selection.</p>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-3 flex items-center justify-between border-t bg-white">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm text-gray-600"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">0-0 of 0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Autodial;