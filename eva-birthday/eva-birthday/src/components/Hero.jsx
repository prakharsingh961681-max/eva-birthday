import { ArrowDown } from 'lucide-react'
import { config } from '../config/content'
import { scrollToId } from '../lib/motion'
import { useAssetStatus } from '../hooks/useAssetStatus'
import { Glyph } from './Icons'
import Polaroid from './Polaroid'

export default function Hero({ celebrated }) {
  const { title, subtitle, button, photo } = config.hero
  const status = useAssetStatus([photo.src])[photo.src]
  const showPhoto = status === 'ready' || (status === 'missing' && config.showEmptyPhotoSlots)

  return (
    <section id="hero" className={`hero ${showPhoto ? '' : 'hero--solo'}`} aria-labelledby="hero-title">
      <div className="hero__aura" aria-hidden="true" />

      <h1 id="hero-title" className="hero__title rise" style={{ '--r': 0 }}>
        {title}
      </h1>

      <div className={`hero__eighteen rise ${celebrated ? 'is-bright' : ''}`} style={{ '--r': 1 }} aria-hidden="true">
        <span className="hero__num">{config.age}</span>
        <Glyph name="sparkle" className="hero__spark hero__spark--a" />
        <Glyph name="sparkle" className="hero__spark hero__spark--b" />
        <Glyph name="heart" className="hero__spark hero__spark--c" />
        <Glyph name="bow" className="hero__bow" />
      </div>

      {showPhoto && (
        <div className="hero__photo rise" style={{ '--r': 2 }}>
          <Polaroid
            src={photo.src}
            alt={photo.alt}
            caption={photo.caption}
            focus={photo.focus}
            status={status}
            shape="portrait"
            tilt={3}
            eager
            className="polaroid--hero"
          />
        </div>
      )}

      <div className="hero__copy rise" style={{ '--r': 3 }}>
        <p className="hero__subtitle">{subtitle}</p>
        {config.birthdayDate && <p className="hero__date">{config.birthdayDate}</p>}
        <button type="button" className="btn btn--primary" onClick={() => scrollToId('memories')}>
          <span>{button.replace(/\s*↓\s*$/, '')}</span>
          <ArrowDown size={18} aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
