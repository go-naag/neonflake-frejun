export const sipConfig = {
  websocket: 'wss://sip.linphone.org:4444',    // Public test FreeSWITCH server
  domain: 'sip.linphone.org',                  // SIP domain
  uri: 'sip:testuser@sip.linphone.org',        // Test user
  password: 'testpass',                        // Test password
  stunServers: [
    'stun:stun.l.google.com:19302',
    'stun:stun1.l.google.com:19302'
  ],
  debug: true,
  register: true,                           // Enable registration
  registerExpires: 300                      // Registration expiry in seconds
};
