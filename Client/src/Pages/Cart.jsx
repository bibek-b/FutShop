import React, { useState } from "react";
import Layout from "../Layout/Layout";
import jerseys from "../assets/jerseys.jpg";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const increment = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  return (
    <div className="w-full h-[100vh]">
      <h1 className="text-6xl text-center mt-4 font-bold">Shopping Cart</h1>
      <div className="flex flex-col md:flex-row mt-10">
        <div className="w-[100%]">
          <div className="list w-auto md:w-[70%] flex flex-row px-5 py-2 m-5 border-t-2  border-solid justify-between">
          <div className="list flex flex-col">
            <h2 className="text-2xl">Name of the product</h2>
            <h4 className="mb-2">NRs 1500</h4>
            <p className="text-sm">SIZE | 35</p>
            <p className="text-sm">COLOR | WHITE</p>
            <div className="mt-4">
              <button
                className="mr-2 px-4 bg-gray-100 hover:bg-gray-300"
                onClick={decrement}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="ml-2 px-4 bg-gray-100 hover:bg-gray-300"
                onClick={increment}
              >
                +
              </button>
            </div>
          </div>
          <div className="w-40 h-40 overflow-hidden rounded-2xl">
            <img src={jerseys} alt="jerseys" className="object-contain" />
          </div>
        </div>

        <div className="list w-auto md:w-[70%] flex flex-row px-5 py-2 m-5 border-t-2  border-solid justify-between">
          <div className="list flex flex-col">
            <h2 className="text-2xl">Name of the product</h2>
            <h4 className="mb-2">NRs 1500</h4>
            <p className="text-sm">SIZE | 35</p>
            <p className="text-sm">COLOR | WHITE</p>
            <div className="mt-4">
              <button
                className="mr-2 px-4 bg-gray-100 hover:bg-gray-300"
                onClick={decrement}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="ml-2 px-4 bg-gray-100 hover:bg-gray-300"
                onClick={increment}
              >
                +
              </button>
            </div>
          </div>
          <div className="w-40 h-40 overflow-hidden rounded-2xl">
            <img src={jerseys} alt="jerseys" className="object-contain" />
          </div>
        </div>
        </div>

        <div className="summary md:w-[30%] m-5 border-2 border-solid w-auto h-fit ">
          <h1 className="text-center text-2xl border-b-2 p-2">Order Summary</h1>
          <div>
            <span className="flex justify-between py-2 px-6">
              <p>Subtotal</p>
              <p>NRs 2000</p>
            </span>
            <span className="flex justify-between py-2 px-6">
              <p>Delivery</p>
              <p>Free</p>
            </span>
            <span className="flex justify-between py-2 px-6">
              <p>Subtotal</p>
              <p>NRs 2000</p>
            </span>
          </div>

          <span className="flex justify-between py-2 px-6 text-center text-xl border-y-2 p-2 ">
            <p>Total</p>
            <p>NRs 4000</p>
          </span>

          <button className="text-center p-4 w-full  bg-gray-100 hover:bg-gray-200">
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
