import LruCacheDiagram from './LruCacheDiagram.jsx'
import JudgeClassDiagram from './JudgeClassDiagram.jsx'

// Keyed by project title. Projects without a custom thumbnail fall back to the
// plain "Preview" placeholder box in ProjectCard.
const THUMBNAILS_BY_TITLE = {
  'LRU Cache Service': LruCacheDiagram,
  'Design LeetCode — Low-Level Design': JudgeClassDiagram,
}

export function getThumbnail(title) {
  return THUMBNAILS_BY_TITLE[title] ?? null
}
