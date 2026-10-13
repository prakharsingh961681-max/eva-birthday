import { useEffect, useMemo, useRef, useState } from 'react'
import { config } from '../config/content'
import { useEffects } from './Effects'
import { Glyph } from './Icons'

// Full-screen cinematic opening. Mounted until the surprise is opened.
export default function Intro({ onOpen }) {
  const fx = useEffects()
  const [leaving, setLeaving] = useState(false)
  const btnRef = useRef(null)
  const { greeting, line, button } = config.intro

  const stars = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 5,
        dur: 3 + Math.random() * 4,
        heart: i % 7 === 0,
      })),
    [],
  )

  useEffect(() => {
    btnRef.current?.focus({ preventScroll: true })
  }, [])

  const open = () => {
    if (leaving) return
    const r = btnRef.current?.getBoundingClientRect()
    fx.burst({
      x: r ? r.left + r.width / 2 : undefined,
      y: r ? r.top + r.height / 2 : undefined,
      count: 46,
      power: 1.2,
    })
    setLeaving(true)
    setTimeout(() => fx.rise({ count: 26 }), 350)
    setTimeout(onOpen, 1250)
  }

  const letters = [...greeting]

  return (
    <div className={`intro ${leaving ? 'is-leaving' : ''}`} role="dialog" aria-modal="true" aria-label="Opening screen">
      <div className="intro__sky" aria-hidden="true">
        {stars.map((s) => (
          <span
            key={s.id}
            className={`intro__star ${s.heart ? 'is-heart' : ''}`}
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }}
          >
            {s.heart && <Glyph name="heart" />}
          </span>
        ))}
      </div>
      <div className="intro__glow" aria-hidden="true" />
      <div className="intro__flash" aria-hidden="true" />

      <div className="intro__inner">
        <h1 className="intro__greeting" aria-label={greeting}>
          {letters.map((ch, i) => (
            <span key={i} aria-hidden="true" style={{ '--i': i }}>
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </h1>
        <p className="intro__line">{line}</p>
        <button ref={btnRef} type="button" className="btn btn--primary intro__btn" onClick={open}>
          {button}
        </button>
      </div>
    </div>
  )
}
