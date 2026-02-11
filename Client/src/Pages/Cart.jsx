import React, { useState } from "react";
import Layout from "../Layout/Layout";
import placeholderImage from "../assets/placeholderImage.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { ProductContext } from "../Context/ProductContext";
import CustomPopupModal from "../Components/Custom_Popup_Modal";
import { useEffect } from "react";
import { UserContext } from "../Context/UserContext";

const Cart = () => {
  const { carts, setIsBuyAllCart, setCarts } = useContext(CartContext);
  const {  user } = useContext(UserContext);

  const { setShowModal, showModal, setIsBuyNow, isBuyNow } =
    useContext(ProductContext);
  const [quantity, setQuantity] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [price, setPrice] = useState(null);
  const [cart, setCart] = useState();
  const [productIdx, setProductIdx] = useState(null);

  const nav = useNavigate();

  useEffect(() => {
    setIsBuyNow(false);
  }, []);
  console.log({carts})
  useEffect(() => {
    if (carts && carts.length > 0) {
      setQuantity(Array(carts.length).fill(1));

      const prices = carts.map((c) => c.price);
      setSubTotal(
        prices.reduce((accumulator, currentValue) => accumulator + currentValue)
      );
    }
  }, [carts]);

  const increment = (idx) => {
    setProductIdx(idx);
    setQuantity((prev) => {
      const updatedQuantity = [...prev];

      updatedQuantity[idx] += 1;

      updateSubtotal(updatedQuantity);

      return updatedQuantity;
    });
  };

  const decrement = (idx) => {
    setProductIdx(idx);
    setQuantity((prev) => {
      const updatedQuantity = [...prev];

      if (updatedQuantity[idx] > 1) {
        updatedQuantity[idx] -= 1;
      }
      updateSubtotal(updatedQuantity);

      return updatedQuantity;
    });
  };

  const handleCheckout = () => {
    setIsBuyAllCart(true);
    nav("/cartDetails/checkout", {state: {quantity}});
  };
  const updateSubtotal = (quantities) => {
    const newSubtotal = carts.reduce((acc, item, i) => {
      return acc + item.price * (quantities[i] || 1);
    },0);
    setSubTotal(newSubtotal);
  }

  const handleEmptyCart = () => {
    localStorage.removeItem("cartProducts");
    setCarts("");
    window.reload();
  }
  return (!user) ? (
    <p className="h-[100vh] w-full flex items-center justify-center">
      Please{" "}
      <Link
        className="ml-1 mr-1 text-blue-800 hover:text-blue-900 hover:underline"
        to="/login"
      >
        {" "}
        login
      </Link>{" "}
      to see your cart details
    </p>
  ) : (
    <div className="w-full min-h-[900px] p-2  ">
      {showModal && isBuyNow && (
        <CustomPopupModal
          onClose={() => setShowModal(false)}
          price={price}
          cart={cart}
          quantity={quantity[productIdx] || 1}
        >
          Are You Sure? You Want to Buy Now!
        </CustomPopupModal>
      )}
      <h1 className="text-6xl text-left mt-4  font-bold">Shopping Cart</h1>
      {(carts?.length > 0 && carts.find(c => c.userId === user._id)) ? <div className="flex justify-between hide-scrollbar">
        <div className="flex flex-col w-[50%] mt-10 max-h-[1000px]  overflow-y-scroll">
          {carts?.map((cart, idx) => {
            return (
              <div className="w-[100%]">
                <div className="list w-auto md:w-[70%] flex flex-row px-5 py-2 m-5 border-t-2  border-solid justify-between">
                  <div className="list flex flex-col">
                    <h2 className="text-2xl">{cart.title}</h2>
                    <h4 className="mb-2 text-sm">
                      NRs{" "}
                      <span className="font-bold text-xl">{cart.price}</span>
                    </h4>
                    <p className="text-sm">
                      Rating{" "}
                      <span className="text-xl font-bold">
                        {cart?.rating.toFixed(1)}
                      </span>
                    </p>
                    {/* <p className="text-sm">SIZE | 35</p> */}
                    {/* <p className="text-sm">COLOR | WHITE</p> */}
                    <div className="mt-4">
                      <button
                        className="mr-2 px-4 bg-gray-100 hover:bg-gray-300 cursor-pointer"
                        onClick={() => decrement(idx)}
                      >
                        -
                      </button>
                      <span>{quantity[idx]}</span>
                      <button
                        className="ml-2 px-4 bg-gray-100 hover:bg-gray-300 cursor-pointer"
                        onClick={() => increment(idx)}
                      >
                        +
                      </button>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setPrice(cart.price);
                          setIsBuyNow(true);
                          setCart(cart);
                          setIsBuyAllCart(false);
                        }}
                        className="bg-blue-600 text-white p-1 rounded hover:bg-blue-700 cursor-pointer"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                  <div className="w-40 h-40 overflow-hidden rounded-2xl shadow-lg ">
                    <img
                      src={placeholderImage}
                      alt="jerseys"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="summary md:w-[30%] m-5 shadow-lg p-2 space-y-4 rounded w-auto text-center h-[300px] ">
          <h1 className="text-center text-2xl border-b-1 p-2">Order Summary</h1>
          <div>
            <span className="flex justify-between py-2 px-6">
              <p>Subtotal</p>
              <p>NRs {subTotal}</p>
            </span>
            <span className="flex justify-between py-2 px-6">
              <p>Delivery</p>
              <p>NRs 100</p>
            </span>
          </div>

          <span className="flex justify-between py-2 px-6 text-center text-xl border-y-1 p-2 mb-5">
            <p>Total</p>
            <p>NRs {subTotal + 100}</p>
          </span>

          <button
            className="text-center w-full p-2 rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
            onClick={handleCheckout}
          >
            Check Out
          </button>
        </div>
      </div> : <div className="mt-50 flex items-center justify-center text-xl">Your Cart is empty!</div>}
      <div>
        <button className="absolute right-10 top-30 bg-red-300 rounded p-1 cursor-pointer" onClick={handleEmptyCart}>Empty Cart</button>
      </div>
    </div>
  );
};

export default Cart;
