import React, { useState, createContext, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MicrophonePermission from './MicrophonePermission';
import DialerModal from './DialerModal';
import ContactLists from './ContactLists';
import Settings from './Settings';
import Billing from './Billing';
import Templates from './Templates';
import VirtualNumbers from './VirtualNumbers';
import UsersAndTeams from './UsersAndTeams';
import Autodial from './Autodial';
import Survey from './Survey';

// Create context for credits
export const CreditsContext = createContext();

export const useCredits = () => {
  const context = useContext(CreditsContext);
  if (!context) {
    throw new Error('useCredits must be used within a CreditsProvider');
  }
  return context;
};

const Layout = ({ children }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMicPermission, setShowMicPermission] = useState(false);
  const [showDialer, setShowDialer] = useState(false);
  const [showCampaignsMenu, setShowCampaignsMenu] = useState(false);
  const [credits, setCredits] = useState(0); // Initial credits
  const [currentPage, setCurrentPage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleCampaignSelect = (type) => {
    setShowCampaignsMenu(false);
    navigate(`/campaigns/${type}`);
  };

  const handleContactListClick = () => {
    window.open('https://product.frejun.com/contact-lists', '_blank');
  };

  const handleSettingsNavigation = (tab) => {
    setShowProfileMenu(false);
    navigate('/settings', { state: { activeTab: tab } });
  };

  const CampaignsMenu = ({ onSelect }) => {
    return (
      <div className="absolute z-50 mt-1 w-56 bg-white rounded-lg shadow-lg py-2 border divide-y divide-gray-100">
        <button
          onClick={() => onSelect('autodial')}
          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
        >
          <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <div>
            <div className="font-medium">Autodial</div>
            <div className="text-xs text-gray-500">Automated outbound calls</div>
          </div>
        </button>
        <button
          onClick={() => onSelect('survey')}
          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
        >
          <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <div>
            <div className="font-medium">Survey</div>
            <div className="text-xs text-gray-500">Customer feedback calls</div>
          </div>
        </button>
      </div>
    );
  };

  const handleAddCreditsClick = () => {
    navigate('/billing');
  };

  // Effect to update current page based on location
  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const currentPath = pathSegments[1];
    
    // Map the path to a readable page name
    const pageNames = {
      'dashboard': 'Dashboard',
      'call-logs': 'Call Logs',
      'contacts': 'Contact Lists',
      'campaigns': 'Campaigns',
      'users-teams': 'Users & Teams',
      'templates': 'Templates',
      'virtual-numbers': 'Virtual Numbers',
      'billing': 'Billing',
      'settings': 'Settings'
    };

    const pageName = pageNames[currentPath] || 'Dashboard';
    setCurrentPage(pageName);
    // Update document title
    document.title = `${pageName} | NeonFlake`;
  }, [location]);

  // Add breadcrumb component
  const Breadcrumb = () => (
    <div className="bg-white border-b px-4 py-2 text-sm text-gray-600">
      <span>You are here: </span>
      <span className="font-medium text-gray-900">{currentPage}</span>
    </div>
  );

  return (
    <CreditsContext.Provider value={{ credits, setCredits }}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-[1920px] w-full mx-auto px-4 sm:px-6 flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <img src="/logo.svg" alt="NeonFlake" className="h-8" />
              <span className="text-xl font-semibold text-gray-900">NeonFlake</span>
            </div>
            <div className="flex items-center gap-4 sm:gap-8">
              <div className="flex items-center gap-4 sm:gap-6">
                <button 
                  onClick={() => setShowMicPermission(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <span className="hidden sm:inline">Dialer</span>
                </button>
                <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-50">
                  <span className="text-gray-600">Credits:</span>
                  <span className="font-medium text-gray-900">₹{credits}</span>
                  <button 
                    onClick={handleAddCreditsClick}
                    className="text-green-500 hover:text-green-600 font-bold text-xl transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium text-sm">
                    A
                  </div>
                  <svg className="w-5 h-5 text-gray-400 hidden sm:block" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">Alice Johnson</p>
                      <p className="text-sm text-gray-500">alice@example.com</p>
                    </div>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSettingsNavigation('General');
                      }}
                    >
                      Settings
                    </a>                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSettingsNavigation('Calling');
                      }}
                    >
                      Your Virtual Number
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open('https://chrome.google.com/webstore/category/extensions', '_blank');
                      }}
                    >
                      Add Chrome Extension
                    </a>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate('/');
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>      
        
        {/* Add Breadcrumb below header */}
        <Breadcrumb />

        {/* Main Content Area */}
        <div className="flex flex-1 min-h-0">
          {/* Sidebar */}
          <div className="w-56 bg-white border-r shrink-0">
            <nav className="p-2 space-y-0.5">
              {[
                { label: 'Dashboard', path: '/dashboard', icon: 'M4 6h16M4 12h16m-7 6h7' },
                { label: 'Call logs', path: '/call-logs', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
                { 
                  label: 'Contact lists', 
                  path: '/contacts',
                  icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                },
                { 
                  label: 'Campaigns', 
                  path: '/campaigns',
                  icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
                  onClick: () => setShowCampaignsMenu(true)
                },
                { label: 'Users & teams', path: '/users-teams', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
                { label: 'Templates', path: '/templates', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
                { label: 'Virtual numbers', path: '/virtual-numbers', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
                { label: 'Billing', path: '/billing', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                { label: 'Settings', path: '/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
              ].map((item) => (
                <div key={item.path} className="relative">
                  <button
                    onClick={() => item.onClick ? item.onClick() : navigate(item.path)}                  className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                    </svg>
                    <span>{item.label}</span>
                  </button>
                  {item.label === 'Campaigns' && showCampaignsMenu && (
                    <CampaignsMenu onSelect={handleCampaignSelect} />
                  )}
                </div>
              ))}
            </nav>
          </div>        {/* Main Content */}
          <div className="flex-1 min-w-0 p-4 overflow-auto">
            <div className="max-w-none mx-auto">
              {location.pathname === '/settings' ? (
                <Settings />
              ) : location.pathname === '/billing' ? (
                <Billing />
              ) : location.pathname === '/templates' ? (
                <Templates />
              ) : location.pathname === '/virtual-numbers' ? (
                <VirtualNumbers />
              ) : location.pathname === '/users-teams' ? (
                <UsersAndTeams />
              ) : location.pathname === '/campaigns/autodial' ? (
                <Autodial />
              ) : location.pathname === '/campaigns/survey' ? (
                <Survey />
              ) : location.pathname === '/contacts' ? (
                <ContactLists />
              ) : (
                children
              )}
            </div>
          </div>
        </div>

        {/* Microphone Permission Dialog */}
        {showMicPermission && (
          <MicrophonePermission onClose={() => setShowMicPermission(false)} />
        )}
      </div>
    </CreditsContext.Provider>
  );
};

export default Layout;