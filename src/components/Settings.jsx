import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Settings = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('General');
  const [selectedCallReason, setSelectedCallReason] = useState('');
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [selectedCallOutcome, setSelectedCallOutcome] = useState('');
  const [selectedOutcomes, setSelectedOutcomes] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [customTags, setCustomTags] = useState([]);
  
  // Update activeTab when navigation state changes
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: 'Admin'
  });
  const [workingDays, setWorkingDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  const [workTiming, setWorkTiming] = useState({ start: '09:00', end: '18:00' });
  const [breakTiming, setBreakTiming] = useState({ start: '13:00', end: '14:00' });
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [connectedNumber, setConnectedNumber] = useState('9948220077');
  const [browserCalling, setBrowserCalling] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showCallAttributes, setShowCallAttributes] = useState(false);
  const [privateRecording, setPrivateRecording] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [connectingTo, setConnectingTo] = useState(null);
  const [creatingWorkflow, setCreatingWorkflow] = useState(false);

  const virtualNumbers = [
    {
      name: "",
      number: "",
      location: "",
      calls: "",
      type: ""
    }
  ];

  const integrations = [
    {
      id: 'hubspot',
      name: 'Hubspot',
      icon: '/img/crm/hubspot.svg',
      logoColor: '#ff7a59',
      connected: false
    },
    {
      id: 'pipedrive',
      name: 'Pipedrive',
      icon: '/img/crm/pipedrive.svg',
      logoColor: '#1a237e',
      connected: false
    },
    {
      id: 'zoho',
      name: 'Zoho Phonebridge',
      icon: '/img/crm/zoho.svg',
      logoColor: '#0076ff',
      connected: false
    },
    {
      id: 'deskera',
      name: 'Deskera',
      icon: '/img/crm/deskera.svg',
      logoColor: '#00695c',
      connected: false
    },
    {
      id: 'freshworks',
      name: 'Freshworks',
      icon: '/img/crm/freshworks.svg',
      logoColor: '#fa5c7c',
      connected: false
    },
    {
      id: 'dynamics365',
      name: 'Microsoft Dynamics 365',
      icon: '/img/crm/dynamics365.svg',
      logoColor: '#0078d4',
      connected: false
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      icon: '/img/crm/salesforce.svg',
      logoColor: '#00a1e0',
      connected: false
    },
    {
      id: 'viasocket',
      name: 'viaSocket',
      icon: '/img/crm/viasocket.svg',
      logoColor: '#6b7280',
      connected: false
    }
  ];

  const callReasons = [
    'Inquiry', 'Update', 'Feedback', 'Support', 'Confirmation',
    'Request', 'Follow-up', 'Complaint', 'Assistance', 'Scheduling'
  ];

  const callOutcomes = ['Successful', 'Unsuccessful', 'Call Again'];

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswords(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving changes...');
  };

  const handleSavePassword = () => {
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match!');
      return;
    }
    console.log('Saving password changes...');
  };

  const handleIntegrationClick = async (integration) => {
    if (integration.id === 'viasocket') {
      setCreatingWorkflow(true);
      setTimeout(() => {
        setCreatingWorkflow(false);
      }, 1500);
    } else {
      setConnectingTo(integration.id);
      setTimeout(() => {
        setConnectingTo(null);
      }, 1500);
    }
  };

  const handleAddCallReason = () => {
    if (selectedCallReason && !selectedReasons.includes(selectedCallReason)) {
      setSelectedReasons([...selectedReasons, selectedCallReason]);
      setSelectedCallReason('');
    }
  };

  const handleRemoveCallReason = (reason) => {
    setSelectedReasons(selectedReasons.filter(r => r !== reason));
  };

  const handleAddCallOutcome = () => {
    if (selectedCallOutcome && !selectedOutcomes.includes(selectedCallOutcome)) {
      setSelectedOutcomes([...selectedOutcomes, selectedCallOutcome]);
      setSelectedCallOutcome('');
    }
  };

  const handleRemoveCallOutcome = (outcome) => {
    setSelectedOutcomes(selectedOutcomes.filter(o => o !== outcome));
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      if (!customTags.includes(tagInput.trim())) {
        setCustomTags([...customTags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag) => {
    setCustomTags(customTags.filter(t => t !== tag));
  };

  const tabs = ['General', 'Calling', 'Account', 'Integrations'];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 relative ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'General' ? (
        <div className="max-w-2xl space-y-8">
          {/* Profile Section */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-medium mb-6">Profile</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First name</label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => handleProfileChange('firstName', e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => handleProfileChange('lastName', e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
                <div className="flex gap-2">
                  <select className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
                    <option>+91</option>
                    <option>+1</option>
                    <option>+44</option>
                  </select>
                  <input
                    type="tel"
                    value={profile.phoneNumber}
                    onChange={(e) => handleProfileChange('phoneNumber', e.target.value)}
                    className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select 
                  value={profile.role}
                  onChange={(e) => handleProfileChange('role', e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Agent">Agent</option>
                </select>
              </div>
            </div>
          </div>

          {/* Business Hours Section */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-medium mb-6">Business Hours</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Working Days</label>
                <div className="flex flex-wrap gap-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <button
                      key={day}
                      onClick={() => {
                        setWorkingDays(prev => 
                          prev.includes(day) 
                            ? prev.filter(d => d !== day)
                            : [...prev, day]
                        );
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        workingDays.includes(day)
                          ? 'bg-blue-50 text-blue-600 border-2 border-blue-200'
                          : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Work Timings</label>
                <div className="flex items-center gap-4">
                  <input
                    type="time"
                    value={workTiming.start}
                    onChange={(e) => setWorkTiming(prev => ({ ...prev, start: e.target.value }))}
                    className="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="time"
                    value={workTiming.end}
                    onChange={(e) => setWorkTiming(prev => ({ ...prev, end: e.target.value }))}
                    className="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Break Timings</label>
                <div className="flex items-center gap-4">
                  <input
                    type="time"
                    value={breakTiming.start}
                    onChange={(e) => setBreakTiming(prev => ({ ...prev, start: e.target.value }))}
                    className="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="time"
                    value={breakTiming.end}
                    onChange={(e) => setBreakTiming(prev => ({ ...prev, end: e.target.value }))}
                    className="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'Calling' ? (
        <div className="space-y-8">
          {/* Virtual Numbers Section */}
          <div>
            <h2 className="text-xl font-medium mb-6">Virtual Numbers</h2>
            <div className="bg-white rounded-lg border overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Number name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Virtual number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Calls</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {virtualNumbers.map((number, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{number.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{number.number}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{number.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{number.calls}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{number.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">Rows per page:</span>
                  <select 
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span>1-1 of 1</span>
                  <button className="p-1 rounded hover:bg-gray-200" disabled>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="p-1 rounded hover:bg-gray-200" disabled>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Connected to Section */}
          <div>
            <h2 className="text-xl font-medium mb-6">Connected to</h2>
            <div className="flex gap-2 items-center">
              <select className="border rounded-md px-3 py-2 w-20">
                <option>+91</option>
              </select>
              <input
                type="text"
                value={connectedNumber}
                onChange={(e) => setConnectedNumber(e.target.value)}
                className="border rounded-md px-3 py-2 w-48"
              />
            </div>
            <button
              className="mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Save
            </button>
          </div>

          {/* Call Settings Section */}
          <div>
            <h2 className="text-xl font-medium mb-6">Call settings</h2>
            <div className="flex items-center justify-between max-w-md">
              <div>
                <div className="font-medium">Browser calling</div>
                <div className="text-sm text-gray-500">Make calls directly from desktop, without involving mobile phone.</div>
              </div>
              <button
                onClick={() => setBrowserCalling(!browserCalling)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  browserCalling ? 'bg-green-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    browserCalling ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>      ) : activeTab === 'Account' ? (
        <div className="max-w-4xl">
          {/* Call Attributes Card */}
          <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow p-6 mb-8">
            <h2 className="text-xl font-medium text-gray-900 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Call Attributes
            </h2>
            
            {/* Call Reason Section */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <label className="block text-sm font-medium text-gray-900 mb-3">Call Reason</label>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <select
                      value={selectedCallReason}
                      onChange={(e) => setSelectedCallReason(e.target.value)}
                      className="flex-grow px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select call reason</option>
                      {callReasons.map((reason) => (
                        <option key={reason} value={reason}>{reason}</option>
                      ))}
                    </select>
                    <button
                      onClick={handleAddCallReason}
                      disabled={!selectedCallReason}
                      className="px-6 py-2.5 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedReasons.map((reason) => (
                      <span
                        key={reason}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-blue-50 text-blue-700 border border-blue-100"
                      >
                        {reason}
                        <button
                          onClick={() => handleRemoveCallReason(reason)}
                          className="ml-2 text-blue-500 hover:text-blue-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Call Outcome Section */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <label className="block text-sm font-medium text-gray-900 mb-3">Call Outcome</label>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <select
                      value={selectedCallOutcome}
                      onChange={(e) => setSelectedCallOutcome(e.target.value)}
                      className="flex-grow px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select call outcome</option>
                      {callOutcomes.map((outcome) => (
                        <option key={outcome} value={outcome}>{outcome}</option>
                      ))}
                    </select>
                    <button
                      onClick={handleAddCallOutcome}
                      disabled={!selectedCallOutcome}
                      className="px-6 py-2.5 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedOutcomes.map((outcome) => (
                      <span
                        key={outcome}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-blue-50 text-blue-700 border border-blue-100"
                      >
                        {outcome}
                        <button
                          onClick={() => handleRemoveCallOutcome(outcome)}
                          className="ml-2 text-blue-500 hover:text-blue-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Custom Tags Section */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <label className="block text-sm font-medium text-gray-900 mb-3">Custom Tags</label>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleTagInputKeyPress}
                    placeholder="Type and press Enter to create"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex flex-wrap gap-2">
                    {customTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-blue-50 text-blue-700 border border-blue-100"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-blue-500 hover:text-blue-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Notifications Card */}
          <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow p-6 mb-8">
            <h2 className="text-xl font-medium text-gray-900 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Notifications
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <div className="font-medium text-gray-900">Call Reports</div>
                  <div className="text-sm text-gray-600">Get daily call reports through email</div>
                  <div className="text-sm text-gray-600 mt-1">Daily - 08:00 (IST) <button className="text-blue-600 hover:text-blue-700">Edit</button></div>
                </div>
                <div className="relative">
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <div className="font-medium text-gray-900">Call Recording Announcement</div>
                  <div className="text-sm text-gray-600">Notify both the caller and recipient that the call is being recorded</div>
                </div>
                <div className="relative">
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow p-6 mb-8">
            <h2 className="text-xl font-medium text-gray-900 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Privacy & Security
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <div className="font-medium text-gray-900">Private Recording</div>
                  <div className="text-sm text-gray-600">Sharable recording links would be private</div>
                </div>
                <div className="relative">
                  <button 
                    onClick={() => setPrivateRecording(!privateRecording)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${privateRecording ? 'bg-blue-600' : 'bg-gray-200'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${privateRecording ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <div className="font-medium text-gray-900">Two Factor Authentication</div>
                  <div className="text-sm text-gray-600">Make 2FA as default security verification method for all users</div>
                </div>
                <div className="relative">
                  <button 
                    onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${twoFactorAuth ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Block List Card */}
          <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                  Block List
                </h2>
                <p className="text-sm text-gray-600">Block contacts/numbers from calling or messaging you</p>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                Manage List
              </button>
            </div>
          </div>

          {/* API Key Card */}
          <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              API Key
            </h2>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Click the button to create API key"
                  className="flex-grow px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 focus:outline-none cursor-not-allowed"
                  disabled
                />
                <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                  Create
                </button>
              </div>
              <p className="text-sm text-gray-600">
                This page provides background information on API keys and authentication: how each of these are used, the differences between them, and the scenarios where you should consider using API keys.{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">Read our Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      ) : activeTab === 'Integrations' ? (
        <div className="max-w-5xl">
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-medium mb-6">CRM Integrations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {integrations.map((integration) => (
                  <div 
                    key={integration.id}
                    className="border rounded-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-md transition-all hover:border-gray-400"
                  >
                    <div className="w-16 h-16 mb-4 flex items-center justify-center">
                      <img 
                        src={integration.icon} 
                        alt={integration.name} 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <h3 className="text-gray-900 font-medium mb-4">{integration.name}</h3>
                    <button
                      onClick={() => handleIntegrationClick(integration)}
                      disabled={connectingTo === integration.id || (integration.id === 'viasocket' && creatingWorkflow)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        integration.id === 'viasocket'
                          ? creatingWorkflow
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'border border-gray-300 hover:bg-gray-50'
                          : connectingTo === integration.id
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {integration.id === 'viasocket' 
                        ? creatingWorkflow ? 'Creating...' : 'Create Workflow'
                        : connectingTo === integration.id ? 'Connecting...' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Integration Help Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Need help with integrations?</h3>
              <p className="text-gray-600 mb-4">Our support team is here to help you set up and configure any CRM integration.</p>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Settings;