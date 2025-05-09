import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Dashboard from './components/Dashboard'
import SignUp from './components/SignUp'
import Autodial from './components/Autodial'
import Survey from './components/Survey'
import Layout from './components/Layout'
import ContactLists from './components/ContactLists'
import CallLogs from './components/CallLogs'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/call-logs" element={<Layout><CallLogs /></Layout>} />
        <Route path="/contacts" element={<Layout><ContactLists /></Layout>} />
        <Route path="/campaigns" element={<Layout><Dashboard /></Layout>} />
        <Route path="/campaigns/autodial" element={<Layout><Autodial /></Layout>} />
        <Route path="/campaigns/survey" element={<Layout><Survey /></Layout>} />
        <Route path="/users-teams" element={<Layout><Dashboard /></Layout>} />
        <Route path="/templates" element={<Layout><Dashboard /></Layout>} />
        <Route path="/virtual-numbers" element={<Layout><Dashboard /></Layout>} />
        <Route path="/billing" element={<Layout><Dashboard /></Layout>} />
        <Route path="/settings" element={<Layout><Dashboard /></Layout>} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
