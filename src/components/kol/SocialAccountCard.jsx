import { formatNumber } from '../../utils/formatters'

const platformColor = {
  Instagram: '#e1306c',
  YouTube: '#ff0000',
  X: '#000'
}

export default function SocialAccountCard({ account, onRemove }) {
  return (
    <div className="social-account-card">
      <div className="social-platform-header">
        <div className="social-platform-name" style={{ color: platformColor[account.platform] || '#333' }}>
          {account.platform}
          {account.verified && <span title="Verified" style={{ color: 'var(--color-info)', fontSize: 12 }}>✔</span>}
        </div>
        <button className="btn btn-danger btn-sm" onClick={() => onRemove?.(account.id)}>Remove</button>
      </div>
      <div style={{ marginBottom: 12 }}>
        {account.url ? (
          <a href={account.url} target="_blank" rel="noreferrer"
            style={{ fontSize: 12, color: 'var(--color-info)', textDecoration: 'underline' }}>
            {account.handle} ↗
          </a>
        ) : (
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{account.handle}</div>
        )}
      </div>
      <div className="social-stats-row">
        <div className="social-stat">
          <div className="social-stat-val">{formatNumber(account.followers)}</div>
          <div className="social-stat-lbl">Followers</div>
        </div>
        <div className="social-stat">
          <div className="social-stat-val">{account.engagementRate}%</div>
          <div className="social-stat-lbl">Engage</div>
        </div>
        <div className="social-stat">
          <div className="social-stat-val">{formatNumber(account.avgViews)}</div>
          <div className="social-stat-lbl">Avg Views</div>
        </div>
      </div>
    </div>
  )
}