export default function DashboardSkeleton() {
  return (
    <div className="page-wrapper">
      <div className="skeleton" style={{ height: 28, width: 140, marginBottom: 24, borderRadius: 6 }} />

      <div className="stats-grid">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="stat-card" style={{ gap: 10 }}>
            <div className="skeleton" style={{ width: 36, height: 36, borderRadius: 8 }} />
            <div className="skeleton" style={{ height: 13, width: '60%', borderRadius: 4 }} />
            <div className="skeleton" style={{ height: 28, width: '40%', borderRadius: 6 }} />
          </div>
        ))}
      </div>

      <div className="charts-grid" style={{ marginTop: 24 }}>
        <div className="chart-card">
          <div className="skeleton" style={{ height: 16, width: 160, borderRadius: 4, marginBottom: 16 }} />
          <div className="skeleton" style={{ height: 200, borderRadius: 8 }} />
        </div>
        <div className="chart-card">
          <div className="skeleton" style={{ height: 16, width: 130, borderRadius: 4, marginBottom: 16 }} />
          <div className="skeleton" style={{ height: 200, borderRadius: 8 }} />
        </div>
      </div>

      <div className="chart-card" style={{ marginTop: 24 }}>
        <div className="skeleton" style={{ height: 16, width: 180, borderRadius: 4, marginBottom: 16 }} />
        <div className="skeleton" style={{ height: 180, borderRadius: 8 }} />
      </div>
    </div>
  )
}