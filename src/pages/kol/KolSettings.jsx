import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

// Demo old password for gating
const MOCK_OLD_PASSWORD = 'demo123'

export default function KolSettings() {
  const { user, logout } = useAuth()
  const [saved, setSaved] = useState(false)
  const [notifications, setNotifications] = useState({ email: true, invites: true, payments: true })

  // Password security state
  const [oldPw, setOldPw] = useState('')
  const [oldPwError, setOldPwError] = useState('')
  const [oldPwValid, setOldPwValid] = useState(false)
  const [newPw, setNewPw] = useState('')
  const [pwSaved, setPwSaved] = useState(false)

  function validateOldPassword() {
    if (oldPw === MOCK_OLD_PASSWORD) {
      setOldPwValid(true)
      setOldPwError('')
    } else {
      setOldPwValid(false)
      setOldPwError('Incorrect password. Please try again.')
    }
  }

  function saveProfile(e) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function savePassword(e) {
    e.preventDefault()
    if (!oldPwValid) return
    setPwSaved(true)
    setOldPw('')
    setNewPw('')
    setOldPwValid(false)
    setTimeout(() => setPwSaved(false), 2000)
  }

  return (
    <div className="page-wrapper">
      <div className="page-title">Settings</div>

      {saved && <div className="auth-message success" style={{ marginBottom: 16 }}>Profile settings saved.</div>}

      <div className="settings-section">
        <div className="settings-section-title">Account Details</div>
        <form onSubmit={saveProfile}>
          <div className="form-group">
            <label className="form-label">Display Name</label>
            <input className="form-input" defaultValue={user?.name} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" defaultValue={user?.email} disabled />
          </div>
          <button className="btn btn-primary" type="submit">Save Changes</button>
        </form>
      </div>

      <div className="settings-section">
        <div className="settings-section-title">Change Password</div>
        {pwSaved && <div className="auth-message success" style={{ marginBottom: 14 }}>Password updated successfully.</div>}
        <form onSubmit={savePassword}>
          <div className="form-group">
            <label className="form-label">Current Password</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                className="form-input"
                type="password"
                placeholder="Enter current password"
                value={oldPw}
                onChange={e => { setOldPw(e.target.value); setOldPwError(''); setOldPwValid(false) }}
                style={{ flex: 1 }}
              />
              <button type="button" className="btn btn-secondary btn-sm" onClick={validateOldPassword}>Verify</button>
            </div>
            {oldPwError && <div className="form-error">{oldPwError}</div>}
            {oldPwValid && <div style={{ fontSize: 12, color: 'var(--color-success)', marginTop: 4 }}>Password verified. You may now set a new password.</div>}
          </div>
          <div className={`form-group ${!oldPwValid ? 'password-field-locked' : ''}`}>
            <label className="form-label">New Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Enter new password"
              value={newPw}
              onChange={e => setNewPw(e.target.value)}
              disabled={!oldPwValid}
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={!oldPwValid || !newPw}>
            Update Password
          </button>
        </form>
      </div>

      <div className="settings-section">
        <div className="settings-section-title">Notifications</div>
        {[
          { key: 'email', label: 'Email notifications' },
          { key: 'invites', label: 'Campaign invite alerts' },
          { key: 'payments', label: 'Payment notifications' },
        ].map(n => (
          <div key={n.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{n.label}</span>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <input type="checkbox" checked={notifications[n.key]} onChange={e => setNotifications(p => ({ ...p, [n.key]: e.target.checked }))} />
              <span style={{ fontSize: 12 }}>{notifications[n.key] ? 'On' : 'Off'}</span>
            </label>
          </div>
        ))}
      </div>

      <div className="settings-section">
        <div className="settings-section-title">Danger Zone</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="btn btn-danger" onClick={logout}>Logout</button>
          <button className="btn btn-danger">Delete Account</button>
        </div>
      </div>
    </div>
  )
}