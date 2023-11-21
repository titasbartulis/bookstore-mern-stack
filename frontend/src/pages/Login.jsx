import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const initialFormData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = `${import.meta.env.VITE_API_URL}`;
    try {
      const response = await axios.post(endpoint, formData);
      if (response.status === 200) {
        toast.success("Login successful");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while submitting the form.");
      }
    }
    navigate("/home");
  };

  return (
    <div className="flex justify-center items-center bg-gray-200 h-screen">
      <ToastContainer position="top-center" />
      <div className="bg-white p-4 rounded-md w-1/4">
        <h2 className="text-3xl font-semibold mb-3">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              required
              className="w-full px-3 py-2 border rounded-md"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              required
              className="w-full px-3 py-2 border rounded-md"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-[100px] px-3 py-2 bg-green-500 text-white rounded-md"
            >
              Login
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center justify-center">
          <p>Already have an account?</p>
          <Link
            to="/register"
            className="w-[100px] px-3 py-2 border border-gray-300 bg-gray-100 rounded-md text-center mt-2"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
