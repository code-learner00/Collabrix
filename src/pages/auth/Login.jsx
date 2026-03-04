import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await login(email, password)
      navigate(user.role === 'kol' ? '/kol/dashboard' : '/company/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div
          className="auth-logo"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
          title="Back to home"
        >
          <div style={{
            width: 32, height: 32, background: 'var(--color-accent)',
            borderRadius: 6, display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 16
          }}>C</div>
          <span style={{ fontWeight: 700, fontSize: 17 }}>Collabrix</span>
        </div>

        <div className="auth-title">Sign in to your account</div>

        {error && <div className="auth-message error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div style={{ textAlign: 'right', marginBottom: 16 }}>
            <Link to="/forgot-password" style={{ fontSize: 12, color: 'var(--color-accent)' }}>
              Forgot password?
            </Link>
          </div>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--color-text-muted)' }}>
          No account?{' '}
          <Link to="/register" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>Register</Link>
        </div>

        <div style={{ marginTop: 24, padding: 14, background: 'var(--color-bg)', borderRadius: 6, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 8, letterSpacing: 0.5 }}>Demo accounts</div>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
            KOL: demo-kol@demo.com / demo123<br />
            Company: demo-company@demo.com / demo123
          </div>
        </div>
      </div>
    </div>
  )
}