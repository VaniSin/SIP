import React from 'react';

const ArticleCard = ({ article }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {article.imageUrl && (
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{article.title}</h3>
          <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded">
            {article.category}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{article.summary}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Source: {article.source.name}</span>
          <div className="flex space-x-2">
            <button className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-opacity-90 transition">
              Read More
            </button>
            <button className="bg-gray-200 p-1 rounded hover:bg-gray-300 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
