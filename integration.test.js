const { render, screen, fireEvent, waitFor } = require('@testing-library/react');
const React = require('react');
const { BrowserRouter } = require('react-router-dom');
const App = require('../src/App');

// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
    ok: true
  })
);

// Mock service worker for offline functionality
const mockServiceWorker = {
  register: jest.fn().mockResolvedValue({ active: true }),
  ready: jest.fn().mockResolvedValue({ active: true })
};

Object.defineProperty(window, 'navigator', {
  value: {
    ...window.navigator,
    serviceWorker: mockServiceWorker
  },
  writable: true
});

describe('Integration Tests', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('App loads and displays homepage', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Grow Smart')).toBeInTheDocument();
      expect(screen.getByText('A Digital Marketplace for Farmers')).toBeInTheDocument();
    });
  });

  test('User can navigate between main sections', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Navigate to Marketplace
    const marketplaceLink = screen.getByText('Marketplace');
    fireEvent.click(marketplaceLink);
    
    await waitFor(() => {
      expect(screen.getByText('Product Catalog')).toBeInTheDocument();
    });
    
    // Navigate to Learning Resources
    const learningLink = screen.getByText('Learning');
    fireEvent.click(learningLink);
    
    await waitFor(() => {
      expect(screen.getByText('Learning Resources')).toBeInTheDocument();
    });
    
    // Navigate to Community
    const communityLink = screen.getByText('Community');
    fireEvent.click(communityLink);
    
    await waitFor(() => {
      expect(screen.getByText('Farmer Community')).toBeInTheDocument();
    });
  });

  test('User can search for products', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Navigate to Marketplace
    const marketplaceLink = screen.getByText('Marketplace');
    fireEvent.click(marketplaceLink);
    
    await waitFor(() => {
      expect(screen.getByText('Product Catalog')).toBeInTheDocument();
    });
    
    // Search for a product
    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'seeds' } });
    fireEvent.submit(searchInput);
    
    // Verify API call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/products?keyword=seeds'), expect.any(Object));
    });
  });

  test('User can add product to cart', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Navigate to Marketplace
    const marketplaceLink = screen.getByText('Marketplace');
    fireEvent.click(marketplaceLink);
    
    await waitFor(() => {
      expect(screen.getByText('Product Catalog')).toBeInTheDocument();
    });
    
    // Add product to cart
    const addToCartButtons = screen.getAllByText('Add to Cart');
    fireEvent.click(addToCartButtons[0]);
    
    // Check cart notification
    await waitFor(() => {
      expect(screen.getByText('Item added to cart')).toBeInTheDocument();
    });
  });

  test('User can interact with chatbot', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Find and open chatbot
    const chatbotButton = screen.getByText('Chat with Assistant');
    fireEvent.click(chatbotButton);
    
    await waitFor(() => {
      expect(screen.getByText('Farming Assistant')).toBeInTheDocument();
    });
    
    // Send a message
    const chatInput = screen.getByPlaceholderText('Type your question here...');
    fireEvent.change(chatInput, { target: { value: 'How to improve soil health?' } });
    const sendButton = screen.getByRole('button', { name: '' }); // Icon button
    fireEvent.click(sendButton);
    
    // Verify API call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/chatbot/message', expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('How to improve soil health?')
      }));
    });
  });

  test('User can use soil health tool', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Navigate to Tools section
    const toolsLink = screen.getByText('Tools');
    fireEvent.click(toolsLink);
    
    await waitFor(() => {
      expect(screen.getByText('Farming Tools')).toBeInTheDocument();
    });
    
    // Find and open soil health tool
    const soilHealthButton = screen.getByText('Soil Health Diagnostic');
    fireEvent.click(soilHealthButton);
    
    await waitFor(() => {
      expect(screen.getByText('Soil Health Diagnostic Tool')).toBeInTheDocument();
    });
    
    // Fill the form
    fireEvent.change(screen.getByLabelText('pH Level'), { target: { value: '6.5' } });
    fireEvent.change(screen.getByLabelText('Nitrogen (N)'), { target: { value: '45' } });
    fireEvent.change(screen.getByLabelText('Phosphorus (P)'), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText('Potassium (K)'), { target: { value: '200' } });
    fireEvent.change(screen.getByLabelText('Organic Matter'), { target: { value: '3.5' } });
    fireEvent.change(screen.getByLabelText('Soil Type'), { target: { value: 'loam' } });
    
    // Submit the form
    const analyzeButton = screen.getByText('Analyze Soil');
    fireEvent.click(analyzeButton);
    
    // Verify API call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/soil-health/analyze', expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('6.5')
      }));
    });
  });

  test('User can check weather information', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Find and open weather widget
    const weatherButton = screen.getByText('Weather');
    fireEvent.click(weatherButton);
    
    await waitFor(() => {
      expect(screen.getByText('Weather Forecast')).toBeInTheDocument();
    });
    
    // Search for a location
    const locationInput = screen.getByPlaceholderText('Enter location...');
    fireEvent.change(locationInput, { target: { value: 'Mumbai' } });
    fireEvent.submit(locationInput);
    
    // Verify API call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/weather/Mumbai'), expect.any(Object));
    });
  });

  test('User can register for offline access', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Navigate to Settings
    const settingsLink = screen.getByText('Settings');
    fireEvent.click(settingsLink);
    
    await waitFor(() => {
      expect(screen.getByText('App Settings')).toBeInTheDocument();
    });
    
    // Enable offline mode
    const offlineToggle = screen.getByLabelText('Enable Offline Mode');
    fireEvent.click(offlineToggle);
    
    // Verify service worker registration
    await waitFor(() => {
      expect(mockServiceWorker.register).toHaveBeenCalled();
    });
    
    // Verify API call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/offline/register', expect.objectContaining({
        method: 'POST'
      }));
    });
  });

  test('App handles network errors gracefully', async () => {
    // Mock a network error
    fetch.mockRejectedValueOnce(new Error('Network error'));
    
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Try to fetch data that will fail
    const marketplaceLink = screen.getByText('Marketplace');
    fireEvent.click(marketplaceLink);
    
    // Check for error message
    await waitFor(() => {
      expect(screen.getByText('Unable to load data. Please check your connection.')).toBeInTheDocument();
    });
    
    // Verify retry button
    const retryButton = screen.getByText('Retry');
    expect(retryButton).toBeInTheDocument();
    
    // Click retry
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true }),
      ok: true
    });
    
    fireEvent.click(retryButton);
    
    // Verify retry attempt
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });

  test('App supports language switching', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Find language selector
    const languageSelector = screen.getByLabelText('Language');
    
    // Switch to Hindi
    fireEvent.change(languageSelector, { target: { value: 'hindi' } });
    
    // Check for Hindi text
    await waitFor(() => {
      expect(screen.getByText('डिजिटल किसान मार्केटप्लेस')).toBeInTheDocument();
    });
    
    // Switch to Gujarati
    fireEvent.change(languageSelector, { target: { value: 'gujarati' } });
    
    // Check for Gujarati text
    await waitFor(() => {
      expect(screen.getByText('ડિજિટલ ખેડૂત માર્કેટપ્લેસ')).toBeInTheDocument();
    });
  });
});
