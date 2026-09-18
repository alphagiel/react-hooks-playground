import { createContext, useContext, useState } from 'react'
import HookCard from './HookCard'

const ThemeContext = createContext(null)

const code = `const ThemeContext = createContext(null)

function ThemeContextDemo() {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ToggleButton />
      {/* MiddleLayer never touches theme —
          it's just passing children through */}
      <MiddleLayer />
    </ThemeContext.Provider>
  )
}

function MiddleLayer() {
  return <DeepCard />
}

// 3 levels deep, and it never received "theme" as a prop.
// It reached straight into the Provider above.
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
  return (
    <button className="demo-btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Switch to {theme === 'light' ? 'dark' : 'light'}
    </button>
  )
}

function DeepCard() {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`context-deep-card ${theme}`}>
      <span className="context-deep-label">3 levels down</span>
      I'm themed: <strong>{theme}</strong>
    </div>
  )
}

function MiddleLayer() {
  // no props received, no props passed — it never touches theme
  return <DeepCard />
}

export default function ThemeContextDemo() {
  const [theme, setTheme] = useState('light')

  return (
    <HookCard
      title="Theme Context"
      hook="useContext"
      blurb="Toggle the theme here — a component 3 levels down reads it directly. No props passed through the middle layer."
      code={code}
      state={{ theme }}
    >
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ToggleButton />
        <MiddleLayer />
      </ThemeContext.Provider>
    </HookCard>
  )
}
