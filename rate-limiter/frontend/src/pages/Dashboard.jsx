import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchClients } from '../api/client.js'

const POLL_INTERVAL_MS = 5000

export default function Dashboard() {
  const [clients, setClients] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    function load() {
      fetchClients()
        .then((data) => {
          if (!cancelled) setClients(data)
        })
        .catch((err) => {
          if (!cancelled) setError(err)
        })
    }

    load()
    const interval = setInterval(load, POLL_INTERVAL_MS)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  if (error) {
    return (
      <p className="error-state">
        Couldn't reach the rate-limiter API. Is the backend running on :8084?
      </p>
    )
  }

  if (!clients) {
    return <p className="loading-state">Loading clients…</p>
  }

  return (
    <>
      <p className="dashboard-subtitle">
        {clients.length} registered client{clients.length === 1 ? '' : 's'}
      </p>

      <div className="client-grid">
        {clients.map((client) => {
          const fillPercent = Math.max(0, Math.min(100, (client.availableTokens / client.requestLimit) * 100))
          return (
            <Link key={client.id} to={`/clients/${client.clientKey}`} className="client-card">
              <div className="client-card-top">
                <h2>{client.name}</h2>
                <span className="client-key">{client.clientKey}</span>
              </div>
              <div className="client-limit">
                {client.requestLimit} requests / {client.windowSeconds}s &middot;{' '}
                {client.availableTokens.toFixed(1)} tokens available
              </div>
              <div className="token-meter">
                <div className="token-meter-fill" style={{ width: `${fillPercent}%` }} />
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
