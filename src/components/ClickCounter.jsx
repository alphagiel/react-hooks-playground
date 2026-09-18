import { useState } from 'react'
import HookCard from './HookCard'

const code = `function ClickCounter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  )
}`

export default function ClickCounter() {
  const [count, setCount] = useState(0)

  return (
    <HookCard
      title="Button Click Counter"
      hook="useState"
      blurb="The simplest hook: one piece of state, one setter."
      code={code}
      state={{ count }}
    >
      <button className="demo-btn" onClick={() => setCount(count + 1)}>
        Clicked {count} times
      </button>
      <button className="demo-btn ghost" onClick={() => setCount(0)}>
        Reset
      </button>
    </HookCard>
  )
}
