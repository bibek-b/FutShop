import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { FaHeart, FaRegHeart, FaCheck } from "react-icons/fa";
import { FaXmark, FaCartShopping, FaBolt, FaStar } from "react-icons/fa6";

import { UserContext } from "../Context/UserContext";
import { useWishlist } from "../Context/WishListContex";
import { toast } from "react-toastify";
import { ProductImgPlaceholder } from "./products/ProductImgPlaceHolder";

/*
here - if we use confirmModal - every mapped child renders its own confirm modal simultaneously which caused this issue: even i clicked inside the confirmModal it gets closed: even you used useClickOutside hook

soln is: move up to page level: Products.jsx
*/

const Cards = ({ id, rating, title, price, onBuyNow }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { handleAddToCart, handleRemoveFromCart, carts } =
    useContext(CartContext);
  const { user } = useContext(UserContext);
  const { productCategory } = useParams();
  const nav = useNavigate();

  const formattedCategory = productCategory?.toLowerCase().trim();
  const inCart =
    isAddedToCart && user && carts.find((c) => c.userId === user._id);
  const inWishlist = isInWishlist(id);

  useEffect(() => {
    setIsAddedToCart(carts?.some((item) => item.id === id) ?? false);
  }, [carts, id]);

  const handleAdd = () => {
    if (!user) {
      toast.error("Please login to add to cart!");
      return;
    }
    setIsAddedToCart(true);
    handleAddToCart({ id, userId: user._id, title, price, rating });
  };

  const handleRemove = () => {
    setIsAddedToCart(false);
    handleRemoveFromCart(id);
  };

  const handleAddToWishlist = () => {
    if (!user) {
      toast.error("Please login to add to wishlist!");
      return;
    }
    addToWishlist({
      id,
      userId: user._id,
      title,
      price,
      rating,
      category: formattedCategory,
    });
  };

  const handleBuyNowConfirm = () => {
    onBuyNow({title, price});
  };


  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#12121a] border border-white/8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 w-[280px]">
     
      {/* ── IMAGE AREA ── */}
      <div className="relative h-[220px] overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 z-10" />

        {/* Placeholder */}
        <ProductImgPlaceholder category={formattedCategory} />

        {/* Fade into card */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-transparent to-transparent pointer-events-none" />

        {/* Wishlist btn */}
        <button
          onClick={
            inWishlist ? () => removeFromWishlist(id) : handleAddToWishlist
          }
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/15 flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110"
        >
          {inWishlist ? (
            <FaHeart className="w-4 h-4 text-pink-400" />
          ) : (
            <FaRegHeart className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors" />
          )}
        </button>

        {/* In-cart badge */}
        {inCart && (
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/20 border border-green-500/40 backdrop-blur-sm">
            <FaCheck className="w-2.5 h-2.5 text-green-400" />
            <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">
              In Cart
            </span>
          </div>
        )}

        {/* Price floats over gradient */}
        <div className="absolute bottom-2 left-4  z-30 ">
          <span className="text-lg font-black text-white drop-shadow-lg">
            RS. {price}
          </span>
        </div>
      </div>

      {/* ── CARD BODY ── */}
      <div className="flex flex-col gap-3 p-4 pt-3 flex-1">
        <h2 className="text-sm font-semibold text-white/90 leading-snug line-clamp-2 min-h-[2.5rem]">
          {title}
        </h2>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={`w-3 h-3 ${i < Math.round(rating) ? "text-yellow-400" : "text-white/15"}`}
              />
            ))}
          </div>
          <span className="text-xs text-white/40 font-medium">
            {rating.toFixed(1)}
          </span>
        </div>

        <div className="h-px bg-white/6" />

        <div className="flex gap-2">
          <button
            onClick={handleBuyNowConfirm}
            className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer shadow-lg shadow-blue-500/20"
          >
            <FaBolt className="w-3 h-3" />
            Buy Now
          </button>

          {inCart ? (
            <button
              onClick={handleRemove}
              className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50 text-red-400 text-xs font-bold transition-all duration-200 cursor-pointer"
            >
              <FaXmark className="w-3.5 h-3.5" />
              Remove
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl bg-white/6 border border-white/10 hover:bg-white/10 hover:border-blue-500/40 text-white/70 hover:text-white text-xs font-bold transition-all duration-200 cursor-pointer"
            >
              <FaCartShopping className="w-3.5 h-3.5" />
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cards;
