import { createPortal } from "react-dom";
import { useContext } from "react";
import { ProductContext } from "../Context/ProductContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { toast } from "react-toastify";
import { FaXmark, FaBolt } from "react-icons/fa6";

const CustomConfirmModal = ({ children, onClose, cart, quantity, directBuy }) => {
  const { user }     = useContext(UserContext);
  const { isBuyNow } = useContext(ProductContext);
  const nav          = useNavigate();

  const handleBuyNow = () => {
    if (!user) {
      toast.error("Please login to buy this item");
      onClose();
      return;
    }
    nav("/cartDetails/checkout", { state: { cart, quantity, directBuy } });
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-[#12121a] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 w-full max-w-sm p-6">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/6 border border-white/10 hover:bg-white/12 flex items-center justify-center text-white/50 hover:text-white transition-all duration-200 cursor-pointer"
          aria-label="Close"
        >
          <FaXmark className="w-3.5 h-3.5" />
        </button>

        {/* Icon */}
        <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center mb-4">
          <FaBolt className="w-5 h-5 text-blue-400" />
        </div>

        {/* Message */}
        <h3 className="text-lg font-bold text-white mb-1">Confirm Purchase</h3>
        <p className="text-sm text-white/50 leading-relaxed mb-6">{children}</p>

        {/* Divider */}
        <div className="h-px bg-white/8 mb-5" />

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleBuyNow}
            className="flex-1 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white text-sm font-bold transition-all duration-200 cursor-pointer shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            <FaBolt className="w-3.5 h-3.5" />
            Yes, Buy Now
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-xl bg-white/6 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white/70 hover:text-white text-sm font-bold transition-all duration-200 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default CustomConfirmModal;