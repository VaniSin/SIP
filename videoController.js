const Video = require('../models/Video');

// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
const getVideos = async (req, res) => {
  try {
    const { category, channel, keyword } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (category) {
      filter.category = category;
    }
    
    if (channel) {
      filter.channelName = channel;
    }
    
    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ];
    }
    
    const videos = await Video.find(filter);
    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single video
// @route   GET /api/videos/:id
// @access  Public
const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (video) {
      res.json(video);
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a video
// @route   POST /api/videos
// @access  Private/Admin
const createVideo = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      youtubeId, 
      channelName, 
      channelUrl, 
      category, 
      thumbnailUrl, 
      tags,
      duration
    } = req.body;
    
    const video = new Video({
      title,
      description,
      youtubeId,
      channelName,
      channelUrl,
      category,
      thumbnailUrl,
      tags,
      duration
    });
    
    const createdVideo = await video.save();
    res.status(201).json(createdVideo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a video
// @route   PUT /api/videos/:id
// @access  Private/Admin
const updateVideo = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      youtubeId, 
      channelName, 
      channelUrl, 
      category, 
      thumbnailUrl, 
      tags,
      duration
    } = req.body;
    
    const video = await Video.findById(req.params.id);
    
    if (video) {
      video.title = title || video.title;
      video.description = description || video.description;
      video.youtubeId = youtubeId || video.youtubeId;
      video.channelName = channelName || video.channelName;
      video.channelUrl = channelUrl || video.channelUrl;
      video.category = category || video.category;
      video.thumbnailUrl = thumbnailUrl || video.thumbnailUrl;
      video.tags = tags || video.tags;
      video.duration = duration || video.duration;
      
      const updatedVideo = await video.save();
      res.json(updatedVideo);
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a video
// @route   DELETE /api/videos/:id
// @access  Private/Admin
const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (video) {
      await video.remove();
      res.json({ message: 'Video removed' });
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get videos by category
// @route   GET /api/videos/category/:category
// @access  Public
const getVideosByCategory = async (req, res) => {
  try {
    const videos = await Video.find({ category: req.params.category });
    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get videos by channel
// @route   GET /api/videos/channel/:channelName
// @access  Public
const getVideosByChannel = async (req, res) => {
  try {
    const videos = await Video.find({ channelName: req.params.channelName });
    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  getVideosByCategory,
  getVideosByChannel
};
