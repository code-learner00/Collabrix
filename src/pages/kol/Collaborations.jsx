import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { demoCollaborations } from '../../utils/demoData'
import { formatINR } from '../../utils/formatters'
import { useMessages } from '../../context/MessagesContext'
import StatusTag from '../../components/common/StatusTag'
import Avatar from '../../components/common/Avatar'
import EmptyState from '../../components/common/EmptyState'
import ErrorState from '../../components/common/ErrorState'
import TableSkeleton from '../../components/common/TableSkeleton'
import Modal from '../../components/common/Modal'

const TABS = ['invited', 'negotiating', 'in-progress', 'completed', 'rejected']
const TAB_LABELS = {
  invited: 'Incoming',
  negotiating: 'Negotiating',
  'in-progress': 'Active',
  completed: 'Completed',
  rejected: 'Rejected',
}

export default function Collaborations() {
  const { user } = useAuth()
  const isDemo = user?.isDemo
  const { pushAcceptanceMessage } = useMessages()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [collabs, setCollabs] = useState([])
  const [activeTab, setActiveTab] = useState('invited')

  // Negotiate modal
  const [negotiateTarget, setNegotiateTarget] = useState(null)
  const [counterOffer, setCounterOffer] = useState('')
  const [counterError, setCounterError] = useState('')

  // Deliverable submit modal
  const [deliverableTarget, setDeliverableTarget] = useState(null)
  const [deliverableNote, setDeliverableNote] = useState('')

  // Acceptance flash banner
  const [acceptedTitle, setAcceptedTitle] = useState(null)

  function load() {
    setLoading(true)
    setError(null)
    new Promise(res => setTimeout(() => res(isDemo ? demoCollaborations : []), 700))
      .then(data => { setCollabs(data); setLoading(false) })
      .catch(() => { setError('Failed to load collaborations.'); setLoading(false) })
  }

  useEffect(() => { load() }, [isDemo])

  function accept(collab) {
    const agreed = collab.agreedBudget || collab.budget

    // Update collaboration status locally
    setCollabs(p => p.map(c =>
      c.id === collab.id
        ? { ...c, status: 'in-progress', agreedBudget: agreed }
        : c
    ))

    // Push acceptance message into the shared chat thread via MessagesContext.
    // Messages.jsx reads from the same context so it appears there immediately.
    pushAcceptanceMessage(collab.campaignTitle, agreed)

    // Show confirmation banner, then switch tab to active
    setAcceptedTitle(collab.campaignTitle)
    setTimeout(() => {
      setAcceptedTitle(null)
      setActiveTab('in-progress')
    }, 1800)
  }

  function reject(id) {
    setCollabs(p => p.map(c => c.id === id ? { ...c, status: 'rejected' } : c))
  }

  function openNegotiate(collab) {
    setNegotiateTarget(collab)
    setCounterOffer(collab.agreedBudget || collab.budget)
    setCounterError('')
  }

  function submitCounter() {
    if (!counterOffer || Number(counterOffer) <= 0) {
      setCounterError('Enter a valid amount')
      return
    }
    setCollabs(p => p.map(c =>
      c.id === negotiateTarget.id
        ? { ...c, agreedBudget: Number(counterOffer), status: 'negotiating' }
        : c
    ))
    setNegotiateTarget(null)
    setCounterOffer('')
  }

  function openDeliverableSubmit(collab) {
    setDeliverableTarget(collab)
    setDeliverableNote('')
  }

  function submitDeliverable() {
    setCollabs(p => p.map(c =>
      c.id === deliverableTarget.id
        ? { ...c, deliverableSubmitted: true, deliverableNote }
        : c
    ))
    setDeliverableTarget(null)
    setDeliverableNote('')
  }

  const filtered = collabs.filter(c => c.status === activeTab)
  const tabCounts = TABS.reduce((acc, t) => {
    acc[t] = collabs.filter(c => c.status === t).length
    return acc
  }, {})

  if (loading) return (
    <div className="page-wrapper">
      <div className="skeleton" style={{ height: 28, width: 180, marginBottom: 20, borderRadius: 6 }} />
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {TABS.map(t => (
          <div key={t} className="skeleton" style={{ height: 32, width: 90, borderRadius: 6 }} />
        ))}
      </div>
      <TableSkeleton rows={4} cols={5} />
    </div>
  )

  if (error) return (
    <div className="page-wrapper">
      <ErrorState message={error} onRetry={load} />
    </div>
  )

  return (
    <div className="page-wrapper">
      <div className="page-title">Collaborations</div>

      {acceptedTitle && (
        <div className="auth-message success" style={{ marginBottom: 16 }}>
          ✓ Offer accepted for <strong>{acceptedTitle}</strong>. A confirmation message has been sent to the brand.
        </div>
      )}

      <div className="tab-bar" style={{ marginBottom: 20 }}>
        {TABS.map(t => (
          <button
            key={t}
            className={`tab-btn ${activeTab === t ? 'active' : ''}`}
            onClick={() => setActiveTab(t)}
          >
            {TAB_LABELS[t]}
            {tabCounts[t] > 0 && (
              <span style={{
                marginLeft: 6,
                background: activeTab === t ? 'var(--color-accent)' : 'var(--color-border)',
                color: activeTab === t ? '#fff' : 'var(--color-text-muted)',
                borderRadius: 10, fontSize: 10, fontWeight: 700,
                padding: '1px 6px',
              }}>
                {tabCounts[t]}
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={activeTab === 'invited' ? '📬' : activeTab === 'completed' ? '✅' : '📂'}
          title={`No ${TAB_LABELS[activeTab].toLowerCase()} collaborations`}
          description={
            activeTab === 'invited'
              ? 'Brands will send you invites when they find your profile.'
              : 'Nothing here yet.'
          }
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(collab => (
            <CollabCard
              key={collab.id}
              collab={collab}
              onAccept={() => accept(collab)}
              onReject={() => reject(collab.id)}
              onNegotiate={() => openNegotiate(collab)}
              onSubmitDeliverable={() => openDeliverableSubmit(collab)}
            />
          ))}
        </div>
      )}

      {/* Negotiate modal */}
      <Modal
        isOpen={!!negotiateTarget}
        onClose={() => setNegotiateTarget(null)}
        title="Counter Offer"
        footer={
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => setNegotiateTarget(null)}>
              Cancel
            </button>
            <button className="btn btn-primary btn-sm" onClick={submitCounter}>
              Send Counter
            </button>
          </div>
        }
      >
        <div style={{ fontSize: 13, marginBottom: 12, color: 'var(--color-text-muted)' }}>
          Campaign:{' '}
          <strong style={{ color: 'var(--color-text-primary)' }}>
            {negotiateTarget?.campaignTitle}
          </strong>
        </div>
        <div style={{ fontSize: 13, marginBottom: 4 }}>
          Their budget: <strong>{negotiateTarget && formatINR(negotiateTarget.budget)}</strong>
        </div>
        <div className="form-group" style={{ marginTop: 12 }}>
          <label className="form-label">Your counter offer (₹)</label>
          <input
            className={`form-input ${counterError ? 'input-error' : ''}`}
            type="number"
            value={counterOffer}
            onChange={e => { setCounterOffer(e.target.value); setCounterError('') }}
            placeholder="e.g. 22000"
          />
          {counterError && <div className="form-error">{counterError}</div>}
        </div>
      </Modal>

      {/* Submit deliverable modal */}
      <Modal
        isOpen={!!deliverableTarget}
        onClose={() => setDeliverableTarget(null)}
        title="Submit Deliverable"
        footer={
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => setDeliverableTarget(null)}>
              Cancel
            </button>
            <button className="btn btn-primary btn-sm" onClick={submitDeliverable}>
              Submit
            </button>
          </div>
        }
      >
        <div style={{ fontSize: 13, marginBottom: 12, color: 'var(--color-text-muted)' }}>
          {deliverableTarget?.deliverables}
        </div>
        <div className="form-group">
          <label className="form-label">Notes / links for the brand</label>
          <textarea
            className="form-textarea"
            rows={3}
            value={deliverableNote}
            onChange={e => setDeliverableNote(e.target.value)}
            placeholder="Share post links, drive links, or notes..."
          />
        </div>
      </Modal>
    </div>
  )
}

