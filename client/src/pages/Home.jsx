import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { Link } from "react-router-dom";

import CreateBook from "./books/CreateBook";
import ListBooks from "./books/ListBooks";
import { searchBook } from "../redux/slices/bookSlice";

const Home = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const { erro } = useSelector((state) => state.book);

  const handleSearch = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    dispatch(searchBook(newQuery));
  };

  return (
    <div>
      this is home. you are authenticated.
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(logout());
        }}
      >
        <button type="submit">Logout</button>
      </form>
      <Link to={"/update-profile"}>
        <button type="button">Update Profile</button>
      </Link>
      <div>
        <CreateBook />
      </div>
      <input
        type="text"
        placeholder="Search for an item..."
        value={query}
        onChange={handleSearch}
      />
      <button type="submit">Search</button>
      <div>
        <ListBooks />
      </div>
    </div>
  );
};

export default Home;
