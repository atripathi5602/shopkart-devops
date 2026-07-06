# ShopKart E-Commerce Platform

Full-stack e-commerce application built with **React** (frontend) and **Java Spring Boot** (backend).

## Features

- **Product Catalog** — Browse, search, filter & sort products
- **User Auth** — JWT-based login/register with role-based access (ADMIN / CUSTOMER)
- **Shopping Cart** — Add, update, remove items; persistent per user
- **Order Management** — Place orders, view history, update status (Admin)
- **Admin Dashboard** — Manage products (CRUD), view & update all orders, stats
- **Data Seeding** — Pre-loaded demo products and users on startup

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, React Router, Axios |
| Backend | Java 17, Spring Boot 3.2, Spring Security, JPA/Hibernate |
| Database | H2 (dev) / MySQL 8 (prod) |
| Auth | JWT (JJWT 0.11) |
| Containerization | Docker, Docker Compose, Nginx |

## Quick Start

### Option 1: Docker Compose (Recommended)

```bash
# Clone/extract the project
cd ecommerce

# Build and run everything
docker-compose up --build

# Access the app at http://localhost
```

### Option 2: Local Development

**Backend:**
```bash
cd backend
# Uses H2 in-memory DB by default — no MySQL needed
mvn spring-boot:run
# API runs at http://localhost:8080
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
# App runs at http://localhost:3000
```

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@shopkart.com | admin123 |
| Customer | user@shopkart.com | user123 |

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/auth/register | Public | Register user |
| POST | /api/auth/login | Public | Login & get JWT |
| GET | /api/auth/me | User | Current user info |
| GET | /api/products | Public | List products (with filters) |
| GET | /api/products/:id | Public | Product detail |
| POST | /api/products | Admin | Create product |
| PUT | /api/products/:id | Admin | Update product |
| DELETE | /api/products/:id | Admin | Delete product |
| GET | /api/cart | User | Get cart |
| POST | /api/cart/items | User | Add to cart |
| PUT | /api/cart/items/:id | User | Update quantity |
| DELETE | /api/cart/items/:id | User | Remove item |
| DELETE | /api/cart | User | Clear cart |
| POST | /api/orders | User | Place order |
| GET | /api/orders/my | User | My orders |
| GET | /api/orders | Admin | All orders |
| PUT | /api/orders/:id/status | Admin | Update order status |

## Project Structure

```
ecommerce/
├── frontend/                   # React app
│   ├── src/
│   │   ├── components/        # Navbar, Footer, ProductCard, etc.
│   │   ├── pages/             # Home, Products, Cart, Orders, Admin, etc.
│   │   ├── context/           # AuthContext, CartContext
│   │   ├── services/          # API calls (Axios)
│   │   └── index.css          # Global styles
│   ├── Dockerfile
│   └── nginx.conf
├── backend/                    # Spring Boot app
│   └── src/main/java/com/shopkart/
│       ├── controller/         # REST controllers
│       ├── service/            # Business logic
│       ├── repository/         # JPA repositories
│       ├── entity/             # JPA entities
│       ├── dto/                # Request/Response DTOs
│       ├── security/           # JWT filter & utils
│       ├── config/             # SecurityConfig, DataInitializer
│       └── exception/          # Global exception handler
├── docker-compose.yml
└── README.md
```

## Production Deployment

1. Update `docker-compose.yml` DB credentials
2. Change JWT secret in `application.yml`  
3. Set `SPRING_PROFILES_ACTIVE=mysql` for MySQL
4. Build and push Docker images to your registry
5. Deploy on any cloud: AWS ECS, GCP Cloud Run, DigitalOcean App Platform, etc.
