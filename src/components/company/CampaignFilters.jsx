import { PLATFORMS, CATEGORIES, COUNTRIES } from '../../utils/constants'

export default function CampaignFilters({ filters, onChange }) {
  function handle(key, val) {
    onChange({ ...filters, [key]: val })
  }
  return (
    <div className="filters-bar">
      <div className="filter-group">
        <label className="filter-label">Platform</label>
        <select className="filter-input" value={filters.platform || ''} onChange={e => handle('platform', e.target.value)}>
          <option value="">All</option>
          {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <div className="filter-group">
        <label className="filter-label">Category</label>
        <select className="filter-input" value={filters.category || ''} onChange={e => handle('category', e.target.value)}>
          <option value="">All</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="filter-group">
        <label className="filter-label">Country</label>
        <select className="filter-input" value={filters.country || ''} onChange={e => handle('country', e.target.value)}>
          <option value="">All</option>
          {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="filter-group">
        <label className="filter-label">Min Followers</label>
        <input className="filter-input" type="number" placeholder="e.g. 10000" value={filters.minFollowers || ''} onChange={e => handle('minFollowers', e.target.value)} />
      </div>
      <div className="filter-group">
        <label className="filter-label">Max Budget (₹)</label>
        <input className="filter-input" type="number" placeholder="e.g. 50000" value={filters.maxBudget || ''} onChange={e => handle('maxBudget', e.target.value)} />
      </div>
    </div>
  )
}