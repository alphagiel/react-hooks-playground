import { useStickFigure } from '../context/StickFigureContext'

const CONFETTI = ['🎉', '✨', '🎊', '⭐']
const RAINDROPS = [0, 1, 2, 3, 4, 5]
const SNOWFLAKES = [0, 1, 2, 3, 4, 5]
const CLOUDS = [
  { top: '8%', size: '1.6rem', opacity: 0.85, duration: 16, delay: 0 },
  { top: '22%', size: '1.1rem', opacity: 0.7, duration: 12, delay: -4 },
  { top: '4%', size: '0.9rem', opacity: 0.6, duration: 20, delay: -9 },
  { top: '30%', size: '1.3rem', opacity: 0.75, duration: 14, delay: -2 },
  { top: '15%', size: '1rem', opacity: 0.55, duration: 18, delay: -13 },
]

export default function StickFigure() {
  const { mood, message, cardValue, theme, cartTotal, likesTotal, clickCount, environment } =
    useStickFigure()

  return (
    <div className="stick-figure-stage-wrap">
      <div className={`stick-figure-stage ${theme === 'dark' ? 'theme-dark' : ''}`}>
        {environment && (
          <div className={`weather-overlay weather-${environment}`}>
            {environment === 'rainy' &&
              RAINDROPS.map((i) => <span key={i} className={`raindrop drop-${i}`} />)}
            {environment === 'snowy' &&
              SNOWFLAKES.map((i) => (
                <span key={i} className={`snowflake flake-${i}`}>
                  ❆
                </span>
              ))}
            {environment === 'cloudy' &&
              CLOUDS.map((c, i) => (
                <span
                  key={i}
                  className="weather-cloud"
                  style={{
                    top: c.top,
                    fontSize: c.size,
                    opacity: c.opacity,
                    animationDuration: `${c.duration}s`,
                    animationDelay: `${c.delay}s`,
                  }}
                >
                  ☁️
                </span>
              ))}
          </div>
        )}

        <div className="stick-figure-frame">
          {message && <div className={`stick-bubble mood-${mood}`}>{message}</div>}

          <div className={`stick-figure mood-${mood}`}>
            {mood === 'celebrate' && (
              <div className="stick-confetti">
                {CONFETTI.map((c, i) => (
                  <span key={i} className={`confetti-piece piece-${i}`}>
                    {c}
                  </span>
                ))}
              </div>
            )}

            <svg viewBox="0 0 100 140" width="140" height="196">
              <circle className="sf-head" cx="50" cy="22" r="14" />
              <line className="sf-body" x1="50" y1="36" x2="50" y2="88" />
              <line className="sf-arm-left" x1="50" y1="48" x2="26" y2="70" />
              <line className="sf-arm-right" x1="50" y1="48" x2="74" y2="70" />
              <line className="sf-leg-left" x1="50" y1="88" x2="32" y2="130" />
              <line className="sf-leg-right" x1="50" y1="88" x2="68" y2="130" />
            </svg>

            {cardValue !== null && (
              <div className={mood === 'point' ? 'stick-circle' : 'stick-card'}>{cardValue}</div>
            )}
          </div>
        </div>
        <p className="stick-figure-caption">
          He reacts to whatever you click below — a live <code>useContext</code> demo of his own.
        </p>
      </div>

      <div className="stage-stats-bar">
        <span className="stage-stat">🛒 ${cartTotal}</span>
        <span className="stage-stat">👆 {clickCount}</span>
        <span className="stage-stat">❤️ {likesTotal}</span>
      </div>
    </div>
  )
}
