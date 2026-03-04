export default function Button({ children, variant = 'primary', size = '', onClick, disabled, type = 'button', className = '' }) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${size ? `btn-${size}` : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}