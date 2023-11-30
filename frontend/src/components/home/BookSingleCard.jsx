import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import BookModal from "./BookModal";

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  const userRole = localStorage.getItem("role");

  return (
    <div
      key={book._id}
      className="border-2-grey-500 rounded-lg px-16 py-8 m-16 relative shadow-xl bg-white"
    >
      <h2 className="hidden absolute top-4 right-8 px-16 py-4 bg-red-300 rounded-lg">
        {book.publishYear}
      </h2>
      <h4 className="hidden my-8 text-grey-500">{book._id}</h4>
      <div className="flex flex-st flex-ai-c gap-x-8">
        <PiBookOpenTextLight className="text-red-300 fs-24 lh-32" />
        <h2 className="my-4">{book.title}</h2>
      </div>
      <div className="flex flex-st flex-ai-c gap-x-8">
        <BiUserCircle className="text-red-300 fs-24 lh-32" />
        <h2 className="my-4">{book.author}</h2>
      </div>
      <div className="flex flex-st flex-ai-c gap-x-8">
        <h2 className="my-4">Price - {book.price}€</h2>
      </div>
      <div className="flex flex-sb flex-ai-c gap-x-8 mt-16 p-16">
        <BiShow
          className="fs-30 lh-36 text-blue-800 cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        {(userRole === "admin" || userRole === "editor") && (
          <>
            <Link to={`/books/edit/${book._id}`}>
              <AiOutlineEdit className="fs-24 lh-32 text-yellow-600" />
            </Link>
          </>
        )}
        {userRole === "admin" && (
          <>
            <Link to={`/books/delete/${book._id}`}>
              <MdOutlineDelete className="fs-24 lh-32 text-red-600" />
            </Link>
          </>
        )}
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;
