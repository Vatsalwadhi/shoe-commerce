import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiShoppingCart, FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import { getAllOrders } from '../../services/orderService';
import { getProducts } from '../../services/productService';
import Loading from '../../components/Loading';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [ordersRes, productsRes] = await Promise.all([
        getAllOrders(),
        getProducts({ limit: 100 }),
      ]);

      const orders = ordersRes.data;
      const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
      const pendingOrders = orders.filter(order => order.status === 'Processing').length;

      setStats({
        totalOrders: orders.length,
        totalRevenue,
        totalProducts: productsRes.total,
        pendingOrders,
      });

      setRecentOrders(orders.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Admin Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalOrders}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <FiShoppingCart className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                ${stats.totalRevenue.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <FiDollarSign className="w-6 h-6 text-green-600 dark:text-green-300" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Products</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalProducts}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <FiPackage className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending Orders</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.pendingOrders}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
              <FiTrendingUp className="w-6 h-6 text-yellow-600 dark:text-yellow-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link to="/admin/products" className="card p-6 hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Manage Products
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Add, edit, or remove products from your inventory
          </p>
        </Link>

        <Link to="/admin/orders" className="card p-6 hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Manage Orders
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            View and update order statuses
          </p>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="card p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Recent Orders
        </h2>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order._id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Order #{order._id.slice(-6).toUpperCase()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 dark:text-white">
                  ${order.totalPrice.toFixed(2)}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  order.status === 'Delivered'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
