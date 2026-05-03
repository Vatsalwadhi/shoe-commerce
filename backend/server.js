const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Validate required env (with safe-ish dev fallback)
if (!process.env.JWT_SECRET) {
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ JWT_SECRET is required in production. Set it in your environment variables.');
    process.exit(1);
  }
  process.env.JWT_SECRET = 'dev_jwt_secret_change_me';
  console.warn('⚠️  JWT_SECRET not set. Using an insecure dev default. Set JWT_SECRET in backend/.env.');
}

// Import routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

// Middleware
// CORS_ORIGIN can be a single origin or a comma-separated list.
// Examples:
// - http://localhost:3000
// - https://my-frontend.vercel.app
// - http://localhost:3000,https://my-frontend.vercel.app
// - * (allow all; not recommended for production)
const corsOriginRaw = process.env.CORS_ORIGIN || '*';
const allowedOrigins = corsOriginRaw
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser clients
      if (!origin) return callback(null, true);

      // Allow all if * is present
      if (allowedOrigins.includes('*')) return callback(null, true);

      // Allow exact match
      if (allowedOrigins.includes(origin)) return callback(null, true);

      // Check if it's a vercel domain
      if (origin.endsWith('.vercel.app')) return callback(null, true);

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route (useful for deployments / smoke checks)
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Sneaker Store API. See /api/health for health check.',
  });
});

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sneaker-store';
if (!process.env.MONGODB_URI) {
  console.warn('⚠️  MONGODB_URI not set. Falling back to local MongoDB:', mongoUri);
}

mongoose
  .connect(mongoUri)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exitCode = 1;
  });

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/reviews', reviewRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Sneaker Store API is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

// Only start listening when run directly (not when imported by Vercel serverless)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

  process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Promise Rejection:', err);
    process.exit(1);
  });
}

// Export the app for Vercel serverless functions
module.exports = app;
