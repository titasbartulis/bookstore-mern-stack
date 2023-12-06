import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable/BooksTable";
import BooksCard from "../components/home/BooksCard/BooksCard";
import Logout from "../components/Logout";
import Checkout from "../components/Checkout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const session_id = queryParams.get("session_id");
    if (token) {
      localStorage.setItem("token", token);
    }

    if (session_id) {
      console.log('we have session id');
      axios.get(`${import.meta.env.VITE_API_URL}/checkout/confirm`, {
        params: { session_id: session_id }
      })
      .then(response => {
        toast.success("Thanks for your order!", {
          position: "top-center",
        });
      })
      .catch(error => {
        console.error('Error confirming checkout:', error);
        toast.error("There was an issue confirming your order.");
      });
    }

    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/books`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [location]);

  const goToBookhub = (e) => {
    e.preventDefault();
    navigate("/home_bookhub");
  };

  return (
    <div className="h-screen p-16 bg-grey-200-gradient">
      <ToastContainer position="top-center" />
      <div className="flex flex-sb">
        <div className="flex gap-x-16">
          <button
            className="bg-sky-300 px-16 py-4 rounded-lg"
            onClick={() => setShowType("table")}
          >
            Table view
          </button>
          <button
            className="bg-sky-300 px-16 py-4 rounded-lg"
            onClick={() => setShowType("card")}
          >
            Card view
          </button>
        </div>
        <div className="flex gap-x-16">
          <button
            className=" bg-red-500 text-white px-16 py-4 rounded-lg fs-20 fw-6"
            onClick={goToBookhub}
          >
            BOOKHUB
          </button>
          <Logout />
        </div>
      </div>
      <div className="flex flex-sb flex-ai-c">
        <h1 className="fs-36 lh-40 mt-32 mb-12 fw-7">Books For Sale!</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 fs-36 lh-40 w-48 h-48" />
        </Link>
      </div>
      <Checkout />
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
