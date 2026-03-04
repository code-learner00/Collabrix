import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function NotFound() {
  const navigate = useNavigate()
  const { user } = useAuth()

  function goHome() {
    if (user) navigate(`/${user.role}/dashboard`)
    else navigate('/')
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 12,
      padding: 24,
      textAlign: 'center',
      background: 'var(--color-bg)'
    }}>
      <div style={{ fontSize: 56, lineHeight: 1 }}>404</div>
      <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-text-primary)' }}>
        Page not found
      </div>
      <div style={{ fontSize: 14, color: 'var(--color-text-muted)', maxWidth: 320 }}>
        The page you're looking for doesn't exist or may have been moved.
      </div>
      <button className="btn btn-primary btn-sm" style={{ marginTop: 8 }} onClick={goHome}>
        Go back home
      </button>
    </div>
  )
}