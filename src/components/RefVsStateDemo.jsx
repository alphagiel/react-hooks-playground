import { useState, useRef } from 'react'
import HookCard from './HookCard'
import RenderFlowDiagram from './RenderFlowDiagram'
import { useStickFigure } from '../context/StickFigureContext'

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

const REF_FLASH_MS = 700

export default function RefVsStateDemo() {
  const [stateCount, setStateCount] = useState(0)
  const refCount = useRef(0)
  const renders = useRef(0)
  const [pulse, setPulse] = useState(null)
  const pulseTimer = useRef(null)

  const refBoxRef = useRef(null)
  const refArrowRef = useRef(null)
  const wallRef = useRef(null)
  const refFlashTimer = useRef(null)
  const { react } = useStickFigure()

  renders.current += 1

  function fireStatePulse() {
    setPulse('state')
    clearTimeout(pulseTimer.current)
    pulseTimer.current = setTimeout(() => setPulse(null), REF_FLASH_MS)
  }

  // Flashes the wall directly via the DOM — no setState, so this
  // component never re-renders. That's the whole point: the click
  // registers (the wall glows) but nothing here redraws because of it.
  function flashRefPath() {
    ;[refBoxRef, refArrowRef, wallRef].forEach((r) => r.current?.classList.add('flash-bad'))
    clearTimeout(refFlashTimer.current)
    refFlashTimer.current = setTimeout(() => {
      ;[refBoxRef, refArrowRef, wallRef].forEach((r) => r.current?.classList.remove('flash-bad'))
    }, REF_FLASH_MS)
  }

  return (
    <HookCard
      title="useRef vs useState"
      hook="useRef"
      blurb="Click 'ref++' — the wall glows but the numbers below never move. Every 10th click, watch the stick figure up top: he still reacts, but that's a separate component reacting, not this card re-rendering."
      code={code}
      state={{ stateCount, 'refCount (stale until re-render)': refCount.current, renders: renders.current }}
    >
      <div className="ref-buttons">
        <button
          className="demo-btn"
          onClick={() => {
            const next = stateCount + 1
            setStateCount(next)
            fireStatePulse()
            react('wave', `state is ${next} now`)
          }}
        >
          state++
        </button>
        <button
          className="demo-btn ghost"
          onClick={() => {
            refCount.current += 1
            flashRefPath()
            // deliberately no setState here — this handler never
            // triggers a re-render of RefVsStateDemo. But we CAN still
            // imperatively poke something ELSE on the page (the mascot,
            // who lives in a different component) without that costing
            // this component a render.
            if (refCount.current % 10 === 0) {
              react(
                'point',
                `ref.current hit ${refCount.current} — but the card never redrew to show it!`,
                <>
                  {refCount.current}
                  <br />
                  ref
                  <br />
                  clicks
                </>,
                2800
              )
            }
          }}
        >
          ref++
        </button>
      </div>

      <RenderFlowDiagram pulse={pulse} refBoxRef={refBoxRef} refArrowRef={refArrowRef} wallRef={wallRef} />

      <div className="ref-readouts">
        <span>state: <strong>{stateCount}</strong></span>
        <span>ref: <strong>{refCount.current}</strong></span>
        <span>renders: <strong>{renders.current}</strong></span>
      </div>
    </HookCard>
  )
}
