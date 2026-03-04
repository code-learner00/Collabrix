import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { INDUSTRIES, COUNTRIES } from '../../utils/constants'
import Avatar from '../../components/common/Avatar'
import { demoCompanyProfile } from '../../utils/demoData'

export default function CompanyProfile() {
  const { user } = useAuth()

  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({
    companyName: user?.isDemo ? demoCompanyProfile.name : (user?.name || ''),
    description: user?.isDemo ? demoCompanyProfile.description : '',
    website: user?.isDemo ? demoCompanyProfile.website : '',
    industry: user?.isDemo ? demoCompanyProfile.industry : '',
    country: user?.isDemo ? demoCompanyProfile.country : '',
  })
  const [saved, setSaved] = useState(false)

  const avatar = user?.isDemo ? demoCompanyProfile.avatar : null

  function save(e) {
    e.preventDefault()
    setEditMode(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="page-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div className="page-title" style={{ marginBottom: 0 }}>Company Profile</div>
        <button className="btn btn-secondary" onClick={() => setEditMode(p => !p)}>
          {editMode ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {saved && <div className="auth-message success" style={{ marginBottom: 16 }}>Profile updated.</div>}

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <Avatar name={form.companyName} size={72} src={avatar} />
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{form.companyName}</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{user?.email}</div>
            {user?.isDemo && <span className="badge badge-green" style={{ marginTop: 4 }}>Verified</span>}
          </div>
        </div>

        {editMode ? (
          <form onSubmit={save}>
            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input className="form-input" value={form.companyName} onChange={e => setForm({ ...form, companyName: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-textarea" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Website</label>
                <input className="form-input" type="url" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Industry</label>
                <select className="form-select" value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })}>
                  <option value="">Select</option>
                  {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Country</label>
              <select className="form-select" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })}>
                <option value="">Select</option>
                {COUNTRIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Company Logo</label>
              <input type="file" accept="image/*" className="form-input" />
            </div>
            <button className="btn btn-primary" type="submit">Save</button>
          </form>
        ) : (
          <div>
            {form.description ? (
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 16 }}>{form.description}</p>
            ) : (
              <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 16 }}>No description added yet.</p>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 3 }}>Website</div>
                {form.website ? (
                  <a
                    href={form.website}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: 13, color: 'var(--color-info)', textDecoration: 'underline', wordBreak: 'break-all' }}
                  >
                    {form.website}
                  </a>
                ) : (
                  <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Not set</div>
                )}
              </div>
              {[
                { label: 'Industry', value: form.industry },
                { label: 'Country', value: form.country },
              ].map(i => (
                <div key={i.label}>
                  <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 3 }}>{i.label}</div>
                  <div style={{ fontSize: 13, color: i.value ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>{i.value || 'Not set'}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}