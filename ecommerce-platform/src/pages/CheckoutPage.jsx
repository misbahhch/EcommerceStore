import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice'; 

const getCartItems = () => JSON.parse(localStorage.getItem('cartItems')) || [];


const getOrders = () => JSON.parse(localStorage.getItem('orders')) || [];

const CheckoutSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  address: Yup.string().required('Required'),
  paymentMethod: Yup.string().required('Required'),
  bankDetails: Yup.string().when('paymentMethod', {
    is: 'bankTransfer',
    then: Yup.string().required('Bank details are required'),
  }),
  bankCVV: Yup.string().when('paymentMethod', {
    is: 'bankTransfer',
    then: Yup.string().required('Bank CVV is required'),
  }),
  paypalEmail: Yup.string().when('paymentMethod', {
    is: 'paypal',
    then: Yup.string().email('Invalid email').required('PayPal email is required'),
  }),
  creditCardNumber: Yup.string().when('paymentMethod', {
    is: 'creditCard',
    then: Yup.string().required('Credit Card number is required'),
  }),
});

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleSubmit = (values) => {
    const orders = getOrders();
    const newOrder = {
      id: orders.length + 1,
      ...values,
      date: new Date().toISOString(),
      total: getCartItems().reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2),
    };
    localStorage.setItem('orders', JSON.stringify([...orders, newOrder]));
    localStorage.setItem('cartItems', JSON.stringify([])); 
    dispatch(clearCart());
    alert('Order placed!');
    navigate('/order-history');
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <Formik
          initialValues={{
            name: '',
            email: '',
            address: '',
            paymentMethod: 'creditCard',
            bankDetails: '',
            bankCVV: '',
            paypalEmail: '',
            creditCardNumber: '',
          }}
          validationSchema={CheckoutSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="max-w-md mx-auto">
              <div className="mb-4">
                <Field name="name" placeholder="Name" className="w-full p-2 border rounded" autoComplete="name" />
                <ErrorMessage name="name" component="div" className="text-red-500 mt-1" />
              </div>
              <div className="mb-4">
                <Field name="email" type="email" placeholder="Email" className="w-full p-2 border rounded" autoComplete="email" />
                <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
              </div>
              <div className="mb-4">
                <Field name="address" placeholder="Address" className="w-full p-2 border rounded" autoComplete="address" />
                <ErrorMessage name="address" component="div" className="text-red-500 mt-1" />
              </div>
              <div className="mb-4">
                <label htmlFor="paymentMethod" className="block text-lg font-medium mb-1">Payment Method</label>
                <Field as="select" id="paymentMethod" name="paymentMethod" className="border rounded w-full p-2" onChange={(e) => setFieldValue('paymentMethod', e.target.value)}>
                  <option value="creditCard">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bankTransfer">Bank Transfer</option>
                  <option value="cashOnDelivery">Cash on Delivery</option>
                </Field>
                <ErrorMessage name="paymentMethod" component="div" className="text-red-500 mt-1" />
              </div>
              {values.paymentMethod === 'bankTransfer' && (
                <>
                  <div className="mb-4">
                    <Field name="bankDetails" placeholder="Bank Details" className="w-full p-2 border rounded" autoComplete="bank-details" />
                    <ErrorMessage name="bankDetails" component="div" className="text-red-500 mt-1" />
                  </div>
                  <div className="mb-4">
                    <Field name="bankCVV" placeholder="Bank CVV" className="w-full p-2 border rounded" autoComplete="bank-cvv" />
                    <ErrorMessage name="bankCVV" component="div" className="text-red-500 mt-1" />
                  </div>
                </>
              )}
              {values.paymentMethod === 'paypal' && (
                <div className="mb-4">
                  <Field name="paypalEmail" type="email" placeholder="PayPal Email" className="w-full p-2 border rounded" autoComplete="paypal-email" />
                  <ErrorMessage name="paypalEmail" component="div" className="text-red-500 mt-1" />
                </div>
              )}
              {values.paymentMethod === 'creditCard' && (
                <div className="mb-4">
                  <Field name="creditCardNumber" placeholder="Credit Card Number" className="w-full p-2 border rounded" autoComplete="credit-card-number" />
                  <ErrorMessage name="creditCardNumber" component="div" className="text-red-500 mt-1" />
                </div>
              )}
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
                disabled={isSubmitting}
              >
                Place Order
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CheckoutPage;
