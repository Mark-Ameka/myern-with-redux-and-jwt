import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, resetMessages } from "../redux/slices/authSlice";
import { resetBooks } from "../redux/slices/bookSlice";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(resetBooks());
    dispatch(login(user));
  };

  useEffect(() => {
    dispatch(resetMessages());
  }, [dispatch]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <Link to={"/register"}>Register</Link>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  );
};

export default Login;
