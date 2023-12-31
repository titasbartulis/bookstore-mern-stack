import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBooks";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import Login from "./pages/Login";
import Register from "./pages/Register";
import useAuth from "./hooks/useAuth";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const userRole = localStorage.getItem('role');
  useAuth();
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    console.log('Not allowed');
  }
  return children;
};

const App = () => {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/books/create"
        element={
          <ProtectedRoute allowedRoles={['admin', 'editor']}>
            <CreateBook />
          </ProtectedRoute>
        }
      />
      <Route
        path="/books/details/:id"
        element={
          <ProtectedRoute>
            <ShowBook />
          </ProtectedRoute>
        }
      />
      <Route
        path="/books/edit/:id"
        element={
          <ProtectedRoute allowedRoles={['admin', 'editor']}>
            <EditBook />
          </ProtectedRoute>
        }
      />
      <Route
        path="/books/delete/:id"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DeleteBook />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
