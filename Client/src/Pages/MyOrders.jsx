import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";
import { FaBox, FaShoppingCart } from "react-icons/fa";

const MyOrders = () => {
  const { user }  = useContext(UserContext);
  const { carts } = useContext(CartContext);

  const userOrders = carts?.filter((c) => c.userId === user?._id) ?? [];

  const totalPrice = userOrders.reduce((sum, item) => {
    return sum + item.price * (item.quantity || 1);
  }, 0);

  return (
    <div className="min-h-screen bg-[#07070d] text-white px-6 md:px-16 py-10">

      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-bold tracking-[4px] uppercase text-blue-400 mb-2">Account</p>
        <div className="flex items-center gap-3">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">My Orders</h1>
          {userOrders.length > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-sm font-bold">
              {userOrders.length}
            </span>
          )}
        </div>
        <div className="w-10 h-0.5 bg-blue-500 rounded-full mt-3" />
      </div>

      {/* Empty state */}
      {userOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-5 py-32 text-center">
          <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <FaBox className="w-8 h-8 text-blue-500/40" />
          </div>
          <div>
            <p className="text-white/60 text-lg font-semibold">No orders yet</p>
            <p className="text-white/30 text-sm mt-1">Add some items to your cart to get started.</p>
          </div>
          <Link
            to="/products/football balls"
            className="mt-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors duration-200"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6 max-w-4xl">

          {/* Order rows */}
          <div className="rounded-2xl border border-white/8 overflow-hidden bg-[#12121a]">
            {/* Table header */}
            <div className="grid grid-cols-4 px-5 py-3 bg-white/4 border-b border-white/8">
              {["Product", "Qty", "Unit Price", "Total"].map((h) => (
                <span key={h} className="text-[11px] font-bold tracking-[2px] uppercase text-white/40">
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            {userOrders.map((item, i) => (
              <div
                key={item.id}
                className={`grid grid-cols-4 items-center px-5 py-4 transition-colors duration-150 hover:bg-white/3 ${
                  i !== userOrders.length - 1 ? "border-b border-white/6" : ""
                }`}
              >
                {/* Name */}
                <div className="flex items-center gap-3 pr-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <FaShoppingCart className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-white/85 line-clamp-2 leading-snug">
                    {item.title}
                  </span>
                </div>

                {/* Qty */}
                <div>
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white/6 border border-white/10 text-sm font-bold text-white/70">
                    {item.quantity || 1}
                  </span>
                </div>

                {/* Unit price */}
                <span className="text-sm text-white/60 font-medium">
                  RS. {item.price.toLocaleString()}
                </span>

                {/* Row total */}
                <span className="text-sm font-bold text-white">
                  RS. {(item.price * (item.quantity || 1)).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Total summary card */}
          <div className="self-end rounded-2xl border border-white/8 bg-[#12121a] p-5 min-w-[280px]">
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between text-sm text-white/50">
                <span>Subtotal ({userOrders.length} item{userOrders.length !== 1 ? "s" : ""})</span>
                <span>RS. {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-white/50">
                <span>Shipping</span>
                <span className="text-green-400 font-semibold">Free</span>
              </div>
              <div className="h-px bg-white/8 my-1" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-white/80">Total</span>
                <span className="text-xl font-black text-white">RS. {totalPrice.toLocaleString()}</span>
              </div>
            </div>
            <button className="mt-4 w-full h-10 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-colors duration-200 cursor-pointer">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;