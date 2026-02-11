import { createPortal } from "react-dom";
import { useContext } from "react";
import { ProductContext } from "../Context/ProductContext";
import { useNavigate } from "react-router-dom";

const CustomPopupModal = ({ children, onClose, cart, quantity, directBuy }) => {
  
  const { isBuyNow } = useContext(ProductContext);
console.log(quantity)
  const nav = useNavigate();

  const handleBuyNow = () => {
    nav("/cartDetails/checkout", {state: { cart, quantity, directBuy}})
  }

  return createPortal(
    <div className="fixed bg-black/50 inset-0 z-60 flex items-center justify-center ">
      <div className="bg-white pt-15 px-5 pb-5 shadow-lg relative z-70 rounded max-w-100">
        {children}
        <div className="text-white mt-8 space-x-6">
           <button onClick={handleBuyNow} className="bg-blue-600 px-2 py-1 rounded w-15 cursor-pointer bg-blue-700" >Yes</button> 
          {/*{isBuyNow ? : <KhaltiButton
            buttonText="Yes"
            price={price && price}
            styles="bg-blue-600 px-2 py-1 rounded w-15 cursor-pointer bg-blue-700"
          />} */}

          <button
            onClick={onClose}
            className="bg-red-600 px-2 py-1 rounded w-15 cursor-pointer bg-red-700"
          >
            No
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-1 w-8 h-8 right-1  hover:bg-gray-200 cursor-pointer p-0.5 rounded-[50%] "
        >
          X
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default CustomPopupModal;
