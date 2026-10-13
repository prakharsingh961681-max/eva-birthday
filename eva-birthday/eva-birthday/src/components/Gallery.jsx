import { useMemo, useState } from 'react'
import { config } from '../config/content'
import { useAssetStatus } from '../hooks/useAssetStatus'
import Polaroid from './Polaroid'
import Lightbox from './Lightbox'
import Reveal from './Reveal'
import { Glyph } from './Icons'

const TILTS = [-3.2, 2.4, -1.4, 3, -2.4, 1.6, -3, 2]

export default function Gallery() {
  const { title, intro, photos } = config.gallery
  const status = useAssetStatus(photos.map((p) => p.src))
  const [open, setOpen] = useState(null)

  // Real photos only, in the order the lightbox should step through them.
  const available = useMemo(() => photos.filter((p) => status[p.src] === 'ready'), [photos, status])
  const checked = Object.keys(status).length > 0

  // Nothing to show at all (photos missing and previews off): skip the section.
  if (checked && available.length === 0 && !config.showEmptyPhotoSlots) return null

  return (
    <section id="memories" className="section gallery" aria-labelledby="gallery-title">
      <div className="section__head">
        <Reveal as="h2" id="gallery-title" className="section__title">
          {title}
        </Reveal>
        <Reveal as="p" delay={120} className="section__intro">
          {intro}
        </Reveal>
      </div>

      <div className="gallery__board">
        {photos.map((p, i) => {
          const s = status[p.src]
          if (!s) return null
          const lightboxIndex = available.findIndex((a) => a.src === p.src)
          return (
            <Reveal key={p.src} delay={(i % 3) * 110} className="gallery__item">
              <Polaroid
                {...p}
                status={s}
                tilt={TILTS[i % TILTS.length]}
                index={i}
                onClick={lightboxIndex >= 0 ? () => setOpen(lightboxIndex) : undefined}
              />
            </Reveal>
          )
        })}
        <Glyph name="bow" className="gallery__bow" />
      </div>

      <Lightbox items={available} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  )
}
