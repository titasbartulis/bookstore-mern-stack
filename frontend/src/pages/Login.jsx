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
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      setFormData(initialFormData);
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

  const goToBookhub = (e) => {
    e.preventDefault();
    console.log('go to bookhub');
    navigate('/home_bookhub');
  }

  return (
    <div>
      {/* <div className="flex flex-c flex-ai-c bg-grey-200">
        <button 
          className="w-100 bg-red-500 text-white fw-6 rounded-lg"
          onClick={goToBookhub}>BOOKHUB</button>
      </div> */}
      <div className="flex flex-c flex-ai-c bg-grey-200 h-screen">
        <ToastContainer position="top-center" />
        <div className="bg-white p-16 rounded-md w-25-pct">
          <h2 className="fs-30 lh-36 fw-6 mb-12">Login</h2>
          <form onSubmit={handleSubmit}>
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
            <div className="mb-16 text-center">
              <button
                type="submit"
                className="w-100 px-12 py-8 bg-green-500 text-white rounded-md"
                onClick={handleSubmit}
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
