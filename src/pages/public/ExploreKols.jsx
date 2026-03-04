import { Link } from 'react-router-dom'
import { demoKolProfiles } from '../../utils/demoData'
import { formatNumber, formatINR } from '../../utils/formatters'
import Avatar from '../../components/common/Avatar'

export default function ExploreKols() {
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
      <div style={{ maxWidth: 1100, margin: '32px auto', padding: '0 24px' }}>
        <h1 className="page-title">Explore KOLs</h1>
        <div className="kols-grid">
          {demoKolProfiles.map(kol => (
            <div key={kol.id} className="kol-card">
              <div className="kol-card-header">
                <Avatar name={kol.name} size={42} src={kol.avatar} />
                <div>
                  <div className="kol-card-name">
                    {kol.name}
                    {kol.verified && <span title="Verified" style={{ color: 'var(--color-info)', fontSize: 11, marginLeft: 4 }}>✔</span>}
                  </div>
                  <div className="kol-card-niche">{kol.category}</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 10, lineHeight: 1.5 }}>{kol.bio}</div>
              <div className="kol-card-stats">
                <div className="kol-stat-item"><div className="kol-stat-value">{formatNumber(kol.followers)}</div><div className="kol-stat-label">Followers</div></div>
                <div className="kol-stat-item"><div className="kol-stat-value">{kol.engagement}%</div><div className="kol-stat-label">Engage</div></div>
                <div className="kol-stat-item"><div className="kol-stat-value">⭐ {kol.rating}</div><div className="kol-stat-label">Rating</div></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>From {formatINR(kol.priceFrom)}</span>
                <a href={kol.url} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: 'var(--color-info)', textDecoration: 'underline' }}>
                  {kol.platform} ↗
                </a>
              </div>
              <Link to="/register" className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Work Together</Link>
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