import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import CartProvider from "./context/CartContext.jsx";
import { AppProvider } from "./context/OpenLibraryContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <AppProvider>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </AppProvider>
    </CartProvider>
  </BrowserRouter>
);
