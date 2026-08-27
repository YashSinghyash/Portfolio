// Talks to the Spring Boot backend (see ../../../backend). Falls back to local
// placeholders if the backend isn't running yet, so the page never blocks on it.
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

// Mirrors backend/src/main/resources/data.sql so the site looks the same even
// if the backend isn't running yet.
export const FALLBACK_PROJECTS = [
  {
    id: 'placeholder-1',
    title: 'LRU Cache Service',
    description: 'A hand-rolled O(1) LRU cache (HashMap + doubly linked list) exposed as a Spring Boot REST API, with hit/miss stats and configurable capacity.',
    projectUrl: '/lru-cache',
  },
  {
    id: 'placeholder-2',
    title: 'Design LeetCode — Low-Level Design',
    description: 'Models the core submission-judging system of a competitive coding platform: pluggable per-language judges selected through a factory.',
    tag: 'System Design / OOP',
    rationale: 'Strategy (Judge) lets each language\'s judging logic vary independently, while Factory (JudgeFactory) centralizes the "which judge for which language" decision instead of scattering if/else across callers. Binary pass/fail was a conscious scoping choice. I considered a State pattern for a submission\'s QUEUED/RUNNING/JUDGED lifecycle and deliberately skipped it here — there\'s no per-state behavior yet to justify it, but it\'s the right call once submissions get requeued or judged asynchronously.',
  },
  {
    id: 'placeholder-3',
    title: 'Project Three',
    description: 'Placeholder project description. Replace with a real project title, summary and links once ready.',
  },
]

export async function fetchProjects({ signal } = {}) {
  const res = await fetch(`${API_BASE}/api/projects`, { signal })
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`)
  }
  return res.json()
}
