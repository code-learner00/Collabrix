import { Link } from 'react-router-dom'

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: '',
    tagline: 'Get started and explore the platform',
    features: [
      '2 collaboration proposals/month',
      'Basic profile visibility',
      'Standard payout speed',
      'Community support',
    ],
    cta: 'Start Free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '₹399',
    period: '/mo',
    tagline: 'For creators ready to monetize consistently',
    features: [
      'Unlimited proposals',
      'Priority listing in search',
      'Analytics dashboard',
      '48-hour payouts',
      'Verified badge',
    ],
    cta: 'Go Pro',
    highlight: false,
  },
  {
    name: 'Scaling',
    price: '₹899',
    period: '/yr',
    tagline: 'For high-performing creators growing fast',
    badge: 'Most Popular',
    features: [
      'Everything in Pro',
      'Featured profile placement',
      'Performance insights & optimization tips',
      'Dedicated creator support',
    ],
    cta: 'Get Scaling',
    highlight: true,
  },
  {
    name: 'Company',
    price: '₹969',
    period: '/yr',
    tagline: 'For brands actively running campaigns',
    features: [
      'Unlimited campaigns',
      'Advanced KOL filters',
      'AI-based creator matching',
      'Campaign analytics dashboard',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
]

export default function Pricing() {
  const year = new Date().getFullYear()
  return (
    <div>
      <nav className="public-nav">
        <Link to="/" className="public-nav-logo">
          <div style={{ width: 28, height: 28, background: 'var(--color-accent)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>C</div>
          Collabrix
        </Link>
        <div className="public-nav-actions">
          <Link to="/login" className="btn btn-secondary">Sign In</Link>
          <Link to="/register" className="btn btn-primary">Register</Link>
        </div>
      </nav>
      <div style={{ maxWidth: 1000, margin: '48px auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h1 className="page-title">Pricing</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>Straightforward plans. No hidden fees. All amounts in ₹.</p>
        </div>
        <div className="pricing-grid">
          {plans.map(p => (
            <div key={p.name} className={`pricing-card ${p.highlight ? 'highlighted' : ''}`}>
              {p.badge && <div className="pricing-badge">{p.badge}</div>}
              <div className="pricing-name">{p.name}</div>
              <div className="pricing-price">{p.price}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-muted)' }}>{p.period}</span></div>
              <div className="pricing-tagline">{p.tagline}</div>
              <ul className="pricing-features">
                {p.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <Link to="/register" className={`btn ${p.highlight ? 'btn-primary' : 'btn-secondary'} btn-sm`} style={{ justifyContent: 'center' }}>
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <footer style={{ padding: '20px 40px', borderTop: '1px solid var(--color-border)', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 12, marginTop: 48 }}>
        © {year} Collabrix. All rights reserved.
      </footer>
    </div>
  )
}