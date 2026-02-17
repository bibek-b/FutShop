import { useContext } from "react";
import { FaXmark } from "react-icons/fa6";
import { ConfirmModalContext } from "../../Context/ConfirmModalContext";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

const ConfirmModal = ({
  confirmColor,
  ConfirmIcon,
  confirmBtnTxt,
  detail,
  onConfirm,
  title,
}) => {
  const { isModalOpen, hideConfirmModal } = useContext(ConfirmModalContext);
  const ref = useRef();


  useClickOutside(ref, hideConfirmModal);

  useLockBodyScroll(isModalOpen);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-discrete duration-300 bg-black/20 backdrop-blur-sm px-4 ${isModalOpen ? "opacity-100 z-50" : "opacity-0 -z-10"}`}
    >
      <div
        ref={ref}
        className="relative bg-[#12121a] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 w-full max-w-sm p-6"
      >
        {/* Close button */}
        <button
          onClick={hideConfirmModal}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/6 border border-white/10 hover:bg-white/12 flex items-center justify-center text-white/50 hover:text-white transition-all duration-200 cursor-pointer"
          aria-label="Close"
        >
          <FaXmark className="w-3.5 h-3.5" />
        </button>

        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-2xl bg-${confirmColor}-500/15 border border-${confirmColor}-500/25 flex items-center justify-center mb-4`}
        >
          <ConfirmIcon className={`w-5 h-5 text-${confirmColor}-400`} />
        </div>

        {/* Message */}
        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
        <p className="text-sm text-white/50 leading-relaxed mb-6">{detail}</p>

        {/* Divider */}
        <div className="h-px bg-white/8 mb-5" />

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className={`flex-1 h-10 rounded-xl bg-${confirmColor}-600 hover:bg-${confirmColor}-500 active:scale-[0.98] text-white text-sm font-bold transition-all duration-200 cursor-pointer shadow-lg shadow-${confirmColor}-500/20 flex items-center justify-center gap-2`}
          >
            <ConfirmIcon className="w-3.5 h-3.5" />
            {confirmBtnTxt}
          </button>
          <button
            onClick={hideConfirmModal}
            className="flex-1 h-10 rounded-xl bg-white/6 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white/70 hover:text-white text-sm font-bold transition-all duration-200 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
