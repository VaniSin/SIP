import React, { useState } from 'react';

const ProductFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    brand: '',
    supplier: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = {
      ...filters,
      [name]: value
    };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Products</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Categories</option>
            <option value="tools">Tools</option>
            <option value="seeds">Seeds</option>
            <option value="fertilizers">Fertilizers</option>
            <option value="pesticides">Pesticides</option>
            <option value="irrigation">Irrigation</option>
            <option value="machinery">Machinery</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
            Price Range
          </label>
          <select
            id="priceRange"
            name="priceRange"
            value={filters.priceRange}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Prices</option>
            <option value="0-500">₹0 - ₹500</option>
            <option value="500-1000">₹500 - ₹1,000</option>
            <option value="1000-5000">₹1,000 - ₹5,000</option>
            <option value="5000-10000">₹5,000 - ₹10,000</option>
            <option value="10000+">₹10,000+</option>
          </select>
        </div>

        <div>
          <label htmlFor="supplier" className="block text-sm font-medium text-gray-700 mb-1">
            Supplier
          </label>
          <select
            id="supplier"
            name="supplier"
            value={filters.supplier}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Suppliers</option>
            <option value="Jai Hind Kishan Tools">Jai Hind Kishan Tools</option>
            <option value="Agrimart">Agrimart</option>
            <option value="BigHaat">BigHaat</option>
            <option value="RajAgro">RajAgro</option>
          </select>
        </div>

        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={filters.brand}
            onChange={handleFilterChange}
            placeholder="Search by brand"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button 
          onClick={() => {
            setFilters({
              category: '',
              priceRange: '',
              brand: '',
              supplier: ''
            });
            onFilterChange({
              category: '',
              priceRange: '',
              brand: '',
              supplier: ''
            });
          }}
          className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
