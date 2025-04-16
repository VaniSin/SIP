const express = require('express');
const router = express.Router();
const axios = require('axios');

// @desc    Get weather data by location
// @route   GET /api/weather/:location
// @access  Public
const getWeatherByLocation = async (req, res) => {
  try {
    const { location } = req.params;
    
    // This would use a real API key in production
    const apiKey = process.env.OPENWEATHER_API_KEY || 'demo_key';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    
    // In a real implementation, this would make an actual API call
    // For demo purposes, we'll return mock data
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock weather data
    const weatherData = {
      location: location,
      temperature: Math.floor(Math.random() * 15) + 20, // Random temp between 20-35°C
      condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Heavy Rain'][Math.floor(Math.random() * 5)],
      humidity: Math.floor(Math.random() * 30) + 50, // Random humidity between 50-80%
      windSpeed: Math.floor(Math.random() * 20) + 5, // Random wind speed between 5-25 km/h
      forecast: [
        { day: 'Today', temp: Math.floor(Math.random() * 15) + 20, condition: 'Sunny' },
        { day: 'Tomorrow', temp: Math.floor(Math.random() * 15) + 20, condition: 'Partly Cloudy' },
        { day: 'Day 3', temp: Math.floor(Math.random() * 15) + 20, condition: 'Light Rain' },
        { day: 'Day 4', temp: Math.floor(Math.random() * 15) + 20, condition: 'Cloudy' },
        { day: 'Day 5', temp: Math.floor(Math.random() * 15) + 20, condition: 'Sunny' },
      ]
    };
    
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get forecast data by location
// @route   GET /api/weather/forecast/:location
// @access  Public
const getWeatherForecast = async (req, res) => {
  try {
    const { location } = req.params;
    
    // This would use a real API key in production
    const apiKey = process.env.OPENWEATHER_API_KEY || 'demo_key';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock forecast data
    const forecastData = {
      location: location,
      forecast: Array(5).fill().map((_, i) => ({
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        temperature: {
          min: Math.floor(Math.random() * 10) + 15,
          max: Math.floor(Math.random() * 10) + 25
        },
        condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Heavy Rain'][Math.floor(Math.random() * 5)],
        humidity: Math.floor(Math.random() * 30) + 50,
        windSpeed: Math.floor(Math.random() * 20) + 5,
        precipitation: Math.floor(Math.random() * 100)
      }))
    };
    
    res.json(forecastData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Routes
router.get('/:location', getWeatherByLocation);
router.get('/forecast/:location', getWeatherForecast);

module.exports = router;
