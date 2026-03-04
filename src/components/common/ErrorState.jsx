export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="error-state">
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn-secondary btn-sm" style={{ marginTop: 10 }} onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  )
}