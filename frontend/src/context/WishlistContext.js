import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import * as wishlistService from '../services/wishlistService';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState({ products: [] });
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    } else {
      setWishlist({ products: [] });
    }
  }, [isAuthenticated]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await wishlistService.getWishlist();
      setWishlist(response.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const response = await wishlistService.addToWishlist(productId);
      setWishlist(response.data);
      toast.success('Added to wishlist!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to wishlist');
      throw error;
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await wishlistService.removeFromWishlist(productId);
      setWishlist(response.data);
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove from wishlist');
      throw error;
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.products?.some(product => product._id === productId);
  };

  const value = {
    wishlist,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    refreshWishlist: fetchWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
