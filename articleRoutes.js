const express = require('express');
const router = express.Router();
const { 
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticlesByCategory
} = require('../controllers/articleController');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   GET /api/articles/category/:category
// @desc    Get articles by category
// @access  Public
router.get('/category/:category', getArticlesByCategory);

// @route   GET /api/articles
// @desc    Get all articles
// @access  Public
router.get('/', getArticles);

// @route   POST /api/articles
// @desc    Create an article
// @access  Private/Admin
router.post('/', protect, admin, createArticle);

// @route   GET /api/articles/:id
// @desc    Get single article
// @access  Public
router.get('/:id', getArticleById);

// @route   PUT /api/articles/:id
// @desc    Update an article
// @access  Private/Admin
router.put('/:id', protect, admin, updateArticle);

// @route   DELETE /api/articles/:id
// @desc    Delete an article
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteArticle);

module.exports = router;
