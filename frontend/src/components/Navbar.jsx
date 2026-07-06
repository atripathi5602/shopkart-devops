import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">Shop<span>Kart</span></Link>
        <div className="navbar-nav">
          <NavLink to="/products" className={({isActive}) => `nav-link${isActive?' active':''}`}>Products</NavLink>
          {user && <NavLink to="/orders" className={({isActive}) => `nav-link${isActive?' active':''}`}>Orders</NavLink>}
          {isAdmin && (
            <NavLink to="/admin" className={({isActive}) => `nav-link${isActive?' active':''}`}>
              <LayoutDashboard size={14}/> Admin
            </NavLink>
          )}
          {user ? (
            <>
              <span className="nav-link" style={{color:'var(--text)',cursor:'default'}}><User size={14}/> {user.name?.split(' ')[0]}</span>
              <button className="btn btn-outline btn-sm" onClick={handleLogout}><LogOut size={14}/> Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-link">Login</NavLink>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </>
          )}
          <Link to="/cart" className="btn btn-outline btn-sm cart-btn">
            <ShoppingCart size={16}/>
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  )
}
