import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { CartContext } from "../../../../context/CartContext";
import { useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const BookTableEntry = ({ book, index }) => {
  const userRole = localStorage.getItem("role");
  const cart = useContext(CartContext);
  const bookQuantity = cart.getProductQuantity(book.title);
  const toggleVisibility = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/books/toggle-visibility/${book._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    } catch (error) {
      console.error("Error updating book visibility:", error);
    }
  };

  return (
    <tr className="h-8">
      <td className="table-cell">{index + 1}</td>
      <td className="table-cell">{book.title}</td>
      <td className="table-cell-hidden">{book.author}</td>
      <td className="table-cell-hidden">{book.publishYear}</td>
      <td className="table-cell-hidden">{book.price} €</td>
      <td className="table-cell">
        {bookQuantity > 0 ? (
          <>
            <div className="flex flex-ai-c flex-c gap-x-16 h-78">
              {userRole === "admin" && (
                <button
                  className="bg-red-500 text-white py-4 px-10 rounded-lg"
                  onClick={toggleVisibility}
                >
                  {book.isHiddenFromCustomers
                    ? "Show to customer"
                    : "Hide from customer"}
                </button>
              )}
              <div className="flex flex-column">
                <div className="flex flex-sb">
                  <div className="mr-16">In Cart: {bookQuantity}</div>
                  <div className="flex flex-ai-c gap-x-6">
                    <button
                      className="text-white bg-sky-600 py-2 px-8 rounded-lg"
                      onClick={() => {
                        cart.addOneToCart(
                          book.title,
                          book.price,
                          book.stripeId
                        );
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
              <Link to={`/books/details/${book._id}`} className="flex">
                <BsInfoCircle className="fs-24 lh-32 text-grey-800" />
              </Link>
              {(userRole === "admin" || userRole === "editor") && (
                <Link to={`/books/edit/${book._id}`} className="flex">
                  <AiOutlineEdit className="fs-24 lh-32 text-yellow-600" />
                </Link>
              )}
              {userRole === "admin" && (
                <Link to={`/books/delete/${book._id}`} className="flex">
                  <MdOutlineDelete className="fs-24 lh-32 text-red-600" />
                </Link>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-ai-c flex-c gap-x-16 h-78">
              {userRole === "admin" && (
                <button
                  className="bg-red-500 text-white py-4 px-10 rounded-lg"
                  onClick={toggleVisibility}
                >
                  {book.isHiddenFromCustomers
                    ? "Show to customer"
                    : "Hide from customer"}
                </button>
              )}

              <button
                className="bg-sky-600 text-white py-4 px-10 rounded-lg"
                onClick={() => {
                  cart.addOneToCart(book.title, book.price, book.stripeId);
                }}
              >
                Add to cart
              </button>
              <Link to={`/books/details/${book._id}`} className="flex">
                <BsInfoCircle className="fs-24 lh-32 text-grey-800" />
              </Link>
              {(userRole === "admin" || userRole === "editor") && (
                <Link to={`/books/edit/${book._id}`} className="flex">
                  <AiOutlineEdit className="fs-24 lh-32 text-yellow-600" />
                </Link>
              )}
              {userRole === "admin" && (
                <Link to={`/books/delete/${book._id}`} className="flex">
                  <MdOutlineDelete className="fs-24 lh-32 text-red-600" />
                </Link>
              )}
            </div>
          </>
        )}
      </td>
    </tr>
  );
};

export default BookTableEntry;

BookTableEntry.propTypes = {
  book: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
