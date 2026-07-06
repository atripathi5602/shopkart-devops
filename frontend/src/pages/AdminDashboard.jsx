import { useState, useEffect } from 'react'
import { productAPI, orderAPI } from '../services/api'
import toast from 'react-hot-toast'
import { Plus, Edit, Trash2, X } from 'lucide-react'

const EMPTY_PRODUCT = { name: '', description: '', price: '', category: 'Electronics', stock: '', imageUrl: '' }
const CATEGORIES = ['Electronics', 'Clothing', 'Books', 'Food', 'Sports', 'Home']
const STATUS_OPTIONS = ['PENDING','PROCESSING','SHIPPED','DELIVERED','CANCELLED']

export default function AdminDashboard() {
  const [tab, setTab] = useState('products')
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [form, setForm] = useState(EMPTY_PRODUCT)

  useEffect(() => { fetchProducts(); fetchOrders() }, [])

  const fetchProducts = () => productAPI.getAll().then(res => setProducts(res.data.content || res.data)).catch(() => {})
  const fetchOrders = () => orderAPI.getAll().then(res => setOrders(res.data)).catch(() => {})

  const openModal = (product = null) => {
    setEditingProduct(product)
    setForm(product ? {...product} : EMPTY_PRODUCT)
    setShowModal(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      if (editingProduct) await productAPI.update(editingProduct.id, form)
      else await productAPI.create(form)
      toast.success(editingProduct ? 'Product updated!' : 'Product created!')
      setShowModal(false)
      fetchProducts()
    } catch { toast.error('Failed to save product') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    try { await productAPI.delete(id); toast.success('Deleted!'); fetchProducts() }
    catch { toast.error('Failed to delete') }
  }

  const handleStatusChange = async (orderId, status) => {
    try { await orderAPI.updateStatus(orderId, status); toast.success('Status updated!'); fetchOrders() }
    catch { toast.error('Failed to update status') }
  }

  const stats = [
    { label: 'Total Products', value: products.length },
    { label: 'Total Orders', value: orders.length },
    { label: 'Revenue', value: `₹${orders.filter(o=>o.status!=='CANCELLED').reduce((s,o)=>s+(o.totalAmount||0),0).toLocaleString('en-IN')}` },
    { label: 'Pending Orders', value: orders.filter(o=>o.status==='PENDING').length },
  ]

  return (
    <div className="admin-page">
      <div className="container">
        <h1>Admin Dashboard</h1>
        <div className="stats-grid" style={{marginTop:'20px'}}>
          {stats.map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
            </div>
          ))}
        </div>
        <div className="admin-tabs">
          {['products','orders'].map(t => (
            <button key={t} className={`admin-tab${tab===t?' active':''}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>

        {tab === 'products' && (
          <>
            <div style={{display:'flex',justifyContent:'flex-end',marginBottom:'16px'}}>
              <button className="btn btn-primary" onClick={() => openModal()}><Plus size={16}/> Add Product</button>
            </div>
            <table className="data-table">
              <thead><tr><th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td>#{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>₹{p.price?.toLocaleString('en-IN')}</td>
                    <td>{p.stock}</td>
                    <td style={{display:'flex',gap:'6px'}}>
                      <button className="btn btn-outline btn-sm" onClick={() => openModal(p)}><Edit size={13}/></button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}><Trash2 size={13}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {tab === 'orders' && (
          <table className="data-table">
            <thead><tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{o.userEmail}</td>
                  <td>{o.items?.length || 0} items</td>
                  <td>₹{o.totalAmount?.toLocaleString('en-IN')}</td>
                  <td>
                    <select value={o.status} onChange={e => handleStatusChange(o.id, e.target.value)} style={{padding:'4px 8px',borderRadius:'6px',border:'1px solid var(--border)',fontSize:'13px'}}>
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
              <h3>{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
              <button className="btn btn-outline btn-sm" onClick={() => setShowModal(false)}><X size={14}/></button>
            </div>
            <form onSubmit={handleSave}>
              {[['name','Product Name'],['description','Description'],['imageUrl','Image URL (optional)']].map(([k,l]) => (
                <div className="form-group" key={k}>
                  <label>{l}</label>
                  <input className="form-control" value={form[k]||''} onChange={e => setForm({...form,[k]:e.target.value})} required={k!=='imageUrl'&&k!=='description'}/>
                </div>
              ))}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'12px'}}>
                <div className="form-group">
                  <label>Price (₹)</label>
                  <input className="form-control" type="number" value={form.price||''} onChange={e => setForm({...form,price:e.target.value})} required/>
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input className="form-control" type="number" value={form.stock||''} onChange={e => setForm({...form,stock:e.target.value})} required/>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select className="form-control" value={form.category} onChange={e => setForm({...form,category:e.target.value})}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
