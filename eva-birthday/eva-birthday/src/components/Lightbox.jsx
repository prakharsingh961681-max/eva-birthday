import { useCallback, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useModal } from '../hooks/useModal'

// items: [{ src, alt, caption }]
export default function Lightbox({ items, index, onClose, onIndex }) {
  const ref = useRef(null)
  const touch = useRef(null)
  const open = index !== null
  useModal(open, onClose, ref)

  const go = useCallback(
    (dir) => {
      if (!items.length) return
      onIndex((index + dir + items.length) % items.length)
    },
    [index, items.length, onIndex],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, go])

  // Warm up the neighbouring photos so next/previous feels instant.
  useEffect(() => {
    if (!open) return
    ;[-1, 1].forEach((d) => {
      const item = items[(index + d + items.length) % items.length]
      if (item) new Image().src = item.src
    })
  }, [open, index, items])

  if (!open || !items[index]) return null
  const item = items[index]

  const onTouchStart = (e) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchEnd = (e) => {
    if (!touch.current) return
    const dx = e.changedTouches[0].clientX - touch.current.x
    const dy = e.changedTouches[0].clientY - touch.current.y
    touch.current = null
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? 1 : -1)
  }

  return (
    <div
      ref={ref}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button type="button" className="icon-btn lightbox__close" onClick={onClose} aria-label="Close photo viewer">
        <X size={22} />
      </button>

      {items.length > 1 && (
        <button type="button" className="icon-btn lightbox__nav lightbox__nav--prev" onClick={() => go(-1)} aria-label="Previous photo">
          <ChevronLeft size={26} />
        </button>
      )}

      <figure className="lightbox__figure" key={item.src}>
        <img src={item.src} alt={item.alt} draggable="false" />
        <figcaption>
          {item.caption && <span className="lightbox__caption">{item.caption}</span>}
          <span className="lightbox__count" aria-live="polite">
            {index + 1} / {items.length}
          </span>
        </figcaption>
      </figure>

      {items.length > 1 && (
        <button type="button" className="icon-btn lightbox__nav lightbox__nav--next" onClick={() => go(1)} aria-label="Next photo">
          <ChevronRight size={26} />
        </button>
      )}
    </div>
  )
}
