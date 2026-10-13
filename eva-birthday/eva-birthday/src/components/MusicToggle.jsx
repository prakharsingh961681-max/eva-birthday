import { useEffect, useRef, useState } from 'react'
import { Music, Pause, Play } from 'lucide-react'
import { config } from '../config/content'
import { useAssetStatus } from '../hooks/useAssetStatus'

// Floating music control. Audio never starts by itself: only a tap on this
// button plays it. If no audio file exists, the button does not render.
export default function MusicToggle({ visible }) {
  const { src, label, volume } = config.music
  const status = useAssetStatus(src ? [src] : [], 'audio')[src]
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [broken, setBroken] = useState(false)

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume, status])

  if (!src || status !== 'ready' || broken) return null

  const toggle = async () => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) {
      try {
        await a.play()
        setPlaying(true)
      } catch {
        setPlaying(false)
      }
    } else {
      a.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setBroken(true)}
      />
      <button
        type="button"
        className={`music ${visible ? 'is-visible' : ''} ${playing ? 'is-playing' : ''}`}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? `Pause ${label}` : `Play ${label}`}
        tabIndex={visible ? 0 : -1}
      >
        <span className="music__icon" aria-hidden="true">
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </span>
        <span className="music__bars" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="music__label">
          <Music size={13} aria-hidden="true" />
          {playing ? 'Playing' : 'Music off'}
        </span>
      </button>
    </>
  )
}
