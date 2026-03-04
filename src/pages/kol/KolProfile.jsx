import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { demoKolProfile } from '../../utils/demoData'
import { formatINR, formatNumber } from '../../utils/formatters'
import Avatar from '../../components/common/Avatar'

const platformColor = { Instagram: '#e1306c', YouTube: '#ff0000', X: '#000' }

export default function KolProfile() {
  const { user } = useAuth()

  const [profile, setProfile] = useState(() => {
    if (user?.isDemo) return { ...demoKolProfile }
    return {
      id: user?.id || '',
      name: user?.name || '',
      email: user?.email || '',
      category: '',
      country: '',
      bio: '',
      priceFrom: 0,
      rating: null,
      verified: false,
      avatar: null,
      socialAccounts: []
    }
  })

  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({ ...profile })
  const [saved, setSaved] = useState(false)

  function field(key) {
    return e => setDraft(p => ({ ...p, [key]: e.target.value }))
  }

  function save(e) {
    e.preventDefault()
    setProfile({ ...draft })
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function cancel() {
    setDraft({ ...profile })
    setEditing(false)
  }

  return (
    <div className="page-wrapper">
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 24, flexWrap: 'wrap', gap: 12
      }}>
        <div className="page-title" style={{ marginBottom: 0 }}>My Profile</div>
        {!editing && (
          <button
            className="btn btn-secondary"
            onClick={() => { setDraft({ ...profile }); setEditing(true) }}
          >
            Edit Profile
          </button>
        )}
      </div>

      {saved && (
        <div className="auth-message success" style={{ marginBottom: 18 }}>
          Profile saved successfully.
        </div>
      )}

      {editing ? (
        <form onSubmit={save}>
          <div className="settings-section">
            <div className="settings-section-title">Basic Details</div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Display Name</label>
                <input className="form-input" value={draft.name} onChange={field('name')} required />
              </div>
              <div className="form-group">
                <label className="form-label">Category / Niche</label>
                <input className="form-input" value={draft.category} onChange={field('category')} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Country</label>
                <input className="form-input" value={draft.country} onChange={field('country')} />
              </div>
              <div className="form-group">
                <label className="form-label">Starting Price (₹)</label>
                <input
                  className="form-input"
                  type="number"
                  value={draft.priceFrom}
                  onChange={field('priceFrom')}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea
                className="form-input"
                rows={3}
                value={draft.bio}
                onChange={field('bio')}
                style={{ resize: 'vertical' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button className="btn btn-primary" type="submit">Save Changes</button>
            <button className="btn btn-secondary" type="button" onClick={cancel}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          {/* ── Profile header card ── */}
          <div className="settings-section">
            {/* Outer row: avatar + right content */}
            <div className="profile-header-row">
              <Avatar name={profile.name} size={72} src={profile.avatar} />

              {/* Middle: name, category, bio */}
              <div className="profile-header-info">
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  marginBottom: 4, flexWrap: 'wrap'
                }}>
                  <span style={{ fontSize: 20, fontWeight: 700 }}>{profile.name}</span>
                  {profile.verified && (
                    <span style={{
                      fontSize: 11, color: '#fff', background: 'var(--color-info)',
                      padding: '2px 8px', borderRadius: 20, fontWeight: 600
                    }}>
                      Verified
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 6 }}>
                  {profile.category}
                  {profile.country ? ` · ${profile.country}` : ''}
                </div>
                {profile.bio && (
                  <div style={{
                    fontSize: 13, color: 'var(--color-text-secondary)',
                    lineHeight: 1.6
                  }}>
                    {profile.bio}
                  </div>
                )}
              </div>

              {/* Stats: rating + price */}
              {(profile.rating || profile.priceFrom > 0) && (
                <div className="profile-header-stats">
                  {profile.rating && (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 18, fontWeight: 700 }}>⭐ {profile.rating}</div>
                      <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                        Rating
                      </div>
                    </div>
                  )}
                  {profile.priceFrom > 0 && (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 18, fontWeight: 700 }}>{formatINR(profile.priceFrom)}</div>
                      <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                        From
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── Social accounts ── */}
          {profile.socialAccounts && profile.socialAccounts.length > 0 ? (
            <div className="settings-section">
              <div className="settings-section-title">Social Platforms</div>
              <div className="social-accounts-grid">
                {profile.socialAccounts.map(acc => (
                  <div key={acc.id} className="social-account-card">
                    <div className="social-platform-header">
                      <div
                        className="social-platform-name"
                        style={{ color: platformColor[acc.platform] || '#333' }}
                      >
                        {acc.platform}
                        {acc.verified && (
                          <span
                            title="Verified"
                            style={{ color: 'var(--color-info)', fontSize: 11 }}
                          >
                            ✔
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={{ marginBottom: 14 }}>
                      <a
                        href={acc.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontSize: 13,
                          color: 'var(--color-info)',
                          textDecoration: 'underline',
                          wordBreak: 'break-all'
                        }}
                      >
                        {acc.url}
                      </a>
                    </div>

                    <div className="social-stats-row">
                      <div className="social-stat">
                        <div className="social-stat-val">{formatNumber(acc.followers)}</div>
                        <div className="social-stat-lbl">Followers</div>
                      </div>
                      <div className="social-stat">
                        <div className="social-stat-val">{acc.engagementRate}%</div>
                        <div className="social-stat-lbl">Engage</div>
                      </div>
                      <div className="social-stat">
                        <div className="social-stat-val">{formatNumber(acc.avgViews)}</div>
                        <div className="social-stat-lbl">Avg Views</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="settings-section">
              <div className="settings-section-title">Social Platforms</div>
              <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>
                No social accounts added yet.{' '}
                <a href="/kol/social-accounts" style={{ color: 'var(--color-accent)' }}>
                  Add platforms
                </a>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
