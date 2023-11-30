import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const initialFormData = {
    firstName: "",
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
    const endpoint = `${import.meta.env.VITE_API_URL}/registers`;

    try {
      const response = await axios.post(endpoint, formData);
      toast.success("Registration successful, please login.");
      navigate("/");
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
  };
  return (
    <div className="flex flex-c flex-ai-c bg-grey-200 h-screen">
      <ToastContainer position="top-center" />
      <div className="bg-white p-16 rounded-md w-25-pct">
        <h2 className="fs-30 lh-36 fw-6 mb-12">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-16">
            <label htmlFor="firstName" className="block fw-5">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="firstName"
              required
              className="w-100-pct px-12 py-8 border-grey-300 rounded-md"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-16">
            <label htmlFor="email" className="block fw-5">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              required
              className="w-100-pct px-12 py-8 border-grey-300 rounded-md"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-16">
            <label htmlFor="password" className="block fw-5">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              required
              className="w-100-pct px-12 py-8 border-grey-300 rounded-md"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-16">
            <button
              type="submit"
              className="w-100 px-12 py-8 bg-green-500 text-white rounded-md"
            >
              Register
            </button>
          </div>
        </form>
        <div className="flex flex-column flex-ai-c flex-c">
          <p>Already have an account?</p>
          <Link
            to="/"
            className="w-100 px-12 py-8 border-grey-300 bg-grey-100 rounded-md text-center mt-8"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
