import { useStickFigure } from '../context/StickFigureContext'

const CONFETTI = ['🎉', '✨', '🎊', '⭐']

export default function StickFigure() {
  const { mood, message, cardValue, theme, cartTotal, likesTotal, clickCount } = useStickFigure()

  return (
    <div className="stick-figure-stage-wrap">
      <div className={`stick-figure-stage ${theme === 'dark' ? 'theme-dark' : ''}`}>
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
