import api from './api';

// Get cart
export const getCart = async () => {
  const response = await api.get('/cart');
  return response.data;
};

// Add to cart
export const addToCart = async (productId, quantity, size) => {
  const response = await api.post('/cart', { productId, quantity, size });
  return response.data;
};

// Update cart item
export const updateCartItem = async (itemId, quantity) => {
  const response = await api.put(`/cart/${itemId}`, { quantity });
  return response.data;
};

// Remove from cart
export const removeFromCart = async (itemId) => {
  const response = await api.delete(`/cart/${itemId}`);
  return response.data;
};

// Clear cart
export const clearCart = async () => {
  const response = await api.delete('/cart');
  return response.data;
};
