import { useState } from 'react';
import React from 'react';

function UserCallsTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showAccountDialog, setShowAccountDialog] = useState(false);
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [selectedColumnData, setSelectedColumnData] = useState('');
  const [customColumns, setCustomColumns] = useState([]);

  // Mock data - replace with actual data from your backend
  const userData = [
    {
      name:'',
      email: '',
      totalCalls:'',
      totalDuration: '',
    }
  ];

  // Stats data
  const statsData = {
    totalCalls: '-',
    missedCalls: '-',
    uniqueCalls: '-',
    totalDuration: '-'
  };

  const handleAddColumn = () => {
    if (newColumnName && selectedColumnData) {
      const newColumn = {
        id: Date.now(),
        name: newColumnName,
        dataKey: selectedColumnData,
        value: '-' // Default value
      };
      
      setCustomColumns([...customColumns, newColumn]);
      setNewColumnName('');
      setSelectedColumnData('');
      setShowAddColumnModal(false);
    }
  };

  const handleDownload = () => {
    // Create table data with custom columns
    const tableData = userData.map(user => {
      const row = {
        Name: user.name,
        Email: user.email,
        'Total Calls': user.totalCalls,
        'Total Duration': user.totalDuration,
      };
      
      // Add custom columns
      customColumns.forEach(column => {
        row[column.name] = column.value;
      });
      
      return row;
    });

    // Convert to CSV
    const headers = Object.keys(tableData[0]);
    const csvContent = [
      headers.join(','),
      ...tableData.map(row => headers.map(header => row[header]).join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'user_calls_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredData = userData.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleAccountClick = (user) => {
    setSelectedAccount(user);
    setShowAccountDialog(true);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-gray-500 text-sm mb-2">Total calls</h3>
          <p className="text-2xl font-semibold">{statsData.totalCalls}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-gray-500 text-sm mb-2">Missed calls</h3>
          <p className="text-2xl font-semibold">{statsData.missedCalls}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-gray-500 text-sm mb-2">Unique calls</h3>
          <p className="text-2xl font-semibold">{statsData.uniqueCalls}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-gray-500 text-sm mb-2">Total duration</h3>
          <p className="text-2xl font-semibold">{statsData.totalDuration}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        {/* Table Header with Search and Controls */}
        <div className="px-4 py-3 flex justify-between items-center border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-1.5 border rounded-lg w-80 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <svg 
              className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 font-medium flex items-center gap-2"
              title="Download table data"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download
            </button>
            <button 
              className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 font-medium flex items-center gap-2"
              onClick={() => setShowAddColumnModal(true)}
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Column
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left py-4 px-6 font-medium text-gray-600">User</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Total calls</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Total duration</th>
                {customColumns.map(column => (
                  <th key={column.id} className="text-left py-4 px-6 font-medium text-gray-600">
                    {column.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user, index) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="py-4 px-6">
                    <div className="cursor-pointer" onClick={() => handleAccountClick(user)}>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{user.totalCalls}</td>
                  <td className="py-4 px-6 text-gray-600">{user.totalDuration}</td>
                  {customColumns.map(column => (
                    <td key={column.id} className="py-4 px-6 text-gray-600">
                      {column.value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="border rounded-lg px-2 py-1 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {`1-${filteredData.length} of ${filteredData.length}`}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded hover:bg-white disabled:opacity-50 text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1 rounded hover:bg-white disabled:opacity-50 text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Column Modal */}
      {showAddColumnModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Add Column</h2>
              <button
                onClick={() => setShowAddColumnModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Column Name*</label>
                <input
                  type="text"
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter column name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Column Data*</label>
                <select
                  value={selectedColumnData}
                  onChange={(e) => setSelectedColumnData(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select column data</option>
                  <option value="total_calls">Total Calls</option>
                  <option value="missed_calls">Missed Calls</option>
                  <option value="unique_calls">Unique Calls</option>
                  <option value="duration">Duration</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddColumnModal(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleAddColumn}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                disabled={!newColumnName || !selectedColumnData}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Account Details Dialog */}
      {showAccountDialog && selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[800px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">{selectedAccount.name}</h2>
              <button 
                onClick={() => setShowAccountDialog(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Call Details Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Call Reason
                  </label>
                  <div className="h-32 border rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                    No call reason selected
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Call Outcome
                  </label>
                  <div className="h-32 border rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                    No call outcome selected
                  </div>
                </div>
              </div>

              {/* Example Webpage Images */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Webpage Preview 1
                  </label>
                  <div className="border rounded-lg aspect-video bg-gray-100"></div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Webpage Preview 2 (Continuation)
                  </label>
                  <div className="border rounded-lg aspect-video bg-gray-100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserCallsTable;