import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { prefersReducedMotion } from '../lib/motion'

// One lightweight full-screen canvas for hearts, sparkles and confetti.
// The animation loop only runs while there are particles on screen.

const COLORS = ['#ff3d8b', '#ff5fa2', '#ff8fb1', '#ffb3cc', '#ffd6e2', '#ffffff']
const MAX_PARTICLES = 420
const EffectsContext = createContext(null)

export const useEffects = () => useContext(EffectsContext)

const rand = (min, max) => min + Math.random() * (max - min)
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

function drawHeart(ctx, s) {
  ctx.beginPath()
  ctx.moveTo(0, s * 0.45)
  ctx.bezierCurveTo(-s * 1.15, -s * 0.25, -s * 0.55, -s * 1.0, 0, -s * 0.35)
  ctx.bezierCurveTo(s * 0.55, -s * 1.0, s * 1.15, -s * 0.25, 0, s * 0.45)
  ctx.closePath()
  ctx.fill()
}

function drawSparkle(ctx, s) {
  ctx.beginPath()
  ctx.moveTo(0, -s)
  ctx.quadraticCurveTo(0, 0, s, 0)
  ctx.quadraticCurveTo(0, 0, 0, s)
  ctx.quadraticCurveTo(0, 0, -s, 0)
  ctx.quadraticCurveTo(0, 0, 0, -s)
  ctx.closePath()
  ctx.fill()
}

