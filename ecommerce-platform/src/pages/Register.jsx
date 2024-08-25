import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const RegisterPage = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      
      console.log('User registered:', values);
      
      navigate('/signin');
      setSubmitting(false);
    }, 500);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-lg font-medium mb-1">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                className="border rounded w-full p-2"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 mt-1" />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium mb-1">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="border rounded w-full p-2"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
            </div>
            <div>
              <label htmlFor="password" className="block text-lg font-medium mb-1">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="border rounded w-full p-2"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 mt-1" />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-lg font-medium mb-1">Confirm Password</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="border rounded w-full p-2"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 mt-1" />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={isSubmitting}
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPage;
