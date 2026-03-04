export default function Pagination({ current, total, onPageChange }) {
  if (total <= 1) return null
  const pages = Array.from({ length: total }, (_, i) => i + 1)
  return (
    <div className="pagination">
      <button className="pagination-btn" disabled={current === 1} onClick={() => onPageChange(current - 1)}>‹</button>
      {pages.map(p => (
        <button key={p} className={`pagination-btn ${p === current ? 'active' : ''}`} onClick={() => onPageChange(p)}>{p}</button>
      ))}
      <button className="pagination-btn" disabled={current === total} onClick={() => onPageChange(current + 1)}>›</button>
    </div>
  )
}