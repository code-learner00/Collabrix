import { Link } from 'react-router-dom'
import { demoCampaigns } from '../../utils/demoData'
import StatusTag from '../../components/common/StatusTag'
import { formatINR, formatDate } from '../../utils/formatters'

export default function ExploreCampaigns() {
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
      <div style={{ maxWidth: 1100, margin: '32px auto', padding: '0 24px' }}>
        <h1 className="page-title">Open Campaigns</h1>
        <div className="campaigns-grid">
          {demoCampaigns.map(c => (
            <div key={c.id} className="campaign-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <div className="campaign-card-title">{c.title}</div>
                <StatusTag status={c.status} />
              </div>
              <div className="campaign-card-desc">{c.description}</div>
              <div className="campaign-meta">
                <span className="campaign-meta-item">Budget: <strong>{formatINR(c.budget)}</strong></span>
                <span className="campaign-meta-item">Deadline: {formatDate(c.deadline)}</span>
                <span className="campaign-meta-item">Platform: {c.platform}</span>
              </div>
              <Link to="/register" className="btn btn-primary btn-sm">Apply Now</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}