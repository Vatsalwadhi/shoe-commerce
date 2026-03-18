import api from './api';

// Create order
export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

// Get user orders
export const getUserOrders = async () => {
  const response = await api.get('/orders/myorders');
  return response.data;
};

// Get order by ID
export const getOrder = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

// Update order to paid
export const payOrder = async (id, paymentResult) => {
  const response = await api.put(`/orders/${id}/pay`, paymentResult);
  return response.data;
};

// Get all orders (Admin)
export const getAllOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

// Update order to delivered (Admin)
export const deliverOrder = async (id) => {
  const response = await api.put(`/orders/${id}/deliver`);
  return response.data;
};
