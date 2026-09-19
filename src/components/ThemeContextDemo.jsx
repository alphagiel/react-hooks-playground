import { createContext, useContext, useState } from 'react'
import HookCard from './HookCard'
import { useStickFigure } from '../context/StickFigureContext'

const ThemeContext = createContext(null)

const code = `const ThemeContext = createContext(null)

// Box 1 (outer): the Provider. It holds the value.
function ThemeContextDemo() {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ToggleButton />
      <MiddleLayer />
    </ThemeContext.Provider>
  )
}

// Box 2 (middle): never touches theme, just renders its child.
function MiddleLayer() {
  return <DeepCard />
}

// Box 3 (inner): reaches straight into the Provider,
// skipping right past MiddleLayer.
function DeepCard() {
  const { theme } = useContext(ThemeContext)
  return <div className={theme}>I'm themed: {theme}</div>
}

function ToggleButton() {
  const { theme, setTheme } = useContext(ThemeContext)
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Switch to {theme === 'light' ? 'dark' : 'light'}
    </button>
  )
}`

function ToggleButton() {
  const { theme, setTheme } = useContext(ThemeContext)
  const { setTheme: setMascotTheme } = useStickFigure()
  const next = theme === 'light' ? 'dark' : 'light'
  return (
    <button
      className="demo-btn"
      onClick={() => {
        setTheme(next)
        setMascotTheme(next)
      }}
    >
      Switch to {next}
    </button>
  )
}

function ShowCircleButton() {
  const [shown, setShown] = useState(false)
  const { react, resetToIdle } = useStickFigure()

  return (
    <button
      className="demo-btn ghost"
      onClick={() => {
        if (shown) {
          resetToIdle()
        } else {
          react(
            'point',
            'This circle is 3 components deep — same as the box below!',
            <>
              3<br />
              levels
              <br />
              deep
            </>,
            null
          )
        }
        setShown(!shown)
      }}
    >
      {shown ? 'Hide circle' : 'Show circle'}
    </button>
  )
}

function DeepCard() {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`nest-box nest-inner ${theme}`}>
      <span className="nest-label">DeepCard — reads theme</span>
      I'm themed: <strong>{theme}</strong>
    </div>
  )
}

function MiddleLayer() {
  // no props received, no props passed — it never touches theme
  return (
    <div className="nest-box nest-middle">
      <span className="nest-label">MiddleLayer — never touches theme</span>
      <DeepCard />
    </div>
  )
}

export default function ThemeContextDemo() {
  const [theme, setTheme] = useState('light')

  return (
    <HookCard
      title="Theme Context"
      hook="useContext"
      blurb="Toggle the theme — the innermost box reads it directly. The box between them never sees it."
      code={code}
      state={{ theme }}
    >
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className="ref-buttons">
          <ToggleButton />
          <ShowCircleButton />
        </div>
        <div className="nest-box nest-outer">
          <span className="nest-label">Provider — holds the value</span>
          <MiddleLayer />
        </div>
      </ThemeContext.Provider>
    </HookCard>
  )
}
