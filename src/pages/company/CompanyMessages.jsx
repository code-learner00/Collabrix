import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { formatINR } from '../../utils/formatters'
import {
  demoMessagesCompany,
  demoCompanyChatThread1,
  demoCompanyChatThread2,
} from '../../utils/demoData'
import EmptyState from '../../components/common/EmptyState'
import Avatar from '../../components/common/Avatar'
import StatusTag from '../../components/common/StatusTag'

function isMobileWidth() {
  return window.innerWidth <= 768
}

const BOTTOM_THRESHOLD = 80

const threadSeeds = {
  'company-thread-1': demoCompanyChatThread1,
  'company-thread-2': demoCompanyChatThread2,
}

export default function CompanyMessages() {
  const { user } = useAuth()
  const conversations = user?.isDemo ? demoMessagesCompany : []

  const [convList, setConvList] = useState(conversations)
  const [messageMap, setMessageMap] = useState(() => {
    const map = {}
    conversations.forEach(conv => {
      map[conv.id] = conv.threadKey && threadSeeds[conv.threadKey]
        ? [...threadSeeds[conv.threadKey]]
        : []
    })
    return map
  })

  const [activeConv, setActiveConv] = useState(() => {
    if (isMobileWidth()) return null
    return conversations[0] || null
  })

  const [isMobile, setIsMobile] = useState(isMobileWidth)
  const [input, setInput] = useState('')
  const [showOffer, setShowOffer] = useState(false)
  const [offerAmount, setOfferAmount] = useState('')


  const scrollContainerRef = useRef(null)

  // Tracks the message count from the last render so we can tell
  // "initial thread load" apart from "a new message just arrived"
  const prevMessageCountRef = useRef(null)

  // ── Helpers ───────────────────────────────────────────────────
  function isNearBottom() {
    const el = scrollContainerRef.current
    if (!el) return false
    return el.scrollHeight - el.scrollTop - el.clientHeight <= BOTTOM_THRESHOLD
  }

  function scrollToTop() {
    const el = scrollContainerRef.current
    if (el) el.scrollTop = 0
  }

  function scrollToBottom(behavior = 'smooth') {
    const el = scrollContainerRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior })
  }

  // ── Resize handler ────────────────────────────────────────────
  useEffect(() => {
    function handleResize() {
      const mobile = isMobileWidth()
      setIsMobile(mobile)
      if (!mobile && !activeConv && conversations.length > 0) {
        setActiveConv(conversations[0])
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [activeConv, conversations])

  useEffect(() => {
    if (!activeConv) return
    const currentMessages = messageMap[activeConv.id] || []
    prevMessageCountRef.current = currentMessages.length
    requestAnimationFrame(() => {
      scrollToTop()
    })
  }, [activeConv?.id])

  useEffect(() => {
    if (!activeConv) return

    const messages = messageMap[activeConv.id] || []
    const currentCount = messages.length
    const previousCount = prevMessageCountRef.current

    if (previousCount === null || previousCount === currentCount) {
      prevMessageCountRef.current = currentCount
      return
    }

    // Genuine new message: only auto-scroll if user is already at the bottom
    if (isNearBottom()) {
      scrollToBottom('smooth')
    }

    prevMessageCountRef.current = currentCount
  }, [messageMap[activeConv?.id]?.length])

  // ── Action handlers ───────────────────────────────────────────
  function selectConv(conv) {
    setActiveConv(conv)
    setInput('')
    setShowOffer(false)
    setConvList(p => p.map(c => c.id === conv.id ? { ...c, unread: 0 } : c))
    if (!messageMap[conv.id]) {
      setMessageMap(p => ({
        ...p,
        [conv.id]: conv.threadKey && threadSeeds[conv.threadKey]
          ? [...threadSeeds[conv.threadKey]]
          : [],
      }))
    }
  }

  function goBackToList() {
    setActiveConv(null)
    setInput('')
    setShowOffer(false)
  }

  function sendMessage() {
    if (!input.trim() || !activeConv) return
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const msg = { id: Date.now().toString(), sender: 'own', text: input, time: now }
    setMessageMap(p => ({ ...p, [activeConv.id]: [...(p[activeConv.id] || []), msg] }))
    setConvList(p => p.map(c =>
      c.id === activeConv.id ? { ...c, lastMessage: input, time: now } : c
    ))
    setInput('')
    requestAnimationFrame(() => scrollToBottom('smooth'))
  }

  function sendOffer() {
    if (!offerAmount || !activeConv) return
    const text = `Final Offer: ₹${Number(offerAmount).toLocaleString('en-IN')} — Please review and confirm to proceed.`
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const msg = { id: Date.now().toString(), sender: 'own', text, time: now }
    setMessageMap(p => ({ ...p, [activeConv.id]: [...(p[activeConv.id] || []), msg] }))
    setConvList(p => p.map(c =>
      c.id === activeConv.id ? { ...c, lastMessage: text, time: now } : c
    ))
    setShowOffer(false)
    setOfferAmount('')
    requestAnimationFrame(() => scrollToBottom('smooth'))
  }

  if (conversations.length === 0) {
    return (
      <div className="page-wrapper">
        <EmptyState
          icon="✉️"
          title="No messages yet"
          description="Messages from KOLs will appear here once you start campaigns."
        />
      </div>
    )
  }

  const messages = activeConv ? (messageMap[activeConv.id] || []) : []

  // ── Mobile: list view ─────────────────────────────────────────
  if (isMobile && !activeConv) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{
          padding: '16px',
          borderBottom: '1px solid var(--color-border)',
          fontWeight: 600,
          fontSize: 15,
        }}>
          Messages
        </div>
        {convList.map(conv => (
          <ConvItem key={conv.id} conv={conv} onClick={() => selectConv(conv)} size={40} />
        ))}
      </div>
    )
  }

  // ── Mobile: thread view ───────────────────────────────────────
  if (isMobile && activeConv) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column',
        height: 'calc(100vh - var(--topbar-height))',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 16px', background: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
        }}>
          <button
            onClick={goBackToList}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 18, color: 'var(--color-text-secondary)',
              padding: '4px 8px 4px 0', lineHeight: 1,
            }}
            aria-label="Back to conversations"
          >
            ←
          </button>
          <Avatar name={activeConv.name} size={32} src={activeConv.avatar} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{activeConv.name}</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
              {activeConv.campaignTitle}
            </div>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="chat-messages"
          style={{ flex: 1, overflowY: 'auto', minHeight: 0, display: 'flex', flexDirection: 'column' }}
        >
          {messages.map(m => <ChatBubble key={m.id} m={m} />)}
        </div>

        <OfferBar
          show={showOffer}
          amount={offerAmount}
          onChange={setOfferAmount}
          onSend={sendOffer}
          onCancel={() => setShowOffer(false)}
          compact
        />
        <ChatInputArea
          input={input}
          onChange={setInput}
          onSend={sendMessage}
          onToggleOffer={() => setShowOffer(p => !p)}
          compact
        />
      </div>
    )
  }

  // ── Desktop: sidebar + thread + panel ────────────────────────
  return (
    <div className="chat-layout">
      <div className="chat-sidebar">
        <div className="chat-sidebar-header">Messages</div>
        {convList.map(conv => (
          <ConvItem
            key={conv.id}
            conv={conv}
            active={activeConv?.id === conv.id}
            onClick={() => selectConv(conv)}
            size={36}
          />
        ))}
      </div>

      {activeConv ? (
        <>
          <div className="chat-main">
            <div className="chat-main-header">
              <Avatar name={activeConv.name} size={32} src={activeConv.avatar} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{activeConv.name}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                  {activeConv.campaignTitle}
                </div>
              </div>
            </div>

            <div
              ref={scrollContainerRef}
              className="chat-messages"
              style={{ overflowY: 'auto', minHeight: 0, display: 'flex', flexDirection: 'column' }}
            >
              {messages.map(m => <ChatBubble key={m.id} m={m} />)}
            </div>

            <OfferBar
              show={showOffer}
              amount={offerAmount}
              onChange={setOfferAmount}
              onSend={sendOffer}
              onCancel={() => setShowOffer(false)}
            />
            <ChatInputArea
              input={input}
              onChange={setInput}
              onSend={sendMessage}
              onToggleOffer={() => setShowOffer(p => !p)}
            />
          </div>

          <div className="chat-panel">
            <div className="chat-panel-header">KOL Details</div>
            <div className="chat-panel-body">
              <div className="chat-panel-label">KOL</div>
              <div className="chat-panel-value">{activeConv.name}</div>

              <div className="chat-panel-label">Campaign</div>
              <div className="chat-panel-value">{activeConv.campaignTitle}</div>

              <div className="chat-panel-label">Budget</div>
              <div className="chat-panel-value">{formatINR(activeConv.budget)}</div>

              {activeConv.agreedBudget && (
                <>
                  <div className="chat-panel-label">Agreed Budget</div>
                  <div className="chat-panel-value" style={{ color: 'var(--color-success)', fontWeight: 600 }}>
                    {formatINR(activeConv.agreedBudget)}
                  </div>
                </>
              )}

              <div className="chat-panel-label">Status</div>
              <div className="chat-panel-value">
                <StatusTag status={activeConv.status} />
              </div>

              <div style={{ borderTop: '1px solid var(--color-border)', marginTop: 16, paddingTop: 16 }}>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => window.location.href = '/company/campaigns'}
                >
                  View Campaign
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: 'var(--color-text-muted)', fontSize: 13,
        }}>
          Select a conversation to continue
        </div>
      )}
    </div>
  )
}

