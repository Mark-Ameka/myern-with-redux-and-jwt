import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetMessages, updateProfile } from "../redux/slices/authSlice";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.auth);
  const [updateUser, setUpdateUser] = useState({
    username: localStorage.getItem("user"),
    password: "",
  });

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProfile(updateUser));
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
            value={updateUser.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={updateUser.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>

      <Link to={"/home"}>Back</Link>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  );
};

export default UpdateProfile;
