import React, { useState } from 'react';
import { useCredits } from './Layout';

const Billing = () => {
  const [activeTab, setActiveTab] = useState('Credits');
  const { credits, setCredits } = useCredits();
  const [customAmount, setCustomAmount] = useState('');
  const [subscriptionPayments, setSubscriptionPayments] = useState(false);
  const [notifyLowBalance, setNotifyLowBalance] = useState(false);
  const [lowBalanceThreshold, setLowBalanceThreshold] = useState(0);
  const [billingInfo, setBillingInfo] = useState({
    companyName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    zipCode: '',
    state: '',
    country: 'India',
    gstNumber: ''
  });

  const handleAddCredits = (e) => {
    e.preventDefault();
    const amount = parseFloat(customAmount);
    if (!isNaN(amount) && amount > 0) {
      setCredits(prev => prev + amount);
      setCustomAmount('');
      alert('Credits added successfully!');
    } else {
      alert('Please enter a valid amount');
    }
  };

  const handleInputChange = (field, value) => {
    setBillingInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Handle saving billing information
    console.log('Saving billing info:', billingInfo);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Plans & Numbers</h1>
      
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex gap-8">
          {['Overview', 'Credits', 'Billing'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 relative ${
                activeTab === tab
                  ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'Credits' && (
        <div className="max-w-[640px]">
          <div className="mb-12">
            <h2 className="text-sm font-medium text-gray-700 mb-1">Credits (INR)</h2>
            <div className="text-3xl font-semibold text-gray-900 mb-2">₹{credits}</div>
            <button className="text-blue-600 hover:text-blue-700 text-sm">
              View usage
            </button>
            <p className="text-sm text-gray-600 mt-4 mb-8">
              Credits are used for calling and transcription. It can also be used for subscription payments.
            </p>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Add credits</h3>
              <form onSubmit={handleAddCredits} className="flex gap-2">
                <div className="relative">
                  <div className="absolute left-3 top-2.5 text-gray-500">₹</div>
                  <input
                    type="text"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="pl-6 pr-3 py-2 w-[200px] border border-gray-300 rounded-md text-gray-900 placeholder-gray-400"
                    placeholder="Enter amount"
                  />
                </div>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 font-medium"
                >
                  Add
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Subscription payments</h3>
                <p className="text-sm text-gray-500">Automatically pay for your subscriptions using credits.</p>
              </div>
              <button
                onClick={() => setSubscriptionPayments(!subscriptionPayments)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  subscriptionPayments ? 'bg-green-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    subscriptionPayments ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Notify low balance</h3>
                <p className="text-sm text-gray-500 mb-3">Billing contacts will receive email notification when balance falls below:</p>
                <div className="flex gap-2">
                  <div className="relative">
                    <div className="absolute left-3 top-2.5 text-gray-500">₹</div>
                    <input
                      type="text"
                      value={lowBalanceThreshold}
                      onChange={(e) => setLowBalanceThreshold(e.target.value)}
                      className={`pl-6 pr-3 py-2 w-32 border border-gray-300 rounded-md ${
                        !notifyLowBalance && 'bg-gray-50 text-gray-400'
                      }`}
                      placeholder="0"
                      disabled={!notifyLowBalance}
                    />
                  </div>
                  <button
                    className={`px-3 py-2 text-sm rounded-md ${
                      notifyLowBalance 
                        ? 'text-blue-600 hover:bg-gray-50' 
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!notifyLowBalance}
                  >
                    Save
                  </button>
                </div>
              </div>
              <button
                onClick={() => setNotifyLowBalance(!notifyLowBalance)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  notifyLowBalance ? 'bg-green-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifyLowBalance ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Overview' && (
        <div className="space-y-6 max-w-4xl">
          <div className="bg-white rounded-lg shadow p-6 border">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Professional Plan - Trial</h3>
                <p className="text-sm text-gray-500">1 License</p>
              </div>
              <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                Upgrade
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Duration</h4>
                <p className="text-2xl font-semibold text-gray-900">0m</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Total calls</h4>
                <p className="text-2xl font-semibold text-gray-900">0</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Credit balance</h4>
                <p className="text-2xl font-semibold text-gray-900">₹0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Numbers</h3>
            <div className="flex items-center gap-4">
              <img src="/img/india-flag.svg" alt="India" className="w-8 h-8 rounded-full" />
              <div>
                <h4 className="font-medium text-gray-900">+91 India numbers</h4>
                <p className="text-sm text-gray-500">1 India number</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Features included</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-medium text-gray-900">Call Recording</h4>
                  <p className="text-sm text-gray-500">Record and store all your calls</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-medium text-gray-900">Browser Calling</h4>
                  <p className="text-sm text-gray-500">Make calls directly from your browser</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Billing' && (
        <div className="max-w-[640px]">
          <h2 className="text-gray-900 font-medium mb-6">Billing information</h2>
          
          <form onSubmit={handleSaveChanges} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company name
              </label>
              <input
                type="text"
                value={billingInfo.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400"
                placeholder="Neonflake Enterprises OPC Private Limited"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  value={billingInfo.addressLine1}
                  onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400"
                  placeholder="Address line 1"
                />
                <input
                  type="text"
                  value={billingInfo.addressLine2}
                  onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400"
                  placeholder="Address line 2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  value={billingInfo.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400"
                  placeholder="City"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={billingInfo.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400"
                  placeholder="ZIP Code"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {}} // State dropdown would go here
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-left text-gray-400 bg-white flex justify-between items-center"
                >
                  <span>State</span>
                  <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="relative">
                <button
                  type="button"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-left text-gray-900 bg-white flex justify-between items-center"
                  disabled
                >
                  <span>India</span>
                  <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GST number
              </label>
              <input
                type="text"
                value={billingInfo.gstNumber}
                onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400"
                placeholder="Enter GST number"
              />
            </div>

            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'Billing' && (
        <div className="space-y-6 max-w-4xl">
          <div className="bg-white rounded-lg shadow border">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Payment History</h3>
            </div>
            <div className="p-6">
              <div className="text-center text-gray-500 py-8">
                No payment history available
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;