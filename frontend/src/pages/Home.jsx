import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable/BooksTable";
import BooksCard from "../components/home/BooksCard/BooksCard";
import Logout from "../components/Logout";

const Home = () => {
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
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
    navigate('/home_bookhub');
  }

  return (
    <div className="p-16">
      <div className="flex flex-c flex-ai-c gap-x-16">
        <button
          className="bg-sky-300 px-16 py-4 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 px-16 py-4 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
        <button
          className="w-100 bg-red-500 text-white fw-6 rounded-lg"
          onClick={goToBookhub}
        >
          BOOKHUB
        </button>
        <Logout />
      </div>
      <div className="flex flex-sb flex-ai-c">
        <h1 className="fs-36 lh-40 my-32 fw-7">Books For Sale!</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 fs-36 lh-40 w-48 h-48" />
        </Link>
      </div>
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
