import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchClient, fetchClientStats, simulateRequest } from '../api/client.js'
import RequestChart from '../components/RequestChart.jsx'

const POLL_INTERVAL_MS = 4000

export default function ClientDetail() {
  const { clientKey } = useParams()
  const [client, setClient] = useState(null)
  const [stats, setStats] = useState(null)
  const [error, setError] = useState(null)
  const [simulateCount, setSimulateCount] = useState(10)
  const [simulating, setSimulating] = useState(false)
  const [lastSimulateResult, setLastSimulateResult] = useState(null)

  const refresh = useCallback(() => {
    return Promise.all([fetchClient(clientKey), fetchClientStats(clientKey)]).then(
      ([clientData, statsData]) => {
        setClient(clientData)
        setStats(statsData)
      },
    )
  }, [clientKey])

  // Initial load whenever the client changes.
  useEffect(() => {
    setClient(null)
    setStats(null)
    setError(null)
    refresh().catch(setError)
  }, [clientKey, refresh])

  // Near-real-time updates: poll while not actively simulating (simulating
  // already refreshes on its own right after, no need to race it).
  useEffect(() => {
    if (simulating) return undefined
    const interval = setInterval(() => {
      refresh().catch(() => {
        // Stay on the last good data rather than flashing an error on a missed poll.
      })
    }, POLL_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [refresh, simulating])

  async function handleSimulate() {
    setSimulating(true)
    setLastSimulateResult(null)
    let allowed = 0
    let blocked = 0
    for (let i = 0; i < simulateCount; i++) {
      const result = await simulateRequest(clientKey)
      if (result.allowed) allowed += 1
      else blocked += 1
    }
    setLastSimulateResult({ allowed, blocked })
    try {
      await refresh()
    } catch {
      // Keep whatever was last shown; the next poll will retry.
    }
    setSimulating(false)
  }

  if (error) {
    return (
      <>
        <Link className="back-link" to="/">&larr; All clients</Link>
        <p className="error-state">Couldn't load "{clientKey}" — it may not exist.</p>
      </>
    )
  }

  if (!client || !stats) {
    return <p className="loading-state">Loading…</p>
  }

  // Stats come back chronological (oldest first); show newest first in the table.
  const recentNewestFirst = [...stats.recent].reverse()

  return (
    <>
      <Link className="back-link" to="/">&larr; All clients</Link>

      <h2 className="client-detail-name">{client.name}</h2>
      <p className="dashboard-subtitle">
        {client.clientKey} &middot; {client.requestLimit} requests / {client.windowSeconds}s
      </p>

      <div className="stat-row">
        <div className="stat-tile">
          <div className="stat-value">{stats.allowedCount}</div>
          <div className="stat-label">Allowed</div>
        </div>
        <div className="stat-tile">
          <div className="stat-value">{stats.blockedCount}</div>
          <div className="stat-label">Blocked</div>
        </div>
        <div className="stat-tile">
          <div className="stat-value">{client.availableTokens.toFixed(1)}</div>
          <div className="stat-label">Tokens available</div>
        </div>
      </div>

      <div className="simulate-control">
        <input
          type="number"
          min="1"
          max="200"
          value={simulateCount}
          onChange={(e) => setSimulateCount(Math.max(1, Number(e.target.value) || 1))}
          disabled={simulating}
          aria-label="Number of requests to simulate"
        />
        <button onClick={handleSimulate} disabled={simulating}>
          {simulating ? 'Simulating…' : 'Simulate requests'}
        </button>
        {lastSimulateResult && !simulating && (
          <span className="simulate-hint">
            last burst: {lastSimulateResult.allowed} allowed, {lastSimulateResult.blocked} blocked
          </span>
        )}
      </div>

      <h3 className="section-label">Requests over time</h3>
      <RequestChart recent={stats.recent} />

      <h3 className="section-label">Recent requests</h3>

      {recentNewestFirst.length === 0 ? (
        <p className="empty-state">No requests logged yet for this client.</p>
      ) : (
        <table className="request-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentNewestFirst.map((entry, i) => (
              <tr key={i}>
                <td>{new Date(entry.timestamp).toLocaleString()}</td>
                <td>
                  <span className={`status-pill ${entry.allowed ? 'status-pill--allowed' : 'status-pill--blocked'}`}>
                    {entry.allowed ? 'allowed' : 'blocked'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
