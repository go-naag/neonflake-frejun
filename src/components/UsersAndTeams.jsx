import React, { useState } from 'react';

const styles = {
  teamFilterButton: `
    border border-gray-300
    rounded-lg 
    px-3 py-1.5 
    text-sm 
    text-gray-600 
    hover:border-gray-400 
    focus:outline-none 
    focus:ring-1 
    focus:ring-green-500
    flex items-center 
    justify-between 
    min-w-[100px]
    bg-white
  `,
  filterDropdown: `
    absolute 
    z-10 
    mt-1 
    w-48 
    bg-white 
    rounded-lg 
    shadow-lg 
    border 
    border-gray-200
  `,
  checkboxLabel: `
    flex 
    items-center 
    px-4 
    py-2 
    hover:bg-gray-50 
    cursor-pointer
  `,
  checkbox: `
    h-4 
    w-4 
    text-green-500 
    rounded 
    border-gray-300 
    focus:ring-green-500
  `,
  applyButton: `
    text-sm 
    bg-green-500 
    text-white 
    px-3 
    py-1 
    rounded-md 
    hover:bg-green-600
  `,
  clearButton: `
    text-sm 
    text-gray-600 
    hover:text-gray-800
  `
};

function TeamFilter() {
  const [showTeamFilter, setShowTeamFilter] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleApply = () => {
    setShowTeamFilter(false);
  };

  const handleClear = () => {
    setSelectedTeam(null);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowTeamFilter(!showTeamFilter)}
        className={styles.teamFilterButton}
      >
        <span>{selectedTeam || 'Team'}</span>
        <svg
          className="w-5 h-5 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {showTeamFilter && (
        <div className={styles.filterDropdown}>
          <div className="py-2">
            <label className={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                className={styles.checkbox}
                checked={selectedTeam === "None's team"}
                onChange={() => setSelectedTeam("None's team")}
              />
              <span className="ml-2">None's team</span>
            </label>
          </div>
          <div className="flex items-center justify-between p-3 border-t">
            <button 
              className={styles.clearButton}
              onClick={handleClear}
            >
              Clear
            </button>
            <button 
              className={styles.applyButton}
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const InviteUserModal = ({ isOpen, onClose }) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");

  const handleInvite = () => {
    // Validate that role is selected
    if (!selectedRole) {
      // You can add proper error handling here
      alert("Please select a role");
      return;
    }

    // Add role to the invitation data
    const inviteData = {
      email,
      role: selectedRole,
      // ...any other existing data
    };

    // Call your invite API with the inviteData
    // handleInviteUser(inviteData);
    
    // Reset form and close modal
    setEmail("");
    setSelectedRole("");
    onClose();
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Invite user</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Enter email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <div className="relative">
              <select 
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 appearance-none focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <option value="">Select roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="agent">Agent</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Virtual number</label>
            <div className="relative">
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 appearance-none focus:outline-none focus:ring-1 focus:ring-green-500">
                <option value="">Select number</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleInvite}
            className="px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Invite
          </button>
        </div>
      </div>
    </div>
  );
};

const CreateTeamModal = ({ isOpen, onClose }) => {
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Create team</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team name</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Enter team name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Team members ({teamMembers.length})
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter name to add user"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <div className="mt-2 border rounded-lg min-h-[100px] p-4 bg-gray-50 text-gray-500 text-sm">
                No team members yet
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Handle team creation
              onClose();
            }}
            className="px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const CreateRoleModal = ({ isOpen, onClose }) => {
  const [roleName, setRoleName] = useState("");
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Create role</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role name</label>
            <input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Enter role name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
            <div className="border rounded-lg divide-y">
              {/* Add permission checkboxes here */}
              <div className="p-4">
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-green-500 rounded border-gray-300" />
                  <span className="ml-2 text-sm text-gray-700">View and manage calls</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Handle role creation
              onClose();
            }}
            className="px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

