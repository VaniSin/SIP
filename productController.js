const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { category, supplier, brand, keyword, min, max } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (category) {
      filter.category = category;
    }
    
    if (supplier) {
      filter.supplier = supplier;
    }
    
    if (brand) {
      filter.brand = brand;
    }
    
    if (keyword) {
      filter.name = { $regex: keyword, $options: 'i' };
    }
    
    // Price range filter
    if (min && max) {
      filter.price = { $gte: min, $lte: max };
    } else if (min) {
      filter.price = { $gte: min };
    } else if (max) {
      filter.price = { $lte: max };
    }
    
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const { 
      name, 
      description, 
      price, 
      category, 
      brand, 
      supplier, 
      supplierLink, 
      imageUrl, 
      stock 
    } = req.body;
    
    const product = new Product({
      name,
      description,
      price,
      category,
      brand,
      supplier,
      supplierLink,
      imageUrl,
      stock,
      user: req.user._id
    });
    
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const { 
      name, 
      description, 
      price, 
      category, 
      brand, 
      supplier, 
      supplierLink, 
      imageUrl, 
      stock 
    } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.supplier = supplier || product.supplier;
      product.supplierLink = supplierLink || product.supplierLink;
      product.imageUrl = imageUrl || product.imageUrl;
      product.stock = stock !== undefined ? stock : product.stock;
      
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (product) {
      await product.remove();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (product) {
      // Check if user already reviewed this product
      const alreadyReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
      );
      
      if (alreadyReviewed) {
        return res.status(400).json({ message: 'Product already reviewed' });
      }
      
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
      };
      
      product.reviews.push(review);
      
      product.numReviews = product.reviews.length;
      
      product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
      
      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(5);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get products by supplier
// @route   GET /api/products/supplier/:supplier
// @access  Public
const getProductsBySupplier = async (req, res) => {
  try {
    const products = await Product.find({ supplier: req.params.supplier });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
  getProductsBySupplier
};
