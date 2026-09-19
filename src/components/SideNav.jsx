import { HOOKS_MENU } from '../data/hooksMeta'
import InfoCircle from './InfoCircle'

function jumpTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function SideNav() {
  return (
    <nav className="side-nav" aria-label="Jump to hook">
      {HOOKS_MENU.map((hook) => (
        <div key={hook.id} className="side-nav-item">
          <button className="side-nav-link" onClick={() => jumpTo(hook.id)}>
            {hook.label}
          </button>
          <InfoCircle text={hook.definition} />
        </div>
      ))}
    </nav>
  )
}
