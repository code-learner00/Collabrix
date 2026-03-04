import { NavLink } from 'react-router-dom'

const links = [
  { to: '/company/dashboard', icon: '⊞', label: 'Dashboard' },
  { to: '/company/profile', icon: '◉', label: 'Profile' },
  { to: '/company/create-campaign', icon: '+', label: 'New Campaign' },
  { to: '/company/campaigns', icon: '◈', label: 'Campaigns' },
  { to: '/company/kols', icon: '⊹', label: 'Browse KOLs' },
  { to: '/company/messages', icon: '✉', label: 'Messages' },
  { to: '/company/wallet', icon: '◎', label: 'Wallet' },
  { to: '/company/settings', icon: '⚙', label: 'Settings' },
]

export default function CompanySidebar({ collapsed }) {
  return (
    <>
      <div className="sidebar-logo">
        {!collapsed && <span className="sidebar-logo-text">Collabrix</span>}
      </div>
      <nav className="sidebar-nav">
        {!collapsed && <div className="sidebar-section-label">Company Menu</div>}
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{l.icon}</span>
            {!collapsed && <span>{l.label}</span>}
          </NavLink>
        ))}
      </nav>
    </>
  )
}