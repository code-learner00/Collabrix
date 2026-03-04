import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div>
      <nav className="public-nav">
        <Link to="/" className="public-nav-logo" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700 }}>
          <div style={{ width: 28, height: 28, background: 'var(--color-accent)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>K</div>
          Collabrix
        </Link>
        <div className="public-nav-actions">
          <Link to="/login" className="btn btn-secondary">Sign In</Link>
          <Link to="/register" className="btn btn-primary">Register</Link>
        </div>
      </nav>
      <div style={{ maxWidth: 800, margin: '48px auto', padding: '0 24px' }}>
        <h1 className="page-title">About Collabrix</h1>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
          Collabrix is a marketplace connecting key opinion leaders (influencers) with companies and brands for sponsored collaborations.
        </p>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
          We make it easy for KOLs to discover campaigns, negotiate deals, and receive secure payments in ₹. Brands can find the right creator voices for their campaigns with data-driven matching.
        </p>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
          Our platform supports Instagram, YouTube, and X — covering the most active creator communities in India and beyond.
        </p>
      </div>
    </div>
  )
}