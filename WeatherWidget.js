import React, { useState } from 'react';

const WeatherWidget = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // This would be replaced with actual API call in production
    setTimeout(() => {
      // Mock weather data
      if (location) {
        setWeatherData({
          location: location,
          temperature: Math.floor(Math.random() * 15) + 20, // Random temp between 20-35°C
          condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Heavy Rain'][Math.floor(Math.random() * 5)],
          humidity: Math.floor(Math.random() * 30) + 50, // Random humidity between 50-80%
          windSpeed: Math.floor(Math.random() * 20) + 5, // Random wind speed between 5-25 km/h
          forecast: [
            { day: 'Today', temp: Math.floor(Math.random() * 15) + 20, condition: 'Sunny' },
            { day: 'Tomorrow', temp: Math.floor(Math.random() * 15) + 20, condition: 'Partly Cloudy' },
            { day: 'Wed', temp: Math.floor(Math.random() * 15) + 20, condition: 'Light Rain' },
          ]
        });
        setLoading(false);
      } else {
        setError('Please enter a location');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-accent text-white p-4">
        <h3 className="text-lg font-semibold">Weather Forecast</h3>
      </div>
      
      <div className="p-4">
        <form onSubmit={fetchWeather} className="flex mb-4">
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={handleLocationChange}
            className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            className="bg-accent text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition"
          >
            Check
          </button>
        </form>

        {loading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        {weatherData && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-xl font-bold text-gray-800">{weatherData.location}</h4>
                <p className="text-gray-600">{weatherData.condition}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-800">{weatherData.temperature}°C</p>
                <p className="text-gray-600">Humidity: {weatherData.humidity}%</p>
                <p className="text-gray-600">Wind: {weatherData.windSpeed} km/h</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h5 className="text-sm font-semibold text-gray-700 mb-2">3-Day Forecast</h5>
              <div className="grid grid-cols-3 gap-2">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="text-center p-2 bg-gray-50 rounded">
                    <p className="font-medium text-gray-800">{day.day}</p>
                    <p className="text-lg font-bold text-gray-800">{day.temp}°C</p>
                    <p className="text-xs text-gray-600">{day.condition}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-4 text-xs text-gray-500 text-center">
              <p>Data provided by OpenWeather API</p>
              <p>Last updated: {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
