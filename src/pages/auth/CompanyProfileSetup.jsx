import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { COUNTRIES } from '../../utils/constants'

const INDUSTRIES = [
  'Health & Beauty', 'Fashion & Apparel', 'Technology', 'Food & Beverage',
  'Education', 'Finance', 'Travel & Lifestyle', 'Gaming', 'Retail', 'Other'
]

function validate(form) {
  const errors = {}
  if (!form.description.trim()) errors.description = 'Add a short company description'
  if (!form.industry) errors.industry = 'Select your industry'
  if (form.website && !/^https?:\/\/.+/.test(form.website)) {
    errors.website = 'Enter a valid URL starting with http:// or https://'
  }
  return errors
}

export default function CompanyProfileSetup() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    description: '',
    industry: '',
    website: '',
    country: '',
    logo: null,
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
    await new Promise(r => setTimeout(r, 700))
    setSaving(false)
    navigate('/company/dashboard')
  }

  function skip() {
    navigate('/company/dashboard')
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
            Set up your company profile
          </div>
          <div style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>
            KOLs will see this when reviewing your campaign invitations.
          </div>
        </div>

        <div className="card">
          <div className="form-group">
            <label className="form-label">Company Logo</label>
            <input
              type="file"
              accept="image/*"
              className="form-input"
              onChange={e => set('logo', e.target.files[0])}
            />
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4 }}>
              PNG or JPG, recommended 200×200px
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Company Description *</label>
            <textarea
              className={`form-textarea ${errors.description ? 'input-error' : ''}`}
              rows={3}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Science-backed skincare for every skin type."
            />
            {errors.description && <div className="form-error">{errors.description}</div>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Industry *</label>
              <select
                className={`form-select ${errors.industry ? 'input-error' : ''}`}
                value={form.industry}
                onChange={e => set('industry', e.target.value)}
              >
                <option value="">Select</option>
                {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
              </select>
              {errors.industry && <div className="form-error">{errors.industry}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Country</label>
              <select
                className="form-select"
                value={form.country}
                onChange={e => set('country', e.target.value)}
              >
                <option value="">Select</option>
                {COUNTRIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Website</label>
            <input
              className={`form-input ${errors.website ? 'input-error' : ''}`}
              value={form.website}
              onChange={e => set('website', e.target.value)}
              placeholder="https://yourcompany.com"
            />
            {errors.website && <div className="form-error">{errors.website}</div>}
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