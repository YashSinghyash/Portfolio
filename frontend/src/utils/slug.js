// Turns a project title into a URL-safe path segment, e.g.
// "Design LeetCode — Low-Level Design" -> "design-leetcode-low-level-design".
// Built via fromCharCode (rather than a \u escape) so the source file has no
// invisible combining-mark characters in it.
const COMBINING_MARKS = new RegExp(
  `[${String.fromCharCode(0x0300)}-${String.fromCharCode(0x036f)}]`,
  'g',
)

export function slugify(title) {
  return title
    .toLowerCase()
    .normalize('NFKD')
    .replace(COMBINING_MARKS, '') // strip accents after NFKD decomposition
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
