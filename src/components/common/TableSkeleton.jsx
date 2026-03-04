export default function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div style={{ width: '100%' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: '8px 16px',
        marginBottom: 8,
        padding: '0 4px'
      }}>
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="skeleton" style={{ height: 12, borderRadius: 4 }} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: '8px 16px',
            padding: '10px 4px',
            borderBottom: '1px solid var(--color-border-light)'
          }}
        >
          {Array.from({ length: cols }).map((_, c) => (
            <div
              key={c}
              className="skeleton"
              style={{
                height: 14,
                borderRadius: 4,
                width: c === 0 ? '80%' : c === cols - 1 ? '50%' : '70%'
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}