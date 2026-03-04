import StatusTag from '../common/StatusTag'
import { formatINR, formatDate } from '../../utils/formatters'

export default function CampaignCard({ campaign, onManage, onInviteKol }) {
  return (
    <div className="campaign-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
        <div className="campaign-card-title">{campaign.title}</div>
        <StatusTag status={campaign.status} />
      </div>
      <div className="campaign-card-desc">{campaign.description}</div>
      <div className="campaign-meta">
        <span className="campaign-meta-item">Budget: <strong>{formatINR(campaign.budget)}</strong></span>
        <span className="campaign-meta-item">Deadline: {formatDate(campaign.deadline)}</span>
        <span className="campaign-meta-item">Platform: {campaign.platform}</span>
        <span className="campaign-meta-item">KOLs: {campaign.approvedKols}/{campaign.appliedKols}</span>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button className="btn btn-secondary btn-sm" onClick={() => onManage?.(campaign)}>Manage</button>
        <button className="btn btn-primary btn-sm" onClick={() => onInviteKol?.(campaign)}>Invite KOL</button>
      </div>
    </div>
  )
}