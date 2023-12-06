import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import BookModal from "./BookModal";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import PropTypes from "prop-types";

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  const userRole = localStorage.getItem("role");
  const cart = useContext(CartContext);
  const bookQuantity = cart.getProductQuantity(book.title);

  return (
    <div
      key={book._id}
      className="border-2-grey-500 rounded-lg px-16 py-8 m-16 relative shadow-xl bg-slate-200"
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
        {bookQuantity > 0 ? (
          <>
            <div className="flex flex-column">
              <div className="flex flex-sb">
                <div className="mr-16">In Cart: {bookQuantity}</div>
                <div className="flex flex-ai-c gap-x-6">
                  <button
                    className="text-white bg-sky-600 py-2 px-8 rounded-lg"
                    onClick={() => {
                      cart.addOneToCart(book.title, book.price, book.stripeId);
                    }}
                  >
                    +
                  </button>
                  <button
                    className="text-white bg-sky-600 py-2 px-8 rounded-lg"
                    onClick={() => {
                      cart.removeOneFromCart(book.title);
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
              <div>
                <button
                  className="text-white bg-red-600 py-2 px-8 rounded-lg"
                  onClick={() => cart.deleteFromCart(book.title)}
                >
                  Remove from cart
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <button
              className="bg-sky-600 text-white py-4 px-10 rounded-lg"
              onClick={() => {
                cart.addOneToCart(book.title, book.price, book.stripeId);
              }}
            >
              Add to cart
            </button>
          </>
        )}
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

BookSingleCard.propTypes = {
  book: PropTypes.object.isRequired,
  index: PropTypes.number,
};