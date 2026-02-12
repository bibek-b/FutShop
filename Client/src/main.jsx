import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartContextProvider } from "./Context/CartContext.jsx";
import { UserContextProvider } from "./Context/UserContext.jsx";
import { ProductContextProvider } from "./Context/ProductContext.jsx";
import { WishlistProvider } from "./Context/WishListContex.jsx";
import { ToastContainer } from "react-toastify";
import { LoaderContextProvider } from "./Context/LoaderContext.jsx";
import GlobalLoader from "./Components/common/GlobalLoader.jsx";

createRoot(document.getElementById("root")).render(
  <LoaderContextProvider>
    <UserContextProvider>
      <WishlistProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <StrictMode>
              <App />
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                pauseOnFocus
                theme="colored"
              />
              <GlobalLoader />
            </StrictMode>
          </CartContextProvider>
        </ProductContextProvider>
      </WishlistProvider>
    </UserContextProvider>
    ,
  </LoaderContextProvider>,
);
