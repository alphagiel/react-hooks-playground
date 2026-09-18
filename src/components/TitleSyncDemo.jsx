import { useState, useEffect } from 'react'
import HookCard from './HookCard'

const code = `function TitleSync() {
  const [count, setCount] = useState(0)

  // Runs AFTER render, whenever 'count' changes.
  // document.title isn't part of the UI React draws —
  // it's the browser tab, so it needs an effect to reach it.
  useEffect(() => {
    document.title = count === 0
      ? 'React Hooks Playground'
      : \`(\${count}) React Hooks Playground\`
  }, [count])

  return (
    <button onClick={() => setCount(count + 1)}>
      Bump count: {count}
    </button>
  )
}`

export default function TitleSyncDemo() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title =
      count === 0 ? 'React Hooks Playground' : `(${count}) React Hooks Playground`

    return () => {
      document.title = 'React Hooks Playground'
    }
  }, [count])

  return (
    <HookCard
      title="Tab Title Sync"
      hook="useEffect"
      blurb="Look at your actual browser tab as you click — that's the effect running, not the render."
      code={code}
      state={{ count, 'document.title': `(${count}) React Hooks Playground` }}
    >
      <button className="demo-btn" onClick={() => setCount(count + 1)}>
        Bump count: {count}
      </button>
      <span className="affected-note">👀 watch the browser tab</span>
    </HookCard>
  )
}
