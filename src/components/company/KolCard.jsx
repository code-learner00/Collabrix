import Avatar from '../common/Avatar'
import { formatNumber, formatINR } from '../../utils/formatters'

export default function KolCard({ kol, onViewProfile, onSendProposal, onMessage }) {
  return (
    <div className="kol-card">
      <div className="kol-card-header">
        <Avatar name={kol.name} size={42} src={kol.avatar} />
        <div>
          <div className="kol-card-name">
            {kol.name}
            {kol.verified && (
              <span
                title="Verified"
                style={{ color: 'var(--color-info)', fontSize: 11, marginLeft: 4 }}
              >
                ✔
              </span>
            )}
          </div>
          <div className="kol-card-niche">{kol.category || kol.niche}</div>
        </div>
      </div>

      <div style={{
        fontSize: 12,
        color: 'var(--color-text-muted)',
        marginBottom: 10,
        lineHeight: 1.5
      }}>
        {kol.bio && kol.bio.length > 80 ? kol.bio.slice(0, 80) + '…' : kol.bio}
      </div>

      <div className="kol-card-stats">
        <div className="kol-stat-item">
          <div className="kol-stat-value">{formatNumber(kol.followers)}</div>
          <div className="kol-stat-label">Followers</div>
        </div>
        <div className="kol-stat-item">
          <div className="kol-stat-value">{kol.engagement}%</div>
          <div className="kol-stat-label">Engage</div>
        </div>
        <div className="kol-stat-item">
          <div className="kol-stat-value">⭐ {kol.rating}</div>
          <div className="kol-stat-label">Rating</div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        flexWrap: 'wrap',
        gap: 6
      }}>
        <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
          From {formatINR(kol.priceFrom)}
        </span>
        {kol.url && (
          <a
            href={kol.url}
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: 11, color: 'var(--color-info)', textDecoration: 'underline' }}
          >
            {kol.platform} ↗
          </a>
        )}
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <button
          className="btn btn-secondary btn-sm"
          style={{ flex: 1 }}
          onClick={() => onViewProfile?.(kol)}
        >
          View Profile
        </button>
        <button
          className="btn btn-secondary btn-sm"
          style={{ flex: 1 }}
          onClick={() => onMessage?.(kol)}
        >
          Message
        </button>
        <button
          className="btn btn-primary btn-sm"
          style={{ flex: 1 }}
          onClick={() => onSendProposal?.(kol)}
        >
          Proposal
        </button>
      </div>
    </div>
  )
}