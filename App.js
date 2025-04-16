import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Import pages (to be created)
// import Home from './pages/Home';
// import Marketplace from './pages/Marketplace';
// import Learning from './pages/Learning';
// import ProductDetails from './pages/ProductDetails';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';
// import Profile from './pages/Profile';
// import Forum from './pages/Forum';
// import Blog from './pages/Blog';

function App() {
  return (
    <div className="App">
      {/* Navigation and header will go here */}
      <main>
        <Routes>
          {/* Routes will be defined here */}
          {/* <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/blog" element={<Blog />} /> */}
        </Routes>
      </main>
      {/* Footer will go here */}
    </div>
  );
}

export default App;
