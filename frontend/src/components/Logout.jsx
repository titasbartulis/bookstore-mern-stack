import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    const endpoint = `${import.meta.env.VITE_API_URL}`;
    try {
      await axios.post(
        `${endpoint}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/");
    } catch (error) {
      console.error("Error when trying to logout:", error);
    }
  };
  return (
    <button
      className="bg-red-600 px-16 py-4 rounded-lg fs-20 fw-6"
      onClick={logout}
    >
      LOGOUT
    </button>
  );
};

export default Logout;