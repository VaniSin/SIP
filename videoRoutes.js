const express = require('express');
const router = express.Router();
const { 
  getVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  getVideosByCategory,
  getVideosByChannel
} = require('../controllers/videoController');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   GET /api/videos/category/:category
// @desc    Get videos by category
// @access  Public
router.get('/category/:category', getVideosByCategory);

// @route   GET /api/videos/channel/:channelName
// @desc    Get videos by channel
// @access  Public
router.get('/channel/:channelName', getVideosByChannel);

// @route   GET /api/videos
// @desc    Get all videos
// @access  Public
router.get('/', getVideos);

// @route   POST /api/videos
// @desc    Create a video
// @access  Private/Admin
router.post('/', protect, admin, createVideo);

// @route   GET /api/videos/:id
// @desc    Get single video
// @access  Public
router.get('/:id', getVideoById);

// @route   PUT /api/videos/:id
// @desc    Update a video
// @access  Private/Admin
router.put('/:id', protect, admin, updateVideo);

// @route   DELETE /api/videos/:id
// @desc    Delete a video
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteVideo);

module.exports = router;