// ── Sub-components ──────────────────────────────────────────────

function ConvItem({ conv, active, onClick, size }) {
  return (
    <div
      className={`chat-conversation-item ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      <Avatar name={conv.name} size={size} src={conv.avatar} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="chat-conv-name">{conv.name}</div>
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', flexShrink: 0 }}>
            {conv.time}
          </div>
        </div>
        <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 2 }}>
          {conv.campaignTitle}
        </div>
        <div className="chat-conv-last">{conv.lastMessage}</div>
      </div>
      {conv.unread > 0 && (
        <div style={{
          width: 18, height: 18, background: 'var(--color-accent)',
          borderRadius: '50%', color: '#fff', fontSize: 10, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          {conv.unread}
        </div>
      )}
    </div>
  )
}

function ChatBubble({ m }) {
  return (
    <div className={`chat-message ${m.sender}`}>
      <div className="chat-bubble">{m.text}</div>
      <div className="chat-timestamp">{m.time}</div>
    </div>
  )
}

function OfferBar({ show, amount, onChange, onSend, onCancel, compact }) {
  if (!show) return null
  return (
    <div style={{
      padding: compact ? '10px 14px' : '10px 16px',
      background: 'var(--color-accent-light)',
      borderTop: '1px solid var(--color-border)',
      display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap',
    }}>
      <span style={{ fontSize: 12, fontWeight: 500 }}>
        {compact ? 'Final Offer (₹)' : 'Final Offer Amount (₹)'}
      </span>
      <input
        className="form-input"
        type="number"
        style={{ width: compact ? 130 : 140, padding: '6px 10px' }}
        value={amount}
        onChange={e => onChange(e.target.value)}
        placeholder="e.g. 25000"
      />
      <button className="btn btn-primary btn-sm" onClick={onSend}>
        {compact ? 'Send' : 'Send Final Offer'}
      </button>
      <button className="btn btn-secondary btn-sm" onClick={onCancel}>Cancel</button>
    </div>
  )
}

function ChatInputArea({ input, onChange, onSend, onToggleOffer, compact }) {
  return (
    <div className="chat-input-area">
      <button
        className="btn btn-secondary btn-sm"
        onClick={onToggleOffer}
        style={{ flexShrink: 0 }}
      >
        {compact ? 'Offer' : 'Final Offer'}
      </button>
      <textarea
        className="chat-input"
        rows={1}
        placeholder="Type a message..."
        value={input}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSend() }
        }}
      />
      <button className="chat-send-btn" onClick={onSend}>→</button>
    </div>
  )
}