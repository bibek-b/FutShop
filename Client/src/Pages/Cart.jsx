import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { ProductContext } from "../Context/ProductContext";
import { UserContext } from "../Context/UserContext";
import { FaTrash, FaMinus, FaPlus, FaBolt } from "react-icons/fa6";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { categoryConfig, fallbackConfig } from "../Components/products/ProductImgPlaceHolder";
import ConfirmModal from '../Components/common/ConfirmModal';



const Cart = () => {
  const { carts, setIsBuyAllCart, setCarts, handleRemoveFromCart } = useContext(CartContext);
  const { user }  = useContext(UserContext);
  const { setShowModal, showModal, setIsBuyNow, isBuyNow } = useContext(ProductContext);

  const [quantities, setQuantities] = useState([]);
  const [subTotal,   setSubTotal]   = useState(0);
  const [price,      setPrice]      = useState(null);
  const [cart,       setCart]       = useState(null);
  const [productIdx, setProductIdx] = useState(null);

  const nav = useNavigate();

  const userCarts = carts?.filter((c) => c.userId === user?._id) ?? [];

  useEffect(() => { setIsBuyNow(false); }, []);

  useEffect(() => {
    if (userCarts.length > 0) {
      setQuantities(Array(userCarts.length).fill(1));
      setSubTotal(userCarts.reduce((acc, c) => acc + c.price, 0));
    }
  }, [carts]);

  const updateSubtotal = (qtys) => {
    setSubTotal(userCarts.reduce((acc, item, i) => acc + item.price * (qtys[i] || 1), 0));
  };

  const increment = (idx) => {
    setProductIdx(idx);
    setQuantities((prev) => {
      const next = [...prev];
      next[idx] += 1;
      updateSubtotal(next);
      return next;
    });
  };

  const decrement = (idx) => {
    setProductIdx(idx);
    setQuantities((prev) => {
      const next = [...prev];
      if (next[idx] > 1) next[idx] -= 1;
      updateSubtotal(next);
      return next;
    });
  };

  const handleCheckout = () => {
    setIsBuyAllCart(true);
    nav("/cartDetails/checkout", { state: { quantity: quantities } });
  };

  const handleEmptyCart = () => {
    localStorage.removeItem("cartProducts");
    setCarts([]);
  };


  // ── Not logged in ──
  if (!user) return (
    <div className="min-h-screen bg-[#07070d] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
          <FaShoppingCart className="w-6 h-6 text-blue-500/50" />
        </div>
        <p className="text-white/60 text-lg font-semibold">You're not logged in</p>
        <p className="text-white/30 text-sm">Please log in to view your cart.</p>
        <Link to="/login" className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors duration-200">
          Sign In
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#07070d] text-white px-6 md:px-16 py-10">

        {/* <ConfirmModal
          onClose={() => setShowModal(false)}
          price={price}
          cart={cart}
          quantity={quantities[productIdx] || 1}
        /> */}

      {/* Header */}
      <div className="mb-10 flex items-start justify-between">
        <div>
          <p className="text-xs font-bold tracking-[4px] uppercase text-blue-400 mb-2">Checkout</p>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Shopping Cart</h1>
            {userCarts.length > 0 && (
              <span className="px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-sm font-bold">
                {userCarts.length}
              </span>
            )}
          </div>
          <div className="w-10 h-0.5 bg-blue-500 rounded-full mt-3" />
        </div>

        {userCarts.length > 0 && (
          <button
            onClick={handleEmptyCart}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/25 hover:bg-red-500/20 text-red-400 text-xs font-bold transition-all duration-200 cursor-pointer mt-2"
          >
            <FaTrash className="w-3 h-3" />
            Empty Cart
          </button>
        )}
      </div>

      {/* Empty state */}
      {userCarts.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-5 py-32 text-center">
          <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <FaShoppingCart className="w-8 h-8 text-blue-500/40" />
          </div>
          <div>
            <p className="text-white/60 text-lg font-semibold">Your cart is empty</p>
            <p className="text-white/30 text-sm mt-1">Add some items to get started.</p>
          </div>
          <Link to="/products/football balls" className="mt-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors duration-200">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Cart items */}
          <div className="flex-1 flex flex-col gap-4">
            {userCarts.map((item, idx) => {
              const cat    = item.title?.toLowerCase().trim();
              const config = categoryConfig[cat] ?? fallbackConfig;
              const rowTotal = item.price * (quantities[idx] || 1);

              return (
                <div
                  key={item.id || idx}
                  className="flex items-center gap-4 bg-[#12121a] border border-white/8 hover:border-blue-500/30 rounded-2xl p-4 transition-colors duration-200"
                >
                  {/* Placeholder thumbnail */}
                  <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shrink-0 border border-white/8`}>
                    {config.icon}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-semibold text-white/90 line-clamp-2 leading-snug">{item.title}</h2>
                    <div className="flex items-center gap-1 mt-1">
                      <FaStar className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs text-white/40">{item.rating?.toFixed(1)}</span>
                    </div>
                    <p className="text-base font-black text-white mt-1">RS. {item.price.toLocaleString()}</p>
                  </div>

                  {/* Quantity stepper */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => decrement(idx)}
                      className="w-7 h-7 rounded-lg bg-white/6 border border-white/10 hover:bg-white/12 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
                    >
                      <FaMinus className="w-2.5 h-2.5" />
                    </button>
                    <span className="w-6 text-center text-sm font-bold text-white">{quantities[idx] || 1}</span>
                    <button
                      onClick={() => increment(idx)}
                      className="w-7 h-7 rounded-lg bg-white/6 border border-white/10 hover:bg-white/12 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
                    >
                      <FaPlus className="w-2.5 h-2.5" />
                    </button>
                  </div>

                  {/* Row total */}
                  <span className="text-sm font-black text-white w-24 text-right shrink-0">
                    RS. {rowTotal.toLocaleString()}
                  </span>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => { setShowModal(true); setPrice(item.price); setIsBuyNow(true); setCart(item); setIsBuyAllCart(false); }}
                      className="flex items-center justify-center gap-1 w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors duration-200 cursor-pointer"
                      title="Buy Now"
                    >
                      <FaBolt className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="flex items-center justify-center w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/25 hover:bg-red-500/20 text-red-400 transition-colors duration-200 cursor-pointer"
                      title="Remove"
                    >
                      <FaTrash className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order summary */}
          <div className="lg:w-80 w-full bg-[#12121a] border border-white/8 rounded-2xl p-6 flex flex-col gap-4 shrink-0">
            <h2 className="text-lg font-black text-white">Order Summary</h2>
            <div className="h-px bg-white/8" />

            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm text-white/50">
                <span>Subtotal ({userCarts.length} item{userCarts.length !== 1 ? "s" : ""})</span>
                <span>RS. {subTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-white/50">
                {/* <span>Delivery</span>
                <span>RS. {DELIVERY.toLocaleString()}</span> */}
              </div>
            </div>

            <div className="h-px bg-white/8" />

            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-white/80">Total</span>
              <span className="text-2xl font-black text-white">RS. {(subTotal).toLocaleString()}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-sm font-bold transition-all duration-200 cursor-pointer shadow-lg shadow-blue-500/20"
            >
              Checkout
            </button>

            <Link
              to="/products/football balls"
              className="text-center text-xs text-white/30 hover:text-white/60 transition-colors duration-200"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;