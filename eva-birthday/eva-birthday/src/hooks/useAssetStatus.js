import { useEffect, useState } from 'react'

// Finds out whether files really exist, so we never show a broken-image icon.
// (A missing file on the Vite dev server answers with an HTML page, which is
//  why we check the content type and not only the status code.)
const cache = new Map()

function check(src, kind) {
  const key = `${kind}:${src}`
  if (cache.has(key)) return cache.get(key)
  const promise = fetch(src, { method: 'HEAD' })
    .then((res) => {
      const type = res.headers.get('content-type') || ''
      return res.ok && (type.startsWith(`${kind}/`) || type.includes('octet-stream'))
    })
    .catch(() => true) // offline or odd host: let the element try and handle its own error
  cache.set(key, promise)
  return promise
}

export function useAssetStatus(srcs, kind = 'image') {
  const signature = srcs.join('|')
  const [status, setStatus] = useState({})

  useEffect(() => {
    let alive = true
    const list = signature ? signature.split('|') : []
    Promise.all(list.map((src) => (src ? check(src, kind) : Promise.resolve(false)))).then((results) => {
      if (!alive) return
      const next = {}
      list.forEach((src, i) => {
        next[src] = results[i] ? 'ready' : 'missing'
      })
      setStatus(next)
    })
    return () => {
      alive = false
    }
  }, [signature, kind])

  return status // { [src]: 'ready' | 'missing' }, undefined while checking
}
