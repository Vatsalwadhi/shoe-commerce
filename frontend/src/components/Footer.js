import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              SneakerHub
            </h3>
            <p className="text-gray-400">
              Your destination for premium sneakers from top brands. Authentic quality, latest styles.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/products?featured=true" className="text-gray-400 hover:text-white transition-colors">Featured</Link></li>
              <li><Link to="/products?trending=true" className="text-gray-400 hover:text-white transition-colors">Trending</Link></li>
              <li><Link to="/products?sort=newest" className="text-gray-400 hover:text-white transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Brands</h4>
            <ul className="space-y-2">
              <li><Link to="/products?brand=Nike" className="text-gray-400 hover:text-white transition-colors">Nike</Link></li>
              <li><Link to="/products?brand=Adidas" className="text-gray-400 hover:text-white transition-colors">Adidas</Link></li>
              <li><Link to="/products?brand=Jordan" className="text-gray-400 hover:text-white transition-colors">Jordan</Link></li>
              <li><Link to="/products?brand=Puma" className="text-gray-400 hover:text-white transition-colors">Puma</Link></li>
              <li><Link to="/products?brand=New Balance" className="text-gray-400 hover:text-white transition-colors">New Balance</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">Subscribe to get special offers and latest drops.</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SneakerHub. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
