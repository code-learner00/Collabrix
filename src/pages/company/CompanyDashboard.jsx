import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { demoCompanyStats, demoROIChart } from '../../utils/demoData'
import { formatINR } from '../../utils/formatters'
import ROIChart from '../../components/company/ROIChart'
import DashboardSkeleton from '../../components/common/DashboardSkeleton'
import ErrorBoundary from '../../components/common/ErrorBoundary'
import ErrorState from '../../components/common/ErrorState'

const EMPTY_STATS = {
  activeCampaigns: 0,
  budgetSpent: 0,
  totalKolsHired: 0,
  successRate: 0
}

export default function CompanyDashboard() {
  const { user } = useAuth()
  const isDemo = user?.isDemo

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState(null)

  function loadData() {
    setLoading(true)
    setError(null)
    new Promise(res => setTimeout(() => {
      res(isDemo ? demoCompanyStats : EMPTY_STATS)
    }, 700))
      .then(data => {
        setStats(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load dashboard data.')
        setLoading(false)
      })
  }

  useEffect(() => {
    loadData()
  }, [isDemo])

  if (loading) return <DashboardSkeleton />
  if (error) return (
    <div className="page-wrapper">
      <ErrorState message={error} onRetry={loadData} />
    </div>
  )

  return (
    <div className="page-wrapper">
      <div className="page-title">Dashboard</div>

      {!isDemo && (
        <div className="empty-dash-message" style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Welcome to Collabrix</div>
          <p>Create your first campaign to start working with KOLs.</p>
        </div>
      )}

      <ErrorBoundary fallbackMessage="Stats failed to load.">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon orange">◈</div>
            <div className="stat-label">Active Campaigns</div>
            <div className="stat-value">{stats.activeCampaigns}</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon red">₹</div>
            <div className="stat-label">Budget Spent</div>
            <div className="stat-value" style={{ fontSize: 18 }}>{formatINR(stats.budgetSpent)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">⊹</div>
            <div className="stat-label">KOLs Hired</div>
            <div className="stat-value">{stats.totalKolsHired}</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue">✓</div>
            <div className="stat-label">Success Rate</div>
            <div className="stat-value">{stats.successRate}%</div>
          </div>
        </div>
      </ErrorBoundary>

      {isDemo && (
        <ErrorBoundary fallbackMessage="ROI chart failed to render.">
          <div className="chart-card">
            <div className="chart-title">ROI Overview (Budget Spent vs Revenue Generated)</div>
            <ROIChart data={demoROIChart} />
          </div>
        </ErrorBoundary>
      )}
    </div>
  )
}