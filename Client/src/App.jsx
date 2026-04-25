import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Layout/Layout";

import { lazy, Suspense } from "react";
import SuspenseLoader from "./Components/common/SuspenseLoader";

const Register = lazy(() => import("./Pages/Register"));
const Login = lazy(() => import("./Pages/Login"));
const Cart = lazy(() => import("./Pages/Cart"));
const Products = lazy(() => import("./Pages/Products"));
const CheckOut = lazy(() => import("./Pages/CheckOut"));
const PaymentSuccess = lazy(() => import("./Pages/PaymentSuccess"));
const PaymentCancel = lazy(() => import("./Pages/PaymentCancel"));
const AddProduct = lazy(() => import("./Pages/AddProduct"));
const WishList = lazy(() => import("./Pages/WishList"));

const App = () => {
  return (
    <BrowserRouter>
     <Suspense fallback={<SuspenseLoader />}>
       <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cartDetails" element={<Cart />} />
          <Route path="/cartDetails/checkout" element={<CheckOut />} />
          <Route path="/products/:productCategory" element={<Products />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/mywishlist" element={<WishList />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
     </Suspense>
    </BrowserRouter>
  );
};

export default App;
