// A tiny SVG sprite: hearts, sparkles and ribbons we can reuse anywhere
// with <Glyph name="heart" />, without extra network requests.
export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <symbol id="g-heart" viewBox="0 0 24 24">
          <path d="M12 21.2C4.2 15.6 2 11.2 2 8.1 2 5.3 4.1 3.3 6.7 3.3c1.9 0 3.6 1 4.5 2.7l.8 1.4.8-1.4c.9-1.7 2.6-2.7 4.5-2.7 2.6 0 4.7 2 4.7 4.8 0 3.1-2.2 7.5-10 13.1z" fill="currentColor" />
        </symbol>
        <symbol id="g-sparkle" viewBox="0 0 24 24">
          <path d="M12 1c.7 6.3 4.7 10.3 11 11-6.3.7-10.3 4.7-11 11-.7-6.3-4.7-10.3-11-11 6.3-.7 10.3-4.7 11-11z" fill="currentColor" />
        </symbol>
        <symbol id="g-bow" viewBox="0 0 48 32">
          <path d="M24 16C17 5 6 3 3 7c-3 4 0 13 6 16 6 3 12-1 15-7zm0 0c7-11 18-13 21-9 3 4 0 13-6 16-6 3-12-1-15-7z" fill="currentColor" opacity=".92" />
          <path d="M24 16l-5 14M24 16l5 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="24" cy="16" r="3.6" fill="#fff" opacity=".85" />
        </symbol>
      </defs>
    </svg>
  )
}

export function Glyph({ name, className = '', style }) {
  return (
    <svg className={`glyph ${className}`} style={style} aria-hidden="true" focusable="false">
      <use href={`#g-${name}`} />
    </svg>
  )
}
