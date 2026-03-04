import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { demoKolProfile } from '../../utils/demoData'
import SocialAccountCard from '../../components/kol/SocialAccountCard'
import Modal from '../../components/common/Modal'
import EmptyState from '../../components/common/EmptyState'
import { PLATFORMS } from '../../utils/constants'

const emptyForm = {
  platform: 'Instagram',
  handle: '',
  url: '',
  followers: '',
  engagementRate: '',
  avgLikes: '',
  avgViews: ''
}

export default function SocialAccounts() {
  const { user } = useAuth()

  const [accounts, setAccounts] = useState(() =>
    user?.isDemo ? [...demoKolProfile.socialAccounts] : []
  )

  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ ...emptyForm })
  const [saved, setSaved] = useState(false)

  function set(field) {
    return e => setForm(p => ({ ...p, [field]: e.target.value }))
  }

  function addAccount(e) {
    e.preventDefault()
    const newAcc = {
      id: Date.now().toString(),
      platform: form.platform,
      handle: form.handle,
      url: form.url,
      followers: Number(form.followers) || 0,
      engagementRate: Number(form.engagementRate) || 0,
      avgLikes: Number(form.avgLikes) || 0,
      avgViews: Number(form.avgViews) || 0,
      verified: false
    }
    setAccounts(p => [...p, newAcc])
    setForm({ ...emptyForm })
    setShowModal(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function removeAccount(id) {
    setAccounts(p => p.filter(a => a.id !== id))
  }

  return (
    <div className="page-wrapper">
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 24, flexWrap: 'wrap', gap: 12
      }}>
        <div className="page-title" style={{ marginBottom: 0 }}>Social Accounts</div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add Account
        </button>
      </div>

      {saved && (
        <div className="auth-message success" style={{ marginBottom: 16 }}>
          Account added successfully.
        </div>
      )}

      {accounts.length === 0 ? (
        <EmptyState
          icon="📱"
          title="No accounts linked"
          description="Add your Instagram, YouTube, or X account to get discovered by brands."
          action={
            <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
              Add Your First Account
            </button>
          }
        />
      ) : (
        <div className="social-accounts-grid">
          {accounts.map(acc => (
            <SocialAccountCard
              key={acc.id}
              account={acc}
              onRemove={removeAccount}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setForm({ ...emptyForm }) }}
        title="Add Social Account"
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => { setShowModal(false); setForm({ ...emptyForm }) }}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={addAccount}>
              Add Account
            </button>
          </>
        }
      >
        <form onSubmit={addAccount}>
          <div className="form-group">
            <label className="form-label">Platform</label>
            <select className="form-input" value={form.platform} onChange={set('platform')}>
              {PLATFORMS.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Handle</label>
            <input
              className="form-input"
              placeholder="@yourhandle"
              value={form.handle}
              onChange={set('handle')}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Profile URL</label>
            <input
              className="form-input"
              type="url"
              placeholder="https://www.instagram.com/yourhandle"
              value={form.url}
              onChange={set('url')}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Followers</label>
              <input
                className="form-input"
                type="number"
                placeholder="e.g. 50000"
                value={form.followers}
                onChange={set('followers')}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Engagement Rate (%)</label>
              <input
                className="form-input"
                type="number"
                step="0.01"
                placeholder="e.g. 3.5"
                value={form.engagementRate}
                onChange={set('engagementRate')}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Avg Likes</label>
              <input
                className="form-input"
                type="number"
                placeholder="e.g. 1500"
                value={form.avgLikes}
                onChange={set('avgLikes')}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Avg Views</label>
              <input
                className="form-input"
                type="number"
                placeholder="e.g. 20000"
                value={form.avgViews}
                onChange={set('avgViews')}
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}