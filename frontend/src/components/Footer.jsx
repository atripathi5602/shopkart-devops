export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">Shop<span>Kart</span></div>
            <p style={{fontSize:'14px',marginTop:'8px'}}>Your one-stop shop for everything you need. Quality products, fast delivery.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/cart">Cart</a></li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Return Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 ShopKart. Built with React + Java Spring Boot.</p>
        </div>
      </div>
    </footer>
  )
}
