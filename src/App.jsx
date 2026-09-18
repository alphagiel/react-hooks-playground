import ClickCounter from './components/ClickCounter'
import LikeButton from './components/LikeButton'
import Cart from './components/Cart'
import SignupForm from './components/SignupForm'
import TitleSyncDemo from './components/TitleSyncDemo'
import TimerCleanupDemo from './components/TimerCleanupDemo'
import RefVsStateDemo from './components/RefVsStateDemo'
import ThemeContextDemo from './components/ThemeContextDemo'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>React Hooks Playground</h1>
        <p>
          Click things, then hit "peek under the hood" to see the code that
          made it happen.
        </p>
      </header>

      <section className="section-label">
        <h2>useState</h2>
        <p>State React owns — change it, the screen updates.</p>
      </section>
      <main className="card-grid">
        <ClickCounter />
        <LikeButton />
        <Cart />
        <SignupForm />
      </main>

      <section className="section-label">
        <h2>useEffect</h2>
        <p>Side effects — things that happen after render, outside the UI itself.</p>
      </section>
      <main className="card-grid">
        <TitleSyncDemo />
        <TimerCleanupDemo />
      </main>

      <section className="section-label">
        <h2>useRef</h2>
        <p>A value that survives re-renders but changing it never triggers one.</p>
      </section>
      <main className="card-grid">
        <RefVsStateDemo />
      </main>

      <section className="section-label">
        <h2>useContext</h2>
        <p>Skip passing props down every level — a component reaches into a Provider above it directly.</p>
      </section>
      <main className="card-grid">
        <ThemeContextDemo />
      </main>
    </div>
  )
}

export default App
