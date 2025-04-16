const ForumPost = require('../models/ForumPost');
const User = require('../models/User');

// @desc    Get all forum posts
// @route   GET /api/forum
// @access  Public
const getPosts = async (req, res) => {
  try {
    const posts = await ForumPost.find({})
      .populate('author', 'name')
      .populate('comments.author', 'name')
      .sort({ createdAt: -1 });
    
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single forum post
// @route   GET /api/forum/:id
// @access  Public
const getPostById = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id)
      .populate('author', 'name')
      .populate('comments.author', 'name');
    
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a forum post
// @route   POST /api/forum
// @access  Private
const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    
    const post = new ForumPost({
      title,
      content,
      author: req.user._id,
      tags: tags || []
    });
    
    const createdPost = await post.save();
    
    // Populate author information
    await createdPost.populate('author', 'name');
    
    res.status(201).json(createdPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a forum post
// @route   PUT /api/forum/:id
// @access  Private
const updatePost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    
    const post = await ForumPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if user is the author of the post
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to update this post' });
    }
    
    post.title = title || post.title;
    post.content = content || post.content;
    post.tags = tags || post.tags;
    
    const updatedPost = await post.save();
    
    // Populate author information
    await updatedPost.populate('author', 'name');
    await updatedPost.populate('comments.author', 'name');
    
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a forum post
// @route   DELETE /api/forum/:id
// @access  Private
const deletePost = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if user is the author of the post
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to delete this post' });
    }
    
    await post.remove();
    res.json({ message: 'Post removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add comment to forum post
// @route   POST /api/forum/:id/comments
// @access  Private
const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    
    const post = await ForumPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const comment = {
      content,
      author: req.user._id
    };
    
    post.comments.push(comment);
    
    await post.save();
    
    // Populate author information
    await post.populate('author', 'name');
    await post.populate('comments.author', 'name');
    
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Like a forum post
// @route   PUT /api/forum/:id/like
// @access  Private
const likePost = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Increment likes
    post.likes += 1;
    
    await post.save();
    
    res.json({ likes: post.likes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addComment,
  likePost
};
