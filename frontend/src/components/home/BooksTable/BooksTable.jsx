import './BooksTable.css';
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const BooksTable = ({ books }) => {
  const userRole = localStorage.getItem("role");
  return (
    <table className="w-100-pct border-separate border-spacing-2 bg-white rounded-md">
      <thead>
        <tr>
          <th className="table-header">No</th>
          <th className="table-header">Title</th>
          <th className="table-header-hidden">
            Author
          </th>
          <th className="table-header-hidden">
            Publish Year
          </th>
          <th className="table-header-hidden">
            Price
          </th>
          <th className="table-header">Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className="h-8">
            <td className="table-cell">
              {index + 1}
            </td>
            <td className="table-cell">
              {book.title}
            </td>
            <td className="table-cell-hidden">
              {book.author}
            </td>
            <td className="table-cell-hidden">
              {book.publishYear}
            </td>
            <td className="table-cell-hidden">
              {book.price} €
            </td>
            <td className="table-cell">
              <div className="flex flex-ai-c flex-c gap-x-16">
                <Link to={`/books/details/${book._id}`} className='flex'>
                  <BsInfoCircle className="fs-24 lh-32 text-grey-800" />
                </Link>
                {(userRole === "admin" || userRole === "editor") && (
                  <>
                    <Link to={`/books/edit/${book._id}`} className='flex'>
                      <AiOutlineEdit className="fs-24 lh-32 text-yellow-600" />
                    </Link>
                  </>
                )}
                {userRole === "admin" && (
                  <>
                    <Link to={`/books/delete/${book._id}`} className='flex'>
                      <MdOutlineDelete className="fs-24 lh-32 text-red-600" />
                    </Link>
                  </>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
