const mongoose = require('mongoose');

const forumPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [
    {
      content: {
        type: String,
        required: true
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ForumPost = mongoose.model('ForumPost', forumPostSchema);

module.exports = ForumPost;
