import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import ViewBook from "./pages/books/ViewBook.jsx";
import ChangeBook from "./pages/books/ChangeBook.jsx";
import { useSelector } from "react-redux";

const App = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route
        path="/home"
        element={token ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!token ? <Login /> : <Navigate to="/home" />}
      />
      <Route
        path="/register"
        element={!token ? <Register /> : <Navigate to="/home" />}
      />
      <Route
        path="/update-profile"
        element={token ? <UpdateProfile /> : <Navigate to="/login" />}
      />

      {/* books */}

      <Route
        path="/books/:id"
        element={token ? <ViewBook /> : <Navigate to="/login" />}
      />

      <Route
        path="/update-book/:id"
        element={token ? <ChangeBook /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default App;
