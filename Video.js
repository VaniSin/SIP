const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  youtubeId: {
    type: String,
    required: true
  },
  channelName: {
    type: String,
    required: true
  },
  channelUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['organic', 'mechanization', 'hydroponics', 'sustainable', 'business', 'other']
  },
  thumbnailUrl: {
    type: String,
    required: true
  },
  tags: [String],
  duration: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
