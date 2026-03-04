import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { demoCampaigns, demoCollaborations } from '../../utils/demoData'
import { formatINR } from '../../utils/formatters'
import StatusTag from '../../components/common/StatusTag'
import EmptyState from '../../components/common/EmptyState'
import ErrorState from '../../components/common/ErrorState'
import CardSkeleton from '../../components/common/CardSkeleton'
import Modal from '../../components/common/Modal'
import Avatar from '../../components/common/Avatar'
import { useNavigate } from 'react-router-dom'

export default function Campaigns() {
  const { user } = useAuth()
  const isDemo = user?.isDemo
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [campaigns, setCampaigns] = useState([])
  const [collabs, setCollabs] = useState([])

  // Confirm modal for payment release
  const [releaseTarget, setReleaseTarget] = useState(null)
  const [releasing, setReleasing] = useState(false)
  const [releaseSuccess, setReleaseSuccess] = useState(null)

  function load() {
    setLoading(true)
    setError(null)
    new Promise(res => setTimeout(() => {
      res(isDemo ? { campaigns: demoCampaigns, collabs: demoCollaborations } : { campaigns: [], collabs: [] })
    }, 700))
      .then(({ campaigns, collabs }) => {
        setCampaigns(campaigns)
        setCollabs(collabs)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load campaigns.')
        setLoading(false)
      })
  }

  useEffect(() => { load() }, [isDemo])

  function markDeliverableComplete(collabId) {
    setCollabs(p => p.map(c => c.id === collabId
      ? { ...c, deliverableApproved: true }
      : c
    ))
  }

  async function releasePayment() {
    if (!releaseTarget) return
    setReleasing(true)
    await new Promise(r => setTimeout(r, 800))
    setCollabs(p => p.map(c => c.id === releaseTarget.id
      ? { ...c, status: 'completed', paymentReleased: true }
      : c
    ))
    setCampaigns(p => p.map(camp => {
      const updated = collabs.find(c => c.id === releaseTarget.id)
      if (updated && camp.title === updated.campaignTitle) {
        return { ...camp, status: 'completed' }
      }
      return camp
    }))
    setReleasing(false)
    setReleaseSuccess(releaseTarget.campaignTitle)
    setReleaseTarget(null)
    setTimeout(() => setReleaseSuccess(null), 3000)
  }

  if (loading) return (
    <div className="page-wrapper">
      <div className="skeleton" style={{ height: 28, width: 140, marginBottom: 24, borderRadius: 6 }} />
      <CardSkeleton count={3} />
    </div>
  )

  if (error) return (
    <div className="page-wrapper">
      <ErrorState message={error} onRetry={load} />
    </div>
  )

  if (campaigns.length === 0) return (
    <div className="page-wrapper">
      <div className="page-title">Campaigns</div>
      <EmptyState
        icon="📣"
        title="No campaigns yet"
        description="Create your first campaign to start inviting KOLs."
        action={
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/company/create-campaign')}>
            Create Campaign
          </button>
        }
      />
    </div>
  )

  return (
    <div className="page-wrapper">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div className="page-title" style={{ margin: 0 }}>Campaigns</div>
        <button className="btn btn-primary btn-sm" onClick={() => navigate('/company/create-campaign')}>
          + New Campaign
        </button>
      </div>

      {releaseSuccess && (
        <div className="auth-message success" style={{ marginBottom: 16 }}>
          Payment released for "{releaseSuccess}"
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {campaigns.map(campaign => {
          const campaignCollabs = collabs.filter(c => c.campaignTitle === campaign.title)
          return (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              collabs={campaignCollabs}
              onMarkComplete={markDeliverableComplete}
              onReleasePayment={c => setReleaseTarget(c)}
            />
          )
        })}
      </div>

      <Modal
        isOpen={!!releaseTarget}
        onClose={() => !releasing && setReleaseTarget(null)}
        title="Release Payment"
        footer={
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setReleaseTarget(null)}
              disabled={releasing}
            >
              Cancel
            </button>
            <button
              className="btn btn-success btn-sm"
              onClick={releasePayment}
              disabled={releasing}
            >
              {releasing ? 'Releasing...' : 'Confirm Release'}
            </button>
          </div>
        }
      >
        <div style={{ fontSize: 14 }}>
          Release <strong>{releaseTarget && formatINR(releaseTarget.agreedBudget || releaseTarget.budget)}</strong>{' '}
          to <strong>{releaseTarget?.companyName}</strong> for "{releaseTarget?.campaignTitle}"?
        </div>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 8 }}>
          Funds will be transferred from escrow to the KOL's wallet. This cannot be undone.
        </div>
      </Modal>
    </div>
  )
}

function CampaignCard({ campaign, collabs, onMarkComplete, onReleasePayment }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <Avatar name={campaign.title} size={40} src={campaign.companyAvatar} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ fontWeight: 600, fontSize: 15 }}>{campaign.title}</div>
            <StatusTag status={campaign.status} />
          </div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>
            {campaign.platform} · Deadline {campaign.deadline}
          </div>
        </div>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setExpanded(p => !p)}
          style={{ flexShrink: 0 }}
        >
          {expanded ? 'Hide' : 'Details'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 10, fontSize: 13 }}>
        <div>
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>BUDGET</span>
          <div style={{ fontWeight: 600 }}>{formatINR(campaign.budget)}</div>
        </div>
        <div>
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>APPLIED</span>
          <div style={{ fontWeight: 600 }}>{campaign.appliedKols}</div>
        </div>
        <div>
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>APPROVED</span>
          <div style={{ fontWeight: 600 }}>{campaign.approvedKols}</div>
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: 14, borderTop: '1px solid var(--color-border)', paddingTop: 14 }}>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 10 }}>
            {campaign.description}
          </div>

          {collabs.length === 0 ? (
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
              No KOLs attached to this campaign yet.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {collabs.map(c => (
                <div key={c.id} style={{
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 8, padding: '10px 12px',
                  display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap'
                }}>
                  <Avatar name={c.companyName} size={28} src={c.companyAvatar} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{c.companyName}</div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
                      {formatINR(c.agreedBudget || c.budget)} · {c.deliverables}
                    </div>
                  </div>
                  <StatusTag status={c.status} />
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {c.deliverableSubmitted && !c.deliverableApproved && (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => onMarkComplete(c.id)}
                      >
                        Approve Deliverable
                      </button>
                    )}
                    {c.deliverableApproved && !c.paymentReleased && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => onReleasePayment(c)}
                      >
                        Release Payment
                      </button>
                    )}
                    {c.paymentReleased && (
                      <span style={{ fontSize: 12, color: 'var(--color-success)', fontWeight: 500 }}>
                        ✓ Payment released
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}