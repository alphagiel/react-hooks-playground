export const HOOKS_MENU = [
  {
    id: 'hook-state',
    label: 'useState',
    definition: 'Stores a value. Change it, and the screen redraws with the new value.',
  },
  {
    id: 'hook-effect',
    label: 'useEffect',
    definition: 'Runs code after the screen updates — for stuff outside React, like the browser tab or a timer.',
  },
  {
    id: 'hook-ref',
    label: 'useRef',
    definition: "Holds a value that survives re-renders, but changing it never redraws the screen by itself.",
  },
  {
    id: 'hook-context',
    label: 'useContext',
    definition: 'Lets a component grab a value from a Provider above it, skipping props passed down every level.',
  },
]
