import { useState } from 'react'
import HookCard from './HookCard'
import { useStickFigure } from '../context/StickFigureContext'

const PRODUCTS = [
  { id: 1, name: 'Sticker Pack', price: 4 },
  { id: 2, name: 'Coffee Mug', price: 9 },
  { id: 3, name: 'T-Shirt', price: 15 },
]

const code = `function Cart() {
  const [items, setItems] = useState([])

  function addItem(product) {
    setItems([...items, product])
  }

  function removeItem(index) {
    setItems(items.filter((_, i) => i !== index))
  }

  const total = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <div>
      {PRODUCTS.map(p => (
        <button onClick={() => addItem(p)}>Add {p.name}</button>
      ))}
      <p>Total: \${total}</p>
    </div>
  )
}`

export default function Cart() {
  const [items, setItems] = useState([])
  const { react, setCartTotal } = useStickFigure()

  function addItem(product) {
    const nextItems = [...items, product]
    setItems(nextItems)
    const nextTotal = nextItems.reduce((sum, item) => sum + item.price, 0)
    setCartTotal(nextTotal)
    react('card', `+ ${product.name}`, `$${nextTotal}`)
  }

  function removeItem(index) {
    const nextItems = items.filter((_, i) => i !== index)
    setItems(nextItems)
    setCartTotal(nextItems.reduce((sum, item) => sum + item.price, 0))
    react('talk', 'Item removed')
  }

  const total = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <HookCard
      title="Shopping Cart"
      hook="useState"
      blurb="State can hold a whole array — add and remove items from it."
      code={code}
      state={{ items: items.map((i) => i.name), total }}
    >
      <div className="cart-products">
        {PRODUCTS.map((p) => (
          <button key={p.id} className="demo-btn small" onClick={() => addItem(p)}>
            + {p.name} (${p.price})
          </button>
        ))}
      </div>

      {items.length > 0 && (
        <ul className="cart-list">
          {items.map((item, i) => (
            <li key={i}>
              {item.name} — ${item.price}
              <button className="remove-btn" onClick={() => removeItem(i)}>
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="cart-total">Total: ${total}</p>
    </HookCard>
  )
}
