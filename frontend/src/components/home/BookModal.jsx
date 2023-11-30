import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed bg-black opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex flex-c flex-ai-c"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-600 max-w-full h-400 bg-white rounded-xl p-16 flex flex-column relative"
      >
        <AiOutlineClose
          className="absolute right-24 top-24 fs-30 lh-36 text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="w-fit px-16 py-4 bg-red-300 rounded-lg mb-16">
          {book.publishYear}
        </h2>
        <h4 className="my-8 text-grey-500">{book._id}</h4>
        <div className="flex flex-st flex-ai-c gap-x-8">
          <PiBookOpenTextLight className="text-red-300 fs-24 lh-32" />
          <h2 className="my-4">{book.title}</h2>
        </div>
        <div className="flex flex-st flex-ai-c gap-x-8">
          <BiUserCircle className="text-red-300 fs-24 lh-32" />
          <h2 className="my-4">{book.author}</h2>
        </div>
        <div className="flex flex-st flex-ai-c gap-x-8">
          <h2 className="my-4 bg-red-500 rounded-md pl-8 pr-8">{book.price} €</h2>
        </div>
        <p className="mt-16">Anything you want to show</p>
        <p className="my-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
          suscipit sit quia asperiores ratione, quis vel ipsam expedita cum!
          Placeat dolor quas optio nesciunt, iste tenetur quidem rerum modi ut.
        </p>
      </div>
    </div>
  );
};

export default BookModal;
