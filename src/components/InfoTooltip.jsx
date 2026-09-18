import { useState, useRef, useEffect } from 'react'

export default function InfoTooltip({ text }) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    function handleEscape(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('click', handleOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('click', handleOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  return (
    <span className="info-tooltip-wrapper" ref={wrapperRef}>
      <button
        type="button"
        className="info-icon"
        aria-label="More info"
        onClick={(e) => {
          e.stopPropagation()
          setOpen(!open)
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        i
      </button>
      {open && <span className="info-bubble">{text}</span>}
    </span>
  )
}
