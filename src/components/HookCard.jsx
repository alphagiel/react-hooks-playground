import { useState } from 'react'

export default function HookCard({ title, hook, blurb, code, state, children }) {
  const [showCode, setShowCode] = useState(false)

  return (
    <section className="hook-card">
      <header className="hook-card-header">
        <div>
          <h2>{title}</h2>
          <p className="blurb">{blurb}</p>
        </div>
        <span className="hook-badge">{hook}</span>
      </header>

      <div className="demo-area">{children}</div>

      <div className="state-readout">
        <span className="state-label">live state</span>
        <code>{JSON.stringify(state)}</code>
      </div>

      <button className="code-toggle" onClick={() => setShowCode(!showCode)}>
        {showCode ? '▾ Hide code' : '▸ Peek under the hood'}
      </button>

      {showCode && (
        <pre className="code-block">
          <code>{code}</code>
        </pre>
      )}
    </section>
  )
}
