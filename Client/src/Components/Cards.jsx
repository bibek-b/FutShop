import { useState, useEffect, useContext } from "react";
import cart from "../assets/cart.svg";
import { dummyData } from "../dummyData";
import { useParams } from "react-router-dom";
import CustomPopupModal from "./Custom_Popup_Modal";
import { CartContext } from "../Context/CartContext";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { ProductContext } from "../Context/ProductContext";
import { UserContext } from "../Context/UserContext";
import ballPlaceholderImg from "../assets/ball-placeholderImage.jpg";
import bootPlaceholderImg from "../assets/boot-placeholderImage.jpg";
import jerseyPlaceholderImg from "../assets/jersey-placeholderImage.jpg";
import glovesPlaceholderImg from "../assets/gloves-placeholderImage.jpg";
import placeholderImage from "../assets/placeholderImage.jpg";
import { useWishlist } from "../Context/WishListContex";

const Cards = ({ id, rating, title, price }) => {
  const [product, setProduct] = useState([]);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [productId, setProductId] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlist();

  const { handleAddToCart, handleRemoveFromCart, carts } =
    useContext(CartContext);
  const { setIsBuyNow } = useContext(ProductContext);
  const { user } = useContext(UserContext);

  const { productCategory } = useParams();

  useEffect(() => {
    const isAdded = carts?.some((item) => item.id === id);
    if (isAdded) {
      setIsAddedToCart(true);
    }
  }, []);

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  }, [showMessage]);

  useEffect(() => {
    const getProductList = () => {
      setProduct(
        dummyData.filter((d) =>
          d.productCategory
            .toLowerCase()
            .includes(productCategory.toLowerCase())
        )
      );
    };
    getProductList();
  }, []);

  const handleAdd = () => {
    if (!user) {
      alert("Please login to add product to cart!");
      return;
    }

    setIsAddedToCart(true);
    const data = { id, userId: user._id, title, price, rating };
    handleAddToCart(data);
  };
  const handleRemove = (productId) => {
    setIsAddedToCart(false);
    setShowMessage(true);
    handleRemoveFromCart(productId);
  };

  const handleAddToWishlist = () => {
    if (!user) {
      alert("Please login to add to wishlist!");
      return;
    }

    const item = { id, userId: user._id, title, price, rating };
    addToWishlist(item);
  };

  const handleRemoveFromWishlist = () => {
    removeFromWishlist(id);
  };

  const directBuy = {
    title,
    price,
    quantity,
  };

  const formattedCategory = productCategory.toLowerCase().trim();

  return (
    <>
      {showModal  && (
        <CustomPopupModal
          onClose={() => setShowModal(false)}
          directBuy={directBuy}
        >
          Are You Sure? You Want to Buy Now!
        </CustomPopupModal>
      )}

      <div className="max-h-[500px] flex items-center justify-center flex-col p-3 rounded shadow-lg space-y-4 relative">
        {isAddedToCart && user && carts.find((c) => c.userId === user._id) && (
          <span className="flex items-center justify-center gap-2 bg-yellow-400 absolute top-1/2 rounded p-2 text-white">
            <FaCheck />
            Added to cart
          </span>
        )}

        <img
          src={
            formattedCategory === "football balls"
              ? ballPlaceholderImg
              : formattedCategory === "football boots"
              ? bootPlaceholderImg
              : formattedCategory === "football jerseys"
              ? jerseyPlaceholderImg
              : formattedCategory === "gk gloves"
              ? glovesPlaceholderImg
              : placeholderImage
          }
          alt="productImg"
          className="h-65 w-70 object-cover rounded"
        />

        <div className="space-y-2 min-w-[320px] max-w-[320px]">
          <div className="flex flex-col gap-2 font-bold text-2xl">
            <h2>{title}</h2>
            <span className="text-sm">⭐⭐⭐⭐⭐ {rating.toFixed(1)}</span>
            <span>RS. {price}</span>
          </div>

          <div className="flex flex-wrap justify-between items-center pt-4 gap-2">
            <button
              onClick={() => {
                setShowModal(true);
                setIsBuyNow(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer flex items-center justify-center gap-2 rounded text-sm px-3 py-2 text-white"
            >
              Buy Now
            </button>

            {isAddedToCart &&
            user &&
            carts.find((c) => c.userId === user._id) ? (
              <button
                onClick={() => handleRemove(id)}
                className="bg-red-600 hover:bg-red-700 cursor-pointer flex items-center justify-center gap-2 rounded text-sm px-3 py-2 text-white"
              >
                <FaXmark />
                Remove from cart
              </button>
            ) : (
              <button
                onClick={handleAdd}
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer flex items-center justify-center gap-2 rounded text-sm px-3 py-2 text-white"
              >
                <img src={cart} alt="cartIcon" className="w-5" />
                Add to cart
              </button>
            )}

            {isInWishlist(id) ? (
              <button
                onClick={handleRemoveFromWishlist}
                className="bg-pink-600 hover:bg-pink-700 cursor-pointer flex items-center justify-center gap-2 rounded text-sm px-3 py-2 text-white"
              >
                💔 Remove from Wishlist
              </button>
            ) : (
              <button
                onClick={handleAddToWishlist}
                className="bg-pink-500 hover:bg-pink-600 cursor-pointer flex items-center justify-center gap-2 rounded text-sm px-3 py-2 text-white"
              >
                ❤️ Add to Wishlist
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
