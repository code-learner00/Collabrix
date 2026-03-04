import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import CompanySidebar from './CompanySidebar'
import Topbar from './Topbar'

const titleMap = {
  '/company/dashboard': 'Dashboard',
  '/company/profile': 'Company Profile',
  '/company/create-campaign': 'Create Campaign',
  '/company/campaigns': 'Campaigns',
  '/company/kols': 'Browse KOLs',
  '/company/messages': 'Messages',
  '/company/wallet': 'Wallet',
  '/company/settings': 'Settings',
}

export default function CompanyLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const location = useLocation()

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth <= 768)
      if (window.innerWidth > 768) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const title = titleMap[location.pathname] || 'Collabrix'

  function toggleSidebar() {
    if (isMobile) setMobileOpen(p => !p)
    else setCollapsed(p => !p)
  }

  return (
    <div className="app-layout">
      <div className={`sidebar-overlay ${mobileOpen ? 'visible' : ''}`} onClick={() => setMobileOpen(false)} />
      <aside className={`sidebar ${collapsed && !isMobile ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <CompanySidebar collapsed={collapsed && !isMobile} />
      </aside>
      <div className={`main-content ${collapsed && !isMobile ? 'sidebar-collapsed' : ''}`}>
        <Topbar title={title} onToggleSidebar={toggleSidebar} />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}