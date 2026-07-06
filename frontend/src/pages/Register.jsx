import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try { await register(form); toast.success('Account created!'); navigate('/') }
    catch (err) { toast.error(err.response?.data?.message || 'Registration failed') }
    finally { setLoading(false) }
  }

  const set = (k) => (e) => setForm({...form, [k]: e.target.value})

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account 🚀</h2>
        <p>Join ShopKart today and start shopping</p>
        <form onSubmit={handleSubmit}>
          {[['name','Full Name','John Doe','text'],['email','Email','you@example.com','email'],['phone','Phone','9876543210','tel'],['password','Password','••••••••','password']].map(([k,l,p,t]) => (
            <div className="form-group" key={k}>
              <label>{l}</label>
              <input className="form-control" type={t} placeholder={p} value={form[k]} onChange={set(k)} required/>
            </div>
          ))}
          <button className="btn btn-primary form-submit" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        <div className="form-footer">Already have an account? <Link to="/login">Sign in</Link></div>
      </div>
    </div>
  )
}
