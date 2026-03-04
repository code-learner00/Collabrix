import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PLATFORMS, COUNTRIES } from '../../utils/constants'

const stepLabels = ['Basics', 'Deliverables', 'Review']

function validate(step, form) {
  const errors = {}
  if (step === 0) {
    if (!form.title.trim()) errors.title = 'Campaign title is required'
    if (!form.description.trim()) errors.description = 'Description is required'
    if (!form.budget || Number(form.budget) <= 0) errors.budget = 'Enter a valid budget'
    if (!form.deadline) errors.deadline = 'Deadline is required'
    if (!form.platform) errors.platform = 'Select a platform'
  }
  if (step === 1) {
    if (!form.deliverables.trim()) errors.deliverables = 'Describe the deliverables'
  }
  return errors
}

function ReviewRow({ label, value }) {
  return (
    <div style={{
      display: 'flex', gap: 12,
      paddingBottom: 10, borderBottom: '1px solid var(--color-border-light)'
    }}>
      <span style={{
        width: 140, fontSize: 12, fontWeight: 600,
        textTransform: 'uppercase', color: 'var(--color-text-muted)', flexShrink: 0
      }}>
        {label}
      </span>
      <span style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>
        {value || '—'}
      </span>
    </div>
  )
}

export default function CreateCampaign() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    title: '', description: '', budget: '', deadline: '',
    platform: '', country: '', targetAudience: '',
    deliverables: '', requirements: '', files: null
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState(false)

  function set(k, v) {
    setForm(p => ({ ...p, [k]: v }))
    // Clear error on change
    if (errors[k]) setErrors(p => ({ ...p, [k]: undefined }))
  }

  function tryNext() {
    const errs = validate(step, form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setStep(p => p + 1)
  }

  async function publish() {
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 800))
    setSubmitting(false)
    setToast(true)
    setTimeout(() => {
      setToast(false)
      navigate('/company/campaigns')
    }, 1500)
  }

  return (
    <div className="page-wrapper">
      <div className="page-title">Create Campaign</div>

      {toast && (
        <div className="auth-message success" style={{ marginBottom: 16 }}>
          Campaign published successfully! Redirecting...
        </div>
      )}

      <div className="step-wizard">
        {stepLabels.map((label, i) => (
          <div key={label} className="step-item">
            <div className={`step-circle ${i < step ? 'done' : i === step ? 'active' : ''}`}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`step-label ${i === step ? 'active' : ''}`}>{label}</span>
            {i < stepLabels.length - 1 && <div className={`step-line ${i < step ? 'done' : ''}`} />}
          </div>
        ))}
      </div>

      <div className="card">
        {step === 0 && (
          <div>
            <div className="form-group">
              <label className="form-label">Campaign Title *</label>
              <input
                className={`form-input ${errors.title ? 'input-error' : ''}`}
                value={form.title}
                onChange={e => set('title', e.target.value)}
                placeholder="e.g. Summer Fashion Drop"
              />
              {errors.title && <div className="form-error">{errors.title}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea
                className={`form-textarea ${errors.description ? 'input-error' : ''}`}
                value={form.description}
                onChange={e => set('description', e.target.value)}
                placeholder="Describe your campaign goals..."
              />
              {errors.description && <div className="form-error">{errors.description}</div>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Budget (₹) *</label>
                <input
                  className={`form-input ${errors.budget ? 'input-error' : ''}`}
                  type="number"
                  value={form.budget}
                  onChange={e => set('budget', e.target.value)}
                  placeholder="e.g. 50000"
                />
                {errors.budget && <div className="form-error">{errors.budget}</div>}
              </div>
              <div className="form-group">
                <label className="form-label">Deadline *</label>
                <input
                  className={`form-input ${errors.deadline ? 'input-error' : ''}`}
                  type="date"
                  value={form.deadline}
                  onChange={e => set('deadline', e.target.value)}
                />
                {errors.deadline && <div className="form-error">{errors.deadline}</div>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Required Platform *</label>
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
              <div className="form-group">
                <label className="form-label">Target Country</label>
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
              <label className="form-label">Target Audience</label>
              <input
                className="form-input"
                value={form.targetAudience}
                onChange={e => set('targetAudience', e.target.value)}
                placeholder="e.g. 18-35, fashion enthusiasts"
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <div className="form-group">
              <label className="form-label">Deliverables *</label>
              <textarea
                className={`form-textarea ${errors.deliverables ? 'input-error' : ''}`}
                value={form.deliverables}
                onChange={e => set('deliverables', e.target.value)}
                placeholder="e.g. 3 Instagram posts, 2 Stories, 1 Reel"
              />
              {errors.deliverables && <div className="form-error">{errors.deliverables}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">KOL Requirements</label>
              <textarea
                className="form-textarea"
                value={form.requirements}
                onChange={e => set('requirements', e.target.value)}
                placeholder="Minimum followers, engagement rate, etc."
              />
            </div>
            <div className="form-group">
              <label className="form-label">Attach Files (optional)</label>
              <input
                type="file"
                multiple
                className="form-input"
                onChange={e => set('files', e.target.files)}
              />
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4 }}>
                Brief documents, brand guidelines, etc.
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Review Campaign</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <ReviewRow label="Title" value={form.title} />
              <ReviewRow
                label="Budget"
                value={form.budget ? `₹${Number(form.budget).toLocaleString('en-IN')}` : null}
              />
              <ReviewRow label="Deadline" value={form.deadline} />
              <ReviewRow label="Platform" value={form.platform} />
              <ReviewRow label="Country" value={form.country} />
              <ReviewRow label="Target Audience" value={form.targetAudience} />
              <ReviewRow label="Deliverables" value={form.deliverables} />
              {form.requirements && <ReviewRow label="Requirements" value={form.requirements} />}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
          {step > 0 ? (
            <button className="btn btn-secondary" onClick={() => setStep(p => p - 1)}>Back</button>
          ) : <div />}
          {step < 2 ? (
            <button className="btn btn-primary" onClick={tryNext}>Next</button>
          ) : (
            <button className="btn btn-primary" onClick={publish} disabled={submitting}>
              {submitting ? 'Publishing...' : 'Publish Campaign'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}