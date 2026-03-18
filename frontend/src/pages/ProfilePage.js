import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, updateUserProfile } from '../services/authService';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getUserProfile();
      const userData = response.data;
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        shippingAddress: userData.shippingAddress || {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
        },
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        shippingAddress: {
          ...formData.shippingAddress,
          [addressField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const response = await updateUserProfile(formData);
      setUser(response.data);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
        My Profile
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info Card */}
        <div className="lg:col-span-1">
          <div className="card p-6 text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white text-3xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {user?.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{user?.email}</p>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
              user?.role === 'admin' 
                ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' 
                : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
            }`}>
              {user?.role === 'admin' ? 'Admin' : 'Customer'}
            </span>
          </div>
        </div>

        {/* Update Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="card p-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Personal Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Shipping Address
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Street</label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.shippingAddress.street}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">City</label>
                    <input
                      type="text"
                      name="address.city"
                      value={formData.shippingAddress.city}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">State</label>
                    <input
                      type="text"
                      name="address.state"
                      value={formData.shippingAddress.state}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Zip Code</label>
                    <input
                      type="text"
                      name="address.zipCode"
                      value={formData.shippingAddress.zipCode}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Country</label>
                    <input
                      type="text"
                      name="address.country"
                      value={formData.shippingAddress.country}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" disabled={updating} className="btn-primary w-full">
              {updating ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
