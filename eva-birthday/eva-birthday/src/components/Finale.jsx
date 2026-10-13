import { useState } from 'react'
import { config } from '../config/content'
import { useEffects } from './Effects'
import { scrollToId } from '../lib/motion'
import Reveal from './Reveal'

export default function Finale() {
  const { line1, line2, button, message, footer, replay } = config.finale
  const fx = useEffects()
  const [hugged, setHugged] = useState(false)
  const [glow, setGlow] = useState(0)

  const hug = () => {
    fx.grand()
    setHugged(true)
    setGlow((g) => g + 1) // restarts the glow animation on every press
  }

  return (
    <section id="finale" className="section finale" aria-labelledby="finale-title">
      {glow > 0 && <div key={glow} className="finale__screenglow" aria-hidden="true" />}

      <Reveal as="p" className="finale__line1">
        {line1}
      </Reveal>
      <Reveal as="h2" id="finale-title" delay={350} className="finale__line2">
        {line2}
      </Reveal>

      <Reveal delay={700} className="finale__action">
        <button type="button" className="btn btn--primary btn--big" onClick={hug}>
          {button}
        </button>
      </Reveal>

      <div className={`finale__message ${hugged ? 'is-shown' : ''}`} aria-live="polite">
        {hugged && message.map((m, i) => <p key={i} style={{ '--k': i }}>{m}</p>)}
      </div>

      <footer className="finale__footer">
        <p>{footer}</p>
        {config.creatorName && <p className="finale__creator">from {config.creatorName}</p>}
        <button type="button" className="link-btn" onClick={() => scrollToId('top')}>
          {replay}
        </button>
      </footer>
    </section>
  )
}
