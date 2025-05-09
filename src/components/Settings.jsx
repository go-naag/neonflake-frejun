import React, { useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [workingDays, setWorkingDays] = useState(['Monday, Tuesday, W...']);
  const [workTiming, setWorkTiming] = useState({ start: '00:00', end: '23:55' });
  const [breakTiming, setBreakTiming] = useState({ start: '00:00', end: '00:00' });
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [connectedNumber, setConnectedNumber] = useState('9948220077');
  const [browserCalling, setBrowserCalling] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showCallAttributes, setShowCallAttributes] = useState(false);
  const [callReason, setCallReason] = useState('');
  const [callOutcome, setCallOutcome] = useState('');
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
    // TODO: Implement API call to save profile
    console.log('Saving profile:', profile);
  };

  const handleSavePassword = () => {
    console.log('Saving password changes');
  };

  const handleIntegrationClick = async (integration) => {
    if (integration.id === 'viasocket') {
      setCreatingWorkflow(true);
      // Simulate workflow creation
      setTimeout(() => {
        setCreatingWorkflow(false);
      }, 1500);
    } else {
      setConnectingTo(integration.id);
      // Simulate connection process
      setTimeout(() => {
        setConnectingTo(null);
      }, 1500);
    }
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
              className={`py-4 px-1 ${
                activeTab === tab
                  ? 'border-b-2 border-blue-500 text-blue-600'
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
          <div>
            <h2 className="text-xl font-medium mb-6">Profile</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First name</label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => handleProfileChange('firstName', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => handleProfileChange('lastName', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Business Hours Section */}
          <div>
            <h2 className="text-xl font-medium mb-6">Business Hours</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Working Days</label>
                <div className="flex gap-2 items-center">
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {workingDays[0]}
                    <button className="text-gray-500 hover:text-gray-700">×</button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Work Timings</label>
                <div className="flex items-center gap-4">
                  <input
                    type="time"
                    value={workTiming.start}
                    onChange={(e) => setWorkTiming(prev => ({ ...prev, start: e.target.value }))}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                  <span>to</span>
                  <input
                    type="time"
                    value={workTiming.end}
                    onChange={(e) => setWorkTiming(prev => ({ ...prev, end: e.target.value }))}
                    className="p-2 border border-gray-300 rounded-md"
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
                    className="p-2 border border-gray-300 rounded-md"
                  />
                  <span>to</span>
                  <input
                    type="time"
                    value={breakTiming.end}
                    onChange={(e) => setBreakTiming(prev => ({ ...prev, end: e.target.value }))}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div>
            <h2 className="text-xl font-medium mb-6">Password</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current password</label>
                <input
                  type="password"
                  value={passwords.current}
                  onChange={(e) => handlePasswordChange('current', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={passwords.new}
                  onChange={(e) => handlePasswordChange('new', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <button
                  onClick={handleSavePassword}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Save
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
        </div>
      ) : activeTab === 'Account' ? (
        <div className="max-w-4xl">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-4">Call attributes</h2>
              
              {/* Call Reason */}
              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-2">Call reason</label>
                <div>
                  <input
                    type="text"
                    placeholder="Type and press Enter to create"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                  />
                  <div className="flex flex-wrap gap-2">
                    {['Inquiry', 'Update', 'Feedback', 'Support', 'Confirmation', 
                      'Request', 'Follow-up', 'Complaint', 'Assistance', 'Scheduling'].map((tag) => (
                      <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                        {tag}
                        <button className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Call Outcome */}
              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-2">Call outcome</label>
                <div>
                  <input
                    type="text"
                    placeholder="Type and press Enter to create"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                  />
                  <div className="flex flex-wrap gap-2">
                    {['Successful', 'Unsuccessful', 'Call Again'].map((tag) => (
                      <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                        {tag}
                        <button className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Tags</label>
                <input
                  type="text"
                  placeholder="Type and press Enter to create"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Notifications */}
            <div>
              <h2 className="text-lg font-medium mb-4">Notifications</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Call reports</div>
                    <div className="text-sm text-gray-500">Get daily call reports through email</div>
                    <div className="text-sm text-gray-500">Daily - 08:00 (IST) <button className="text-blue-500">Edit</button></div>
                  </div>
                  <button className={`relative inline-flex h-6 w-11 items-center rounded-full bg-green-500`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white translate-x-6`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Call recording announcement</div>
                    <div className="text-sm text-gray-500">Notify both the caller and recipient that the call is being recorded.</div>
                  </div>
                  <button className={`relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white translate-x-1`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div>
              <h2 className="text-lg font-medium mb-4">Privacy & Security</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Private Recording</div>
                    <div className="text-sm text-gray-500">Sharable recording links would be private</div>
                  </div>
                  <button 
                    onClick={() => setPrivateRecording(!privateRecording)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${privateRecording ? 'bg-green-500' : 'bg-gray-200'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white ${privateRecording ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Two factor authentication</div>
                    <div className="text-sm text-gray-500">Make 2FA as default security verification method for all users</div>
                  </div>
                  <button 
                    onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${twoFactorAuth ? 'bg-green-500' : 'bg-gray-200'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white ${twoFactorAuth ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Block list */}
            <div>
              <h2 className="text-lg font-medium mb-4">Block list</h2>
              <div className="text-sm text-gray-600 mb-4">
                Block contacts/numbers from calling or messaging you.
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Manage block list
              </button>
            </div>

            {/* API Key */}
            <div>
              <h2 className="text-lg font-medium mb-4">API Key</h2>
              <div className="flex gap-2 items-center mb-2">
                <input
                  type="text"
                  placeholder="Click the button to create API key"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-50"
                  disabled
                />
                <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                  Create
                </button>
              </div>
              <div className="text-sm text-gray-600">
                This page provides background information on API keys and authentication: how each of these are used, the differences between them, and the scenarios where you should consider using API keys.{' '}
                <a href="#" className="text-blue-500 hover:underline">Read our Privacy Policy</a>
              </div>
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