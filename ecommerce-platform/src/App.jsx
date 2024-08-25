import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; 
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage'; 
import CheckoutPage from './pages/CheckoutPage'; 
import OrderHistoryPage from './pages/OrderHistoryPage'; 
import AdminPanel from './pages/AdminPage'; 

import SignIn from './pages/SignIn'; 
import Register from './pages/Register'; 

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            
            <Route path="/sign-in" element={<SignIn />} /> 
            <Route path="/register" element={<Register />} /> 
            
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
