import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import './App.css'
import React from 'react'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoggedIn(true)
    navigate('/dashboard')
  }

  if (isLoggedIn) {
    return <Dashboard />
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side with illustration */}
      <div className="w-1/2 bg-green-50 p-12 flex flex-col">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Neon Flake" className="h-8" />
            <span className="text-2xl font-semibold text-green-500">NeonFlake</span>
          </div>
        </div>
        <div className="flex flex-col justify-center flex-grow items-start">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Simplify and Automate<br />
            Your Calling Process
          </h2>
          <div className="w-3/4">
            <img src="/illustration.svg" alt="Illustration" className="w-full" />
          </div>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="w-1/2 p-12 flex flex-col justify-center">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 mb-8">Login</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <a href="#" className="text-sm text-green-500 hover:text-green-600">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
            >
              Login
            </button>
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button 
                onClick={() => navigate('/signup')} 
                className="text-green-500 hover:text-green-600"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
