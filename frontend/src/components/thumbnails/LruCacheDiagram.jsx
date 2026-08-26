// Inline SVG (no image download) sketching how the LRU cache actually works:
// a HashMap giving O(1) lookup into a doubly linked list ordered MRU -> LRU.
const NODES = ['A', 'B', 'C']
const NODE_START_X = 78
const NODE_GAP = 60
const HEAD_X = 18
const TAIL_X = HEAD_X + NODE_START_X - 18 + NODE_GAP * NODES.length // 258
const MAP_CENTER_X = NODE_START_X + NODE_GAP // centers over node B

export default function LruCacheDiagram() {
  return (
    <svg viewBox="0 0 320 180" role="img" aria-label="LRU cache diagram: a hash map pointing into a doubly linked list ordered from most to least recently used">
      <defs>
        <marker id="lru-arrow" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 Z" fill="currentColor" />
        </marker>
      </defs>

      {/* HashMap box, centered over the node it "currently" points to */}
      <rect x={MAP_CENTER_X - 52} y="16" width="104" height="28" rx="3" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.9" />
      <text x={MAP_CENTER_X} y="34" textAnchor="middle" fontFamily="ui-monospace,Menlo,Consolas,monospace" fontSize="10" fill="currentColor">
        HashMap&lt;K, Node&gt;
      </text>

      {/* O(1) pointer from map down into the list */}
      <line x1={MAP_CENTER_X} y1="44" x2={MAP_CENTER_X} y2="108" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#lru-arrow)" opacity="0.75" />
      <text x={MAP_CENTER_X + 8} y="70" fontFamily="ui-monospace,Menlo,Consolas,monospace" fontSize="9" fill="currentColor" opacity="0.75">
        O(1)
      </text>

      {/* MRU / LRU labels */}
      <text x={(HEAD_X + NODE_START_X) / 2} y="100" textAnchor="middle" fontFamily="ui-monospace,Menlo,Consolas,monospace" fontSize="9" letterSpacing="0.05em" fill="currentColor" opacity="0.6">
        MRU
      </text>
      <text x={(TAIL_X + (NODE_START_X + NODE_GAP * (NODES.length - 1))) / 2} y="100" textAnchor="middle" fontFamily="ui-monospace,Menlo,Consolas,monospace" fontSize="9" letterSpacing="0.05em" fill="currentColor" opacity="0.6">
        LRU
      </text>

      {/* doubly linked list: head <-> A <-> B <-> C <-> tail */}
      <line x1={HEAD_X + 7} y1="130" x2={TAIL_X - 7} y2="130" stroke="currentColor" strokeWidth="1.2" markerStart="url(#lru-arrow)" markerEnd="url(#lru-arrow)" opacity="0.5" />

      <circle cx={HEAD_X} cy="130" r="7" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <text x={HEAD_X} y="152" textAnchor="middle" fontFamily="ui-monospace,Menlo,Consolas,monospace" fontSize="8" fill="currentColor" opacity="0.6">head</text>

      {NODES.map((label, i) => {
        const cx = NODE_START_X + i * NODE_GAP
        return (
          <g key={label}>
            <rect x={cx - 22} y="112" width="44" height="36" rx="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <text x={cx} y="135" textAnchor="middle" fontFamily="ui-monospace,Menlo,Consolas,monospace" fontSize="12" fill="currentColor">
              {label}
            </text>
          </g>
        )
      })}

      <circle cx={TAIL_X} cy="130" r="7" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <text x={TAIL_X} y="152" textAnchor="middle" fontFamily="ui-monospace,Menlo,Consolas,monospace" fontSize="8" fill="currentColor" opacity="0.6">tail</text>
    </svg>
  )
}
