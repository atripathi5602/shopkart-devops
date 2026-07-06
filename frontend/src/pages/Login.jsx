import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try { await login(form); toast.success('Welcome back!'); navigate('/') }
    catch { toast.error('Invalid credentials') }
    finally { setLoading(false) }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back 👋</h2>
        <p>Sign in to your ShopKart account</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-control" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required/>
          </div>
          <button className="btn btn-primary form-submit" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="form-footer">
          Don't have an account? <Link to="/register">Register now</Link>
        </div>
        <div style={{marginTop:'16px',padding:'12px',background:'var(--bg)',borderRadius:'8px',fontSize:'13px'}}>
          <strong>Demo:</strong> admin@shopkart.com / admin123 (Admin)<br/>
          <strong>Demo:</strong> user@shopkart.com / user123 (Customer)
        </div>
      </div>
    </div>
  )
}