function CollabCard({ collab, onAccept, onReject, onNegotiate, onSubmitDeliverable }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <Avatar name={collab.companyName} size={36} src={collab.companyAvatar} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{collab.campaignTitle}</div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 1 }}>
            {collab.companyName} · {collab.platform}
          </div>
          {collab.companyWebsite && (
            <a
              href={collab.companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 11,
                color: 'var(--color-accent)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 3,
                marginTop: 2,
              }}
              onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
            >
              🌐 {collab.companyWebsite.replace('https://', '')}
            </a>
          )}
        </div>
        <StatusTag status={collab.status} />
      </div>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13 }}>
        <div>
          <span style={{ color: 'var(--color-text-muted)', fontSize: 11 }}>BUDGET</span>
          <div style={{ fontWeight: 600 }}>{formatINR(collab.budget)}</div>
        </div>
        {collab.agreedBudget && collab.agreedBudget !== collab.budget && (
          <div>
            <span style={{ color: 'var(--color-text-muted)', fontSize: 11 }}>AGREED</span>
            <div style={{ fontWeight: 600, color: 'var(--color-success)' }}>
              {formatINR(collab.agreedBudget)}
            </div>
          </div>
        )}
        <div>
          <span style={{ color: 'var(--color-text-muted)', fontSize: 11 }}>DEADLINE</span>
          <div>{collab.timeline}</div>
        </div>
      </div>

      <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
        {collab.deliverables}
      </div>

      {collab.deliverableSubmitted && (
        <div style={{
          fontSize: 12, color: 'var(--color-success)',
          background: 'var(--color-success-light)',
          padding: '6px 10px', borderRadius: 6,
        }}>
          ✓ Deliverable submitted — awaiting brand approval
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
        {collab.status === 'invited' && (
          <>
            <button className="btn btn-success btn-sm" onClick={onAccept}>Accept</button>
            <button className="btn btn-secondary btn-sm" onClick={onNegotiate}>Negotiate</button>
            <button className="btn btn-danger btn-sm" onClick={onReject}>Reject</button>
          </>
        )}
        {collab.status === 'negotiating' && (
          <>
            <button className="btn btn-success btn-sm" onClick={onAccept}>Accept Offer</button>
            <button className="btn btn-secondary btn-sm" onClick={onNegotiate}>Counter</button>
          </>
        )}
        {collab.status === 'in-progress' && !collab.deliverableSubmitted && (
          <button className="btn btn-primary btn-sm" onClick={onSubmitDeliverable}>
            Submit Deliverable
          </button>
        )}
      </div>
    </div>
  )
}