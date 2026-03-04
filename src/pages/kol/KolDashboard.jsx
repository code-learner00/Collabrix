import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { demoKolStats, demoRevenueChart, demoCampaignChart, demoEngagementChart } from '../../utils/demoData'
import { formatINR } from '../../utils/formatters'
import RevenueChart from '../../components/kol/RevenueChart'
import DashboardSkeleton from '../../components/common/DashboardSkeleton'
import ErrorBoundary from '../../components/common/ErrorBoundary'
import ErrorState from '../../components/common/ErrorState'
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid
} from 'recharts'

const PIE_COLORS = ['var(--color-success)', 'var(--color-accent)', 'var(--color-info)']

const EMPTY_STATS = {
  totalCollaborations: 0,
  pendingRequests: 0,
  revenueEarned: 0,
  rating: 0,
  activeCampaigns: 0
}

export default function KolDashboard() {
  const { user } = useAuth()
  const isDemo = user?.isDemo

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState(null)

  function loadData() {
    setLoading(true)
    setError(null)
    // Simulates an API call — swap with real fetch when backend is ready
    new Promise((res, rej) => setTimeout(() => {
      if (isDemo) res(demoKolStats)
      else res(EMPTY_STATS)
    }, 700))
      .then(data => {
        setStats(data)
        setLoading(false)
      })
      .catch(err => {
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
          <p>Start collaborating to earn money. Your stats will appear here once you accept your first campaign.</p>
        </div>
      )}

      <ErrorBoundary fallbackMessage="Stats failed to load.">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon orange">⇌</div>
            <div className="stat-label">Total Collaborations</div>
            <div className="stat-value">{stats.totalCollaborations}</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon yellow">⏳</div>
            <div className="stat-label">Pending Requests</div>
            <div className="stat-value">{stats.pendingRequests}</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">₹</div>
            <div className="stat-label">Revenue Earned</div>
            <div className="stat-value">{formatINR(stats.revenueEarned)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue">⭐</div>
            <div className="stat-label">Rating</div>
            <div className="stat-value">{stats.rating || '—'}</div>
          </div>
        </div>
      </ErrorBoundary>

      {isDemo && (
        <ErrorBoundary fallbackMessage="Charts failed to render.">
          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-title">Revenue (Last 7 Months)</div>
              <RevenueChart data={demoRevenueChart} />
            </div>
            <div className="chart-card">
              <div className="chart-title">Campaign Status</div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={demoCampaignChart}
                    cx="50%" cy="50%"
                    innerRadius={50} outerRadius={75}
                    dataKey="value"
                  >
                    {demoCampaignChart.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-title">Engagement Growth</div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={demoEngagementChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} />
                <YAxis
                  tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
                  tickFormatter={v => `${v}%`}
                />
                <Tooltip formatter={v => [`${v}%`, 'Engagement']} />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="var(--color-info)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ErrorBoundary>
      )}
    </div>
  )
}