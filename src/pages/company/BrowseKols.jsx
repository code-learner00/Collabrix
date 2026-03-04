import { useState, useMemo } from 'react'
import { demoKolProfiles } from '../../utils/demoData'
import KolCard from '../../components/company/KolCard'
import CampaignFilters from '../../components/company/CampaignFilters'
import { useDebounce } from '../../hooks/useDebounce'
import Modal from '../../components/common/Modal'
import Pagination from '../../components/common/Pagination'
import EmptyState from '../../components/common/EmptyState'
import Avatar from '../../components/common/Avatar'
import { formatNumber, formatINR } from '../../utils/formatters'
import { useNotifications } from '../../context/NotificationContext'
import { useMessages } from '../../context/MessagesContext'

const PER_PAGE = 6

const MESSAGE_TYPES = [
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'sponsorship', label: 'Sponsorship' },
  { value: 'product_seeding', label: 'Product Seeding' },
  { value: 'custom', label: 'Custom' },
]

function getDefaultMessage(type, kolName) {
  switch (type) {
    case 'collaboration':
      return `Hi ${kolName},\n\nWe came across your content and feel your audience aligns strongly with our brand. We would love to explore a collaboration opportunity with you.\n\nCould you share your availability and rates for a potential campaign? We are happy to discuss deliverables and timeline at your convenience.\n\nLooking forward to hearing from you.`
    case 'sponsorship':
      return `Hi ${kolName},\n\nWe are interested in a sponsorship arrangement with you for our upcoming product launch. We believe your platform would be a great fit for reaching our target audience.\n\nWe would like to discuss a dedicated integration — either a video feature, a story highlight, or a post series. Please let us know if you are open to a sponsorship discussion.\n\nBest regards.`
    case 'product_seeding':
      return `Hi ${kolName},\n\nWe would love to send you our latest product to try. There are no obligations — we simply think you would enjoy it and that your audience might find it relevant.\n\nIf you are open to receiving a complimentary sample and sharing your honest thoughts, please share your shipping address at your earliest convenience.\n\nThank you.`
    case 'custom':
      return ''
    default:
      return ''
  }
}

