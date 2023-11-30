import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    const endpoint = import.meta.env.VITE_API_URL;
    axios
      .delete(`${endpoint}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar("The book was deleted successfully.", {
          variant: "success",
          style: {
            fontSize: '20px',
            width: '350px',
          }
        });
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error happened. Please check the console.", {
          variant: "error",
        });
        console.log(error);
      });
  };
  return (
    <div className="p-16">
      <BackButton />
      <h1 className="fs-30 lh-36 my-16 fw-7">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-column flex-ai-c border-2-sky-400 rounded-xl w-600 p-32 mx-auto bg-white">
        <h3 className="fs-24 lh-32">Are you sure about deleting this book?</h3>
        <button
          className="p-16 bg-red-600 text-white m-32 w-100-pct"
          onClick={handleDeleteBook}
        >
          Yes, delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
