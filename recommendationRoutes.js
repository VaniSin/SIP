const express = require('express');
const router = express.Router();
const { 
  getProductRecommendations,
  getContentRecommendations,
  getPersonalizedRecommendations
} = require('../controllers/recommendationController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/recommendations/products
// @desc    Get product recommendations for a user
// @access  Private
router.get('/products', protect, getProductRecommendations);

// @route   GET /api/recommendations/content
// @desc    Get content recommendations (articles and videos)
// @access  Private
router.get('/content', protect, getContentRecommendations);

// @route   POST /api/recommendations/personalized
// @desc    Get personalized recommendations based on browsing history
// @access  Private
router.post('/personalized', protect, getPersonalizedRecommendations);

module.exports = router;
