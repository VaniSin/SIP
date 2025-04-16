const request = require('supertest');
const app = require('../src/server');
const mongoose = require('mongoose');

// Mock middleware to bypass authentication for testing
jest.mock('../src/middleware/authMiddleware', () => ({
  protect: (req, res, next) => {
    req.user = {
      _id: '60d0fe4f5311236168a109ca',
      name: 'Test User',
      email: 'test@example.com',
      role: 'user'
    };
    next();
  },
  admin: (req, res, next) => {
    req.user.role = 'admin';
    next();
  }
}));

describe('API Routes Tests', () => {
  // Test user routes
  describe('User Routes', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          phone: '1234567890',
          preferredLanguage: 'english'
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('token');
    });
    
    it('should login a user', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });
    
    it('should get user profile', async () => {
      const res = await request(app)
        .get('/api/users/profile');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('email', 'test@example.com');
    });
  });
  
  // Test product routes
  describe('Product Routes', () => {
    it('should get all products', async () => {
      const res = await request(app)
        .get('/api/products');
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
    
    it('should filter products by category', async () => {
      const res = await request(app)
        .get('/api/products?category=seeds');
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
    
    it('should create a new product (admin)', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({
          name: 'Test Product',
          description: 'Test description',
          price: 999,
          category: 'tools',
          brand: 'Test Brand',
          supplier: 'Test Supplier',
          stock: 10
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('name', 'Test Product');
    });
  });
  
  // Test order routes
  describe('Order Routes', () => {
    it('should create a new order', async () => {
      const res = await request(app)
        .post('/api/orders')
        .send({
          orderItems: [
            {
              name: 'Test Product',
              qty: 2,
              image: 'test.jpg',
              price: 999,
              product: '60d0fe4f5311236168a109cb'
            }
          ],
          shippingAddress: {
            address: 'Test Address',
            city: 'Test City',
            postalCode: '123456',
            state: 'Test State'
          },
          paymentMethod: 'UPI',
          itemsPrice: 1998,
          taxPrice: 200,
          shippingPrice: 100,
          totalPrice: 2298
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('orderItems');
    });
    
    it('should get user orders', async () => {
      const res = await request(app)
        .get('/api/orders/myorders');
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });
  
  // Test article routes
  describe('Article Routes', () => {
    it('should get all articles', async () => {
      const res = await request(app)
        .get('/api/articles');
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
    
    it('should filter articles by category', async () => {
      const res = await request(app)
        .get('/api/articles?category=organic-farming');
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });
  
  // Test video routes
  describe('Video Routes', () => {
    it('should get all videos', async () => {
      const res = await request(app)
        .get('/api/videos');
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
    
    it('should filter videos by category', async () => {
      const res = await request(app)
        .get('/api/videos?category=irrigation');
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });
  
  // Test forum routes
  describe('Forum Routes', () => {
    it('should get all forum posts', async () => {
      const res = await request(app)
        .get('/api/forum');
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
    
    it('should create a new forum post', async () => {
      const res = await request(app)
        .post('/api/forum')
        .send({
          title: 'Test Forum Post',
          content: 'This is a test forum post content',
          tags: ['test', 'forum']
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('title', 'Test Forum Post');
    });
  });
  
  // Test recommendation routes
  describe('Recommendation Routes', () => {
    it('should get product recommendations', async () => {
      const res = await request(app)
        .get('/api/recommendations/products');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('recommendations');
    });
    
    it('should get content recommendations', async () => {
      const res = await request(app)
        .get('/api/recommendations/content');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
    });
  });
  
  // Test chatbot routes
  describe('Chatbot Routes', () => {
    it('should get chatbot response in English', async () => {
      const res = await request(app)
        .post('/api/chatbot/message')
        .send({
          message: 'Hello, how can I improve soil health?',
          language: 'english'
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('response');
    });
    
    it('should get chatbot response in Hindi', async () => {
      const res = await request(app)
        .post('/api/chatbot/message')
        .send({
          message: 'नमस्ते, मैं मिट्टी के स्वास्थ्य को कैसे सुधार सकता हूं?',
          language: 'hindi'
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('response');
    });
  });
  
  // Test QR code routes
  describe('QR Code Routes', () => {
    it('should generate QR code data for a product', async () => {
      const res = await request(app)
        .get('/api/qrcode/product/123');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('qrData');
      expect(res.body).toHaveProperty('productInfo');
    });
    
    it('should process scanned QR code data', async () => {
      const res = await request(app)
        .post('/api/qrcode/scan')
        .send({
          qrData: JSON.stringify({
            id: '123',
            name: 'Test Product',
            price: 999
          })
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
    });
  });
  
  // Test soil health routes
  describe('Soil Health Routes', () => {
    it('should analyze soil health and provide recommendations', async () => {
      const res = await request(app)
        .post('/api/soil-health/analyze')
        .send({
          ph: 6.5,
          nitrogen: 45,
          phosphorus: 30,
          potassium: 200,
          organicMatter: 3.5,
          soilType: 'loam'
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('recommendations');
      expect(res.body).toHaveProperty('soilParameters');
    });
  });
  
  // Test weather routes
  describe('Weather Routes', () => {
    it('should get weather data by location', async () => {
      const res = await request(app)
        .get('/api/weather/Mumbai');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('temperature');
      expect(res.body).toHaveProperty('condition');
    });
    
    it('should get weather forecast', async () => {
      const res = await request(app)
        .get('/api/weather/forecast/Delhi');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('forecast');
      expect(Array.isArray(res.body.forecast)).toBeTruthy();
    });
  });
  
  // Test offline routes
  describe('Offline Routes', () => {
    it('should register device for offline access', async () => {
      const res = await request(app)
        .post('/api/offline/register')
        .send({
          deviceId: 'test-device-123',
          phoneNumber: '9876543210'
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('offlineFeatures');
    });
    
    it('should get content for offline caching', async () => {
      const res = await request(app)
        .get('/api/offline/content');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('contentToCache');
      expect(res.body).toHaveProperty('offlineStrategy');
    });
  });
});

afterAll(async () => {
  // Close database connection after tests
  await mongoose.connection.close();
});
