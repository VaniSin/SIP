import React, { useState } from 'react';

const LearningResourcesFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    type: 'all',
    category: '',
    source: ''
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
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Resources</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Resource Type
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                const updatedFilters = { ...filters, type: 'all' };
                setFilters(updatedFilters);
                onFilterChange(updatedFilters);
              }}
              className={`px-3 py-1 rounded text-sm ${
                filters.type === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition`}
            >
              All
            </button>
            <button
              onClick={() => {
                const updatedFilters = { ...filters, type: 'articles' };
                setFilters(updatedFilters);
                onFilterChange(updatedFilters);
              }}
              className={`px-3 py-1 rounded text-sm ${
                filters.type === 'articles' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition`}
            >
              Articles
            </button>
            <button
              onClick={() => {
                const updatedFilters = { ...filters, type: 'videos' };
                setFilters(updatedFilters);
                onFilterChange(updatedFilters);
              }}
              className={`px-3 py-1 rounded text-sm ${
                filters.type === 'videos' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition`}
            >
              Videos
            </button>
          </div>
        </div>

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
            <option value="sustainable">Sustainable Farming</option>
            <option value="organic">Organic Farming</option>
            <option value="technology">Agricultural Technology</option>
            <option value="mechanization">Mechanization</option>
            <option value="hydroponics">Hydroponics</option>
            <option value="business">Business & Marketing</option>
            <option value="policy">Policy & Regulations</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
            Source
          </label>
          <select
            id="source"
            name="source"
            value={filters.source}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Sources</option>
            <option value="FarmRaise">FarmRaise</option>
            <option value="World Economic Forum">World Economic Forum</option>
            <option value="AP News">AP News</option>
            <option value="Indian Farmer">Indian Farmer</option>
            <option value="Farming Leader">Farming Leader</option>
            <option value="Indian Farming Technology">Indian Farming Technology</option>
          </select>
        </div>

        <button 
          onClick={() => {
            setFilters({
              type: 'all',
              category: '',
              source: ''
            });
            onFilterChange({
              type: 'all',
              category: '',
              source: ''
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

export default LearningResourcesFilter;
