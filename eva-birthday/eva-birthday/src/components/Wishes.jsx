import { useRef } from 'react'
import { BookOpen, Camera, Compass, Gift, Smile, Users } from 'lucide-react'
import { config } from '../config/content'
import { prefersReducedMotion } from '../lib/motion'
import { useEffects } from './Effects'
import Reveal from './Reveal'

const ICONS = { smile: Smile, camera: Camera, compass: Compass, users: Users, gift: Gift, book: BookOpen }

function WishCard({ icon, text, delay }) {
  const ref = useRef(null)
  const fx = useEffects()
  const Icon = ICONS[icon] || Smile

  // Gentle tilt toward the pointer, mouse only (touch just gets the tap sparkle).
  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || prefersReducedMotion()) return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--rx', `${(-py * 8).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(px * 10).toFixed(2)}deg`)
    el.style.setProperty('--mx', `${(px + 0.5) * 100}%`)
    el.style.setProperty('--my', `${(py + 0.5) * 100}%`)
  }
  const onLeave = () => {
    const el = ref.current
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }
  const onTap = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    fx.sparkle({ x: r.left + r.width / 2, y: r.top + r.height / 2, count: 12 })
    const el = ref.current
    el.classList.remove('is-popped')
    void el.offsetWidth
    el.classList.add('is-popped')
  }

  return (
    <Reveal delay={delay} className="wish">
      <button ref={ref} type="button" className="wish__card" onPointerMove={onMove} onPointerLeave={onLeave} onClick={onTap}>
        <span className="wish__icon" aria-hidden="true">
          <Icon size={22} strokeWidth={1.6} />
        </span>
        <span className="wish__text">{text}</span>
      </button>
    </Reveal>
  )
}

export default function Wishes() {
  const { title, intro, cards } = config.wishes
  return (
    <section id="wishes" className="section wishes" aria-labelledby="wishes-title">
      <div className="section__head">
        <Reveal as="h2" id="wishes-title" className="section__title">
          {title}
        </Reveal>
        <Reveal as="p" delay={100} className="section__intro">
          {intro}
        </Reveal>
      </div>
      <div className="wishes__grid">
        {cards.map((c, i) => (
          <WishCard key={i} {...c} delay={(i % 2) * 120} />
        ))}
      </div>
    </section>
  )
}