export function EffectsProvider({ children }) {
  const canvasRef = useRef(null)
  const particles = useRef([])
  const raf = useRef(0)
  const last = useRef(0)
  const size = useRef({ w: 0, h: 0, dpr: 1 })

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = window.innerWidth
    const h = window.innerHeight
    canvas.width = Math.floor(w * dpr)
    canvas.height = Math.floor(h * dpr)
    size.current = { w, h, dpr }
  }, [])

  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf.current)
    }
  }, [resize])

  const frame = useCallback((now) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const { w, h, dpr } = size.current
    const dt = Math.min((now - (last.current || now)) / 1000, 0.05)
    last.current = now

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)

    const list = particles.current
    for (let i = list.length - 1; i >= 0; i--) {
      const p = list[i]
      p.age += dt
      if (p.age >= p.life) {
        list.splice(i, 1)
        continue
      }
      p.vx *= 1 - p.drag * dt
      p.vy = p.vy * (1 - p.drag * dt) + p.gravity * dt
      p.x += p.vx * dt + (p.sway ? Math.sin(p.age * p.swayRate + p.phase) * p.sway * dt : 0)
      p.y += p.vy * dt
      p.rot += p.spin * dt

      const t = p.age / p.life
      const alpha = t < 0.12 ? t / 0.12 : t > 0.65 ? 1 - (t - 0.65) / 0.35 : 1

      ctx.save()
      ctx.globalAlpha = Math.max(0, alpha) * p.opacity
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.fillStyle = p.color
      if (p.glow) {
        ctx.shadowColor = p.color
        ctx.shadowBlur = p.glow
      }
      if (p.kind === 'heart') drawHeart(ctx, p.size)
      else if (p.kind === 'sparkle') drawSparkle(ctx, p.size)
      else if (p.kind === 'ribbon') {
        ctx.scale(1, Math.cos(p.age * 6 + p.phase))
        ctx.fillRect(-p.size * 0.25, -p.size * 1.1, p.size * 0.5, p.size * 2.2)
      } else {
        ctx.scale(1, Math.cos(p.age * 7 + p.phase))
        ctx.fillRect(-p.size * 0.6, -p.size * 0.35, p.size * 1.2, p.size * 0.7)
      }
      ctx.restore()
    }

    if (list.length) {
      raf.current = requestAnimationFrame(frame)
    } else {
      last.current = 0
      raf.current = 0
      ctx.clearRect(0, 0, w, h)
    }
  }, [])

  const add = useCallback(
    (items) => {
      const list = particles.current
      for (const item of items) {
        if (list.length >= MAX_PARTICLES) break
        list.push(item)
      }
      if (!raf.current) raf.current = requestAnimationFrame(frame)
    },
    [frame],
  )

  const make = (kind, x, y, o) => ({
    kind,
    x,
    y,
    vx: o.vx ?? 0,
    vy: o.vy ?? 0,
    gravity: o.gravity ?? 0,
    drag: o.drag ?? 0.8,
    rot: o.rot ?? rand(-0.6, 0.6),
    spin: o.spin ?? rand(-2, 2),
    size: o.size ?? rand(7, 14),
    color: o.color ?? pick(COLORS),
    life: o.life ?? rand(1.6, 2.6),
    age: 0,
    opacity: o.opacity ?? 1,
    glow: o.glow ?? 0,
    sway: o.sway ?? 0,
    swayRate: o.swayRate ?? rand(2, 4),
    phase: rand(0, Math.PI * 2),
  })

  const api = useMemo(() => {
    const centre = () => ({ x: window.innerWidth / 2, y: window.innerHeight * 0.5 })

    // A pop of hearts and sparkles from one point.
    const burst = ({ x, y, count = 28, power = 1, hearts = 0.6 } = {}) => {
      if (prefersReducedMotion()) return
      const c = centre()
      const ox = x ?? c.x
      const oy = y ?? c.y
      const items = []
      for (let i = 0; i < count; i++) {
        const angle = rand(0, Math.PI * 2)
        const speed = rand(120, 380) * power
        const isHeart = Math.random() < hearts
        items.push(
          make(isHeart ? 'heart' : 'sparkle', ox, oy, {
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 90 * power,
            gravity: 160,
            drag: 1.4,
            size: isHeart ? rand(8, 16) : rand(5, 10),
            glow: 10,
            life: rand(1.4, 2.4),
          }),
        )
      }
      add(items)
    }

    // Soft celebratory confetti falling from the top of the screen.
    const confetti = ({ count = 150 } = {}) => {
      if (prefersReducedMotion()) return
      const { w } = size.current
      const items = []
      for (let i = 0; i < count; i++) {
        const fromLeft = i % 3 === 0
        const fromRight = i % 3 === 1
        const x = fromLeft ? -10 : fromRight ? w + 10 : rand(0, w)
        const y = fromLeft || fromRight ? rand(window.innerHeight * 0.1, window.innerHeight * 0.5) : -20
        items.push(
          make(Math.random() < 0.3 ? 'ribbon' : 'confetti', x, y, {
            vx: fromLeft ? rand(200, 520) : fromRight ? rand(-520, -200) : rand(-80, 80),
            vy: fromLeft || fromRight ? rand(-420, -120) : rand(40, 160),
            gravity: 260,
            drag: 1.1,
            size: rand(6, 11),
            spin: rand(-6, 6),
            life: rand(3, 4.6),
            sway: 40,
          }),
        )
      }
      add(items)
    }

    // Hearts that drift upward from the bottom of the screen.
    const rise = ({ count = 40 } = {}) => {
      if (prefersReducedMotion()) return
      const { w, h } = size.current
      const items = []
      for (let i = 0; i < count; i++) {
        items.push(
          make(Math.random() < 0.85 ? 'heart' : 'sparkle', rand(0, w), h + rand(10, 80), {
            vx: rand(-20, 20),
            vy: rand(-300, -140),
            gravity: -10,
            drag: 0.2,
            size: rand(10, 24),
            spin: rand(-0.5, 0.5),
            glow: 14,
            life: rand(3.2, 5),
            sway: rand(20, 60),
            opacity: 0.95,
          }),
        )
      }
      add(items)
    }

    // A tiny shimmer, good for taps on cards and buttons.
    const sparkle = ({ x, y, count = 10 } = {}) => burst({ x, y, count, power: 0.45, hearts: 0.3 })

    // The big, but still elegant, finale.
    const grand = () => {
      if (prefersReducedMotion()) return
      const { w, h } = size.current
      rise({ count: 70 })
      burst({ x: w * 0.5, y: h * 0.55, count: 60, power: 1.25, hearts: 0.7 })
      setTimeout(() => burst({ x: w * 0.22, y: h * 0.5, count: 28, power: 0.9, hearts: 0.7 }), 280)
      setTimeout(() => burst({ x: w * 0.78, y: h * 0.5, count: 28, power: 0.9, hearts: 0.7 }), 480)
      setTimeout(() => rise({ count: 40 }), 900)
    }

    return { burst, confetti, rise, sparkle, grand }
  }, [add])

  return (
    <EffectsContext.Provider value={api}>
      {children}
      <canvas ref={canvasRef} className="effects-canvas" aria-hidden="true" />
    </EffectsContext.Provider>
  )
}
