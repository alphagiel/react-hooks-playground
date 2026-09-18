import { useState, useEffect } from 'react'
import HookCard from './HookCard'

const code = `function Timer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)

    // cleanup: runs when the component unmounts
    // (or before the effect re-runs). Without this,
    // the interval keeps ticking forever — a leak.
    return () => clearInterval(id)
  }, [])

  return <p>{seconds}s elapsed</p>
}

function Parent() {
  const [showTimer, setShowTimer] = useState(true)
  return (
    <>
      <button onClick={() => setShowTimer(!showTimer)}>
        {showTimer ? 'Unmount' : 'Mount'} timer
      </button>
      {showTimer && <Timer />}
    </>
  )
}`

function Timer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)

    return () => clearInterval(id)
  }, [])

  return <span className="timer-readout">{seconds}s elapsed</span>
}

export default function TimerCleanupDemo() {
  const [showTimer, setShowTimer] = useState(true)

  return (
    <HookCard
      title="Mount / Unmount Timer"
      hook="useEffect + cleanup"
      blurb="Unmount it — the interval stops instantly. That's the cleanup function firing."
      code={code}
      state={{ showTimer }}
    >
      <button className="demo-btn" onClick={() => setShowTimer(!showTimer)}>
        {showTimer ? 'Unmount' : 'Mount'} timer
      </button>
      {showTimer ? <Timer /> : <span className="timer-readout stopped">stopped</span>}
    </HookCard>
  )
}
