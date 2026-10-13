import { useEffect, useState } from 'react'
import { config } from './config/content'
import { EffectsProvider } from './components/Effects'
import { IconSprite } from './components/Icons'
import Ambient from './components/Ambient'
import Intro from './components/Intro'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import Letter from './components/Letter'
import Envelope from './components/Envelope'
import Cake from './components/Cake'
import Wishes from './components/Wishes'
import Finale from './components/Finale'
import MusicToggle from './components/MusicToggle'
import SectionNav from './components/SectionNav'

export default function App() {
  const [opened, setOpened] = useState(false)
  const [introMounted, setIntroMounted] = useState(true)
  const [celebrated, setCelebrated] = useState(false)

  useEffect(() => {
    document.title = `For ${config.name} ♡`
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  // Keep the page from scrolling while the opening screen is up.
  useEffect(() => {
    document.documentElement.classList.toggle('is-locked', introMounted)
    return () => document.documentElement.classList.remove('is-locked')
  }, [introMounted])

  const handleOpen = () => {
    setOpened(true)
    window.scrollTo(0, 0)
    setTimeout(() => setIntroMounted(false), 50)
  }

  return (
    <EffectsProvider>
      <IconSprite />
      <div id="top" className={`app ${opened ? 'app--open' : ''}`}>
        <Ambient count={16} />
        {/* inert keeps keyboard and screen readers on the intro until it is opened */}
        <main className="app__main" inert={!opened}>
          <Hero celebrated={celebrated} />
          <Gallery />
          <Letter />
          <Envelope />
          <Cake celebrated={celebrated} onCelebrate={() => setCelebrated(true)} onReset={() => setCelebrated(false)} />
          <Wishes />
          <Finale />
        </main>
        {opened && <SectionNav />}
        <MusicToggle visible={opened} />
      </div>
      {introMounted && <Intro onOpen={handleOpen} />}
    </EffectsProvider>
  )
}
