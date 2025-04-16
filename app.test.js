const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('End-to-End Tests', function() {
  this.timeout(30000); // Increase timeout for E2E tests
  let driver;

  before(async function() {
    // Set up Chrome options
    const options = new chrome.Options();
    options.addArguments('--headless'); // Run in headless mode
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    
    // Initialize the WebDriver
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  after(async function() {
    // Quit the WebDriver after tests
    await driver.quit();
  });

  it('should load the homepage', async function() {
    await driver.get('http://localhost:3000');
    const title = await driver.getTitle();
    assert.strictEqual(title, 'Grow Smart - Digital Marketplace for Farmers');
    
    const heading = await driver.findElement(By.css('h1')).getText();
    assert.strictEqual(heading, 'Grow Smart');
    
    const subheading = await driver.findElement(By.css('h2')).getText();
    assert.strictEqual(subheading, 'A Digital Marketplace for Farmers');
  });

  it('should navigate to marketplace', async function() {
    await driver.get('http://localhost:3000');
    
    // Click on marketplace link
    await driver.findElement(By.linkText('Marketplace')).click();
    
    // Wait for page to load
    await driver.wait(until.elementLocated(By.css('h1')), 5000);
    
    const heading = await driver.findElement(By.css('h1')).getText();
    assert.strictEqual(heading, 'Product Catalog');
    
    // Check if products are loaded
    const products = await driver.findElements(By.css('.product-card'));
    assert(products.length > 0, 'Products should be displayed');
  });

  it('should filter products by category', async function() {
    await driver.get('http://localhost:3000/marketplace');
    
    // Wait for page to load
    await driver.wait(until.elementLocated(By.css('.product-card')), 5000);
    
    // Get initial product count
    const initialProducts = await driver.findElements(By.css('.product-card'));
    const initialCount = initialProducts.length;
    
    // Select a category filter
    const categoryDropdown = await driver.findElement(By.id('category-filter'));
    await categoryDropdown.click();
    await driver.findElement(By.css('option[value="seeds"]')).click();
    
    // Wait for filtered results
    await driver.sleep(1000); // Allow time for filtering
    
    // Get filtered product count
    const filteredProducts = await driver.findElements(By.css('.product-card'));
    
    // Either the count should be different or we should see "seeds" category labels
    const categoryLabels = await driver.findElements(By.css('.category-label'));
    let seedsFound = false;
    
    for (const label of categoryLabels) {
      const text = await label.getText();
      if (text.toLowerCase() === 'seeds') {
        seedsFound = true;
        break;
      }
    }
    
    assert(filteredProducts.length !== initialCount || seedsFound, 'Product filtering should work');
  });

  it('should search for products', async function() {
    await driver.get('http://localhost:3000/marketplace');
    
    // Wait for page to load
    await driver.wait(until.elementLocated(By.css('.product-card')), 5000);
    
    // Enter search term
    const searchInput = await driver.findElement(By.css('input[placeholder="Search products..."]'));
    await searchInput.clear();
    await searchInput.sendKeys('fertilizer');
    
    // Submit search
    await searchInput.submit();
    
    // Wait for search results
    await driver.sleep(1000); // Allow time for search
    
    // Check if search results contain the term
    const productTitles = await driver.findElements(By.css('.product-title'));
    let searchTermFound = false;
    
    for (const title of productTitles) {
      const text = await title.getText();
      if (text.toLowerCase().includes('fertilizer')) {
        searchTermFound = true;
        break;
      }
    }
    
    assert(searchTermFound, 'Search results should contain the search term');
  });

  it('should add product to cart', async function() {
    await driver.get('http://localhost:3000/marketplace');
    
    // Wait for page to load
    await driver.wait(until.elementLocated(By.css('.product-card')), 5000);
    
    // Click add to cart on first product
    const addToCartButton = await driver.findElement(By.css('.add-to-cart-btn'));
    await addToCartButton.click();
    
    // Wait for cart notification
    await driver.wait(until.elementLocated(By.css('.cart-notification')), 5000);
    
    // Open cart
    const cartIcon = await driver.findElement(By.css('.cart-icon'));
    await cartIcon.click();
    
    // Check if cart has items
    await driver.wait(until.elementLocated(By.css('.cart-item')), 5000);
    const cartItems = await driver.findElements(By.css('.cart-item'));
    
    assert(cartItems.length > 0, 'Cart should contain items');
  });

  it('should navigate to learning resources', async function() {
    await driver.get('http://localhost:3000');
    
    // Click on learning link
    await driver.findElement(By.linkText('Learning')).click();
    
    // Wait for page to load
    await driver.wait(until.elementLocated(By.css('h1')), 5000);
    
    const heading = await driver.findElement(By.css('h1')).getText();
    assert.strictEqual(heading, 'Learning Resources');
    
    // Check if articles and videos are loaded
    const articles = await driver.findElements(By.css('.article-card'));
    const videos = await driver.findElements(By.css('.video-card'));
    
    assert(articles.length > 0 || videos.length > 0, 'Learning resources should be displayed');
  });

  it('should interact with chatbot', async function() {
    await driver.get('http://localhost:3000');
    
    // Open chatbot
    await driver.findElement(By.css('.chatbot-trigger')).click();
    
    // Wait for chatbot to open
    await driver.wait(until.elementLocated(By.css('.chatbot-container')), 5000);
    
    // Type a message
    const chatInput = await driver.findElement(By.css('.chatbot-input'));
    await chatInput.sendKeys('How to improve soil health?');
    
    // Send message
    await driver.findElement(By.css('.chatbot-send-btn')).click();
    
    // Wait for response
    await driver.sleep(2000); // Allow time for response
    
    // Check if user message appears
    const messages = await driver.findElements(By.css('.chat-message'));
    let userMessageFound = false;
    
    for (const message of messages) {
      const text = await message.getText();
      if (text.includes('How to improve soil health?')) {
        userMessageFound = true;
        break;
      }
    }
    
    assert(userMessageFound, 'User message should appear in chat');
    
    // Check if bot responded
    const botMessages = await driver.findElements(By.css('.bot-message'));
    assert(botMessages.length > 0, 'Bot should respond to user message');
  });

  it('should use soil health tool', async function() {
    await driver.get('http://localhost:3000/tools/soil-health');
    
    // Wait for page to load
    await driver.wait(until.elementLocated(By.css('form')), 5000);
    
    // Fill the form
    await driver.findElement(By.id('ph')).sendKeys('6.5');
    await driver.findElement(By.id('nitrogen')).sendKeys('45');
    await driver.findElement(By.id('phosphorus')).sendKeys('30');
    await driver.findElement(By.id('potassium')).sendKeys('200');
    await driver.findElement(By.id('organicMatter')).sendKeys('3.5');
    
    // Select soil type
    const soilTypeSelect = await driver.findElement(By.id('soilType'));
    await soilTypeSelect.click();
    await driver.findElement(By.css('option[value="loam"]')).click();
    
    // Submit form
    await driver.findElement(By.css('button[type="submit"]')).click();
    
    // Wait for results
    await driver.wait(until.elementLocated(By.css('.results-container')), 5000);
    
    // Check if results are displayed
    const resultsHeading = await driver.findElement(By.css('.results-container h3')).getText();
    assert(resultsHeading.includes('Results'), 'Soil analysis results should be displayed');
  });

  it('should check weather information', async function() {
    await driver.get('http://localhost:3000/weather');
    
    // Wait for page to load
    await driver.wait(until.elementLocated(By.css('.weather-widget')), 5000);
    
    // Enter location
    const locationInput = await driver.findElement(By.css('input[placeholder="Enter location..."]'));
    await locationInput.clear();
    await locationInput.sendKeys('Mumbai');
    
    // Submit search
    await locationInput.submit();
    
    // Wait for weather data
    await driver.sleep(2000); // Allow time for API response
    
    // Check if weather data is displayed
    const weatherInfo = await driver.findElement(By.css('.weather-info'));
    const weatherText = await weatherInfo.getText();
    
    assert(weatherText.includes('Mumbai') || weatherText.includes('Temperature'), 
           'Weather information should be displayed');
  });

  it('should switch language', async function() {
    await driver.get('http://localhost:3000');
    
    // Find language selector
    const languageSelector = await driver.findElement(By.id('language-selector'));
    await languageSelector.click();
    
    // Select Hindi
    await driver.findElement(By.css('option[value="hindi"]')).click();
    
    // Wait for language change
    await driver.sleep(1000);
    
    // Check if text is in Hindi
    const content = await driver.findElement(By.css('body')).getText();
    
    // Look for Hindi text markers
    const hindiTextPresent = content.includes('मार्केटप्लेस') || 
                             content.includes('किसान') || 
                             content.includes('खेती');
    
    assert(hindiTextPresent, 'Content should be displayed in Hindi');
    
    // Switch back to English
    await languageSelector.click();
    await driver.findElement(By.css('option[value="english"]')).click();
  });
});
