import { getStatusColor } from '../../utils/formatters'

export default function StatusTag({ status }) {
  const color = getStatusColor(status)
  const colorMap = {
    gray: { bg: '#f0f0ee', color: '#666' },
    green: { bg: 'var(--color-success-light)', color: 'var(--color-success)' },
    red: { bg: 'var(--color-danger-light)', color: 'var(--color-danger)' },
    blue: { bg: 'var(--color-info-light)', color: 'var(--color-info)' },
    yellow: { bg: 'var(--color-warning-light)', color: 'var(--color-warning)' },
    orange: { bg: 'var(--color-accent-light)', color: 'var(--color-accent)' },
  }
  const s = colorMap[color] || colorMap.gray
  return (
    <span className="status-tag" style={{ background: s.bg, color: s.color }}>
      {status.replace(/-/g, ' ')}
    </span>
  )
}