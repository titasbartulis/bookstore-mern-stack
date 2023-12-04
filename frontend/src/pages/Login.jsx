import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const endpoint = `${import.meta.env.VITE_API_URL}`;
    try {
      const response = await axios.post(endpoint, data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      if (response.status === 200) {
        toast.success('Login successful');
        navigate('/home');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred while submitting the form.';
      toast.error(message);
    }
  };

  return (
    <div className="h-screen bg-grey-200-gradient">
      <div className="border mb-100 p-4 inline-block rounded-xl fw-4">
        <p className="fw-8 fs-22">Welcome to the Book Store project!</p>
        <p className="fw-5 fs-18">This project features three distinct user roles: the Shop Owner, the Owner's Assistant, and the Customer (a regular user).</p>
        <p>For the Owner's account, use the email: <strong>owner@gmail.com</strong> and the password: <strong>owner</strong></p>
        <p>For the Assistant's account, the email is <strong>assistant@gmail.com</strong> with the password: <strong>assistant</strong></p>
        <p>A pre-existing account for a Customer is available - simply log in with the email: <strong>customer@gmail.com</strong> and the password: <strong>customer</strong></p>
        <p>Feel free to register a new account as well. Any account created anew will be assigned the role of a regular user.</p>
      </div>
      <div className="flex flex-c flex-ai-c">
        <ToastContainer position="top-center" />
        <div className="bg-white p-16 rounded-md w-25-pct">
          <h2 className="fs-30 lh-36 fw-6 mb-12">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-16">
              <label htmlFor="email" className="block fw-5">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                {...register('email', { required: 'Email is required' })}
                className="w-100-pct px-12 py-8 border-grey-300 rounded-md"
              />
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>
            <div className="mb-16">
              <label htmlFor="password" className="block fw-5">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                autoComplete="off"
                {...register('password', { required: 'Password is required' })}
                className="w-100-pct px-12 py-8 border-grey-300 rounded-md"
              />
              {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            </div>
            <div className="mb-16 text-center">
              <button
                type="submit"
                className="w-100 px-12 py-8 bg-green-500 text-white rounded-md"
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex flex-column flex-ai-c flex-c">
            <p>Already have an account?</p>
            <Link
              to="/register"
              className="w-100 px-12 py-8 border-grey-300 bg-grey-100 rounded-md text-center mt-8"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
