import { useWishlist } from "../Context/WishListContex";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";
import { FaHeart, FaTrash, FaCartShopping } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { GiSoccerBall, GiGloves, GiShirt } from "react-icons/gi";
import { PiSneakerFill } from "react-icons/pi";
import { toast } from "react-toastify";
import { categoryConfig, fallbackConfig } from "../Components/products/ProductImgPlaceHolder";


const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { handleAddToCart, carts } = useContext(CartContext);
  const { user } = useContext(UserContext);

  const handleAddToCart_ = (item) => {
    if (!user) {
      toast.error("Please login to add to cart!");
      return;
    } 
    //toast mssg handled by this context
    handleAddToCart({
      id: item.id,
      userId: user._id,
      title: item.title,
      price: item.price,
      rating: item.rating,
      category: item.category
    });
  };
  return (
    <div className="min-h-screen bg-[#07070d] text-white px-6 md:px-16 py-10">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-bold tracking-[4px] uppercase text-pink-400 mb-2">
          Saved Items
        </p>
        <div className="flex items-center gap-3">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            My Wishlist
          </h1>
          {wishlist.length > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-400 text-sm font-bold">
              {wishlist.length}
            </span>
          )}
        </div>
        <div className="w-10 h-0.5 bg-pink-500 rounded-full mt-3" />
      </div>

      {/* Empty state */}
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-5 py-32 text-center">
          <div className="w-20 h-20 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
            <FaHeart className="w-8 h-8 text-pink-500/40" />
          </div>
          <div>
            <p className="text-white/60 text-lg font-semibold">
              Your wishlist is empty
            </p>
            <p className="text-white/30 text-sm mt-1">
              Save items you love and come back to them anytime.
            </p>
          </div>
          <Link
            to="/products/football balls"
            className="mt-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors duration-200"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {wishlist.map((item) => {
            const cat = item.category?.toLowerCase().trim();
            const config = categoryConfig[cat] ?? fallbackConfig;
            const inCart = carts?.some((c) => c.id === item.id);

            return (
              <div
                key={item.id}
                className="group flex flex-col rounded-2xl overflow-hidden bg-[#12121a] border border-white/8 hover:border-pink-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10"
              >
                {/* Placeholder image area */}
                <div
                  className={`relative h-40 bg-gradient-to-br ${config.gradient} flex items-center justify-center overflow-hidden`}
                >
                  <div className="absolute w-32 h-32 rounded-full bg-white/5 blur-2xl animate-pulse" />
                  <div className="relative z-10 p-4 rounded-xl bg-black/30 border border-white/10 backdrop-blur-sm">
                    {config.icon}
                  </div>
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500" />
                  {/* Fade into card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Body */}
                <div className="flex flex-col gap-2.5 p-4 flex-1">
                  <h2 className="text-sm font-semibold text-white/90 leading-snug line-clamp-2 min-h-[2.5rem]">
                    {item.title}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-3 h-3 ${i < Math.round(item.rating) ? "text-yellow-400" : "text-white/15"}`}
                      />
                    ))}
                    <span className="text-xs text-white/40 ml-0.5">
                      {item.rating?.toFixed(1)}
                    </span>
                  </div>

                  {/* Price */}
                  <p className="text-lg font-black text-white">
                    RS. {item.price}
                  </p>

                  <div className="h-px bg-white/6 my-0.5" />

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => handleAddToCart_(item)}
                      disabled={inCart}
                      className={`flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer
                        ${
                          inCart
                            ? "bg-green-500/15 border border-green-500/30 text-green-400 cursor-default"
                            : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                        }`}
                    >
                      <FaCartShopping className="w-3.5 h-3.5" />
                      {inCart ? "In Cart" : "Add to Cart"}
                    </button>

                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/25 hover:bg-red-500/20 hover:border-red-500/50 text-red-400 flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0"
                      aria-label="Remove"
                    >
                      <FaTrash className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
