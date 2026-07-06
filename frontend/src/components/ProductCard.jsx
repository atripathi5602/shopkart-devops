import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const CATEGORY_EMOJI = { Electronics: 'đ', Clothing: '👕', Books: '📚', Food: '🍕', Sports: '⚽', Home: '🏠', default: '📦' }

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { user } = useAuth()

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!user) { toast.error('Please login to add items to cart'); return }
    try { await addToCart(product.id); toast.success('Added to cart!') }
    catch { toast.error('Failed to add to cart') }
  }

  return (
    <Link to={`/products/${product.id}`} style={{textDecoration:'none'}}>
      <div className="product-card">
        <div className="product-img">
          {product.imageUrl
            ? <img src={product.imageUrl} alt={product.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
            : (CATEGORY_EMOJI[product.category] || CATEGORY_EMOJI.default)
          }
        </div>
        <div className="product-info">
          <div className="product-category">{product.category}</div>
          <div className="product-name">{product.name}</div>
          <div className="product-price">
            ₹{product.price?.toLocaleString('en-IN')}
          </div>
          <div className="product-actions">
            <button className="btn btn-primary btn-sm" onClick={handleAdd}>
              <ShoppingCart size={14}/> Add to Cart
            </button>
            <span className="btn btn-outline btn-sm">View</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
