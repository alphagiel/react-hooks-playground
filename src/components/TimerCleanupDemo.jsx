import { useState, useEffect } from 'react'
import HookCard from './HookCard'
import { useStickFigure } from '../context/StickFigureContext'

const code = `function Timer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)

    // cleanup: runs when the component unmounts
    // (or before the effect re-runs). Without this,
    // the interval keeps ticking forever — a leak.
    return () => clearInterval(id)
  }, [])

  return <p>{seconds}s elapsed</p>
}

function Parent() {
  const [showTimer, setShowTimer] = useState(true)
  return (
    <>
      <button onClick={() => setShowTimer(!showTimer)}>
        {showTimer ? 'Unmount' : 'Mount'} timer
      </button>
      {showTimer && <Timer />}
    </>
  )
}`

// Steps up through the largest sensible unit — seconds stay seconds until
// a minute passes, then it's minutes until an hour passes, and so on.
// Combines the two largest units so 70s reads "1 minute and 10 seconds",
// not a rounded-off "1 minute" that silently drops the remainder.
const UNITS = [
  { seconds: 31536000, label: 'year' },
  { seconds: 2592000, label: 'month' },
  { seconds: 86400, label: 'day' },
  { seconds: 3600, label: 'hour' },
  { seconds: 60, label: 'minute' },
  { seconds: 1, label: 'second' },
]

function pluralize(n, label) {
  return `${n} ${label}${n === 1 ? '' : 's'}`
}

function formatDuration(totalSeconds) {
  const majorIndex = UNITS.findIndex((unit) => totalSeconds >= unit.seconds)
  const major = UNITS[majorIndex]
  const majorCount = Math.floor(totalSeconds / major.seconds)
  const remainder = totalSeconds % major.seconds

  const isSmallestUnit = majorIndex === UNITS.length - 1
  if (isSmallestUnit || remainder === 0) {
    return pluralize(majorCount, major.label)
  }

  const minor = UNITS[majorIndex + 1]
  const minorCount = Math.floor(remainder / minor.seconds)
  if (minorCount === 0) {
    return pluralize(majorCount, major.label)
  }

  return `${pluralize(majorCount, major.label)} and ${pluralize(minorCount, minor.label)}`
}

// Templates for the every-10-seconds milestone bubble. Picking one at
// random each time keeps it from feeling like a canned, repeated string —
// and pulling live weatherTemp/weatherLabel from the shared context shows
// two totally separate cards (this Timer, the WeatherDemo) talking through
// one useContext value neither of them owns.
function pickMilestoneMessage(seconds, weatherTemp, weatherLabel) {
  const duration = formatDuration(seconds)
  if (weatherTemp === null) {
    return `Hey, it's been ${duration}!`
  }
  const templates = [
    `Hey, it's been ${duration}! Today is ${weatherTemp}°F and ${weatherLabel}.`,
    `${duration} in — still ${weatherLabel} out there, ${weatherTemp}°F.`,
    `Tick tock, ${duration}! Weather check: ${weatherTemp}°F, ${weatherLabel}.`,
    `${duration} on the clock. It's ${weatherLabel} and ${weatherTemp}°F right now.`,
  ]
  return templates[Math.floor(Math.random() * templates.length)]
}

function Timer() {
  const [seconds, setSeconds] = useState(0)
  const { react, weatherTemp, weatherLabel } = useStickFigure()

  useEffect(() => {
    react('wave', 'Timer started!')
    const id = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)

    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (seconds > 0 && seconds % 10 === 0) {
      react('celebrate', pickMilestoneMessage(seconds, weatherTemp, weatherLabel), null, 3200)
    }
  }, [seconds])

  return <span className="timer-readout">{seconds}s elapsed</span>
}

export default function TimerCleanupDemo() {
  const [showTimer, setShowTimer] = useState(true)
  const { react } = useStickFigure()

  return (
    <HookCard
      title="Mount / Unmount Timer"
      hook="useEffect + cleanup"
      blurb="Unmount it — the interval stops instantly. That's the cleanup function firing."
      code={code}
      state={{ showTimer }}
    >
      <button
        className="demo-btn"
        onClick={() => {
          if (showTimer) react('talk', 'Timer stopped')
          setShowTimer(!showTimer)
        }}
      >
        {showTimer ? 'Unmount' : 'Mount'} timer
      </button>
      {showTimer ? <Timer /> : <span className="timer-readout stopped">stopped</span>}
    </HookCard>
  )
}
