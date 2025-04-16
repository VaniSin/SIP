const express = require('express');
const router = express.Router();
const { 
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addComment,
  likePost
} = require('../controllers/forumController');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   GET /api/forum
// @desc    Get all forum posts
// @access  Public
router.get('/', getPosts);

// @route   POST /api/forum
// @desc    Create a forum post
// @access  Private
router.post('/', protect, createPost);

// @route   GET /api/forum/:id
// @desc    Get single forum post
// @access  Public
router.get('/:id', getPostById);

// @route   PUT /api/forum/:id
// @desc    Update a forum post
// @access  Private
router.put('/:id', protect, updatePost);

// @route   DELETE /api/forum/:id
// @desc    Delete a forum post
// @access  Private
router.delete('/:id', protect, deletePost);

// @route   POST /api/forum/:id/comments
// @desc    Add comment to forum post
// @access  Private
router.post('/:id/comments', protect, addComment);

// @route   PUT /api/forum/:id/like
// @desc    Like a forum post
// @access  Private
router.put('/:id/like', protect, likePost);

module.exports = router;
