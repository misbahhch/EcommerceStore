
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../redux/slices/cartSlice';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const totalAmount = cartItems.reduce((sum, item) => {
    return sum + (item.price || 0) * (item.quantity || 0);
  }, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/products" className="text-blue-500">Go back to products</Link></p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center border p-4 rounded mb-4 shadow">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover mr-4"
              />
              <div className="flex-grow">
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="mt-2">Price: ${item.price}</p>
                <p className="mt-2">Quantity: {item.quantity}</p>
              </div>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right mt-4">
            <p className="text-xl font-bold">Total: ${totalAmount.toFixed(2)}</p>
            <Link
              to="/checkout"
              className="bg-blue-500 text-white py-1 px-4 rounded"
            >

              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
