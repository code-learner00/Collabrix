import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotifications } from '../../context/NotificationContext'

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false)
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications()
  const ref = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function handleClick(notif) {
    markRead(notif.id)
    setOpen(false)
    if (notif.route) navigate(notif.route)
  }

  const preview = notifications.slice(0, 5)

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button className="notif-btn" onClick={() => setOpen(!open)} aria-label="Notifications">
        🔔
        {unreadCount > 0 && (
          <span className="notif-dot">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div className="notif-dropdown">
          <div className="notif-header">
            <span>Notifications {unreadCount > 0 && `(${unreadCount} unread)`}</span>
            {unreadCount > 0 && (
              <button style={{ fontSize: 11, color: 'var(--color-accent)', cursor: 'pointer', background: 'none', border: 'none' }} onClick={markAllRead}>
                Mark all read
              </button>
            )}
          </div>
          {preview.length === 0 ? (
            <div style={{ padding: 20, fontSize: 13, color: 'var(--color-text-muted)', textAlign: 'center' }}>No notifications</div>
          ) : (
            preview.map(n => (
              <div
                key={n.id}
                className={`notif-item ${!n.read ? 'unread' : ''}`}
                onClick={() => handleClick(n)}
              >
                <div className="notif-item-title">{n.title}</div>
                <div className="notif-item-time">{n.time}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}