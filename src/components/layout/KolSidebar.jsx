import { NavLink } from 'react-router-dom'

const links = [
  { to: '/kol/dashboard', icon: '⊞', label: 'Dashboard' },
  { to: '/kol/profile', icon: '◉', label: 'Profile' },
  { to: '/kol/social-accounts', icon: '◈', label: 'Social Accounts' },
  { to: '/kol/collaborations', icon: '⇌', label: 'Collaborations' },
  { to: '/kol/messages', icon: '✉', label: 'Messages' },
  { to: '/kol/wallet', icon: '◎', label: 'Wallet' },
  { to: '/kol/settings', icon: '⚙', label: 'Settings' },
]

export default function KolSidebar({ collapsed }) {
  return (
    <>
      <div className="sidebar-logo">
        
        {!collapsed && <span className="sidebar-logo-text">Collabrix</span>}
      </div>
      <nav className="sidebar-nav">
        {!collapsed && <div className="sidebar-section-label">KOL Menu</div>}
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