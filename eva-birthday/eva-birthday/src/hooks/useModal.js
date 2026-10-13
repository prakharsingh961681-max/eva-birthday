import { useEffect } from 'react'

// Shared behaviour for dialogs: lock page scroll, close on Escape,
// keep Tab inside the dialog, and give focus back when it closes.
export function useModal(open, onClose, containerRef) {
  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusables = () =>
      containerRef.current
        ? [...containerRef.current.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')].filter(
            (el) => !el.disabled,
          )
        : []

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key === 'Tab') {
        const items = focusables()
        if (!items.length) return
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    const t = setTimeout(() => focusables()[0]?.focus(), 30)

    return () => {
      clearTimeout(t)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus({ preventScroll: true })
    }
  }, [open, onClose, containerRef])
}
