const Article = require('../models/Article');

// @desc    Get all articles
// @route   GET /api/articles
// @access  Public
const getArticles = async (req, res) => {
  try {
    const { category, source, keyword } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (category) {
      filter.category = category;
    }
    
    if (source && source !== '') {
      filter['source.name'] = source;
    }
    
    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { content: { $regex: keyword, $options: 'i' } },
        { summary: { $regex: keyword, $options: 'i' } }
      ];
    }
    
    const articles = await Article.find(filter);
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single article
// @route   GET /api/articles/:id
// @access  Public
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create an article
// @route   POST /api/articles
// @access  Private/Admin
const createArticle = async (req, res) => {
  try {
    const { 
      title, 
      content, 
      summary, 
      source, 
      category, 
      imageUrl, 
      tags 
    } = req.body;
    
    const article = new Article({
      title,
      content,
      summary,
      source,
      category,
      imageUrl,
      tags
    });
    
    const createdArticle = await article.save();
    res.status(201).json(createdArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update an article
// @route   PUT /api/articles/:id
// @access  Private/Admin
const updateArticle = async (req, res) => {
  try {
    const { 
      title, 
      content, 
      summary, 
      source, 
      category, 
      imageUrl, 
      tags 
    } = req.body;
    
    const article = await Article.findById(req.params.id);
    
    if (article) {
      article.title = title || article.title;
      article.content = content || article.content;
      article.summary = summary || article.summary;
      article.source = source || article.source;
      article.category = category || article.category;
      article.imageUrl = imageUrl || article.imageUrl;
      article.tags = tags || article.tags;
      
      const updatedArticle = await article.save();
      res.json(updatedArticle);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete an article
// @route   DELETE /api/articles/:id
// @access  Private/Admin
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (article) {
      await article.remove();
      res.json({ message: 'Article removed' });
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get articles by category
// @route   GET /api/articles/category/:category
// @access  Public
const getArticlesByCategory = async (req, res) => {
  try {
    const articles = await Article.find({ category: req.params.category });
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticlesByCategory
};
