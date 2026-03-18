import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTrendingUp } from 'react-icons/fi';
import { getProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';

const brands = [
  { name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
  { name: 'Adidas', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
  { name: 'Jordan', logo: 'https://upload.wikimedia.org/wikipedia/en/3/37/Jumpman_logo.svg' },
  { name: 'Puma', logo: 'https://upload.wikimedia.org/wikipedia/en/4/49/Puma_logo.svg' },
  { name: 'New Balance', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/New_Balance_logo.svg' },
];

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const [featured, trending] = await Promise.all([
        getProducts({ featured: true, limit: 4 }),
        getProducts({ trending: true, limit: 6 }),
      ]);
      setFeaturedProducts(featured.data);
      setTrendingProducts(trending.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thanks for subscribing!');
      setEmail('');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="animate-fade-in">
      {/* Hero Banner */}
      <section className="relative h-[600px] bg-gradient-to-r from-gray-900 via-gray-800 to-black dark:from-black dark:via-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556906781-9cba4a952fb0?w=1600')] bg-cover bg-center opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Step Into
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                The Future
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover the latest drops from Nike, Adidas, Jordan, and more. Premium sneakers at unbeatable prices.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary">
                Shop Now <FiArrowRight className="inline ml-2" />
              </Link>
              <Link to="/products?featured=true" className="btn-secondary">
                View Featured
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Featured Collection
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Curated selection of our best sneakers
            </p>
          </div>
          <Link to="/products?featured=true" className="btn-outline hidden md:block">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Popular Brands
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                to={`/products?brand=${brand.name}`}
                className="flex items-center justify-center p-8 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-12 object-contain filter dark:invert opacity-80 hover:opacity-100 transition-opacity"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Sneakers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FiTrendingUp className="text-3xl text-red-500" />
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Trending Now
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                What's hot right now
              </p>
            </div>
          </div>
          <Link to="/products?trending=true" className="btn-outline hidden md:block">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Running', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600' },
            { name: 'Basketball', image: 'https://images.unsplash.com/photo-1608667508764-33cf0726b13a?w=600' },
            { name: 'Lifestyle', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600' },
          ].map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${category.name}`}
              className="relative h-64 rounded-xl overflow-hidden group"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-3xl font-bold text-white">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Subscribe to get exclusive drops, special offers, and sneaker news delivered to your inbox.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button type="submit" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Free Shipping
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              On all orders over $100
            </p>
          </div>
          <div className="p-6">
            <div className="text-4xl mb-4">✓</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              100% Authentic
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              All products are genuine
            </p>
          </div>
          <div className="p-6">
            <div className="text-4xl mb-4">↺</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Easy Returns
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              30-day return policy
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
