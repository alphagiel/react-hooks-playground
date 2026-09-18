# React Hooks Playground

A small, click-around app for learning React hooks by playing with them, not just reading about them. Each card shows a working demo, its live state, and a "peek under the hood" toggle that reveals the exact code driving it.

## Run it

You'll need [Node.js](https://nodejs.org) installed (any recent version works).

```bash
npm install
npm run dev
```

Then open the URL it prints — usually **http://localhost:5173**.

That's it. Click things and see what happens.

## What's inside

**`useState`**
- Button Click Counter — the basics: one value, one setter
- Total Likes — two state variables updating from one click
- Shopping Cart — state holding a whole array
- Form Submit — a controlled input

**`useEffect`**
- Tab Title Sync — watch your actual browser tab update as a side effect
- Mount/Unmount Timer — a `setInterval` that gets cleaned up when the component unmounts

**`useRef`**
- useRef vs useState — click one button and nothing visibly changes; click the other and it does. Shows the core difference: state triggers a re-render, a ref doesn't.

**`useContext`**
- Theme Context — a component three levels deep reads a value straight from a Provider, no props passed through the components in between

## Editing

Each demo lives in its own file under `src/components/`. Change one, save, and the browser updates instantly (hot reload) — no restart needed.
