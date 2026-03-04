import { createContext, useContext, useState } from 'react'
import {
  demoMessagesKol,
  demoKolChatThread1,
  demoKolChatThread2,
} from '../utils/demoData'

const MessagesContext = createContext(null)

const threadSeeds = {
  'kol-thread-1': demoKolChatThread1,
  'kol-thread-2': demoKolChatThread2,
}

// Maps collaboration campaignTitle → conv id so Collaborations can look up
// the right thread without having to pass IDs around
const CAMPAIGN_TO_CONV = {
  'Summer Glow SPF Launch': 'conv-1',
  'New Gym Wear Drop': 'conv-2',
}

export function MessagesProvider({ children }) {
  const [convList, setConvList] = useState(() =>
    demoMessagesKol.map(c => ({ ...c }))
  )

  const [messageMap, setMessageMap] = useState(() => {
    const map = {}
    demoMessagesKol.forEach(conv => {
      map[conv.id] = conv.threadKey && threadSeeds[conv.threadKey]
        ? [...threadSeeds[conv.threadKey]]
        : []
    })
    return map
  })

  // Called by Collaborations when KOL accepts an offer.
  // Finds the matching conversation by campaignTitle, appends the acceptance
  // message, updates conv status, marks it unread (1) so the badge shows.
  function pushAcceptanceMessage(campaignTitle, agreedBudget) {
    const convId = CAMPAIGN_TO_CONV[campaignTitle]
    if (!convId) return   // no matching thread — skip silently

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const text = agreedBudget
      ? `I have accepted the offer of ₹${Number(agreedBudget).toLocaleString('en-IN')} for the ${campaignTitle} campaign. Looking forward to working with you.`
      : `I have accepted the collaboration for the ${campaignTitle} campaign. Looking forward to working with you.`

    const msg = {
      id: `accept-${Date.now()}`,
      sender: 'own',
      text,
      time: now,
    }

    setMessageMap(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), msg],
    }))

    setConvList(prev => prev.map(c =>
      c.id === convId
        ? {
            ...c,
            lastMessage: text,
            time: now,
            status: 'in-progress',
            unread: c.unread + 1,
          }
        : c
    ))
  }

  // Called from Messages page when a conv is opened — clears unread badge
  function markRead(convId) {
    setConvList(prev => prev.map(c =>
      c.id === convId ? { ...c, unread: 0 } : c
    ))
  }

  // Called from Messages when user sends a manual message
  function appendMessage(convId, text) {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const msg = {
      id: Date.now().toString(),
      sender: 'own',
      text,
      time: now,
    }
    setMessageMap(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), msg],
    }))
    setConvList(prev => prev.map(c =>
      c.id === convId ? { ...c, lastMessage: text, time: now } : c
    ))
  }

  // Called from Messages "Final Offer" flow
  function appendOfferMessage(convId, amount) {
    const text = `Final Offer: ₹${Number(amount).toLocaleString('en-IN')} — Please review and confirm to proceed.`
    appendMessage(convId, text)
  }

  // Ensure a conv has its thread loaded (called when user opens a conv that
  // was never seeded — e.g. a new conv created after page load)
  function ensureThread(conv) {
    if (!messageMap[conv.id]) {
      setMessageMap(prev => ({
        ...prev,
        [conv.id]: conv.threadKey && threadSeeds[conv.threadKey]
          ? [...threadSeeds[conv.threadKey]]
          : [],
      }))
    }
  }

  return (
    <MessagesContext.Provider value={{
      convList,
      messageMap,
      pushAcceptanceMessage,
      markRead,
      appendMessage,
      appendOfferMessage,
      ensureThread,
    }}>
      {children}
    </MessagesContext.Provider>
  )
}

export function useMessages() {
  const ctx = useContext(MessagesContext)
  if (!ctx) throw new Error('useMessages must be used inside MessagesProvider')
  return ctx
}