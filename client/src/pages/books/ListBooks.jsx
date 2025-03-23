import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, getBook, getBooks } from "../../redux/slices/bookSlice";
import { Link } from "react-router-dom";

const ListBooks = () => {
  const dispatch = useDispatch();
  const { books, error, success, loading } = useSelector((state) => state.book);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBook(id));
    dispatch(getBooks());
  };

  return (
    <div>
      {loading ? (
        <p>Loading books...</p>
      ) : books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              {book.book_name} - {book.book_description}
              <Link to={`/books/${book.id}`}>
                <button type="button">View Book</button>
              </Link>
              <Link to={`/update-book/${book.id}`}>
                <button type="button">Update Book</button>
              </Link>
              <button type="button" onClick={() => handleDelete(book.id)}>
                Delete Book
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListBooks;
