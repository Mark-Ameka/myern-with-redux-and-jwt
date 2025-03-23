import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBook } from "../../redux/slices/bookSlice";
import { Link } from "react-router-dom";

const ViewBook = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { book, loading } = useSelector((state) => state.book);

  useEffect(() => {
    dispatch(getBook(id));
  }, [dispatch, id]);

  return (
    <div>
      {loading ? (
        <p>Loading book...</p>
      ) : book ? (
        <div>
          <h1>{book.book_name}</h1>
          <p>{book.book_description}</p>
          <p>{book.book_author}</p>
        </div>
      ) : (
        <p>Book not found</p>
      )}

      <Link to={"/home"}>Back</Link>
    </div>
  );
};

export default ViewBook;
