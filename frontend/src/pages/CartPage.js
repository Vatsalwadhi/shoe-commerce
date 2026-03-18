import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import Loading from '../components/Loading';

const CartPage = () => {
  const { cart, loading, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(itemId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await removeFromCart(itemId);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (loading) return <Loading />;

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <FiShoppingBag className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Start shopping to add items to your cart
          </p>
          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Shopping Cart ({cart.items.length} items)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div key={item._id} className="card p-4 flex gap-4">
              <Link
                to={`/products/${item.product._id}`}
                className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <Link
                  to={`/products/${item.product._id}`}
                  className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {item.product.name}
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {item.product.brand} • Size: {item.size}
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">
                  ${item.product.discountedPrice || item.product.price}
                </p>
              </div>

              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                    className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                    className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-20">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {subtotal < 100 && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Add ${(100 - subtotal).toFixed(2)} more to get free shipping!
              </p>
            )}

            <button
              onClick={() => navigate('/checkout')}
              className="btn-primary w-full mb-3"
            >
              Proceed to Checkout
            </button>
            <Link
              to="/products"
              className="block text-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
