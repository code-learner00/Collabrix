import { Link, useNavigate } from 'react-router-dom'
import { homepageStats } from '../../utils/demoData'
import { formatINR, formatNumber } from '../../utils/formatters'

const howItWorks = [
  {
    step: '01',
    title: 'Create your profile',
    desc: 'Creators add their audience details and past performance. Brands share campaign goals and budget.'
  },
  {
    step: '02',
    title: 'Find the right match',
    desc: 'Search and filter by platform, location or budget to find a suitable influencer.'
  },
  {
    step: '03',
    title: 'Agree on terms',
    desc: 'Discuss deliverables, timeline and pricing through chat before confirming the collaboration.'
  },
  {
    step: '04',
    title: 'Deliver and review',
    desc: 'The creator submits the content. The brand reviews and approves it once satisfied.'
  },
  {
    step: '05',
    title: 'Release payment',
    desc: 'Payment is securely held and released after the work is completed and approved.'
  },
]

export default function Home() {
  const year = new Date().getFullYear()
  const navigate = useNavigate()

  return (
    <div>
      <nav className="public-nav">
        <div
          className="public-nav-logo"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          <div style={{
            width: 28, height: 28, background: 'var(--color-accent)',
            borderRadius: 4, display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14
          }}>C</div>
          Collabrix
        </div>
        <div className="public-nav-links">
          <Link to="/about">About</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/explore-kols">Explore KOLs</Link>
          <Link to="/explore-campaigns">Campaigns</Link>
        </div>
        <div className="public-nav-actions">
          <Link to="/login" className="btn btn-secondary">Sign In</Link>
          <Link to="/register" className="btn btn-primary">Get Started</Link>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-title">
          Where Brands Meet<br />the Right Creators
        </div>
        <div className="hero-sub">
          Collabrix enables brands to collaborate with creators who deliver measurable outcomes. Our platform transforms influencer engagement into strategic business impact.
        </div>
        <div className="hero-actions">
          {/* KOL CTA — goes to register with kol tab (default) */}
          <Link to="/register" className="btn btn-primary btn-lg">
            Start as a KOL
          </Link>
          {/* Brand CTA — goes to register with company tab pre-selected */}
          <Link to="/register?role=company" className="btn btn-secondary btn-lg">
            I am a Brand
          </Link>
        </div>
      </div>

      {/* Dynamic stats bar */}
      <div className="home-stats-bar">
        <div className="home-stat-item">
          <div className="home-stat-value">{formatNumber(homepageStats.activeKols)}</div>
          <div className="home-stat-label">Active KOLs</div>
        </div>
        <div className="home-stat-item">
          <div className="home-stat-value">{formatNumber(homepageStats.companies)}</div>
          <div className="home-stat-label">Companies</div>
        </div>
        <div className="home-stat-item">
          <div className="home-stat-value">{formatINR(homepageStats.paidOut)}</div>
          <div className="home-stat-label">Paid Out</div>
        </div>
        <div className="home-stat-item">
          <div className="home-stat-value">{formatNumber(homepageStats.campaignsRun)}+</div>
          <div className="home-stat-label">Campaigns Run</div>
        </div>
      </div>

      {/* How it works */}
      <div style={{ background: 'var(--color-surface)', padding: '56px 40px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div className="page-title" style={{ marginBottom: 8 }}>How it works</div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>Five steps from sign-up to payment</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
            {howItWorks.map(s => (
              <div key={s.step} className="card">
                <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--color-accent)', marginBottom: 10 }}>{s.step}</div>
                <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 14 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer style={{
        padding: '20px 40px', borderTop: '1px solid var(--color-border)',
        textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 12
      }}>
        © {year} Collabrix. All rights reserved.
      </footer>
    </div>
  )
}