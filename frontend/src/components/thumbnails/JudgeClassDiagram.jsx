// Inline SVG (no image, no Mermaid runtime) UML sketch matching the
// design-leetcode module: Judge (interface) <|.. {Java,Python,Cpp}Judge,
// JudgeFactory ..> Judge, Judge ..> Submission.
function ClassBox({ x, y, w, h, title, stereotype, member }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <line x1={x} y1={y + (stereotype ? 32 : 22)} x2={x + w} y2={y + (stereotype ? 32 : 22)} stroke="currentColor" strokeWidth="1" opacity="0.6" />
      {stereotype && (
        <text x={x + w / 2} y={y + 13} textAnchor="middle" fontFamily="ui-monospace,Menlo,Consolas,monospace" fontSize="8" fill="currentColor" opacity="0.7">
          «{stereotype}»
        </text>
      )}
      <text x={x + w / 2} y={y + (stereotype ? 26 : 16)} textAnchor="middle" fontFamily="ui-monospace,Menlo,Consolas,monospace" fontSize="10" fontWeight="600" fill="currentColor">
        {title}
      </text>
      {member && (
        <text x={x + 6} y={y + (stereotype ? 44 : 34)} fontFamily="ui-monospace,Menlo,Consolas,monospace" fontSize="7.5" fill="currentColor" opacity="0.8">
          {(Array.isArray(member) ? member : [member]).map((line, i) => (
            <tspan key={line} x={x + 6} dy={i === 0 ? 0 : 9}>
              {line}
            </tspan>
          ))}
        </text>
      )}
    </g>
  )
}

// Hollow-triangle "implements" arrowhead and a plain open "uses" arrowhead.
function Defs() {
  return (
    <defs>
      <marker id="uml-implements" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="10" markerHeight="10" orient="auto">
        <path d="M1,1 L11,6 L1,11 Z" fill="none" stroke="currentColor" strokeWidth="1" />
      </marker>
      <marker id="uml-uses" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
        <path d="M1,1 L9,5 L1,9" fill="none" stroke="currentColor" strokeWidth="1" />
      </marker>
    </defs>
  )
}

export default function JudgeClassDiagram() {
  return (
    <svg viewBox="0 0 400 262" role="img" aria-label="Class diagram: Judge interface implemented by JavaJudge, PythonJudge and CppJudge; JudgeFactory creates a Judge; Judge evaluates a Submission">
      <Defs />

      <ClassBox x={148} y={10} w={104} h={44} title="Judge" stereotype="interface" member="+evaluate(Submission)" />

      <ClassBox x={10} y={110} w={104} h={34} title="JavaJudge" member="+evaluate(): bool" />
      <ClassBox x={148} y={110} w={104} h={34} title="PythonJudge" member="+evaluate(): bool" />
      <ClassBox x={286} y={110} w={104} h={34} title="CppJudge" member="+evaluate(): bool" />

      {/* implements: dashed line, hollow triangle at the interface end */}
      <line x1="62" y1="110" x2="185" y2="54" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#uml-implements)" />
      <line x1="200" y1="110" x2="200" y2="54" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#uml-implements)" />
      <line x1="338" y1="110" x2="215" y2="54" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#uml-implements)" />

      <ClassBox x={10} y={196} w={110} h={44} title="JudgeFactory" member="+getJudge(lang)" />
      <ClassBox
        x={270}
        y={196}
        w={120}
        h={54}
        title="Submission"
        member={['-userId  -problemId', '-code  -language', '-passed']}
      />

      {/* JudgeFactory creates -> Judge */}
      <line x1="65" y1="196" x2="150" y2="35" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" markerEnd="url(#uml-uses)" opacity="0.7" />
      <text x="70" y="150" fontFamily="ui-monospace,Menlo,Consolas,monospace" fontSize="7.5" fill="currentColor" opacity="0.7">creates</text>

      {/* Judge evaluates -> Submission */}
      <line x1="252" y1="32" x2="320" y2="196" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" markerEnd="url(#uml-uses)" opacity="0.7" />
      <text x="290" y="150" fontFamily="ui-monospace,Menlo,Consolas,monospace" fontSize="7.5" fill="currentColor" opacity="0.7">evaluates</text>
    </svg>
  )
}
