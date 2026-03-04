export default function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className="spinner-wrap">
      <div style={{ textAlign: 'center' }}>
        <div className="spinner" />
        {text && <p style={{ marginTop: 10, fontSize: 13, color: 'var(--color-text-muted)' }}>{text}</p>}
      </div>
    </div>
  )
}