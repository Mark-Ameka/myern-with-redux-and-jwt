import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBook } from "../../redux/slices/bookSlice";
import { resetMessages } from "../../redux/slices/bookSlice";

const CreateBook = () => {
  const [newBook, setNewBook] = useState({
    book_name: "",
    book_description: "",
    book_author: "",
  });

  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.book);

  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createBook(newBook));
  };

  useEffect(() => {
    if (error || success) {
      setTimeout(() => {
        dispatch(resetMessages());
      }, 2000);
    }
  }, [dispatch, error, success]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Book Name:
          <input
            type="text"
            name="book_name"
            value={newBook.book_name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Book Description:
          <textarea
            name="book_description"
            value={newBook.book_description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Book Author:
          <input
            type="text"
            name="book_author"
            value={newBook.book_author}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Create Book</button>
      </form>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  );
};

export default CreateBook;
