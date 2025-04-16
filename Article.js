const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  source: {
    name: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  category: {
    type: String,
    required: true,
    enum: ['sustainable', 'organic', 'technology', 'business', 'policy', 'other']
  },
  imageUrl: {
    type: String
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
