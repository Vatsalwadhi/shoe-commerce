import api from './api';

// Get all products with filters
export const getProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data;
};

// Get single product
export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Create product (Admin)
export const createProduct = async (productData) => {
  const response = await api.post('/products', productData);
  return response.data;
};

// Update product (Admin)
export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

// Delete product (Admin)
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// Get brands
export const getBrands = async () => {
  const response = await api.get('/products/brands/all');
  return response.data;
};
