import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
          <span className="bg-secondary text-white text-xs font-bold px-2 py-1 rounded">
            {product.supplier}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-2">{product.category}</p>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i}
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current'}`} 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
                />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.numReviews})</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-primary font-bold">₹{product.price.toFixed(2)}</p>
          <div className="flex space-x-2">
            <button className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-opacity-90 transition">
              Add to Cart
            </button>
            <button className="bg-gray-200 p-1 rounded hover:bg-gray-300 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          <a href={product.supplierLink} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            View on {product.supplier} →
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
