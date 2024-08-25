import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        
        <div className="text-2xl font-bold">
          <Link to="/">My Shop</Link>
        </div>

       
        <div className="space-x-4">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <Link to="/products" className="hover:text-red-400">Products</Link>
          <Link to="/orders" className="hover:text-red-400">Orders</Link>
          <Link to="/admin" className="hover:text-red-400">Admin Panel</Link>
          <Link to="/sign-in" className="hover:text-red-400 text-sm">Sign In</Link>
          <Link to="/register" className="hover:text-red-400 text-sm">Register</Link>
          <Link to="/cart" className="hover:text-red-400">Cart</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
