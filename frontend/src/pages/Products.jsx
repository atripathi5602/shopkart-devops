import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { productAPI } from '../services/api'
import ProductCard from '../components/ProductCard'

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Books', 'Food', 'Sports', 'Home']

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('newest')

  useEffect(() => {
    setLoading(true)
    const params = { search, sort }
    if (category !== 'All') params.category = category
    productAPI.getAll(params).then(res => setProducts(res.data.content || res.data)).catch(() => {}).finally(() => setLoading(false))
  }, [search, category, sort])

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">All <span>Products</span></h1>
        <div className="filters-bar">
          <input className="search-input" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}/>
          <select className="filter-select" value={category} onChange={e => setCategory(e.target.value)}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select className="filter-select" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
        {loading ? <div className="loader"><div className="spinner"></div></div> : (
          products.length === 0 ? <p style={{textAlign:'center',color:'var(--text-muted)',padding:'60px 0'}}>No products found</p> : (
            <div className="products-grid">
              {products.map(p => <ProductCard key={p.id} product={p}/>)}
            </div>
          )
        )}
      </div>
    </div>
  )
}
