const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const articleRoutes = require('./routes/articleRoutes');
const videoRoutes = require('./routes/videoRoutes');
const forumRoutes = require('./routes/forumRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const qrcodeRoutes = require('./routes/qrcodeRoutes');
const soilHealthRoutes = require('./routes/soilHealthRoutes');
const offlineRoutes = require('./routes/offlineRoutes');

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/qrcode', qrcodeRoutes);
app.use('/api/soil-health', soilHealthRoutes);
app.use('/api/offline', offlineRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

// Set port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;
