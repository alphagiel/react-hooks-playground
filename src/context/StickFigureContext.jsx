import { createContext, useContext, useReducer, useRef, useCallback } from 'react'

const StickFigureContext = createContext(null)

const initialState = {
  mood: 'idle',
  message: '',
  cardValue: null,
  theme: 'light',
  cartTotal: 0,
  likesTotal: 128,
  clickCount: 0,
  environment: null,
}

// Every way the mascot's state can change funnels through this one
// function. Instead of 8 separate setX calls scattered across the app,
// each caller dispatches an action describing WHAT happened, and this
// reducer decides HOW state responds — one place to read, one place to debug.
function stickFigureReducer(state, action) {
  switch (action.type) {
    case 'REACT':
      return { ...state, mood: action.mood, message: action.message, cardValue: action.card }
    case 'RESET_TO_IDLE':
      return { ...state, mood: 'idle', message: '', cardValue: null }
    case 'SET_THEME':
      return { ...state, theme: action.value }
    case 'SET_CART_TOTAL':
      return { ...state, cartTotal: action.value }
    case 'SET_LIKES_TOTAL':
      return { ...state, likesTotal: action.value }
    case 'SET_CLICK_COUNT':
      return { ...state, clickCount: action.value }
    case 'SET_ENVIRONMENT':
      return { ...state, environment: action.value }
    default:
      return state
  }
}

export function StickFigureProvider({ children }) {
  const [state, dispatch] = useReducer(stickFigureReducer, initialState)
  const timerRef = useRef(null)

  // holdMs === null means "stay like this until something else changes it"
  // — no auto-clear timer gets scheduled.
  const react = useCallback((nextMood, text, card = null, holdMs = 1800) => {
    clearTimeout(timerRef.current)
    dispatch({ type: 'REACT', mood: nextMood, message: text, card })
    if (holdMs !== null) {
      timerRef.current = setTimeout(() => {
        dispatch({ type: 'RESET_TO_IDLE' })
      }, holdMs)
    }
  }, [])

  const resetToIdle = useCallback(() => {
    clearTimeout(timerRef.current)
    dispatch({ type: 'RESET_TO_IDLE' })
  }, [])

  const setTheme = useCallback((value) => dispatch({ type: 'SET_THEME', value }), [])
  const setCartTotal = useCallback((value) => dispatch({ type: 'SET_CART_TOTAL', value }), [])
  const setLikesTotal = useCallback((value) => dispatch({ type: 'SET_LIKES_TOTAL', value }), [])
  const setClickCount = useCallback((value) => dispatch({ type: 'SET_CLICK_COUNT', value }), [])
  const setEnvironment = useCallback((value) => dispatch({ type: 'SET_ENVIRONMENT', value }), [])

  return (
    <StickFigureContext.Provider
      value={{
        ...state,
        react,
        resetToIdle,
        setTheme,
        setCartTotal,
        setLikesTotal,
        setClickCount,
        setEnvironment,
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
