import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/orderService';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
  });

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  const handleInputChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderItems = cart.items.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        size: item.size,
        price: item.product.discountedPrice || item.product.price,
        image: item.product.images[0],
      }));

      const orderData = {
        orderItems,
        shippingAddress,
        paymentMethod: 'Stripe',
        taxPrice: parseFloat(tax.toFixed(2)),
        shippingPrice: parseFloat(shipping.toFixed(2)),
        totalPrice: parseFloat(total.toFixed(2)),
      };

      const response = await createOrder(orderData);
      
      // Mock payment success
      toast.success('Order placed successfully!');
      await clearCart();
      navigate(`/orders`);
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error(error.response?.data?.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  if (!cart.items || cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Shipping Address */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="street"
                    required
                    value={shippingAddress.street}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="123 Main St"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={shippingAddress.city}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={shippingAddress.state}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="NY"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      value={shippingAddress.zipCode}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="10001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={shippingAddress.country}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="USA"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Payment Method
              </h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    defaultChecked
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-3 font-semibold">Credit Card (Stripe)</span>
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-7">
                  Mock payment integration - Order will be placed without actual payment
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-20">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Order Summary
            </h2>

            {/* Order Items */}
            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {cart.items.map((item) => (
                <div key={item._id} className="flex gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Size: {item.size} • Qty: {item.quantity}
                    </p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      ${(item.product.discountedPrice || item.product.price) * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
