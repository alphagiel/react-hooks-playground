import { useState, useRef, useEffect } from 'react'
import HookCard from './HookCard'

const code = `function RefVsState() {
  const [stateCount, setStateCount] = useState(0)
  const refCount = useRef(0)
  const renders = useRef(0)

  renders.current += 1 // bumped every render, causes no render itself

  return (
    <>
      <button onClick={() => setStateCount(stateCount + 1)}>
        state++ (re-renders)
      </button>
      <button onClick={() => { refCount.current += 1 }}>
        ref++ (silent)
      </button>
      <p>state: {stateCount}</p>
      <p>ref: {refCount.current}</p>
      <p>renders: {renders.current}</p>
    </>
  )
}`

export default function RefVsStateDemo() {
  const [stateCount, setStateCount] = useState(0)
  const refCount = useRef(0)
  const renders = useRef(0)

  renders.current += 1

  return (
    <HookCard
      title="useRef vs useState"
      hook="useRef"
      blurb="Click 'ref++' a few times — nothing on screen moves. Click 'state++' once and the ref value finally catches up."
      code={code}
      state={{ stateCount, 'refCount (stale until re-render)': refCount.current, renders: renders.current }}
    >
      <div className="ref-buttons">
        <button className="demo-btn" onClick={() => setStateCount(stateCount + 1)}>
          state++
        </button>
        <button
          className="demo-btn ghost"
          onClick={() => {
            refCount.current += 1
          }}
        >
          ref++
        </button>
      </div>
      <div className="ref-readouts">
        <span>state: <strong>{stateCount}</strong></span>
        <span>ref: <strong>{refCount.current}</strong></span>
        <span>renders: <strong>{renders.current}</strong></span>
      </div>
    </HookCard>
  )
}
