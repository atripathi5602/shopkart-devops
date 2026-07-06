import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, ArrowLeft } from 'lucide-react'
import { productAPI } from '../services/api'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const CATEGORY_EMOJI = { Electronics: 'đ', Clothing: '👕', Books: '📚', Food: '🍕', Sports: '⚽', Home: '🏠', default: '📦' }

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const { addToCart } = useCart()
  const { user } = useAuth()

  useEffect(() => {
    productAPI.getById(id).then(res => setProduct(res.data)).catch(() => {}).finally(() => setLoading(false))
  }, [id])

  const handleAdd = async () => {
    if (!user) { toast.error('Please login first'); return }
    try { await addToCart(product.id, qty); toast.success('Added to cart!') }
    catch { toast.error('Failed to add to cart') }
  }

  if (loading) return <div className="loader"><div className="spinner"></div></div>
  if (!product) return <div className="container" style={{padding:'60px 0',textAlign:'center'}}>Product not found. <Link to="/products">Go back</Link></div>

  return (
    <div className="product-detail">
      <div className="container">
        <Link to="/products" className="btn btn-outline btn-sm" style={{marginBottom:'24px'}}><ArrowLeft size={14}/> Back</Link>
        <div className="product-detail-grid">
          <div className="detail-img">{CATEGORY_EMOJI[product.category] || CATEGORY_EMOJI.default}</div>
          <div className="detail-info">
            <div className="detail-category">{product.category}</div>
            <h1>{product.name}</h1>
            <div className="detail-price">₹{product.price?.toLocaleString('en-IN')}</div>
            <span className={`detail-stock ${product.stock > 0 ? 'in-stock' : 'out-stock'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </span>
            <p className="detail-desc">{product.description || 'No description available.'}</p>
            <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'20px'}}>
              <span style={{fontWeight:600}}>Qty:</span>
              <div className="qty-control">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1,q-1))}>-</button>
                <span className="qty-value">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => Math.min(product.stock,q+1))}>+</button>
              </div>
            </div>
            <div className="detail-actions">
              <button className="btn btn-primary btn-lg" onClick={handleAdd} disabled={product.stock === 0}>
                <ShoppingCart size={18}/> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
