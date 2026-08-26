import LruCacheDiagram from './LruCacheDiagram.jsx'

// Keyed by project title. Projects without a custom thumbnail fall back to the
// plain "Preview" placeholder box in ProjectCard.
const THUMBNAILS_BY_TITLE = {
  'LRU Cache Service': LruCacheDiagram,
}

export function getThumbnail(title) {
  return THUMBNAILS_BY_TITLE[title] ?? null
}
