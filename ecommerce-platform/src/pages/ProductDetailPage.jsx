import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name: `Product ${id}`, price: 100 }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Product {id}</h1>
      <p className="mt-2">Detailed description of Product {id}.</p>
      <button 
        onClick={handleAddToCart}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetailPage;
