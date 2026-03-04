export default function CardSkeleton({ count = 6 }) {
  return (
    <div className="kol-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div className="skeleton" style={{ width: 48, height: 48, borderRadius: '50%', flexShrink: 0 }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div className="skeleton" style={{ height: 14, width: '60%', borderRadius: 4 }} />
              <div className="skeleton" style={{ height: 11, width: '40%', borderRadius: 4 }} />
            </div>
          </div>
          <div className="skeleton" style={{ height: 11, width: '90%', borderRadius: 4 }} />
          <div className="skeleton" style={{ height: 11, width: '75%', borderRadius: 4 }} />
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <div className="skeleton" style={{ height: 32, flex: 1, borderRadius: 6 }} />
            <div className="skeleton" style={{ height: 32, flex: 1, borderRadius: 6 }} />
          </div>
        </div>
      ))}
    </div>
  )
}