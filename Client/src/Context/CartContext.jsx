import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);
  const [isBuyAllCart, setIsBuyAllCart] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setCarts(JSON.parse(localStorage.getItem("cartProducts")));
  },[])

  const handleAddToCart = (data) => {
    const product = {
      userId:data.userId,
      id: data.id,
      title: data.title,
      rating: data.rating,
      price: data.price,
    };

    
    //get the carts from localstorage
    const existingCart = JSON.parse(localStorage.getItem("cartProducts")) || [];
    console.log(existingCart)
    console.log(user)
    //check user has product in cart
    const userCart = existingCart.filter(item => item.userId === user._id);

    //check for duplicates
    const isAlreadyInCart = userCart.some((item) => item.id === product.id);
    
    if (!isAlreadyInCart ) {
      const updatedCart = [...existingCart, product];
      
      localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
      setCarts((prev) => [...prev, product]);
      alert("Product added to cart!")
    } else {
      alert("This product is already in cart!");
      return;
    }
  };
  const handleRemoveFromCart = (productId) => {
    const existingCart = JSON.parse(localStorage.getItem("cartProducts")) || [];

    const isInCart = existingCart.some(p => p.id === productId);

    if(isInCart) {
      const updatedCart = existingCart.filter(e => e.id !== productId);
      localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
      setCarts(updatedCart);
      alert("Product removed from cart!");
    } else {
      alert("The product is not in cart!")
    }

  };

  return (
    <CartContext.Provider value={{ handleAddToCart, handleRemoveFromCart, carts, setCarts, setIsBuyAllCart, isBuyAllCart }}>
      {children}
    </CartContext.Provider>
  );
};
