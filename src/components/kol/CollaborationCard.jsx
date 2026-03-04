import Avatar from '../common/Avatar'
import StatusTag from '../common/StatusTag'
import { formatINR, formatDate } from '../../utils/formatters'

export default function CollaborationCard({ collab, onAccept, onReject, onNegotiate, onChat }) {
  return (
    <div className="collab-card">
      <div className="collab-card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar name={collab.companyName} size={36} src={collab.companyAvatar} />
          <div>
            <div className="collab-card-title">{collab.campaignTitle}</div>
            <div className="collab-card-company">{collab.companyName}</div>
          </div>
        </div>
        <StatusTag status={collab.status} />
      </div>
      <div className="collab-meta">
        <span className="collab-meta-item">Budget: <strong>{formatINR(collab.budget)}</strong></span>
        {collab.agreedBudget && collab.agreedBudget !== collab.budget && (
          <span className="collab-meta-item" style={{ color: 'var(--color-success)' }}>Agreed: <strong>{formatINR(collab.agreedBudget)}</strong></span>
        )}
        <span className="collab-meta-item">Deadline: {formatDate(collab.timeline)}</span>
        <span className="collab-meta-item">Platform: {collab.platform}</span>
      </div>
      {collab.deliverables && (
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 12, fontStyle: 'italic' }}>
          {collab.deliverables}
        </div>
      )}
      <div className="collab-actions">
        {collab.status === 'invited' && (
          <>
            <button className="btn btn-success btn-sm" onClick={() => onAccept?.(collab)}>Accept Offer</button>
            <button className="btn btn-secondary btn-sm" onClick={() => onNegotiate?.(collab)}>Negotiate</button>
            <button className="btn btn-danger btn-sm" onClick={() => onReject?.(collab)}>Reject</button>
          </>
        )}
        {collab.status === 'negotiating' && (
          <>
            <button className="btn btn-success btn-sm" onClick={() => onAccept?.(collab)}>Accept Offer</button>
            <button className="btn btn-secondary btn-sm" onClick={() => onChat?.(collab)}>Open Chat</button>
          </>
        )}
        {(collab.status === 'in-progress' || collab.status === 'accepted') && (
          <button className="btn btn-secondary btn-sm" onClick={() => onChat?.(collab)}>Open Chat</button>
        )}
        {collab.status === 'completed' && (
          <span style={{ fontSize: 12, color: 'var(--color-success)' }}>Collaboration complete</span>
        )}
        {collab.status === 'rejected' && (
          <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>You declined this offer</span>
        )}
      </div>
    </div>
  )
}