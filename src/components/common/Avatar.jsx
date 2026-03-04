import { useState } from 'react'
import { getInitials } from '../../utils/formatters'

export default function Avatar({ name, size = 36, src }) {
  const [imgError, setImgError] = useState(false)

  const baseStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    userSelect: 'none',
  }

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={name || 'avatar'}
        width={size}
        height={size}
        onError={() => setImgError(true)}
        style={{
          ...baseStyle,
          objectFit: 'cover',
          objectPosition: 'center top',
          display: 'block',
        }}
      />
    )
  }

  return (
    <div
      style={{
        ...baseStyle,
        fontSize: Math.max(Math.floor(size * 0.36), 11),
        fontWeight: 600,
        background: 'var(--color-accent-light)',
        color: 'var(--color-accent)',
      }}
    >
      {getInitials(name)}
    </div>
  )
}