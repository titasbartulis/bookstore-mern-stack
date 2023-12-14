import './BooksCard.css';
import BookSingleCard from "../BookSingleCard";

const BooksCard = ({ books }) => {
  const userRole = localStorage.getItem("role");
  let visibleBooks = books;
  if (userRole === 'user') {
    visibleBooks = books.filter(book => !book.isHiddenFromCustomers);
  }
  return (
    <div className="books-single-card">
      {visibleBooks.map((item) => (
        <BookSingleCard key={item._id} book={item}/>
      ))}
    </div>
  );
};

export default BooksCard;
