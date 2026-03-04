import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // In production this would ship to Sentry or similar
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  reset() {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '32px 24px',
          textAlign: 'center',
          color: 'var(--color-text-muted)',
          border: '1px solid var(--color-border)',
          borderRadius: 10,
          margin: '16px 0'
        }}>
          <div style={{ fontSize: 28, marginBottom: 10 }}>⚠️</div>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6, color: 'var(--color-text-primary)' }}>
            Something went wrong
          </div>
          <div style={{ fontSize: 13, marginBottom: 16 }}>
            {this.props.fallbackMessage || 'This section failed to load. Try refreshing.'}
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => this.reset()}
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}