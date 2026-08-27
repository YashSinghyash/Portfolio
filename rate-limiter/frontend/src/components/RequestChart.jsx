const BUCKET_COUNT = 16
const CHART_HEIGHT = 140
const AXIS_Y = CHART_HEIGHT - 20
const BUCKET_WIDTH = 24
const BAR_WIDTH = 16

// Groups the recent (timestamp, allowed) log into time buckets so the chart
// shows a trend rather than a flat list. If everything happened in a tight
// burst (the common case right after clicking "Simulate"), there isn't a
// meaningful time spread to bucket by -- fall back to one bucket per request
// so the burst is still visible bar-by-bar.
function bucketRequests(recent) {
  if (recent.length === 0) return []

  const times = recent.map((entry) => new Date(entry.timestamp).getTime())
  const spanMs = Math.max(...times) - Math.min(...times)

  if (spanMs < 1000) {
    return recent.map((entry) => ({
      allowed: entry.allowed ? 1 : 0,
      blocked: entry.allowed ? 0 : 1,
    }))
  }

  const minTime = Math.min(...times)
  const bucketSizeMs = spanMs / BUCKET_COUNT
  const buckets = Array.from({ length: BUCKET_COUNT }, () => ({ allowed: 0, blocked: 0 }))

  recent.forEach((entry, i) => {
    const idx = Math.min(BUCKET_COUNT - 1, Math.floor((times[i] - minTime) / bucketSizeMs))
    if (entry.allowed) buckets[idx].allowed += 1
    else buckets[idx].blocked += 1
  })

  return buckets
}

export default function RequestChart({ recent }) {
  const buckets = bucketRequests(recent)

  if (buckets.length === 0) {
    return <p className="empty-state">Not enough data yet — simulate some requests to see a chart.</p>
  }

  const maxTotal = Math.max(1, ...buckets.map((b) => b.allowed + b.blocked))

  return (
    <div className="request-chart">
      <svg
        viewBox={`0 0 ${buckets.length * BUCKET_WIDTH} ${CHART_HEIGHT}`}
        preserveAspectRatio="none"
        className="request-chart-svg"
        role="img"
        aria-label="Allowed vs blocked requests over time"
      >
        <line x1="0" y1={AXIS_Y} x2={buckets.length * BUCKET_WIDTH} y2={AXIS_Y} stroke="var(--border)" strokeWidth="1" />
        {buckets.map((bucket, i) => {
          const total = bucket.allowed + bucket.blocked
          if (total === 0) return null

          const totalHeight = (total / maxTotal) * (AXIS_Y - 8)
          const allowedHeight = (bucket.allowed / total) * totalHeight
          const blockedHeight = totalHeight - allowedHeight
          const x = i * BUCKET_WIDTH + (BUCKET_WIDTH - BAR_WIDTH) / 2

          return (
            <g key={i}>
              {blockedHeight > 0 && (
                <rect x={x} y={AXIS_Y - totalHeight} width={BAR_WIDTH} height={blockedHeight} fill="var(--blocked)" />
              )}
              {allowedHeight > 0 && (
                <rect x={x} y={AXIS_Y - allowedHeight} width={BAR_WIDTH} height={allowedHeight} fill="var(--allowed)" />
              )}
            </g>
          )
        })}
      </svg>
      <div className="request-chart-legend">
        <span><i className="legend-swatch legend-swatch--allowed" /> Allowed</span>
        <span><i className="legend-swatch legend-swatch--blocked" /> Blocked</span>
      </div>
    </div>
  )
}
