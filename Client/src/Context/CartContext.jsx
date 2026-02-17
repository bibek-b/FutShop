import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { UserContext } from "./UserContext";
import { toast } from "react-toastify";
import { ConfirmModalContext } from "./ConfirmModalContext";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);
  const [isBuyAllCart, setIsBuyAllCart] = useState(false);
  const { user } = useContext(UserContext);
  const { hideConfirmModal } = useContext(ConfirmModalContext);

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
      category: data.category
    };

    
    //get the carts from localstorage
    const existingCart = JSON.parse(localStorage.getItem("cartProducts")) || [];
    //check user has product in cart
    const userCart = existingCart.filter(item => item.userId === user._id);

    //check for duplicates
    const isAlreadyInCart = userCart.some((item) => item.id === product.id);
    
    if (!isAlreadyInCart ) {
      const updatedCart = [...existingCart, product];
      
      localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
      carts.length > 0  && setCarts((prev) => [...prev, product]);
      toast.success("Product added to cart!")
    } else {
      toast.error("This product is already in cart!");
      return;
    }
  };
  const removeFromCart = (productId) => {
    const existingCart = JSON.parse(localStorage.getItem("cartProducts")) || [];

    const isInCart = existingCart.some(p => p.id === productId);

    if(isInCart) {
      const updatedCart = existingCart.filter(e => e.id !== productId);
      localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
      setCarts(updatedCart);
      toast.success("Product removed from cart!");
    } else {
      toast.error("The product is not in cart!")
    }

    hideConfirmModal()

  };

  const isInCart = (id) => carts.some(item=>item.id === id);

  return (
    <CartContext.Provider value={{ handleAddToCart, removeFromCart, carts, setCarts, setIsBuyAllCart, isBuyAllCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};