export default function BrowseKols() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({})
  const [page, setPage] = useState(1)

  const [viewKol, setViewKol] = useState(null)

  const [messageKol, setMessageKol] = useState(null)
  const [messageType, setMessageType] = useState('collaboration')
  const [messageText, setMessageText] = useState('')
  const [messageError, setMessageError] = useState('')
  const [messageSending, setMessageSending] = useState(false)

  const [proposalKol, setProposalKol] = useState(null)
  const [proposalSent, setProposalSent] = useState(false)

  const [toast, setToast] = useState(null)

  const debouncedSearch = useDebounce(search)
  const { pushNotification } = useNotifications()
  const { injectConversation } = useMessages()

  const filtered = useMemo(() => {
    return demoKolProfiles.filter(k => {
      if (debouncedSearch && !k.name.toLowerCase().includes(debouncedSearch.toLowerCase())) return false
      if (filters.platform && k.platform !== filters.platform) return false
      if (filters.country && k.country !== filters.country) return false
      if (filters.minFollowers && k.followers < Number(filters.minFollowers)) return false
      return true
    })
  }, [debouncedSearch, filters])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  function showToast(msg, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  function openMessageModal(kol) {
    setMessageKol(kol)
    setMessageType('collaboration')
    setMessageText(getDefaultMessage('collaboration', kol.name))
    setMessageError('')
    setMessageSending(false)
  }

  function handleMessageTypeChange(e) {
    const type = e.target.value
    setMessageType(type)
    setMessageText(getDefaultMessage(type, messageKol?.name || ''))
    setMessageError('')
  }

  async function handleSendMessage() {
    if (!messageText.trim()) {
      setMessageError('Message cannot be empty.')
      return
    }
    setMessageError('')
    setMessageSending(true)

    try {
      await fetch('/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientId: messageKol.id,
          recipientName: messageKol.name,
          type: messageType,
          message: messageText,
        }),
      }).catch(() => {
        // Swallow network error in demo — no backend running
      })

      injectConversation(messageKol, messageText)
      pushNotification(`Message sent to ${messageKol.name}`, '/company/messages')
      setMessageKol(null)
      showToast(`Message sent to ${messageKol.name} successfully.`)
    } finally {
      setMessageSending(false)
    }
  }

  function closeMessageModal() {
    setMessageKol(null)
    setMessageError('')
    setMessageText('')
    setMessageSending(false)
  }

  function openProposalModal(kol) {
    setProposalKol(kol)
    setProposalSent(false)
  }

  function confirmProposal() {
    setProposalSent(true)
    pushNotification(
      `Collaboration proposal sent to ${proposalKol.name}`,
      '/company/campaigns'
    )
  }

  return (
    <div className="page-wrapper">
      <div className="page-title">Browse KOLs</div>

      <div style={{ marginBottom: 16 }}>
        <input
          className="form-input"
          placeholder="Search by name..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          style={{ maxWidth: 320 }}
        />
      </div>

      <CampaignFilters
        filters={filters}
        onChange={f => { setFilters(f); setPage(1) }}
      />

      {paginated.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No KOLs found"
          description="Try adjusting your filters."
        />
      ) : (
        <>
          <div className="kols-grid">
            {paginated.map(kol => (
              <KolCard
                key={kol.id}
                kol={kol}
                onViewProfile={() => setViewKol(kol)}
                onSendProposal={() => openProposalModal(kol)}
                onMessage={() => openMessageModal(kol)}
              />
            ))}
          </div>
          <Pagination
            current={page}
            total={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      {/* ── View Profile Modal ── */}
      <Modal
        isOpen={!!viewKol}
        onClose={() => setViewKol(null)}
        title={viewKol?.name || 'KOL Profile'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setViewKol(null)}>Close</button>
            <button className="btn btn-secondary" onClick={() => { closeMessageModal(); openMessageModal(viewKol); setViewKol(null) }}>
              Message
            </button>
            <button className="btn btn-primary" onClick={() => { openProposalModal(viewKol); setViewKol(null) }}>
              Send Proposal
            </button>
          </>
        }
      >
        {viewKol && (
          <div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 18 }}>
              <Avatar name={viewKol.name} size={56} src={viewKol.avatar} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{viewKol.name}</div>
                <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{viewKol.category}</div>
                <a
                  href={viewKol.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 12, color: 'var(--color-info)', textDecoration: 'underline' }}
                >
                  {viewKol.platform} profile ↗
                </a>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 18, lineHeight: 1.6 }}>
              {viewKol.bio}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: 'Platform', value: viewKol.platform },
                { label: 'Followers', value: formatNumber(viewKol.followers) },
                { label: 'Engagement', value: `${viewKol.engagement}%` },
                { label: 'Rating', value: `⭐ ${viewKol.rating}` },
                { label: 'Starting Price', value: formatINR(viewKol.priceFrom) },
                { label: 'Country', value: viewKol.country },
              ].map(r => (
                <div key={r.label}>
                  <div style={{ fontSize: 11, textTransform: 'uppercase', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 2 }}>
                    {r.label}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{r.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* ── Send Proposal Modal ── */}
      <Modal
        isOpen={!!proposalKol}
        onClose={() => setProposalKol(null)}
        title="Send Proposal"
        footer={
          !proposalSent && (
            <>
              <button className="btn btn-secondary" onClick={() => setProposalKol(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={confirmProposal}>Confirm Proposal</button>
            </>
          )
        }
      >
        {proposalKol && (
          proposalSent ? (
            <div className="inline-confirm">
              Proposal sent to {proposalKol.name}. They will be notified in real time.
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Avatar name={proposalKol.name} size={44} src={proposalKol.avatar} />
              <div>
                <div style={{ fontWeight: 600 }}>{proposalKol.name}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{proposalKol.category}</div>
              </div>
            </div>
          )
        )}
      </Modal>

      {/* ── Message Modal ── */}
      <Modal
        isOpen={!!messageKol}
        onClose={closeMessageModal}
        title="Send Message"
        footer={
          <>
            <button className="btn btn-secondary" onClick={closeMessageModal} disabled={messageSending}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSendMessage} disabled={messageSending}>
              {messageSending ? 'Sending...' : 'Send Message'}
            </button>
          </>
        }
      >
        {messageKol && (
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '12px 14px', background: 'var(--color-bg)',
              borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
              marginBottom: 20
            }}>
              <Avatar name={messageKol.name} size={48} src={messageKol.avatar} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{messageKol.name}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>
                  {messageKol.category} · {messageKol.platform}
                </div>
                <a
                  href={messageKol.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 11, color: 'var(--color-info)', textDecoration: 'underline' }}
                >
                  {messageKol.platform} profile ↗
                </a>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Message Type</label>
              <select className="form-input" value={messageType} onChange={handleMessageTypeChange}>
                {MESSAGE_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="form-input"
                rows={8}
                value={messageText}
                onChange={e => { setMessageText(e.target.value); if (messageError) setMessageError('') }}
                placeholder="Write your message here..."
                style={{ resize: 'vertical', lineHeight: 1.6, fontSize: 13 }}
              />
              {messageError && (
                <div className="form-error" style={{ marginTop: 6 }}>{messageError}</div>
              )}
            </div>

            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: -8 }}>
              A default message has been pre-filled based on the selected type. Edit it before sending.
            </div>
          </div>
        )}
      </Modal>

      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>{toast.msg}</div>
        </div>
      )}
    </div>
  )
}