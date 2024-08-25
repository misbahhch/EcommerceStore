import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/slices/cartSlice'; 

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); 
    setAddedToCart(product); 
  };

  const handleGoToCart = () => {
    navigate('/cart'); 
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      {addedToCart && (
        <div className="bg-green-100 text-green-800 p-4 mb-4 rounded">
          <p className="font-bold">Added to Cart!</p>
          <button
            onClick={handleGoToCart}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
          >
            Go to Cart
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow hover:shadow-lg">
              <img src={product.image} alt={product.title} className="mb-4 w-full h-48 object-cover" />
              <h3 className="text-xl font-bold">{product.title}</h3>
              <p className="mt-2">Price: ${product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductPage;
