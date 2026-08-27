import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router doesn't reset scroll position on navigation by itself. Jump to
// the top on every path change so a new page never opens mid-scroll from
// wherever the previous page happened to be. Hash-only changes (e.g. Header's
// "/#projects" link) are left alone — Home's own effect handles those.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}
