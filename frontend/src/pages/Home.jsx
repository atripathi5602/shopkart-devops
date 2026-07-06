import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { productAPI } from '../services/api'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productAPI.getAll({ size: 8 }).then(res => setProducts(res.data.content || res.data)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Shop Smarter,<br/>Live Better</h1>
          <p>Discover thousands of products at unbeatable prices, delivered right to your door.</p>
          <div className="hero-btns">
            <Link to="/products" className="btn btn-accent btn-lg">Shop Now</Link>
            <Link to="/register" className="btn btn-outline btn-lg" style={{borderColor:'#fff',color:'#fff'}}>Join Free</Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="section-title">Featured <span>Products</span></h2>
          {loading ? <div className="loader"><div className="spinner"></div></div> : (
            <div className="products-grid">
              {products.map(p => <ProductCard key={p.id} product={p}/>)}
            </div>
          )}
          <div style={{textAlign:'center',marginTop:'40px'}}>
            <Link to="/products" className="btn btn-primary btn-lg">View All Products</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
