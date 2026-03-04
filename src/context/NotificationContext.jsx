import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from './AuthContext'
import { demoNotificationsKol, demoNotificationsCompany } from '../utils/demoData'
import { useNavigate } from 'react-router-dom'

const NotificationContext = createContext(null)

// Real-time simulation via custom event bus (replaces socket for demo)
// TODO: swap eventBus with socket.io emit/on when backend is ready
const eventBus = {
  listeners: {},
  on(event, cb) {
    if (!this.listeners[event]) this.listeners[event] = []
    this.listeners[event].push(cb)
    return () => { this.listeners[event] = this.listeners[event].filter(l => l !== cb) }
  },
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data))
    }
  }
}

export { eventBus }

export function NotificationProvider({ children }) {
  const { user } = useAuth()

  const getInitial = useCallback(() => {
    if (!user?.isDemo) return []
    return user.role === 'kol' ? [...demoNotificationsKol] : [...demoNotificationsCompany]
  }, [user])

  const [notifications, setNotifications] = useState(getInitial)

  useEffect(() => {
    setNotifications(getInitial())
  }, [user, getInitial])

  // Subscribe to real-time notification events
  useEffect(() => {
    const unsub = eventBus.on('notification', (notif) => {
      setNotifications(prev => [{ ...notif, id: Date.now().toString(), read: false, time: 'Just now' }, ...prev])
    })
    return unsub
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  function markRead(id) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  function pushNotification(title, route) {
    eventBus.emit('notification', { title, route })
  }

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markRead, markAllRead, pushNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  return useContext(NotificationContext)
}