import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { demoWalletKol } from '../../utils/demoData'
import { formatINR } from '../../utils/formatters'
import TableSkeleton from '../../components/common/TableSkeleton'
import ErrorState from '../../components/common/ErrorState'
import EmptyState from '../../components/common/EmptyState'
import Modal from '../../components/common/Modal'
import Pagination from '../../components/common/Pagination'

const PAGE_SIZE = 4

const STATUS_STYLE = {
  completed: { bg: 'var(--color-success-light)', color: 'var(--color-success)' },
  pending: { bg: 'var(--color-warning-light)', color: 'var(--color-warning)' },
  'in-escrow': { bg: 'var(--color-info-light)', color: 'var(--color-info)' },
}

export default function KolWallet() {
  const { user } = useAuth()
  const isDemo = user?.isDemo

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [wallet, setWallet] = useState(null)

  const [filterDate, setFilterDate] = useState('')
  const [page, setPage] = useState(1)
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [withdrawError, setWithdrawError] = useState('')
  const [withdrawing, setWithdrawing] = useState(false)
  const [withdrawSuccess, setWithdrawSuccess] = useState(false)

  function load() {
    setLoading(true)
    setError(null)
    new Promise(res => setTimeout(() => res(isDemo ? demoWalletKol : null), 600))
      .then(data => { setWallet(data); setLoading(false) })
      .catch(() => { setError('Failed to load wallet.'); setLoading(false) })
  }

  useEffect(() => { load() }, [isDemo])

  async function handleWithdraw() {
    const amt = Number(withdrawAmount)
    if (!amt || amt <= 0) { setWithdrawError('Enter a valid amount'); return }
    if (amt > wallet.available) { setWithdrawError('Amount exceeds available balance'); return }
    setWithdrawing(true)
    await new Promise(r => setTimeout(r, 800))
    setWallet(p => ({
      ...p,
      available: p.available - amt,
      transactions: [
        {
          id: `txn-${Date.now()}`,
          desc: 'Withdrawal to bank account',
          amount: amt,
          type: 'debit',
          date: new Date().toISOString().slice(0, 10),
          status: 'completed'
        },
        ...p.transactions
      ]
    }))
    setWithdrawing(false)
    setWithdrawSuccess(true)
    setWithdrawOpen(false)
    setWithdrawAmount('')
    setTimeout(() => setWithdrawSuccess(false), 3000)
  }

  if (loading) return (
    <div className="page-wrapper">
      <div className="skeleton" style={{ height: 28, width: 100, marginBottom: 24, borderRadius: 6 }} />
      <div className="stats-grid" style={{ marginBottom: 24 }}>
        {[1, 2, 3].map(i => (
          <div key={i} className="stat-card">
            <div className="skeleton" style={{ height: 13, width: '60%', borderRadius: 4, marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 28, width: '50%', borderRadius: 6 }} />
          </div>
        ))}
      </div>
      <div className="card">
        <TableSkeleton rows={4} cols={4} />
      </div>
    </div>
  )

  if (error) return <div className="page-wrapper"><ErrorState message={error} onRetry={load} /></div>

  if (!wallet) return (
    <div className="page-wrapper">
      <div className="page-title">Wallet</div>
      <EmptyState icon="💰" title="No wallet data" description="Your wallet will appear once you complete your first collaboration." />
    </div>
  )

  const filtered = filterDate
    ? wallet.transactions.filter(t => t.date >= filterDate)
    : wallet.transactions

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="page-wrapper">
      <div className="page-title">Wallet</div>

      {withdrawSuccess && (
        <div className="auth-message success" style={{ marginBottom: 16 }}>
          Withdrawal initiated successfully.
        </div>
      )}

      <div className="stats-grid" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Available Balance</div>
          <div className="stat-value" style={{ color: 'var(--color-success)' }}>
            {formatINR(wallet.available)}
          </div>
          <button
            className="btn btn-primary btn-sm"
            style={{ marginTop: 10 }}
            onClick={() => setWithdrawOpen(true)}
          >
            Withdraw
          </button>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending</div>
          <div className="stat-value" style={{ color: 'var(--color-warning)' }}>
            {formatINR(wallet.pending)}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Earned</div>
          <div className="stat-value">{formatINR(wallet.totalEarned)}</div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Transaction History</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>From</label>
            <input
              type="date"
              className="form-input"
              style={{ padding: '5px 10px', fontSize: 12, width: 140 }}
              value={filterDate}
              onChange={e => { setFilterDate(e.target.value); setPage(1) }}
            />
            {filterDate && (
              <button className="btn btn-secondary btn-sm" onClick={() => { setFilterDate(''); setPage(1) }}>
                Clear
              </button>
            )}
          </div>
        </div>

        {paginated.length === 0 ? (
          <EmptyState icon="📄" title="No transactions" description="No transactions match your filter." />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  {['Description', 'Date', 'Amount', 'Status'].map(h => (
                    <th key={h} style={{
                      padding: '8px 10px', textAlign: 'left',
                      fontSize: 11, fontWeight: 600,
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)'
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map(t => {
                  const s = STATUS_STYLE[t.status] || { bg: '#f0f0ee', color: '#666' }
                  return (
                    <tr key={t.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                      <td style={{ padding: '10px 10px', color: 'var(--color-text-primary)' }}>
                        {t.desc}
                      </td>
                      <td style={{ padding: '10px 10px', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                        {t.date}
                      </td>
                      <td style={{
                        padding: '10px 10px', fontWeight: 600, whiteSpace: 'nowrap',
                        color: t.type === 'credit' ? 'var(--color-success)' : 'var(--color-danger)'
                      }}>
                        {t.type === 'credit' ? '+' : '−'} {formatINR(t.amount)}
                      </td>
                      <td style={{ padding: '10px 10px' }}>
                        <span style={{
                          fontSize: 11, fontWeight: 600, padding: '2px 8px',
                          borderRadius: 10, background: s.bg, color: s.color
                        }}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div style={{ marginTop: 16 }}>
            <Pagination current={page} total={totalPages} onPageChange={setPage} />
          </div>
        )}
      </div>

      <Modal
        isOpen={withdrawOpen}
        onClose={() => !withdrawing && setWithdrawOpen(false)}
        title="Withdraw Funds"
        footer={
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setWithdrawOpen(false)}
              disabled={withdrawing}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleWithdraw}
              disabled={withdrawing}
            >
              {withdrawing ? 'Processing...' : 'Withdraw'}
            </button>
          </div>
        }
      >
        <div style={{ fontSize: 13, marginBottom: 12, color: 'var(--color-text-muted)' }}>
          Available: <strong style={{ color: 'var(--color-text-primary)' }}>{formatINR(wallet.available)}</strong>
        </div>
        <div className="form-group">
          <label className="form-label">Amount (₹)</label>
          <input
            className={`form-input ${withdrawError ? 'input-error' : ''}`}
            type="number"
            value={withdrawAmount}
            onChange={e => { setWithdrawAmount(e.target.value); setWithdrawError('') }}
            placeholder="Enter amount"
          />
          {withdrawError && <div className="form-error">{withdrawError}</div>}
        </div>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
          Funds will be transferred to your registered bank account within 2–3 business days.
        </div>
      </Modal>
    </div>
  )
}