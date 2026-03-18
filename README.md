# 🔥 Sneaker E-Commerce Website

A modern, full-stack sneaker e-commerce platform built with **React.js**, **Node.js**, **Express**, and **MongoDB**. Features a sleek dark/light mode toggle, complete authentication system, shopping cart, wishlist, and admin dashboard.

![Tech Stack](https://img.shields.io/badge/React-18.2-blue) ![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen) ![Express](https://img.shields.io/badge/Express-4.18-lightgrey)

---

## ✨ Features

### User Features
- 🏠 **Home Page**: Hero banner, featured products, trending items, brand showcase, newsletter signup
- 👟 **Product Catalog**: Advanced filtering (brand, category, price, size, color), sorting, pagination
- 🔍 **Search Functionality**: Real-time product search from navbar
- 📱 **Product Details**: Image gallery, size selection, quantity picker, reviews & ratings
- 🛒 **Shopping Cart**: Add/remove items, quantity management, price calculation
- 💳 **Checkout**: Shipping address form, order summary, mock Stripe payment
- ❤️ **Wishlist**: Save favorite products for later
- 🔐 **Authentication**: Register, login, JWT-based sessions
- 👤 **User Profile**: Edit personal info, manage shipping addresses
- 📦 **Order History**: View past orders with status tracking
- 🌓 **Dark/Light Mode**: Seamless theme switching with Tailwind CSS

### Admin Features
- 📊 **Dashboard**: Overview with key metrics (orders, revenue, products)
- 📦 **Product Management**: Create, edit, delete products with full CRUD operations
- 🛍️ **Order Management**: View all orders, update delivery status
- 🎯 **Inventory Control**: Manage stock levels, sizes, colors

### Technical Features
- ⚡ **Fast Performance**: Optimized React components with Context API
- 📐 **Responsive Design**: Mobile-first approach with Tailwind CSS
- 🔒 **Secure Backend**: JWT authentication, bcrypt password hashing
- 🎨 **Modern UI/UX**: Smooth animations, intuitive navigation
- 🔄 **RESTful API**: Clean backend architecture with Express.js

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - Component-based UI library
- **React Router DOM 6.20.0** - Client-side routing
- **Tailwind CSS 3.3.6** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Icons** - Icon library
- **React Toastify** - Notification system

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express.js 4.18** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **cors** - Cross-origin resource sharing

---

## 📦 Project Structure

```
shoe-website/
├── backend/
│   ├── models/
│   │   ├── Product.js          # Product schema with sizes, colors, ratings
│   │   ├── User.js              # User schema with roles
│   │   ├── Order.js             # Order schema with shipping info
│   │   ├── Review.js            # Product review schema
│   │   ├── Cart.js              # Shopping cart schema
│   │   └── Wishlist.js          # Wishlist schema
│   ├── routes/
│   │   ├── productRoutes.js     # Product CRUD & filtering
│   │   ├── userRoutes.js        # Auth & user management
│   │   ├── orderRoutes.js       # Order processing
│   │   ├── reviewRoutes.js      # Product reviews
│   │   ├── cartRoutes.js        # Cart operations
│   │   └── wishlistRoutes.js    # Wishlist operations
│   ├── middleware/
│   │   └── auth.js              # JWT verification & admin guard
│   ├── seedData.js              # Sample product data
│   ├── server.js                # Express app entry point
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js           # Navigation with search & cart
    │   │   ├── Footer.js           # Footer with links
    │   │   ├── ProductCard.js      # Product grid item
    │   │   ├── Loading.js          # Loading spinner
    │   │   ├── PrivateRoute.js     # Protected route wrapper
    │   │   └── AdminRoute.js       # Admin-only route wrapper
    │   ├── context/
    │   │   ├── AuthContext.js      # User authentication state
    │   │   ├── ThemeContext.js     # Dark/light mode state
    │   │   ├── CartContext.js      # Shopping cart state
    │   │   └── WishlistContext.js  # Wishlist state
    │   ├── services/
    │   │   ├── api.js              # Axios instance with interceptors
    │   │   ├── authService.js      # Auth API calls
    │   │   ├── productService.js   # Product API calls
    │   │   ├── cartService.js      # Cart API calls
    │   │   ├── orderService.js     # Order API calls
    │   │   ├── wishlistService.js  # Wishlist API calls
    │   │   └── reviewService.js    # Review API calls
    │   ├── pages/
    │   │   ├── HomePage.js          # Landing page
    │   │   ├── ProductsPage.js      # Product listing with filters
    │   │   ├── ProductDetailPage.js # Single product view
    │   │   ├── CartPage.js          # Shopping cart
    │   │   ├── CheckoutPage.js      # Checkout form
    │   │   ├── LoginPage.js         # Login form
    │   │   ├── RegisterPage.js      # Registration form
    │   │   ├── ProfilePage.js       # User profile editor
    │   │   ├── OrdersPage.js        # Order history
    │   │   ├── WishlistPage.js      # Saved products
    │   │   ├── NotFoundPage.js      # 404 page
    │   │   └── admin/
    │   │       ├── AdminDashboard.js  # Admin overview
    │   │       ├── AdminProducts.js   # Product management
    │   │       └── AdminOrders.js     # Order management
    │   ├── App.js                  # Root component with routing
    │   ├── index.js                # React DOM entry
    │   └── index.css               # Tailwind CSS imports
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd shoe-website
```

2. **Backend Setup**
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sneaker-store
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
NODE_ENV=development
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🎯 Running the Application

### Development Mode

**Start MongoDB** (if running locally):
```bash
mongod
```

**Start Backend Server** (in `backend` directory):
```bash
npm start
```
Backend will run on `http://localhost:5000`

**Start Frontend** (in `frontend` directory):
```bash
npm start
```
Frontend will run on `http://localhost:3000`

### Seed Sample Data

To populate the database with sample sneaker products:
```bash
cd backend
node seedData.js
```

This will create 16 sample products across brands like Nike, Adidas, Jordan, Puma, and New Balance.

---

## 👤 Demo Accounts

After seeding data, you can use these accounts:

**Admin Account**
- Email: `admin@sneakerstore.com`
- Password: `admin123`
- Access: Full admin dashboard

**Regular User**
- Email: `john@example.com`
- Password: `password123`
- Access: User features only

---

## 🔌 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart` - Add item to cart (protected)
- `PUT /api/cart/:id` - Update cart item (protected)
- `DELETE /api/cart/:id` - Remove cart item (protected)
- `DELETE /api/cart` - Clear cart (protected)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders/myorders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `GET /api/orders` - Get all orders (admin)
- `PUT /api/orders/:id/deliver` - Update to delivered (admin)

### Wishlist
- `GET /api/wishlist` - Get user wishlist (protected)
- `POST /api/wishlist` - Add to wishlist (protected)
- `DELETE /api/wishlist/:id` - Remove from wishlist (protected)

### Reviews
- `POST /api/reviews` - Create review (protected)
- `GET /api/reviews/product/:productId` - Get product reviews
- `DELETE /api/reviews/:id` - Delete review (protected)

---

## 🎨 Key Features Explained

### Product Filtering
Products can be filtered by:
- **Brand**: Nike, Adidas, Jordan, Puma, New Balance
- **Category**: Running, Basketball, Casual, Training, Lifestyle
- **Price Range**: Min and max price
- **Size**: US shoe sizes (7-13)
- **Color**: Multiple color options
- **Search**: Text search across name and description

### Shopping Cart
- Add products with selected size
- Update quantity (1-10 per item)
- Remove individual items
- Automatic price calculation (subtotal, tax at 8%, shipping)
- Free shipping over $100
- Persists to database for logged-in users

### Authentication Flow
- JWT tokens stored in localStorage
- Automatic token refresh on API calls
- Protected routes redirect to login
- Admin routes check user role
- Password hashing with bcrypt (10 rounds)

### Dark Mode
- Toggle button in navbar
- Persists preference to localStorage
- Tailwind CSS dark mode classes
- Smooth transitions between themes

---

## 🎯 Future Enhancements

- [ ] Stripe payment integration (currently mock)
- [ ] Email notifications for orders
- [ ] Product image upload to cloud storage
- [ ] Advanced analytics dashboard
- [ ] Discount codes/coupons system
- [ ] User reviews with images
- [ ] Social media sharing
- [ ] Related products algorithm
- [ ] Multi-currency support
- [ ] Inventory low-stock alerts

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## 👨‍💻 Author

Built with ❤️ for sneaker enthusiasts

---

## 🙏 Acknowledgments

- Nike, Adidas, Jordan brand imagery for demo purposes
- Tailwind CSS for the amazing utility-first framework
- React community for excellent documentation
- Unsplash for product placeholder images
