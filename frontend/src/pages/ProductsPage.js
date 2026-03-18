import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiX } from 'react-icons/fi';
import { getProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';

const brands = ['Nike', 'Adidas', 'Jordan', 'Puma', 'New Balance'];
const categories = ['Running', 'Basketball', 'Casual', 'Training', 'Lifestyle'];
const sizes = [7, 8, 9, 10, 11, 12];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    page: searchParams.get('page') || 1,
    brand: searchParams.get('brand') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    size: searchParams.get('size') || '',
    sort: searchParams.get('sort') || 'newest',
    search: searchParams.get('search') || '',
    featured: searchParams.get('featured') || '',
    trending: searchParams.get('trending') || '',
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      Object.keys(filters).forEach(key => {
        if (filters[key]) params[key] = filters[key];
      });

      const response = await getProducts(params);
      setProducts(response.data);
      setTotalPages(response.pages);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);
    
    const params = {};
    Object.keys(newFilters).forEach(k => {
      if (newFilters[k]) params[k] = newFilters[k];
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    const newFilters = {
      page: 1,
      brand: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      size: '',
      sort: 'newest',
      search: '',
      featured: '',
      trending: '',
    };
    setFilters(newFilters);
    setSearchParams({});
  };

  const hasActiveFilters = filters.brand || filters.category || filters.minPrice || 
                          filters.maxPrice || filters.size || filters.search;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {filters.featured ? 'Featured Products' : 
             filters.trending ? 'Trending Sneakers' : 
             filters.search ? `Search: "${filters.search}"` : 
             'All Sneakers'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {products.length} products found
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden btn-outline flex items-center gap-2"
        >
          <FiFilter /> Filters
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className={`lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <FiX /> Clear
                </button>
              )}
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Brand</h4>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.brand === brand}
                      onChange={(e) => handleFilterChange('brand', e.target.checked ? brand : '')}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Category</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.category === category}
                      onChange={(e) => handleFilterChange('category', e.target.checked ? category : '')}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Price Range</h4>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Size Filter */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Size</h4>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleFilterChange('size', filters.size === size.toString() ? '' : size.toString())}
                    className={`py-2 rounded-lg border-2 font-semibold transition-all ${
                      filters.size === size.toString()
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:border-gray-900 dark:hover:border-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort Options */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              Sort by:
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </label>
          </div>

          {loading ? (
            <Loading />
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleFilterChange('page', index + 1)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        filters.page == index + 1
                          ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                          : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No products found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
