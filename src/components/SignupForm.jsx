import { useState } from 'react'
import HookCard from './HookCard'

const code = `function SignupForm() {
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(name)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Sign up</button>
      {submitted && <p>Welcome, {submitted}!</p>}
    </form>
  )
}`

export default function SignupForm() {
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    setSubmitted(name)
    setName('')
  }

  return (
    <HookCard
      title="Form Submit"
      hook="useState"
      blurb="The input's value lives in state — that's what makes it a 'controlled' input."
      code={code}
      state={{ name, submitted }}
    >
      <form className="demo-form" onSubmit={handleSubmit}>
        <input
          id="signup-name"
          className="demo-input"
          placeholder="Type your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="demo-btn" type="submit">
          Sign up
        </button>
      </form>
      {submitted && <p className="welcome-msg">Welcome, {submitted}! 👋</p>}
    </HookCard>
  )
}
