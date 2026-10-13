import { useState } from 'react'
import { Glyph } from './Icons'
import { config } from '../config/content'

// A Polaroid-style frame. Shows the real photo when it exists, a soft heart
// frame when the slot is empty (and previews are on), otherwise nothing.
export default function Polaroid({
  src,
  alt,
  caption,
  shape = 'portrait',
  focus = '50% 35%',
  status, // 'ready' | 'missing' | undefined
  tilt = 0,
  eager = false,
  onClick,
  className = '',
  tape = true,
  index = 0,
}) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const missing = status === 'missing' || failed

  if (missing && !config.showEmptyPhotoSlots) return null

  const inner = (
    <>
      {tape && <span className="polaroid__tape" aria-hidden="true" />}
      <span className={`polaroid__photo polaroid__photo--${shape} ${loaded && !missing ? 'is-loaded' : ''}`}>
        {missing ? (
          <span className="polaroid__empty" aria-hidden="true">
            <Glyph name="heart" className="polaroid__empty-heart" />
            <Glyph name="sparkle" className="polaroid__empty-spark" />
          </span>
        ) : (
          status === 'ready' && (
            <img
              src={src}
              alt={alt}
              style={{ objectPosition: focus }}
              loading={eager ? 'eager' : 'lazy'}
              fetchPriority={eager ? 'high' : 'auto'}
              decoding="async"
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
              draggable="false"
            />
          )
        )}
      </span>
      {caption && <span className="polaroid__caption">{caption}</span>}
    </>
  )

  const style = { '--tilt': `${tilt}deg`, '--i': index }
  const cls = `polaroid ${missing ? 'is-empty' : ''} ${className}`

  if (onClick && !missing) {
    return (
      <button type="button" className={`${cls} polaroid--button`} style={style} onClick={onClick} aria-label={`Open photo: ${alt}`}>
        {inner}
      </button>
    )
  }
  return (
    <figure className={cls} style={style}>
      {inner}
    </figure>
  )
}
