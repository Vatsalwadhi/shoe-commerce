import api from './api';

// Register user
export const register = async (userData) => {
  const response = await api.post('/users/register', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }
  return response.data;
};

// Login user
export const login = async (credentials) => {
  const response = await api.post('/users/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }
  return response.data;
};

// Logout user
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Get user profile
export const getUserProfile = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

// Update user profile
export const updateUserProfile = async (userData) => {
  const response = await api.put('/users/me', userData);
  return response.data;
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Get token
export const getToken = () => {
  return localStorage.getItem('token');
};
