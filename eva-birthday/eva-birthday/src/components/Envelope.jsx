import { useRef, useState } from 'react'
import { X } from 'lucide-react'
import { config } from '../config/content'
import { useEffects } from './Effects'
import { useModal } from '../hooks/useModal'
import { Glyph } from './Icons'
import Reveal from './Reveal'

// Closed → opening (flap lifts, letter rises) → card (readable message) → back.
export default function Envelope() {
  const { seal, hint, tapLabel, cardTitle, message, back } = config.envelope
  const fx = useEffects()
  const [phase, setPhase] = useState('closed') // closed | opening | open | read
  const cardRef = useRef(null)
  const timers = useRef([])
  const who = config.creatorName

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))

  const openEnvelope = (e) => {
    if (phase !== 'closed' && phase !== 'open') return
    if (phase === 'open') {
      setPhase('read')
      return
    }
    const r = e.currentTarget.getBoundingClientRect()
    setPhase('opening')
    fx.sparkle({ x: r.left + r.width / 2, y: r.top + r.height * 0.45, count: 14 })
    later(() => setPhase('open'), 1300)
    later(() => {
      setPhase('read')
      fx.burst({ x: window.innerWidth / 2, y: window.innerHeight * 0.55, count: 22, power: 0.8 })
    }, 1900)
  }

  const close = () => {
    setPhase('open')
  }

  useModal(phase === 'read', close, cardRef)

  const stateClass = phase === 'closed' ? '' : 'is-open'
  const liftClass = phase === 'open' || phase === 'read' ? 'is-lifted' : ''

  return (
    <section id="envelope" className="section envelope" aria-labelledby="envelope-title">
      <Reveal as="h2" id="envelope-title" className="envelope__hint">
        {hint}
      </Reveal>

      <Reveal delay={120} className="envelope__stage">
        <button
          type="button"
          className={`env ${stateClass} ${liftClass}`}
          onClick={openEnvelope}
          disabled={phase === 'opening'}
          aria-label={phase === 'closed' ? 'Open the envelope' : 'Read the letter again'}
        >
          <span className="env__back" />
          <span className="env__paper" aria-hidden="true">
            <span className="env__line" />
            <span className="env__line env__line--short" />
            <span className="env__line" />
          </span>
          <span className="env__front" />
          <span className="env__flap" />
          <span className="env__seal" aria-hidden="true">
            <span>{seal}</span>
          </span>
        </button>
        <p className="envelope__tap">{phase === 'closed' ? tapLabel : 'Tap to read it again'}</p>
      </Reveal>

      {phase === 'read' && (
        <div className="note" role="dialog" aria-modal="true" aria-labelledby="note-title" ref={cardRef}>
          <div className="note__floaters" aria-hidden="true">
            {Array.from({ length: 12 }, (_, i) => (
              <Glyph
                key={i}
                name={i % 3 === 0 ? 'sparkle' : 'heart'}
                className="note__float"
                style={{
                  left: `${6 + ((i * 8.1) % 88)}%`,
                  animationDelay: `${(i % 6) * 0.9}s`,
                  animationDuration: `${7 + (i % 5)}s`,
                  width: 10 + (i % 4) * 5,
                  height: 10 + (i % 4) * 5,
                }}
              />
            ))}
          </div>
          <div className="note__card">
            <button type="button" className="icon-btn note__x" onClick={close} aria-label="Close letter">
              <X size={20} />
            </button>
            <span className="note__seal" aria-hidden="true">
              {seal}
            </span>
            <h3 id="note-title" className="note__title">
              {cardTitle}
            </h3>
            <div className="note__text">
              {message.map((m, i) => (
                <p key={i}>{m}</p>
              ))}
            </div>
            {who && <p className="note__sign">with love, {who}</p>}
            <button type="button" className="btn btn--ghost" onClick={close}>
              {back}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
