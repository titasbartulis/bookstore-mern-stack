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
      navigate("/");
    } catch (error) {
      console.error("Error when trying to logout:", error);
    }
  };
  return (
    <button
      className="bg-red-600 hover:bg-red-800 px-4 py-1 rounded-lg"
      onClick={logout}
    >
      Logout
    </button>
  );
};

export default Logout;