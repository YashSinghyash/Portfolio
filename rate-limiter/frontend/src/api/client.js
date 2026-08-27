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

// simulateRequest() (POST /simulate/{clientKey}) lands in Phase 4 along with
// the "Simulate requests" button that calls it.
