import ClickCounter from './components/ClickCounter'
import LikeButton from './components/LikeButton'
import Cart from './components/Cart'
import SignupForm from './components/SignupForm'
import TitleSyncDemo from './components/TitleSyncDemo'
import TimerCleanupDemo from './components/TimerCleanupDemo'
import WeatherDemo from './components/WeatherDemo'
import RefVsStateDemo from './components/RefVsStateDemo'
import ThemeContextDemo from './components/ThemeContextDemo'
import StickFigure from './components/StickFigure'
import SideNav from './components/SideNav'
import { StickFigureProvider } from './context/StickFigureContext'
import './App.css'

function App() {
  return (
    <StickFigureProvider>
      <div className="app-shell">
        <div className="app-fixed-top">
          <header className="app-header">
            <h1>React Hooks Playground</h1>
            <p>
              Click things, then hit "peek under the hood" to see the code
              that made it happen. Watch him react.
            </p>
          </header>

          <StickFigure />
        </div>

        <div className="app-body">
          <SideNav />

          <div className="app-scroll">
            <section id="hook-state" className="section-label">
              <h2>useState</h2>
              <p>State React owns — change it, the screen updates.</p>
            </section>
            <main className="card-grid">
              <ClickCounter />
              <LikeButton />
              <Cart />
              <SignupForm />
            </main>

            <section id="hook-effect" className="section-label">
              <h2>useEffect</h2>
              <p>Side effects — things that happen after render, outside the UI itself.</p>
            </section>
            <main className="card-grid">
              <TitleSyncDemo />
              <TimerCleanupDemo />
              <WeatherDemo />
            </main>

            <section id="hook-ref" className="section-label">
              <h2>useRef</h2>
              <p>A value that survives re-renders but changing it never triggers one.</p>
            </section>
            <main className="card-grid">
              <RefVsStateDemo />
            </main>

            <section id="hook-context" className="section-label">
              <h2>useContext</h2>
              <p>Skip passing props down every level — a component reaches into a Provider above it directly.</p>
            </section>
            <main className="card-grid">
              <ThemeContextDemo />
            </main>
          </div>
        </div>
      </div>
    </StickFigureProvider>
  )
}

export default App
