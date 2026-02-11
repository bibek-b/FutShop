import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Layout/Layout";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Products from "./Pages/Products";
import CheckOut from "./Pages/CheckOut";
import PaymentSuccess from "./Pages/PaymentSuccess";
import PaymentCancel from "./Pages/PaymentCancel";
import AddProduct from "./Pages/AddProduct";
import MyOrders from "./Pages/MyOrders";
import Wishlist from "./Pages/WishList";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cartDetails" element={<Cart />} />
          <Route path="/cartDetails/checkout" element={<CheckOut />} />
          <Route path="/products/:productCategory" element={<Products />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/MyOrders" element={<MyOrders />} />
          <Route path="/mywishlist" element={<Wishlist />} />
        </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
