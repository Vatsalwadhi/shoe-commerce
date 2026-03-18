import api from './api';

// Get wishlist
export const getWishlist = async () => {
  const response = await api.get('/wishlist');
  return response.data;
};

// Add to wishlist
export const addToWishlist = async (productId) => {
  const response = await api.post(`/wishlist/${productId}`);
  return response.data;
};

// Remove from wishlist
export const removeFromWishlist = async (productId) => {
  const response = await api.delete(`/wishlist/${productId}`);
  return response.data;
};
