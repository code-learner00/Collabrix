import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { CATEGORIES, PLATFORMS } from '../../utils/constants'

function validate(form) {
  const errors = {}
  if (!form.bio.trim()) errors.bio = 'Add a short bio'
  if (!form.category) errors.category = 'Select your niche'
  if (!form.primaryPlatform) errors.primaryPlatform = 'Select your primary platform'
  return errors
}

export default function KolProfileCompletion() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [form, setForm] = useState({
    bio: '',
    category: '',
    primaryPlatform: '',
    handle: '',
    priceFrom: '',
    languages: '',
  })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  function set(k, v) {
    setForm(p => ({ ...p, [k]: v }))
    if (errors[k]) setErrors(p => ({ ...p, [k]: undefined }))
  }

  async function handleSubmit() {
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSaving(true)
    // Simulates profile save — wire to PATCH /api/kol/profile when backend ready
    await new Promise(r => setTimeout(r, 700))
    setSaving(false)
    navigate('/kol/dashboard')
  }

  function skip() {
    navigate('/kol/dashboard')
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-bg)',
      padding: '24px 16px'
    }}>
      <div style={{ width: '100%', maxWidth: 520 }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>
            Complete your profile
          </div>
          <div style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>
            Help brands find you. You can update these later from your profile settings.
          </div>
        </div>

        <div className="card">
          <div className="form-group">
            <label className="form-label">Bio *</label>
            <textarea
              className={`form-textarea ${errors.bio ? 'input-error' : ''}`}
              rows={3}
              value={form.bio}
              onChange={e => set('bio', e.target.value)}
              placeholder="NYC-based lifestyle creator sharing beauty routines, campus life, and wellness content."
            />
            {errors.bio && <div className="form-error">{errors.bio}</div>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Niche / Category *</label>
              <select
                className={`form-select ${errors.category ? 'input-error' : ''}`}
                value={form.category}
                onChange={e => set('category', e.target.value)}
              >
                <option value="">Select</option>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
              {errors.category && <div className="form-error">{errors.category}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Primary Platform *</label>
              <select
                className={`form-select ${errors.primaryPlatform ? 'input-error' : ''}`}
                value={form.primaryPlatform}
                onChange={e => set('primaryPlatform', e.target.value)}
              >
                <option value="">Select</option>
                {PLATFORMS.map(p => <option key={p}>{p}</option>)}
              </select>
              {errors.primaryPlatform && <div className="form-error">{errors.primaryPlatform}</div>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Handle on primary platform</label>
            <input
              className="form-input"
              value={form.handle}
              onChange={e => set('handle', e.target.value)}
              placeholder="@yourhandle"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Starting price (₹)</label>
              <input
                className="form-input"
                type="number"
                value={form.priceFrom}
                onChange={e => set('priceFrom', e.target.value)}
                placeholder="e.g. 25000"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Languages</label>
              <input
                className="form-input"
                value={form.languages}
                onChange={e => set('languages', e.target.value)}
                placeholder="English, Hindi"
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button
              className="btn btn-primary"
              style={{ flex: 1 }}
              onClick={handleSubmit}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save & Continue'}
            </button>
            <button className="btn btn-secondary" onClick={skip}>
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}