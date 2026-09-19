// Top path (state) is driven by React state — `pulse` — because a real
// re-render actually happens, so it's fine to let React control it.
//
// Bottom path (ref) is driven by direct DOM refs the parent flashes with
// classList.add/remove. No setState involved — proving the point: the
// wall can visibly light up WITHOUT React ever re-rendering this component.
export default function RenderFlowDiagram({ pulse, refBoxRef, refArrowRef, wallRef }) {
  const good = pulse === 'state' ? 'flash-good' : ''

  return (
    <div className="flow-diagram">
      <div className={`flow-cell flow-box ${good}`} style={{ gridRow: 1, gridColumn: 1 }}>
        setStateCount()
      </div>
      <div className={`flow-cell flow-arrow ${good}`} style={{ gridRow: 1, gridColumn: 2 }}>
        →
      </div>
      <div className={`flow-cell flow-box ${good}`} style={{ gridRow: 1, gridColumn: 3 }}>
        React says
        <br />
        "redraw it!"
      </div>
      <div className={`flow-cell flow-arrow ${good}`} style={{ gridRow: 1, gridColumn: 4 }}>
        →
      </div>

      <div
        className={`flow-cell flow-screen ${good}`}
        style={{ gridRow: '1 / 3', gridColumn: 5 }}
      >
        🖥️
        <br />
        what you
        <br />
        actually see
      </div>

      <div className="flow-cell flow-box" ref={refBoxRef} style={{ gridRow: 2, gridColumn: 1 }}>
        refCount
        <br />
        .current++
      </div>
      <div className="flow-cell flow-arrow" ref={refArrowRef} style={{ gridRow: 2, gridColumn: 2 }}>
        →
      </div>
      <div className="flow-cell flow-wall" ref={wallRef} style={{ gridRow: 2, gridColumn: 3 }}>
        🧱
        <br />
        nobody told
        <br />
        React
      </div>
    </div>
  )
}
