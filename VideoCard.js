import React from 'react';

const VideoCard = ({ video }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="bg-primary bg-opacity-80 text-white rounded-full p-3 hover:bg-opacity-100 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{video.title}</h3>
          <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded">
            {video.category}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{video.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Channel: {video.channelName}</span>
          <div className="flex space-x-2">
            <button className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-opacity-90 transition">
              Watch
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

export default VideoCard;
