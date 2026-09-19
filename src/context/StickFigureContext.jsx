import { createContext, useContext, useState, useRef, useCallback } from 'react'

const StickFigureContext = createContext(null)

export function StickFigureProvider({ children }) {
  const [mood, setMood] = useState('idle')
  const [message, setMessage] = useState('')
  const [cardValue, setCardValue] = useState(null)
  const [theme, setTheme] = useState('light')
  const [cartTotal, setCartTotal] = useState(0)
  const [likesTotal, setLikesTotal] = useState(128)
  const [clickCount, setClickCount] = useState(0)
  const timerRef = useRef(null)

  // holdMs === null means "stay like this until something else changes it"
  // — no auto-clear timer gets scheduled.
  const react = useCallback((nextMood, text, card = null, holdMs = 1800) => {
    clearTimeout(timerRef.current)
    setMood(nextMood)
    setMessage(text)
    setCardValue(card)
    if (holdMs !== null) {
      timerRef.current = setTimeout(() => {
        setMood('idle')
        setMessage('')
        setCardValue(null)
      }, holdMs)
    }
  }, [])

  const resetToIdle = useCallback(() => {
    clearTimeout(timerRef.current)
    setMood('idle')
    setMessage('')
    setCardValue(null)
  }, [])

  return (
    <StickFigureContext.Provider
      value={{
        mood,
        message,
        cardValue,
        react,
        resetToIdle,
        theme,
        setTheme,
        cartTotal,
        setCartTotal,
        likesTotal,
        setLikesTotal,
        clickCount,
        setClickCount,
      }}
    >
      {children}
    </StickFigureContext.Provider>
  )
}

export function useStickFigure() {
  const ctx = useContext(StickFigureContext)
  if (!ctx) {
    throw new Error('useStickFigure must be used inside a StickFigureProvider')
  }
  return ctx
}
