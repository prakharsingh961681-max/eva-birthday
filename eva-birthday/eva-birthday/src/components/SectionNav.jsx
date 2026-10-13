import { useEffect, useState } from 'react'
import { scrollToId } from '../lib/motion'

const ITEMS = [
  { id: 'hero', label: 'Top' },
  { id: 'memories', label: 'Memory lane' },
  { id: 'letter', label: 'Message' },
  { id: 'envelope', label: 'Envelope' },
  { id: 'cake', label: 'Cake' },
  { id: 'wishes', label: 'Wishes' },
  { id: 'finale', label: 'Finale' },
]

// Slim dot navigation, shown on wide screens only.
export default function SectionNav() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const els = ITEMS.map((i) => document.getElementById(i.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <nav className="dotnav" aria-label="Sections">
      {ITEMS.map((i) => (
        <button
          key={i.id}
          type="button"
          className={`dotnav__dot ${active === i.id ? 'is-active' : ''}`}
          onClick={() => scrollToId(i.id)}
          aria-label={i.label}
          aria-current={active === i.id ? 'true' : undefined}
        >
          <span className="dotnav__tip">{i.label}</span>
        </button>
      ))}
    </nav>
  )
}
