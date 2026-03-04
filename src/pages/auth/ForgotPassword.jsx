import { useState } from 'react'
import { Link } from 'react-router-dom'
import { forgotPasswordAPI } from '../../api/auth'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setMsg(null)
    setError('')
    setLoading(true)
    try {
      const res = await forgotPasswordAPI(email)
      setMsg(res.message)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-mark">K</div>
          <span className="auth-logo-text">Collabrix</span>
        </div>
        <div className="auth-title">Reset Password</div>
        <div className="auth-subtitle">Enter your email to receive a reset link</div>

        {msg && <div className="auth-message success">{msg}</div>}
        {error && <div className="auth-message error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <div className="auth-footer-text">
          <Link to="/login">Back to Sign In</Link>
        </div>
      </div>
    </div>
  )
}