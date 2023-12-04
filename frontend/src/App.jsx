import { Routes, Route } from "react-router-dom";
import About_Bookhub from "./pages/About_Bookhub/About_Bookhub";
import Home_Bookhub from "./pages/Home_Bookhub/Home_Bookhub";
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBooks";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import Login from "./pages/Login";
import Register from "./pages/Register";
import useAuth from "./hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const userRole = localStorage.getItem("role");
  useAuth();
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  return (
    <Routes>
      {/* First project's routes */}

      <Route
        path="/home_bookhub"
        element={
          <ProtectedRoute>
            <Home_Bookhub />
          </ProtectedRoute>
        }
      >
        <Route
          path="/home_bookhub/about_bookhub"
          element={
            <ProtectedRoute>
              <About_Bookhub />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home_bookhub/book"
          element={
            <ProtectedRoute>
              <BookList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home_bookhub/book/:id"
          element={
            <ProtectedRoute>
              <BookDetails />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Second project's routes */}

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
          <ProtectedRoute allowedRoles={["admin", "editor"]}>
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
          <ProtectedRoute allowedRoles={["admin", "editor"]}>
            <EditBook />
          </ProtectedRoute>
        }
      />
      <Route
        path="/books/delete/:id"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DeleteBook />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
