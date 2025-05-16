import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    // Basic validation
    if (!username || !password) {
      setMessage('Username and password are required')
      setLoading(false)
      return
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/login', {
        username,
        password,
      })

      console.log('Login response:', response.data)

      // Store the token and user info in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', username)

        setMessage('Login successful! Redirecting...')

        // Redirect to the admin dashboard
        navigate('/admin')
      } else {
        setMessage('Login failed: No token received')
      }
    } catch (error) {
      console.error('Login error:', error)
      setMessage(
        error.response?.data?.message ||
          'Login failed. Please check your credentials and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {message && (
          <div
            className={`message ${
              message.includes('successful') ? 'success' : 'error'
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  )
}

export default Login