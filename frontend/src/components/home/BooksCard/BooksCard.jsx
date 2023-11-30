import './BooksCard.css';
import BookSingleCard from "../BookSingleCard";

const BooksCard = ({ books }) => {
  return (
    <div className="books-single-card">
      {books.map((item) => (
        <BookSingleCard key={item._id} book={item}/>
      ))}
    </div>
  );
};

export default BooksCard;
