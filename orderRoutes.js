const express = require('express');
const router = express.Router();
const { 
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', protect, addOrderItems);

// @route   GET /api/orders/myorders
// @desc    Get logged in user orders
// @access  Private
router.get('/myorders', protect, getMyOrders);

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', protect, getOrderById);

// @route   PUT /api/orders/:id/pay
// @desc    Update order to paid
// @access  Private
router.put('/:id/pay', protect, updateOrderToPaid);

// @route   PUT /api/orders/:id/deliver
// @desc    Update order to delivered
// @access  Private/Admin
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

// @route   GET /api/orders
// @desc    Get all orders
// @access  Private/Admin
router.get('/', protect, admin, getOrders);

module.exports = router;
