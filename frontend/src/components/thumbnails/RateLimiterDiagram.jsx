// Inline SVG architecture sketch: a client request passes through the
// interceptor, which consults a per-client TokenBucket to allow/block, always
// logs the outcome, and the dashboard reads that log back out.
function Box({ x, y, w, h, label, sub, dashed }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray={dashed ? '3 3' : undefined}
      />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 2 : h / 2 + 4)} textAnchor="middle" fontFamily="ui-monospace,Menlo,Consolas,monospace" fontSize="10" fontWeight="600" fill="currentColor">
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" fontFamily="ui-monospace,Menlo,Consolas,monospace" fontSize="8" fill="currentColor" opacity="0.7">
          {sub}
        </text>
      )}
    </g>
  )
}

function Arrow({ x1, y1, x2, y2, label, dashed, labelX, labelY }) {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray={dashed ? '2 3' : undefined}
        markerEnd="url(#rl-arrow)"
        opacity="0.75"
      />
      {label && (
        <text x={labelX ?? (x1 + x2) / 2} y={labelY ?? (y1 + y2) / 2 - 4} textAnchor="middle" fontFamily="ui-monospace,Menlo,Consolas,monospace" fontSize="7.5" fill="currentColor" opacity="0.75">
          {label}
        </text>
      )}
    </g>
  )
}

export default function RateLimiterDiagram() {
  return (
    <svg viewBox="0 0 420 250" role="img" aria-label="Architecture diagram: a client request passes through RateLimiterInterceptor, which checks a per-client TokenBucket to allow or block it, logs the outcome to RequestLog regardless, and the Dashboard reads aggregated stats back from RequestLog">
      <defs>
        <marker id="rl-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,1 L7,4 L0,7" fill="none" stroke="currentColor" strokeWidth="1" />
        </marker>
      </defs>

      <Box x={10} y={16} w={90} h={34} label="Client" />
      <Box x={150} y={16} w={150} h={40} label="RateLimiterInterceptor" />
      <Box x={150} y={96} w={150} h={44} label="TokenBucket" sub="per client, in memory" />
      <Box x={340} y={16} w={70} h={40} label="Controller" />
      <Box x={150} y={188} w={150} h={40} label="RequestLog" sub="persisted (DB)" />
      <Box x={340} y={188} w={70} h={40} label="Dashboard" sub="stats" />

      <Arrow x1={100} y1={33} x2={148} y2={33} label="request" />
      <Arrow x1={225} y1={56} x2={225} y2={94} label="check / consume" />
      <Arrow x1={260} y1={96} x2={260} y2={58} label="allow?" labelX={295} labelY={80} />
      <Arrow x1={300} y1={33} x2={338} y2={33} label="if allowed" />
      <Arrow x1={200} y1={140} x2={200} y2={186} label="log outcome" dashed />
      <Arrow x1={300} y1={208} x2={338} y2={208} label="aggregates" dashed />
    </svg>
  )
}
