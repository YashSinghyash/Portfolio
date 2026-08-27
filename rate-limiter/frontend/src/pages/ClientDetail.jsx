import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchClient, fetchClientStats } from '../api/client.js'

export default function ClientDetail() {
  const { clientKey } = useParams()
  const [client, setClient] = useState(null)
  const [stats, setStats] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setClient(null)
    setStats(null)
    setError(null)

    Promise.all([fetchClient(clientKey), fetchClientStats(clientKey)])
      .then(([clientData, statsData]) => {
        setClient(clientData)
        setStats(statsData)
      })
      .catch(setError)
  }, [clientKey])

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
