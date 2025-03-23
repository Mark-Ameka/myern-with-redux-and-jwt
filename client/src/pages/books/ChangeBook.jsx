import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getBook,
  resetMessages,
  updateBook,
} from "../../redux/slices/bookSlice";
import { Link } from "react-router-dom";

const ChangeBook = () => {
  const { id } = useParams();

  const [updatedBook, setUpdatedBook] = useState({
    book_name: "",
    book_description: "",
    book_author: "",
  });

  const dispatch = useDispatch();
  const { error, success, book } = useSelector((state) => state.book);

  useEffect(() => {
    dispatch(getBook(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (book) {
      setUpdatedBook(book);
    }
  }, [book]);

  const handleChange = (e) => {
    setUpdatedBook({ ...updatedBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateBook({ id, newBook: updatedBook }));
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
            value={updatedBook.book_name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Book Description:
          <textarea
            name="book_description"
            value={updatedBook.book_description}
            onChange={handleChange}
          ></textarea>
        </label>
        <br />
        <label>
          Book Author:
          <input
            type="text"
            name="book_author"
            value={updatedBook.book_author}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Update Book</button>
      </form>
      <Link to={"/home"}>Back</Link>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  );
};

export default ChangeBook;
