import "./BooksTable.css";
import { useContext } from "react";
import BookTableEntry from "./BookTableEntry/BookTableEntry";

const BooksTable = ({ books }) => {
  const userRole = localStorage.getItem("role");
  return (
    <table className="w-100-pct border-separate border-spacing-2 bg-slate-200 rounded-md">
      <thead>
        <tr>
          <th className="table-header">No</th>
          <th className="table-header">Title</th>
          <th className="table-header-hidden">Author</th>
          <th className="table-header-hidden">Publish Year</th>
          <th className="table-header-hidden">Price</th>
          <th className="table-header">Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <BookTableEntry key={book._id} book={book} index={index} />
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
