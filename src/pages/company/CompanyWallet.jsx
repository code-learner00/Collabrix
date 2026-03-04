import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { demoWalletCompany } from '../../utils/demoData'
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

const ADD_FUND_OPTIONS = [10000, 25000, 50000, 100000]

export default function CompanyWallet() {
  const { user } = useAuth()
  const isDemo = user?.isDemo

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [wallet, setWallet] = useState(null)

  const [filterDate, setFilterDate] = useState('')
  const [page, setPage] = useState(1)
  const [addFundsOpen, setAddFundsOpen] = useState(false)
  const [customAmount, setCustomAmount] = useState('')
  const [selectedPreset, setSelectedPreset] = useState(null)
  const [addingFunds, setAddingFunds] = useState(false)
  const [addFundsError, setAddFundsError] = useState('')
  const [addSuccess, setAddSuccess] = useState(false)

  function load() {
    setLoading(true)
    setError(null)
    new Promise(res => setTimeout(() => res(isDemo ? demoWalletCompany : null), 600))
      .then(data => { setWallet(data); setLoading(false) })
      .catch(() => { setError('Failed to load wallet.'); setLoading(false) })
  }

  useEffect(() => { load() }, [isDemo])

  async function handleAddFunds() {
    const amt = Number(selectedPreset || customAmount)
    if (!amt || amt <= 0) { setAddFundsError('Enter or select a valid amount'); return }
    setAddingFunds(true)
    await new Promise(r => setTimeout(r, 800))
    setWallet(p => ({
      ...p,
      currentBalance: p.currentBalance + amt,
      totalAdded: p.totalAdded + amt,
      transactions: [
        {
          id: `txn-${Date.now()}`,
          desc: 'Account top-up via NEFT',
          amount: amt,
          type: 'credit',
          date: new Date().toISOString().slice(0, 10),
          status: 'completed'
        },
        ...p.transactions
      ]
    }))
    setAddingFunds(false)
    setAddFundsOpen(false)
    setCustomAmount('')
    setSelectedPreset(null)
    setAddSuccess(true)
    setTimeout(() => setAddSuccess(false), 3000)
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
      <div className="card"><TableSkeleton rows={4} cols={4} /></div>
    </div>
  )

  if (error) return <div className="page-wrapper"><ErrorState message={error} onRetry={load} /></div>

  if (!wallet) return (
    <div className="page-wrapper">
      <div className="page-title">Wallet</div>
      <EmptyState icon="💳" title="No wallet data" description="Add funds to start running campaigns." />
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

      {addSuccess && (
        <div className="auth-message success" style={{ marginBottom: 16 }}>
          Funds added to your account.
        </div>
      )}

      <div className="stats-grid" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Current Balance</div>
          <div className="stat-value" style={{ color: 'var(--color-success)' }}>
            {formatINR(wallet.currentBalance)}
          </div>
          <button
            className="btn btn-primary btn-sm"
            style={{ marginTop: 10 }}
            onClick={() => setAddFundsOpen(true)}
          >
            Add Funds
          </button>
        </div>
        <div className="stat-card">
          <div className="stat-label">In Escrow</div>
          <div className="stat-value" style={{ color: 'var(--color-info)' }}>
            {formatINR(wallet.escrow)}
          </div>
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 4 }}>
            Held for active campaigns
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Added</div>
          <div className="stat-value">{formatINR(wallet.totalAdded)}</div>
        </div>
      </div>

      <div className="card">
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 16, flexWrap: 'wrap', gap: 10
        }}>
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
                      fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
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
                        {t.status === 'in-escrow' && (
                          <span style={{
                            marginLeft: 8, fontSize: 10, fontWeight: 600,
                            background: 'var(--color-info-light)', color: 'var(--color-info)',
                            padding: '1px 6px', borderRadius: 6
                          }}>
                            ESCROW
                          </span>
                        )}
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
        isOpen={addFundsOpen}
        onClose={() => !addingFunds && setAddFundsOpen(false)}
        title="Add Funds"
        footer={
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setAddFundsOpen(false)}
              disabled={addingFunds}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleAddFunds}
              disabled={addingFunds}
            >
              {addingFunds ? 'Processing...' : 'Add Funds'}
            </button>
          </div>
        }
      >
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, color: 'var(--color-text-muted)' }}>
            Quick select
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {ADD_FUND_OPTIONS.map(opt => (
              <button
                key={opt}
                className={`btn btn-sm ${selectedPreset === opt ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => { setSelectedPreset(opt); setCustomAmount(''); setAddFundsError('') }}
              >
                {formatINR(opt)}
              </button>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Or enter custom amount (₹)</label>
          <input
            className={`form-input ${addFundsError ? 'input-error' : ''}`}
            type="number"
            value={customAmount}
            onChange={e => { setCustomAmount(e.target.value); setSelectedPreset(null); setAddFundsError('') }}
            placeholder="e.g. 75000"
          />
          {addFundsError && <div className="form-error">{addFundsError}</div>}
        </div>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
          Funds will reflect immediately. Payments are simulated in demo mode.
        </div>
      </Modal>
    </div>
  )
}