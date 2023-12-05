import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
      price
    };
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_URL}/books`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar("The book was created successfully.", {
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
    <div className="p-16 h-screen bg-grey-200-gradient">
      <BackButton />
      <h1 className="fs-30 lh-36 my-16 fw-7">Create Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-column border-2-sky-400 rounded-xl w-600 p-16 mx-auto bg-slate-200">
        <div className="my-16">
          <label className="fs-20 lh-28 mr-16 text-grey-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2-grey-500 px-16 py-8 w-100-pct"
          />
        </div>
        <div className="my-16">
          <label className="fs-20 lh-28 mr-16 text-grey-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2-grey-500 px-16 py-8 w-100-pct"
          />
        </div>
        <div className="my-16">
          <label className="fs-20 lh-28 mr-16 text-grey-500">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2-grey-500 px-16 py-8 w-100-pct"
          />
        </div>
        <div className="my-16">
          <label className="fs-20 lh-28 mr-16 text-grey-500">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border-2-grey-500 px-16 py-8 w-100-pct"
          />
        </div>
        <button className="p-8 bg-sky-300 m-32" onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
