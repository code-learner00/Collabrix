import { formatINR } from '../../utils/formatters'

export default function WalletCard({ label, amount, color = 'default' }) {
  const colorMap = {
    default: 'var(--color-text-primary)',
    green: 'var(--color-success)',
    orange: 'var(--color-accent)',
    blue: 'var(--color-info)',
  }
  return (
    <div className="wallet-balance-card">
      <div className="wallet-balance-label">{label}</div>
      <div className="wallet-balance-value" style={{ color: colorMap[color] }}>
        {formatINR(amount)}
      </div>
    </div>
  )
}