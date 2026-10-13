import { config } from '../config/content'
import Reveal from './Reveal'
import { Glyph } from './Icons'

export default function Letter() {
  const { title, greeting, paragraphs, signOff } = config.letter
  const who = config.creatorName || 'Your best friend'

  return (
    <section id="letter" className="section letter" aria-labelledby="letter-title">
      <Reveal as="h2" id="letter-title" className="section__title">
        {title}
      </Reveal>

      <Reveal className="letter__card" delay={100}>
        <Glyph name="sparkle" className="letter__spark letter__spark--a" />
        <Glyph name="heart" className="letter__spark letter__spark--b" />
        <p className="letter__greeting">{greeting}</p>
        <div className="letter__body">
          {paragraphs.map((text, i) => (
            <Reveal as="p" key={i} delay={200 + i * 150}>
              {text}
            </Reveal>
          ))}
        </div>
        <Reveal className="letter__sign" delay={200 + paragraphs.length * 150}>
          <span>{signOff}</span>
          <strong>{who}</strong>
        </Reveal>
      </Reveal>
    </section>
  )
}
