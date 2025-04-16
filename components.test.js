const { render, screen, fireEvent, waitFor } = require('@testing-library/react');
const React = require('react');
const { BrowserRouter } = require('react-router-dom');
const Header = require('../src/components/common/Header');
const ProductCard = require('../src/components/marketplace/ProductCard');
const SearchBar = require('../src/components/marketplace/SearchBar');
const ShoppingCart = require('../src/components/marketplace/ShoppingCart');
const Chatbot = require('../src/components/features/Chatbot');
const WeatherWidget = require('../src/components/features/WeatherWidget');
const SoilHealthTool = require('../src/components/features/SoilHealthTool');
const QRCodeGenerator = require('../src/components/features/QRCodeGenerator');

// Mock context providers
jest.mock('../src/context/AuthContext', () => ({
  useAuth: () => ({
    user: { name: 'Test User', preferredLanguage: 'english' },
    isAuthenticated: true,
    login: jest.fn(),
    logout: jest.fn()
  })
}));

jest.mock('../src/context/CartContext', () => ({
  useCart: () => ({
    cartItems: [
      {
        id: '1',
        name: 'Test Product',
        price: 999,
        quantity: 2,
        image: 'test.jpg'
      }
    ],
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
    cartTotal: 1998
  })
}));

describe('Frontend Component Tests', () => {
  // Test Header component
  describe('Header Component', () => {
    it('renders header with navigation links', () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
      
      expect(screen.getByText('Grow Smart')).toBeInTheDocument();
      expect(screen.getByText('Marketplace')).toBeInTheDocument();
      expect(screen.getByText('Learning')).toBeInTheDocument();
    });
    
    it('shows user name when logged in', () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
      
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });
    
    it('allows language switching', async () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
      
      const languageSelector = screen.getByLabelText('Language');
      fireEvent.change(languageSelector, { target: { value: 'hindi' } });
      
      await waitFor(() => {
        expect(languageSelector.value).toBe('hindi');
      });
    });
  });
  
  // Test ProductCard component
  describe('ProductCard Component', () => {
    const mockProduct = {
      id: '1',
      name: 'Test Product',
      price: 999,
      description: 'Test description',
      supplier: 'Test Supplier',
      category: 'tools',
      image: 'test.jpg',
      rating: 4.5,
      numReviews: 10
    };
    
    it('renders product information correctly', () => {
      render(<ProductCard product={mockProduct} />);
      
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('₹999')).toBeInTheDocument();
      expect(screen.getByText('Test Supplier')).toBeInTheDocument();
    });
    
    it('has add to cart button', () => {
      render(<ProductCard product={mockProduct} />);
      
      expect(screen.getByText('Add to Cart')).toBeInTheDocument();
    });
    
    it('shows rating', () => {
      render(<ProductCard product={mockProduct} />);
      
      expect(screen.getByText('4.5')).toBeInTheDocument();
      expect(screen.getByText('(10 reviews)')).toBeInTheDocument();
    });
  });
  
  // Test SearchBar component
  describe('SearchBar Component', () => {
    it('renders search input', () => {
      render(<SearchBar />);
      
      expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
    });
    
    it('allows input and triggers search', async () => {
      const mockOnSearch = jest.fn();
      render(<SearchBar onSearch={mockOnSearch} />);
      
      const searchInput = screen.getByPlaceholderText('Search products...');
      fireEvent.change(searchInput, { target: { value: 'seeds' } });
      fireEvent.submit(searchInput);
      
      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith('seeds');
      });
    });
  });
  
  // Test ShoppingCart component
  describe('ShoppingCart Component', () => {
    it('renders cart items', () => {
      render(<ShoppingCart />);
      
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('₹999 x 2')).toBeInTheDocument();
    });
    
    it('shows cart total', () => {
      render(<ShoppingCart />);
      
      expect(screen.getByText('₹1998')).toBeInTheDocument();
    });
    
    it('has checkout button', () => {
      render(<ShoppingCart />);
      
      expect(screen.getByText('Proceed to Checkout')).toBeInTheDocument();
    });
  });
  
  // Test Chatbot component
  describe('Chatbot Component', () => {
    it('renders chatbot interface', () => {
      render(<Chatbot />);
      
      expect(screen.getByText('Farming Assistant')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Type your question here...')).toBeInTheDocument();
    });
    
    it('allows language selection', async () => {
      render(<Chatbot />);
      
      const languageSelector = screen.getByRole('combobox');
      fireEvent.change(languageSelector, { target: { value: 'hindi' } });
      
      await waitFor(() => {
        expect(languageSelector.value).toBe('hindi');
        expect(screen.getByPlaceholderText('अपना प्रश्न यहां टाइप करें...')).toBeInTheDocument();
      });
    });
    
    it('sends messages and displays responses', async () => {
      render(<Chatbot />);
      
      const inputField = screen.getByPlaceholderText('Type your question here...');
      const sendButton = screen.getByRole('button');
      
      fireEvent.change(inputField, { target: { value: 'How can I improve soil health?' } });
      fireEvent.click(sendButton);
      
      await waitFor(() => {
        expect(screen.getByText('How can I improve soil health?')).toBeInTheDocument();
        // Bot response would appear here in a real test
      });
    });
  });
  
  // Test WeatherWidget component
  describe('WeatherWidget Component', () => {
    it('renders weather widget interface', () => {
      render(<WeatherWidget />);
      
      expect(screen.getByText('Weather Forecast')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter location...')).toBeInTheDocument();
    });
    
    it('allows location search', async () => {
      const mockFetchWeather = jest.fn();
      render(<WeatherWidget fetchWeather={mockFetchWeather} />);
      
      const locationInput = screen.getByPlaceholderText('Enter location...');
      fireEvent.change(locationInput, { target: { value: 'Mumbai' } });
      fireEvent.submit(locationInput);
      
      await waitFor(() => {
        expect(mockFetchWeather).toHaveBeenCalledWith('Mumbai');
      });
    });
  });
  
  // Test SoilHealthTool component
  describe('SoilHealthTool Component', () => {
    it('renders soil health tool interface', () => {
      render(<SoilHealthTool />);
      
      expect(screen.getByText('Soil Health Diagnostic Tool')).toBeInTheDocument();
      expect(screen.getByLabelText('pH Level')).toBeInTheDocument();
      expect(screen.getByLabelText('Nitrogen (N)')).toBeInTheDocument();
      expect(screen.getByLabelText('Phosphorus (P)')).toBeInTheDocument();
      expect(screen.getByLabelText('Potassium (K)')).toBeInTheDocument();
    });
    
    it('allows input of soil parameters', async () => {
      const mockAnalyzeSoil = jest.fn();
      render(<SoilHealthTool analyzeSoil={mockAnalyzeSoil} />);
      
      fireEvent.change(screen.getByLabelText('pH Level'), { target: { value: '6.5' } });
      fireEvent.change(screen.getByLabelText('Nitrogen (N)'), { target: { value: '45' } });
      fireEvent.change(screen.getByLabelText('Phosphorus (P)'), { target: { value: '30' } });
      fireEvent.change(screen.getByLabelText('Potassium (K)'), { target: { value: '200' } });
      fireEvent.change(screen.getByLabelText('Organic Matter'), { target: { value: '3.5' } });
      fireEvent.change(screen.getByLabelText('Soil Type'), { target: { value: 'loam' } });
      
      fireEvent.click(screen.getByText('Analyze Soil'));
      
      await waitFor(() => {
        expect(mockAnalyzeSoil).toHaveBeenCalledWith({
          ph: '6.5',
          nitrogen: '45',
          phosphorus: '30',
          potassium: '200',
          organicMatter: '3.5',
          soilType: 'loam'
        });
      });
    });
  });
  
  // Test QRCodeGenerator component
  describe('QRCodeGenerator Component', () => {
    const mockProduct = {
      id: '1',
      name: 'Test Product',
      price: 999,
      supplier: 'Test Supplier',
      category: 'tools'
    };
    
    it('renders QR code generator interface', () => {
      render(<QRCodeGenerator product={mockProduct} />);
      
      expect(screen.getByText('Show QR Code')).toBeInTheDocument();
    });
    
    it('shows QR code when button is clicked', async () => {
      render(<QRCodeGenerator product={mockProduct} />);
      
      fireEvent.click(screen.getByText('Show QR Code'));
      
      await waitFor(() => {
        expect(screen.getByText('Scan to view product details on mobile')).toBeInTheDocument();
        expect(screen.getByText('Download QR Code')).toBeInTheDocument();
      });
    });
  });
});
