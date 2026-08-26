// Talks to the Spring Boot backend (see ../../../backend). Falls back to local
// placeholders if the backend isn't running yet, so the page never blocks on it.
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

export const FALLBACK_PROJECTS = [
  {
    id: 'placeholder-1',
    title: 'Project One',
    description: 'Placeholder project description. Replace with a real project title, summary and links once ready.',
  },
  {
    id: 'placeholder-2',
    title: 'Project Two',
    description: 'Placeholder project description. Replace with a real project title, summary and links once ready.',
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