function UsersAndTeams() {
  const [activeTab, setActiveTab] = useState('Users');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRoleFilter, setShowRoleFilter] = useState(false);
  const [showLicenseFilter, setShowLicenseFilter] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);

  const renderTeamsContent = () => {
    return (
      <>
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <button
            onClick={() => setIsCreateTeamModalOpen(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
          >
            Create team
          </button>
        </div>

        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Virtual Number
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Members
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">None's team</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">+91 8035201564</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">1</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center text-sm text-gray-500">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="ml-2 border-0 bg-transparent text-gray-500 focus:ring-0"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>1-1 of 1</span>
            <button className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50" disabled>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50" disabled>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </>
    );
  };

  const renderRolesContent = () => {
    return (
      <>
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <button
            onClick={() => setIsCreateRoleModalOpen(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
          >
            Create role
          </button>
        </div>

        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Users
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Table body intentionally left empty */}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center text-sm text-gray-500">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="ml-2 border-0 bg-transparent text-gray-500 focus:ring-0"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>0-0 of 0</span>
            <button className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50" disabled>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50" disabled>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="space-y-6">
      <CreateTeamModal 
        isOpen={isCreateTeamModalOpen} 
        onClose={() => setIsCreateTeamModalOpen(false)} 
      />
      <CreateRoleModal 
        isOpen={isCreateRoleModalOpen} 
        onClose={() => setIsCreateRoleModalOpen(false)} 
      />
      <InviteUserModal 
        isOpen={isInviteModalOpen} 
        onClose={() => setIsInviteModalOpen(false)} 
      />
      
      {/* Tabs */}
      <div className="border-b">
        <div className="flex space-x-8">
          {['Users', 'Teams', 'Roles'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 relative ${
                activeTab === tab
                  ? 'text-green-500 border-b-2 border-green-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'Roles' ? (
        renderRolesContent()
      ) : activeTab === 'Teams' ? (
        renderTeamsContent()
      ) : (
        // ...existing Users content...
        <>
          {/* License Info Box */}
          <div className="bg-white rounded-lg border p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Professional plan: 1 license</span>
                <span className="text-xs text-gray-500">(1 assigned)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Autodial: 1 license</span>
                <span className="text-xs text-gray-500">(1 assigned)</span>
              </div>
              <button className="text-green-500 text-sm font-medium hover:text-green-600">
                View more
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              {/* Role Filter with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowRoleFilter(!showRoleFilter)}
                  className="border rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-between min-w-[100px]"
                >
                  <span>Role</span>
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {showRoleFilter && (
                  <div className="absolute z-10 mt-1 w-48 bg-white rounded-lg shadow-lg border">
                    <div className="py-2">
                      <label className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-green-500 rounded border-gray-300" />
                        <span className="ml-3 text-sm text-gray-700">Owner</span>
                      </label>
                      <label className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-green-500 rounded border-gray-300" />
                        <span className="ml-3 text-sm text-gray-700">Admin</span>
                      </label>
                      <label className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-green-500 rounded border-gray-300" />
                        <span className="ml-3 text-sm text-gray-700">Agent</span>
                      </label>
                      <div className="border-t mt-2 pt-2 px-4 py-2 flex justify-between">
                        <button className="text-sm text-gray-600 hover:text-gray-800">Clear</button>
                        <button className="text-sm bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">Apply</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* License Filter with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowLicenseFilter(!showLicenseFilter)}
                  className="border rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-between min-w-[100px]"
                >
                  <span>License</span>
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {showLicenseFilter && (
                  <div className="absolute z-10 mt-1 w-48 bg-white rounded-lg shadow-lg border">
                    <div className="py-2">
                      <label className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-green-500 rounded border-gray-300" />
                        <span className="ml-3 text-sm text-gray-700">Plan</span>
                      </label>
                      <label className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-green-500 rounded border-gray-300" />
                        <span className="ml-3 text-sm text-gray-700">Viewer</span>
                      </label>
                      <label className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-green-500 rounded border-gray-300" />
                        <span className="ml-3 text-sm text-gray-700">Autodial</span>
                      </label>
                      <div className="border-t mt-2 pt-2 px-4 py-2 flex justify-between">
                        <button className="text-sm text-gray-600 hover:text-gray-800">Clear</button>
                        <button className="text-sm bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">Apply</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Status Filter with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowStatusFilter(!showStatusFilter)}
                  className="border rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-between min-w-[100px]"
                >
                  <span>Status</span>
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {showStatusFilter && (
                  <div className="absolute z-10 mt-1 w-48 bg-white rounded-lg shadow-lg border">
                    <div className="py-2">
                      <label className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-green-500 rounded border-gray-300" />
                        <span className="ml-3 text-sm text-gray-700">Active</span>
                      </label>
                      <label className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-green-500 rounded border-gray-300" />
                        <span className="ml-3 text-sm text-gray-700">Inactive</span>
                      </label>
                      <label className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-green-500 rounded border-gray-300" />
                        <span className="ml-3 text-sm text-gray-700">Resend Invitation</span>
                      </label>
                      <div className="border-t mt-2 pt-2 px-4 py-2 flex justify-between">
                        <button className="text-sm text-gray-600 hover:text-gray-800">Clear</button>
                        <button className="text-sm bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">Apply</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Team Filter with Dropdown */}
              <TeamFilter />

              <select className="border rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Team</option>
              </select>
              <button className="text-gray-500 text-sm hover:text-gray-700">
                Clear all
              </button>
            </div>
            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
            >
              Invite user
            </button>
          </div>

          {/* Search */}
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-2xl">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    License(s)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teams
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900"></div>
                        <div className="text-sm text-gray-500"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full"></span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center text-sm text-gray-500">
              <span>Rows per page:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="ml-2 border-0 bg-transparent text-gray-500 focus:ring-0"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>1-1 of 1</span>
              <button className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50" disabled>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50" disabled>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UsersAndTeams;