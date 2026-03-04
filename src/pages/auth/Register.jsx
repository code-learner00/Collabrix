import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { PLATFORMS, COUNTRIES, CATEGORIES } from '../../utils/constants'

const INDUSTRIES = [
  'Health & Beauty', 'Fashion & Apparel', 'Technology', 'Food & Beverage',
  'Education', 'Finance', 'Travel & Lifestyle', 'Gaming', 'Retail', 'Other'
]

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [role, setRole] = useState('kol')
  const [form, setForm] = useState({
    email: '', password: '', name: '', companyName: '',
    country: '', category: '', platform: '',
    website: '', industry: '',
  })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  function set(k, v) {
    setForm(p => ({ ...p, [k]: v }))
    if (errors[k]) setErrors(p => ({ ...p, [k]: undefined }))
  }

  function validate() {
    const e = {}
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters'
    if (role === 'kol') {
      if (!form.name.trim()) e.name = 'Full name is required'
      if (!form.country) e.country = 'Select your country'
      if (!form.category) e.category = 'Select a category'
      if (!form.platform) e.platform = 'Select your primary platform'
    } else {
      if (!form.companyName.trim()) e.companyName = 'Company name is required'
      if (!form.country) e.country = 'Select country'
      if (!form.industry) e.industry = 'Select an industry'
    }
    return e
  }

  async function handleSubmit() {
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setLoading(true)
    setApiError('')
    try {
      await register({ ...form, role })
      // Redirect to profile completion — not straight to dashboard
      if (role === 'kol') navigate('/kol/complete-profile')
      else navigate('/company/setup-profile')
    } catch (err) {
      setApiError(err.message || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">Collabrix</div>
        <div className="auth-title">Create your account</div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {['kol', 'company'].map(r => (
            <button
              key={r}
              className={`btn ${role === r ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              style={{ flex: 1 }}
              onClick={() => { setRole(r); setErrors({}) }}
            >
              {r === 'kol' ? 'I am a KOL' : 'I am a Brand'}
            </button>
          ))}
        </div>

        {apiError && <div className="auth-message error">{apiError}</div>}

        <div className="form-group">
          <label className="form-label">Email *</label>
          <input
            className={`form-input ${errors.email ? 'input-error' : ''}`}
            type="email"
            value={form.email}
            onChange={e => set('email', e.target.value)}
            placeholder="you@example.com"
          />
          {errors.email && <div className="form-error">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Password *</label>
          <input
            className={`form-input ${errors.password ? 'input-error' : ''}`}
            type="password"
            value={form.password}
            onChange={e => set('password', e.target.value)}
            placeholder="Min. 6 characters"
          />
          {errors.password && <div className="form-error">{errors.password}</div>}
        </div>

        {role === 'kol' ? (
          <>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                className={`form-input ${errors.name ? 'input-error' : ''}`}
                value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder="Your full name"
              />
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Country *</label>
                <select
                  className={`form-select ${errors.country ? 'input-error' : ''}`}
                  value={form.country}
                  onChange={e => set('country', e.target.value)}
                >
                  <option value="">Select</option>
                  {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                </select>
                {errors.country && <div className="form-error">{errors.country}</div>}
              </div>
              <div className="form-group">
                <label className="form-label">Category *</label>
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
            </div>
            <div className="form-group">
              <label className="form-label">Primary Platform *</label>
              <select
                className={`form-select ${errors.platform ? 'input-error' : ''}`}
                value={form.platform}
                onChange={e => set('platform', e.target.value)}
              >
                <option value="">Select</option>
                {PLATFORMS.map(p => <option key={p}>{p}</option>)}
              </select>
              {errors.platform && <div className="form-error">{errors.platform}</div>}
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label className="form-label">Company Name *</label>
              <input
                className={`form-input ${errors.companyName ? 'input-error' : ''}`}
                value={form.companyName}
                onChange={e => set('companyName', e.target.value)}
                placeholder="Your company name"
              />
              {errors.companyName && <div className="form-error">{errors.companyName}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Website</label>
              <input
                className="form-input"
                value={form.website}
                onChange={e => set('website', e.target.value)}
                placeholder="https://yourcompany.com"
              />
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
                <label className="form-label">Country *</label>
                <select
                  className={`form-select ${errors.country ? 'input-error' : ''}`}
                  value={form.country}
                  onChange={e => set('country', e.target.value)}
                >
                  <option value="">Select</option>
                  {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                </select>
                {errors.country && <div className="form-error">{errors.country}</div>}
              </div>
            </div>
          </>
        )}

        <button
          className="btn btn-primary"
          style={{ width: '100%', marginTop: 8 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  )
}