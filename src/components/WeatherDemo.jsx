import { useState, useEffect } from 'react'
import HookCard from './HookCard'
import { useStickFigure } from '../context/StickFigureContext'

// Open-Meteo needs no API key — good for a demo. Hardcoded to New York
// so the fetch URL is simple; no geolocation permission needed.
const CITY = { label: 'New York', lat: 40.71, lon: -74.01 }
const WEATHER_URL = `https://api.open-meteo.com/v1/forecast?latitude=${CITY.lat}&longitude=${CITY.lon}&hourly=temperature_2m,weathercode&temperature_unit=fahrenheit&timezone=auto&forecast_days=1`

// WMO weather codes -> one of our 4 environments
function codeToCondition(code) {
  if (code === 0) return 'sunny'
  if (code <= 3 || code === 45 || code === 48) return 'cloudy'
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95) return 'rainy'
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'snowy'
  return 'cloudy'
}

const CONDITION_META = {
  sunny: { emoji: '☀️', label: 'Clear' },
  cloudy: { emoji: '☁️', label: 'Cloudy' },
  rainy: { emoji: '🌧️', label: 'Rainy' },
  snowy: { emoji: '❄️', label: 'Snowy' },
}

function formatHour(iso) {
  const d = new Date(iso)
  const h = d.getHours()
  const period = h >= 12 ? 'pm' : 'am'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}${period}`
}

const code = `// The API call lives in useEffect — NEVER directly in the
// component body. Render must stay pure; a fetch is a side
// effect, and side effects belong in useEffect.
function WeatherDemo() {
  const [hours, setHours] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()

    fetch(WEATHER_URL, { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        setHours(parseHours(data))
        setStatus('ready')
      })
      .catch(err => {
        if (err.name !== 'AbortError') setStatus('error')
      })

    // cleanup: cancel the request if this unmounts before
    // it finishes — same pattern as the Timer's clearInterval
    return () => controller.abort()
  }, []) // empty array = fetch once, right after first render

  return <HourPicker hours={hours} status={status} />
}`

export default function WeatherDemo() {
  const [hours, setHours] = useState([])
  const [status, setStatus] = useState('loading')
  const [selectedIndex, setSelectedIndex] = useState(null)
  const { react, setEnvironment, setWeatherInfo } = useStickFigure()

  useEffect(() => {
    const controller = new AbortController()

    fetch(WEATHER_URL, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        const parsed = data.hourly.time.map((time, i) => ({
          time,
          temp: Math.round(data.hourly.temperature_2m[i]),
          code: data.hourly.weathercode[i],
        }))
        setHours(parsed)
        setStatus('ready')

        // Default to right now: snap to the nearest 3-hour bucket we
        // actually show as a button, so the highlighted pick lines up
        // with reality the instant the data loads — no click needed.
        const currentHour = new Date().getHours()
        const nearestBucket = Math.min(21, Math.round(currentHour / 3) * 3)
        const nowIndex = Math.min(nearestBucket, parsed.length - 1)
        const nowHour = parsed[nowIndex]
        if (nowHour) {
          setSelectedIndex(nowIndex)
          setEnvironment(codeToCondition(nowHour.code))
          setWeatherInfo(nowHour.temp, CONDITION_META[codeToCondition(nowHour.code)].label)
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setStatus('error')
      })

    return () => controller.abort()
  }, [])

  function selectHour(i) {
    setSelectedIndex(i)
    const hour = hours[i]
    const condition = codeToCondition(hour.code)
    const meta = CONDITION_META[condition]
    setEnvironment(condition)
    setWeatherInfo(hour.temp, meta.label)
    react('talk', `${formatHour(hour.time)}: ${hour.temp}°F, ${meta.label} ${meta.emoji}`, null, 3200)
  }

  return (
    <HookCard
      title="Live Weather (real API)"
      hook="useEffect"
      blurb={`Fetched once on mount from a real API — Open-Meteo, ${CITY.label}. Defaults to right now; click any hour to change it.`}
      code={code}
      state={{ status, hoursLoaded: hours.length, selectedIndex }}
      wide
    >
      {status === 'loading' && <p className="weather-status">Fetching weather…</p>}
      {status === 'error' && <p className="weather-status">Couldn't reach the weather API.</p>}

      {status === 'ready' && (
        <div className="weather-hours">
          {hours
            .filter((_, i) => i % 3 === 0)
            .map((hour) => {
              const realIndex = hours.indexOf(hour)
              const condition = codeToCondition(hour.code)
              const meta = CONDITION_META[condition]
              return (
                <button
                  key={hour.time}
                  className={`weather-hour-btn ${selectedIndex === realIndex ? 'active' : ''}`}
                  onClick={() => selectHour(realIndex)}
                >
                  <span className="weather-hour-time">{formatHour(hour.time)}</span>
                  <span className="weather-hour-emoji">{meta.emoji}</span>
                  <span className="weather-hour-temp">{hour.temp}°</span>
                </button>
              )
            })}
        </div>
      )}
    </HookCard>
  )
}
