// Talks to the rate-limiter backend (see ../../../backend). In dev this hits
// :8084 directly; once proxied under /rate-limiter (Phase 5) API_BASE stays
// empty so requests go through the same-origin proxy instead.
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8084'

async function getJson(path) {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) {
    throw new Error(`Request to ${path} failed with status ${res.status}`)
  }
  return res.json()
}

export function fetchClients() {
  return getJson('/clients')
}

export function fetchClient(clientKey) {
  return getJson(`/clients/${encodeURIComponent(clientKey)}`)
}

export function fetchClientStats(clientKey) {
  return getJson(`/clients/${encodeURIComponent(clientKey)}/stats`)
}

export async function simulateRequest(clientKey) {
  const res = await fetch(`${API_BASE}/simulate/${encodeURIComponent(clientKey)}`, { method: 'POST' })
  // 429 is an expected, meaningful response here (rate limit hit) -- not an
  // error to throw, the caller needs to see it to update the UI.
  const body = await res.json().catch(() => null)
  return { status: res.status, allowed: res.ok, body }
}
