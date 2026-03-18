import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(product._id);

  const handleWishlist = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    
    try {
      if (inWishlist) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product._id);
      }
    } catch (error) {
      console.error('Wishlist error:', error);
    }
  };

  const displayPrice = product.discount > 0 ? product.discountedPrice : product.price;
  const hasDiscount = product.discount > 0;

  return (
    <Link to={`/products/${product._id}`} className="product-card">
      <div className="relative">
        <div className="image-zoom aspect-w-1 aspect-h-1">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-64 object-cover"
            loading="lazy"
          />
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.isNewArrival && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              New
            </span>
          )}
          {hasDiscount && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        {isAuthenticated && (
          <button
            onClick={handleWishlist}
            className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform z-10"
          >
            {inWishlist ? (
              <FaHeart className="w-5 h-5 text-red-500" />
            ) : (
              <FiHeart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        )}
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
            {product.brand}
          </span>
          <div className="flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          {hasDiscount && (
            <span className="text-gray-400 line-through text-sm">
              ${product.price}
            </span>
          )}
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ${displayPrice}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {product.colors.slice(0, 3).map((color, index) => (
            <div
              key={index}
              className="w-4 h-4 rounded-full border-2 border-gray-300"
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            />
          ))}
          {product.colors.length > 3 && (
            <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
