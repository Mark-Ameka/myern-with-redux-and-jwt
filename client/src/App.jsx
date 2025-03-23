import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import ViewBook from "./pages/books/ViewBook.jsx";
import ChangeBook from "./pages/books/ChangeBook.jsx";

// Higher-Order Component for protected routes
const ProtectedRoute = ({ token, children, redirectTo }) => {
  return token ? children : <Navigate to={redirectTo} />;
};

const App = () => {
  const { token } = useSelector((state) => state.auth);

  const routes = [
    { path: "/home", element: <Home />, protected: true },
    { path: "/login", element: <Login />, protected: false },
    { path: "/register", element: <Register />, protected: false },
    { path: "/update-profile", element: <UpdateProfile />, protected: true },
    { path: "/books/:id", element: <ViewBook />, protected: true },
    { path: "/update-book/:id", element: <ChangeBook />, protected: true },
  ];

  return (
    <Routes>
      {routes.map(({ path, element, protected: diquwbd }) => (
        <Route
          key={path}
          path={path}
          element={
            diquwbd ? (
              <ProtectedRoute token={token} redirectTo="/login">
                {element}
              </ProtectedRoute>
            ) : (
              <ProtectedRoute token={!token} redirectTo="/home">
                {element}
              </ProtectedRoute>
            )
          }
        />
      ))}
    </Routes>
  );
};

export default App;
