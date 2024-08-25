import React, { useEffect, useState } from 'react';


const AdminPanel = () => {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: '',
    total: ''
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    
    const fetchOrders = () => {
      const ordersFromStorage = JSON.parse(localStorage.getItem('orders')) || [];
      setOrders(ordersFromStorage);
    };

    fetchOrders();
  }, []);

  const handleRemoveOrder = (id) => {
    const updatedOrders = orders.filter(order => order.id !== id);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const handleAddOrder = () => {
    
    const newOrder = {
      id: Date.now(),
      ...formData,
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    setFormData({
      name: '',
      email: '',
      address: '',
      paymentMethod: '',
      total: ''
    });
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        >
          {showForm ? 'Cancel' : 'Add Order'}
        </button>
        {showForm && (
          <div className="mb-4 p-4 border border-gray-300 rounded">
            <h2 className="text-xl font-bold mb-2">Add New Order</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter customer name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter customer email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter delivery address"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Payment Method</label>
              <input
                type="text"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter payment method"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Total</label>
              <input
                type="number"
                name="total"
                value={formData.total}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter total amount"
              />
            </div>
            <button
              onClick={handleAddOrder}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Add Order
            </button>
          </div>
        )}
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="border-b p-2">Order ID</th>
              <th className="border-b p-2">Name</th>
              <th className="border-b p-2">Email</th>
              <th className="border-b p-2">Address</th>
              <th className="border-b p-2">Payment Method</th>
              <th className="border-b p-2">Total</th>
              <th className="border-b p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border-b p-2">{order.id}</td>
                <td className="border-b p-2">{order.name}</td>
                <td className="border-b p-2">{order.email}</td>
                <td className="border-b p-2">{order.address}</td>
                <td className="border-b p-2">{order.paymentMethod}</td>
                <td className="border-b p-2">{order.total}</td>
                <td className="border-b p-2">
                  <button
                    onClick={() => handleRemoveOrder(order.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default AdminPanel;
