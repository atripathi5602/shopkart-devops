import { Link, useNavigate } from 'react-router-dom'
import { Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { orderAPI } from '../services/api'
import toast from 'react-hot-toast'
import { useState } from 'react'

const CATEGORY_EMOJI = { Electronics: 'đ', Clothing: '👕', Books: '📚', Food: '🍕', Sports: '⚽', Home: '🏠', default: '📦' }

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [placing, setPlacing] = useState(false)

  const handleCheckout = async () => {
    if (!user) { navigate('/login'); return }
    setPlacing(true)
    try {
      await orderAPI.create()
      toast.success('Order placed successfully!')
      navigate('/orders')
    } catch { toast.error('Failed to place order') }
    finally { setPlacing(false) }
  }

  if (!cart.items.length) return (
    <div className="container">
      <div className="empty-cart">
        <div className="icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn btn-primary btn-lg"><ShoppingBag size={18}/> Start Shopping</Link>
      </div>
    </div>
  )

  const subtotal = cart.items.reduce((s, i) => s + i.price * i.quantity, 0)
  const shipping = subtotal > 500 ? 0 : 49
  const total = subtotal + shipping

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Your Cart</h1>
        <div className="cart-layout">
          <div className="cart-items">
            {cart.items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img">{CATEGORY_EMOJI[item.category] || CATEGORY_EMOJI.default}</div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.productName}</div>
                  <div className="cart-item-price">₹{item.price?.toLocaleString('en-IN')}</div>
                  <div className="qty-control">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}><Trash2 size={14}/></button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
            <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
            {shipping > 0 && <p style={{fontSize:'12px',color:'var(--text-muted)',marginTop:'-8px'}}>Free shipping on orders above ₹500</p>}
            <div className="summary-row total"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
            <button className="btn btn-primary" onClick={handleCheckout} disabled={placing}>
              {placing ? 'Placing Order...' : 'Place Order'}
            </button>
            <button className="btn btn-outline" style={{width:'100%',justifyContent:'center',marginTop:'8px'}} onClick={clearCart}>Clear Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
