import { useState, useEffect } from 'react'
import { orderAPI } from '../services/api'

const STATUS_CLASS = { PENDING:'pending', PROCESSING:'processing', SHIPPED:'shipped', DELIVERED:'delivered', CANCELLED:'cancelled' }

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    orderAPI.getMyOrders().then(res => setOrders(res.data)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="loader"><div className="spinner"></div></div>

  return (
    <div className="orders-page">
      <div className="container">
        <h1>My Orders</h1>
        {orders.length === 0 ? (
          <div style={{textAlign:'center',padding:'60px 0',color:'var(--text-muted)'}}>
            <div style={{fontSize:'64px',marginBottom:'16px'}}>📦</div>
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span className="order-id">Order #{order.id}</span>
              <span className={`order-status status-${STATUS_CLASS[order.status]}`}>{order.status}</span>
            </div>
            <div className="order-items">
              {order.items?.map(i => <div key={i.id}>{i.productName} × {i.quantity}</div>)}
            </div>
            <div className="order-total">Total: ₹{order.totalAmount?.toLocaleString('en-IN')}</div>
            <div style={{fontSize:'12px',color:'var(--text-muted)',marginTop:'8px'}}>{new Date(order.createdAt).toLocaleDateString('en-IN', {year:'numeric',month:'long',day:'numeric'})}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
