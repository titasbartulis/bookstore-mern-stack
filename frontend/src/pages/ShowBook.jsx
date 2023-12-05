import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-16 h-screen bg-grey-200-gradient">
      <BackButton />
      <h1 className="fs-30 lh-36 my-16 fw-7">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-column border-2-sky-400 rounded-xl w-fit p-16 bg-slate-200">
          <div className="my-16">
            <span className="fs-20 lh-28 mr-16 text-grey-500">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-16">
            <span className="fs-20 lh-28 mr-16 text-grey-500">Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my-16">
            <span className="fs-20 lh-28 mr-16 text-grey-500">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-16">
            <span className="fs-20 lh-28 mr-16 text-grey-500">Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-16">
            <span className="fs-20 lh-28 mr-16 text-grey-500">Price</span>
            <span>{book.price} €</span>
          </div>
          <div className="my-16">
            <span className="fs-20 lh-28 mr-16 text-grey-500">Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-16">
            <span className="fs-20 lh-28 mr-16 text-grey-500">Last Update Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
