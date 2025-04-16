const express = require('express');
const router = express.Router();
const { 
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
  getProductsBySupplier
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   GET /api/products/top
// @desc    Get top rated products
// @access  Public
router.get('/top', getTopProducts);

// @route   GET /api/products/supplier/:supplier
// @desc    Get products by supplier
// @access  Public
router.get('/supplier/:supplier', getProductsBySupplier);

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', getProducts);

// @route   POST /api/products
// @desc    Create a product
// @access  Private/Admin
router.post('/', protect, admin, createProduct);

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', getProductById);

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private/Admin
router.put('/:id', protect, admin, updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteProduct);

// @route   POST /api/products/:id/reviews
// @desc    Create new review
// @access  Private
router.post('/:id/reviews', protect, createProductReview);

module.exports = router;
