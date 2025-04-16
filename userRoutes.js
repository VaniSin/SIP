const express = require('express');
const router = express.Router();
const { 
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  addBookmark,
  removeBookmark
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   POST /api/users
// @desc    Register a new user
// @access  Public
router.post('/', registerUser);

// @route   POST /api/users/login
// @desc    Auth user & get token
// @access  Public
router.post('/login', loginUser);

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, getUserProfile);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, updateUserProfile);

// @route   GET /api/users
// @desc    Get all users
// @access  Private/Admin
router.get('/', protect, admin, getUsers);

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteUser);

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private/Admin
router.get('/:id', protect, admin, getUserById);

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Private/Admin
router.put('/:id', protect, admin, updateUser);

// @route   POST /api/users/bookmarks
// @desc    Add bookmark
// @access  Private
router.post('/bookmarks', protect, addBookmark);

// @route   DELETE /api/users/bookmarks/:id
// @desc    Remove bookmark
// @access  Private
router.delete('/bookmarks/:id', protect, removeBookmark);

module.exports = router;
