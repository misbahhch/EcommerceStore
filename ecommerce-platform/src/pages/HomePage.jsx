import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      
      <header className="relative bg-cover bg-center h-screen flex flex-col items-center justify-center text-center text-white" style={{ backgroundImage: 'url(/src/images/product1.jpeg)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div> 
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">Welcome to My Shop</h1>
          <Link to="/products" className="bg-red-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-600">Shop Now</Link>
        </div>
      </header>
    </div>
  );
};

export default HomePage;
