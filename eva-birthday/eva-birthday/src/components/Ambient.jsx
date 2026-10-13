import { useMemo } from 'react'
import { Glyph } from './Icons'

// Slow, quiet floating hearts and sparkles. Pure CSS (transform + opacity),
// deliberately few of them so phones stay smooth.
export default function Ambient({ count = 16 }) {
  const items = useMemo(() => {
    const r = (a, b) => a + Math.random() * (b - a)
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      kind: i % 3 === 0 ? 'heart' : 'sparkle',
      left: r(2, 98),
      size: r(8, 20),
      dur: r(16, 30),
      delay: -r(0, 30),
      drift: r(-40, 40),
      hue: i % 4,
    }))
  }, [count])

  return (
    <div className="ambient" aria-hidden="true">
      {items.map((p) => (
        <Glyph
          key={p.id}
          name={p.kind}
          className={`ambient__p ambient__p--${p.hue}`}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            '--dur': `${p.dur}s`,
            '--delay': `${p.delay}s`,
            '--drift': `${p.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
