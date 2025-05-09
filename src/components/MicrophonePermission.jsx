import { useState } from 'react';
import React from 'react';
import DialerModal from './DialerModal';

function MicrophonePermission({ onClose }) {  const [loading, setLoading] = useState(false);
  const [showDialer, setShowDialer] = useState(false);

  const handleAllowAccess = async () => {
    setLoading(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setShowDialer(true);
    } catch (error) {
      console.error('Microphone permission denied:', error);
    }
    setLoading(false);
  };  if (showDialer) {
    return <DialerModal onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
            <span className="text-lg font-medium">Dialer</span>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <p className="mb-6 text-gray-600">
          Grant microphone access to start making calls from NeonFlake.
        </p>

        <button
          onClick={handleAllowAccess}
          disabled={loading}
          className={`w-full py-2 px-4 rounded ${
            loading 
              ? 'bg-gray-100 text-gray-400' 
              : 'bg-green-500 text-white hover:bg-green-600'
          } transition-colors`}
        >
          {loading ? 'Requesting access...' : 'Allow access'}
        </button>
      </div>
    </div>
  );
}

export default MicrophonePermission;