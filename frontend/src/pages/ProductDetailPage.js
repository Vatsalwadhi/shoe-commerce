import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { getProduct } from '../services/productService';
import { getProductReviews, createReview } from '../services/reviewService';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    title: '',
    comment: '',
  });

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const [productRes, reviewsRes] = await Promise.all([
        getProduct(id),
        getProductReviews(id),
      ]);
      setProduct(productRes.data);
      setReviews(reviewsRes.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Product not found');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    try {
      await addToCart(product._id, quantity, selectedSize);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleWishlist = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to wishlist');
      navigate('/login');
      return;
    }

    try {
      if (isInWishlist(product._id)) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product._id);
      }
    } catch (error) {
      console.error('Wishlist error:', error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to write a review');
      navigate('/login');
      return;
    }

    try {
      await createReview({
        product: product._id,
        ...reviewData,
      });
      toast.success('Review submitted successfully!');
      setShowReviewForm(false);
      setReviewData({ rating: 5, title: '', comment: '' });
      fetchProductDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    }
  };

  if (loading) return <Loading />;
  if (!product) return null;

  const displayPrice = product.discount > 0 ? product.discountedPrice : product.price;
  const hasDiscount = product.discount > 0;
  const inWishlist = isInWishlist(product._id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? 'border-gray-900 dark:border-white'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
                {product.brand}
              </span>
              <div className="flex items-center gap-2">
                {product.isNewArrival && (
                  <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    New
                  </span>
                )}
                {hasDiscount && (
                  <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    -{product.discount}%
                  </span>
                )}
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <FiStar className="text-yellow-400 fill-current mr-1" />
                <span className="text-lg font-semibold">{product.rating.toFixed(1)}</span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">
                  ({product.numReviews} reviews)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {hasDiscount && (
                <span className="text-2xl text-gray-400 line-through">
                  ${product.price}
                </span>
              )}
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                ${displayPrice}
              </span>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {product.description}
          </p>

          {/* Size Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Select Size
            </label>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((sizeObj) => (
                <button
                  key={sizeObj.size}
                  onClick={() => setSelectedSize(sizeObj.size)}
                  disabled={sizeObj.stock === 0}
                  className={`py-3 rounded-lg border-2 font-semibold transition-all ${
                    selectedSize === sizeObj.size
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white'
                      : sizeObj.stock === 0
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 border-gray-300 dark:border-gray-700 cursor-not-allowed'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:border-gray-900 dark:hover:border-white'
                  }`}
                >
                  {sizeObj.size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Available Colors
            </label>
            <div className="flex gap-3">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-gray-900 dark:hover:border-white font-semibold"
              >
                -
              </button>
              <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-gray-900 dark:hover:border-white font-semibold"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button onClick={handleAddToCart} className="btn-primary flex-1 flex items-center justify-center gap-2">
              <FiShoppingCart /> Add to Cart
            </button>
            <button
              onClick={handleWishlist}
              className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-red-500 transition-colors"
            >
              {inWishlist ? (
                <FaHeart className="w-6 h-6 text-red-500" />
              ) : (
                <FiHeart className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Product Details */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Category:</span>
              <span className="font-semibold text-gray-900 dark:text-white">{product.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Brand:</span>
              <span className="font-semibold text-gray-900 dark:text-white">{product.brand}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Customer Reviews
          </h2>
          {isAuthenticated && (
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="btn-outline"
            >
              {showReviewForm ? 'Cancel' : 'Write Review'}
            </button>
          )}
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <form onSubmit={handleReviewSubmit} className="card p-6 mb-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewData({ ...reviewData, rating: star })}
                      className="text-3xl"
                    >
                      {star <= reviewData.rating ? '⭐' : '☆'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Title</label>
                <input
                  type="text"
                  value={reviewData.title}
                  onChange={(e) => setReviewData({ ...reviewData, title: e.target.value })}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Review</label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                  required
                  rows="4"
                  className="input-field"
                />
              </div>
              <button type="submit" className="btn-primary">
                Submit Review
              </button>
            </div>
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="card p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold">
                      {review.user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {review.user?.name}
                      </h4>
                      <div className="flex items-center gap-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>{i < review.rating ? '⭐' : '☆'}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {review.title}
                </h5>
                <p className="text-gray-600 dark:text-gray-400">
                  {review.comment}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400 py-8">
              No reviews yet. Be the first to review this product!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
