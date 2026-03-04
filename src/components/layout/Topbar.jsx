import { useAuth } from '../../context/AuthContext'
import NotificationDropdown from './NotificationDropdown'
import Avatar from '../common/Avatar'
import { demoKolProfile, demoCompanyProfile } from '../../utils/demoData'

export default function Topbar({ title, onToggleSidebar }) {
  const { user, logout } = useAuth()

  const userAvatar = user?.isDemo
    ? (user.role === 'kol' ? demoKolProfile.avatar : demoCompanyProfile.avatar)
    : null

  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="topbar-toggle hamburger" onClick={onToggleSidebar}>
          <span /><span /><span />
        </button>
        <span className="topbar-page-title">{title}</span>
      </div>
      <div className="topbar-right">
        <NotificationDropdown />
        <div className="topbar-user">
          <Avatar name={user?.name} size={32} src={userAvatar} />
          <span className="topbar-username">{user?.name}</span>
        </div>
        <button
          className="btn btn-secondary btn-sm"
          onClick={logout}
          style={{ marginLeft: 4 }}
        >
          Logout
        </button>
      </div>
    </div>
  )
}