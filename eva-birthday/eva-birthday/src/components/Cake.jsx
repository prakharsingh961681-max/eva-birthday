import { useState } from 'react'
import { config } from '../config/content'
import { useEffects } from './Effects'
import { Glyph } from './Icons'
import Reveal from './Reveal'

const CANDLES = 18

function CakeArt({ out }) {
  const candles = Array.from({ length: CANDLES }, (_, i) => {
    const x = 104 + i * 11.6
    const tall = i % 2 === 0
    return { i, x, h: tall ? 36 : 28 }
  })

  return (
    <svg viewBox="0 0 400 350" className={`cake__svg ${out ? 'is-out' : ''}`} role="img" aria-label={`A pink and black birthday cake with ${CANDLES} candles`}>
      <defs>
        <linearGradient id="ck-pink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff9cc0" />
          <stop offset="1" stopColor="#ff4f98" />
        </linearGradient>
        <linearGradient id="ck-dark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a1823" />
          <stop offset="1" stopColor="#120b10" />
        </linearGradient>
        <linearGradient id="ck-candle-a" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffd6e2" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <radialGradient id="ck-flame" cx="0.5" cy="0.7" r="0.6">
          <stop offset="0" stopColor="#fff7d6" />
          <stop offset="0.55" stopColor="#ffd27a" />
          <stop offset="1" stopColor="#ff7aa8" />
        </radialGradient>
        <filter id="ck-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* plate */}
      <ellipse cx="200" cy="318" rx="176" ry="20" fill="#1a1016" stroke="#ff8fb1" strokeOpacity=".5" />
      <ellipse cx="200" cy="314" rx="160" ry="14" fill="#241520" />

      {/* bottom tier */}
      <rect x="46" y="222" width="308" height="92" rx="16" fill="url(#ck-dark)" stroke="#ff8fb1" strokeOpacity=".55" />
      <path
        d="M46 238c0-9 7-16 16-16h276c9 0 16 7 16 16v4c-12 0-12 16-26 16s-12-12-24-12-12 16-26 16-12-10-24-10-12 14-26 14-12-14-26-14-12 12-24 12-12-16-26-16-12 12-24 12-12-16-26-16-12 12-26 12z"
        fill="url(#ck-pink)"
      />
      {Array.from({ length: 13 }, (_, i) => (
        <circle key={i} cx={66 + i * 22.2} cy="304" r="3.6" fill="#ffd6e2" opacity=".9" />
      ))}
      <text x="200" y="293" textAnchor="middle" className="cake__script">
        {config.age}
      </text>

      {/* top tier */}
      <rect x="92" y="148" width="216" height="76" rx="14" fill="url(#ck-pink)" stroke="#ffd6e2" strokeOpacity=".5" />
      <path
        d="M92 164c0-9 6-16 15-16h186c9 0 15 7 15 16v3c-10 0-10 14-22 14s-10-10-20-10-10 14-22 14-10-12-20-12-10 14-22 14-10-12-20-12-10 12-22 12-10-14-18-14z"
        fill="#fff"
        opacity=".92"
      />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d={`M${112 + i * 35} 206l5-9 5 9z`} fill="#ffe6ee" opacity=".7" />
      ))}

      {/* candles */}
      {candles.map(({ i, x, h }) => (
        <g key={i} className="cake__candle" style={{ '--n': i }}>
          <rect x={x - 2.6} y={148 - h} width="5.2" height={h} rx="2.4" fill={i % 2 ? '#ff4f98' : 'url(#ck-candle-a)'} />
          <rect x={x - 2.6} y={148 - h + 6} width="5.2" height="2.6" fill="#1a1016" opacity=".28" />
          <rect x={x - 2.6} y={148 - h + 14} width="5.2" height="2.6" fill="#1a1016" opacity=".28" />
          <g transform={`translate(${x} ${148 - h - 2})`}>
            <g className="cake__flame">
              <ellipse cx="0" cy="-5" rx="6" ry="8" fill="#ff8fb1" opacity=".55" filter="url(#ck-glow)" />
              <path d="M0-14c4 5 5 8 5 11a5 5 0 0 1-10 0c0-3 1-6 5-11z" fill="url(#ck-flame)" />
            </g>
          </g>
          <circle className="cake__smoke" cx={x} cy={148 - h - 6} r="2.4" fill="#ffd6e2" />
        </g>
      ))}
    </svg>
  )
}

export default function Cake({ celebrated, onCelebrate, onReset }) {
  const { title, helper, button, againButton, wish } = config.cake
  const fx = useEffects()
  const [wishKey, setWishKey] = useState(0)

  const celebrate = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    onCelebrate()
    setWishKey((k) => k + 1)
    fx.confetti({ count: 150 })
    fx.burst({ x: r.left + r.width / 2, y: r.top, count: 36, power: 1 })
    setTimeout(() => fx.rise({ count: 34 }), 450)
  }

  return (
    <section id="cake" className="section cake" aria-labelledby="cake-title">
      <Reveal as="h2" id="cake-title" className="section__title">
        {title}
      </Reveal>
      <Reveal as="p" delay={100} className="section__intro">
        {helper}
      </Reveal>

      <Reveal delay={160} className="cake__stage">
        <div className={`cake__aura ${celebrated ? 'is-bright' : ''}`} aria-hidden="true" />
        <CakeArt out={celebrated} />
      </Reveal>

      <div className="cake__actions">
        {!celebrated ? (
          <button type="button" className="btn btn--primary btn--big" onClick={celebrate}>
            <Glyph name="sparkle" className="btn__glyph" />
            <span>{button}</span>
          </button>
        ) : (
          <button type="button" className="btn btn--ghost" onClick={onReset}>
            {againButton}
          </button>
        )}
      </div>

      <div className={`cake__wish ${celebrated ? 'is-shown' : ''}`} aria-live="polite" key={wishKey}>
        {celebrated && (
          <>
            <span className="cake__wish-big" aria-hidden="true">
              {config.age}
            </span>
            <p>{wish}</p>
          </>
        )}
      </div>
    </section>
  )
}
