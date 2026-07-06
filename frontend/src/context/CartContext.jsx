import { createContext, useContext, useState, useEffect } from 'react'
import { cartAPI } from '../services/api'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 })
  const { user } = useAuth()

  useEffect(() => { if (user) fetchCart(); else setCart({ items: [], total: 0 }) }, [user])

  const fetchCart = async () => {
    try { const res = await cartAPI.get(); setCart(res.data) } catch {}
  }

  const addToCart = async (productId, quantity = 1) => { await cartAPI.addItem(productId, quantity); await fetchCart() }
  const updateQuantity = async (itemId, quantity) => { await cartAPI.updateItem(itemId, quantity); await fetchCart() }
  const removeFromCart = async (itemId) => { await cartAPI.removeItem(itemId); await fetchCart() }
  const clearCart = async () => { await cartAPI.clear(); setCart({ items: [], total: 0 }) }

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, itemCount, fetchCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
