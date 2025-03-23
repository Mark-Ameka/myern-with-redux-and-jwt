import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, resetMessages } from "../redux/slices/authSlice";
import { Link } from "react-router-dom";

const Register = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(register(newUser));
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
            value={newUser.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Login</Link>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  );
};

export default Register;
