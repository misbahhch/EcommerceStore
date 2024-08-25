import React from 'react';

const getOrders = () => JSON.parse(localStorage.getItem('orders')) || [];

const OrderHistoryPage = () => {
  const orders = getOrders();

  if (orders.length === 0) {
    return <div className="container mx-auto p-4">No orders found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Order History</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="border p-4 mb-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Total:</strong> ${order.total}</p>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistoryPage;
