const express = require('express');
const router = express.Router();

// @desc    Generate QR code data for a product
// @route   GET /api/qrcode/product/:id
// @access  Public
const generateProductQRCode = async (req, res) => {
  try {
    const { id } = req.params;
    
    // In a real implementation, this would fetch the product from the database
    // For demo purposes, we'll create mock product data
    
    const productData = {
      id,
      name: `Sample Product ${id}`,
      description: 'This is a sample product description for QR code generation',
      price: Math.floor(Math.random() * 5000) + 500,
      supplier: ['Jai Hind Kishan Tools', 'Agrimart', 'BigHaat', 'RajAgro'][Math.floor(Math.random() * 4)],
      category: ['tools', 'seeds', 'fertilizers', 'pesticides', 'irrigation'][Math.floor(Math.random() * 5)],
      url: `https://growsmart.com/product/${id}`
    };
    
    // Return the data that would be encoded in the QR code
    res.json({
      success: true,
      qrData: JSON.stringify(productData),
      productInfo: productData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Process scanned QR code data
// @route   POST /api/qrcode/scan
// @access  Public
const processScannedQRCode = async (req, res) => {
  try {
    const { qrData } = req.body;
    
    if (!qrData) {
      return res.status(400).json({ message: 'No QR code data provided' });
    }
    
    // In a real implementation, this would validate and process the QR code data
    // For demo purposes, we'll just parse and return the data
    
    try {
      const parsedData = JSON.parse(qrData);
      
      res.json({
        success: true,
        message: 'QR code scanned successfully',
        data: parsedData
      });
    } catch (parseError) {
      res.status(400).json({ message: 'Invalid QR code data format' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Routes
router.get('/product/:id', generateProductQRCode);
router.post('/scan', processScannedQRCode);

module.exports = router;
