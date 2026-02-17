import nepal from "../assets/nepal-flag-icon.webp";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { UserContext } from "../Context/UserContext";
import { loadStripe } from "@stripe/stripe-js";
import apiCall from "../Custom-Hooks/apiCall";
import { LoaderContext } from "../Context/LoaderContext";
import { FaLock, FaTruck, FaTag } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa6";
import { GiSoccerBall, GiGloves, GiShirt } from "react-icons/gi";
import { PiSneakerFill } from "react-icons/pi";

const FIELDS = [
  {
    key: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "John Doe",
  },
  {
    key: "email",
    label: "Email Address",
    type: "email",
    placeholder: "john@example.com",
  },
  { key: "province", label: "Province", type: "text", placeholder: "Bagmati" },
  { key: "city", label: "City", type: "text", placeholder: "Kathmandu" },
  {
    key: "address",
    label: "Street Address",
    type: "text",
    placeholder: "123 Main St",
  },
];

// Reuse same placeholder icons as Cards
const categoryConfig = {
  "football balls": {
    gradient: "from-blue-900 to-indigo-900",
    icon: <GiSoccerBall className="w-7 h-7 text-blue-300/70" />,
  },
  "football boots": {
    gradient: "from-orange-900 to-rose-900",
    icon: <PiSneakerFill className="w-7 h-7 text-orange-300/70" />,
  },
  "football jerseys": {
    gradient: "from-green-900 to-teal-900",
    icon: <GiShirt className="w-7 h-7 text-green-300/70" />,
  },
  "gk gloves": {
    gradient: "from-purple-900 to-fuchsia-900",
    icon: <GiGloves className="w-7 h-7 text-purple-300/70" />,
  },
};
const fallback = {
  gradient: "from-gray-900 to-slate-800",
  icon: <GiSoccerBall className="w-7 h-7 text-white/20" />,
};

const ItemThumb = ({ title }) => {
  const key = title?.toLowerCase().trim();
  const config =
    Object.entries(categoryConfig).find(([k]) => key?.includes(k))?.[1] ??
    fallback;
  return (
    <div
      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shrink-0 border border-white/10`}
    >
      {config.icon}
    </div>
  );
};

const inputClass =
  "w-full h-10 bg-white/5 border border-white/10 rounded-xl px-3 text-white text-sm placeholder-white/25 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200";
const labelClass =
  "text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5 block";

const CheckOut = () => {
  const [productList, setProductList] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [formValid, setFormValid] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNum: "",
    province: "",
    city: "",
    address: "",
  });

  const location = useLocation();
  const cart = location?.state?.cart;
  const directBuy = location?.state?.directBuy;
  const quantity = location?.state?.quantity;

  const { user } = useContext(UserContext);
  const { isBuyAllCart } = useContext(CartContext);
  const { showLoading, hideLoading } = useContext(LoaderContext);
  const nav = useNavigate();



  useEffect(() => {
    if (!user) {
      nav("/");
      return;
    }
    window.scrollTo({ top: 0 });
    if (cart || directBuy) setSubTotal(cart?.price || directBuy?.price * quantity);
  }, []);

  useEffect(() => {
    const { fullName, email, phoneNum, province, city, address } = formData;
    setFormValid(
      !!(
        fullName &&
        email &&
        phoneNum &&
        province &&
        city &&
        address &&
        agreed
      ),
    );
  }, [formData, agreed]);

  useEffect(() => {
    if (!user || !isBuyAllCart) return;
    const allProducts = JSON.parse(localStorage.getItem("cartProducts"));
    const userProducts = allProducts?.filter(
      (item) => item.userId === user?._id,
    );
    if (!userProducts) return;
    const sub = userProducts.reduce(
      (acc, item, i) => acc + item.price * (quantity?.[i] || 1),
      0,
    );
    setSubTotal(sub);
    setProductList(userProducts);
  }, [user]);

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const makePayment = async () => {
    if (!formValid) return;
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_SECRET);
    const body = {
      products: directBuy ? [directBuy] : productList,
      quantity: quantity || 1,
    };
    try {
      showLoading();
      const response = await apiCall.post(
        "/payment/create-checkout-session",
        body,
      );
      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
      if (result.error) console.log(result.error);
    } catch (error) {
      console.log("payment error:", error.response?.data || error.message);
      alert("Something went wrong. Please try again!");
    } finally {
      hideLoading();
    }
  };

  // Items to display in review panel
  const reviewItems =
    productList.length > 0
      ? productList.map((item, i) => ({
          title: item.title,
          price: item.price,
          qty: quantity?.[i] || 1,
        }))
      : [
          {
            title: cart?.title || directBuy?.title,
            price: cart?.price || directBuy?.price,
            qty: quantity || 1,
          },
        ];

  return (
    <div className="min-h-screen bg-[#07070d] text-white px-6 md:px-16 py-10">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-bold tracking-[4px] uppercase text-blue-400 mb-2">
          Secure Checkout
        </p>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
          Checkout
        </h1>
        <div className="w-10 h-0.5 bg-blue-500 rounded-full mt-3" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl">
        {/* ── LEFT: Shipping Form ── */}
        <div className="flex-[1.2] flex flex-col gap-6">
          <div className="bg-[#12121a] rounded-2xl border border-white/8 p-6">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <FaTruck className="text-blue-400 w-4 h-4" />
              Shipping Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {FIELDS.map(({ key, label, type, placeholder }) => (
                <div
                  key={key}
                  className={key === "address" ? "sm:col-span-2" : ""}
                >
                  <label className={labelClass}>{label}</label>
                  <input
                    required
                    type={type}
                    placeholder={placeholder}
                    value={formData[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className={inputClass}
                  />
                </div>
              ))}

              {/* Phone with flag */}
              <div className="sm:col-span-2">
                <label className={labelClass}>Phone Number</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                    <img
                      src={nepal}
                      alt="NP"
                      className="w-5 h-4 object-cover rounded-sm"
                    />
                    <span className="text-white/40 text-sm">+977</span>
                    <span className="text-white/20 text-sm">|</span>
                  </div>
                  <input
                    required
                    type="number"
                    placeholder="98XXXXXXXX"
                    value={formData.phoneNum}
                    onChange={(e) => handleChange("phoneNum", e.target.value)}
                    className={`${inputClass} pl-24`}
                  />
                </div>
              </div>
            </div>

            {/* T&C */}
            <label className="flex items-start gap-3 mt-6 cursor-pointer group">
              <div
                onClick={() => setAgreed((a) => !a)}
                className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer ${
                  agreed
                    ? "bg-blue-600 border-blue-600"
                    : "bg-white/5 border-white/20 group-hover:border-white/40"
                }`}
              >
                {agreed && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm text-white/50 leading-relaxed">
                I have read and agree to the{" "}
                <span className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors">
                  Terms and Conditions
                </span>
                .
              </span>
            </label>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                icon: <FaLock className="w-4 h-4 text-green-400" />,
                label: "Secure Payment",
              },
              {
                icon: <FaTruck className="w-4 h-4 text-blue-400" />,
                label: "Fast Delivery",
              },
              {
                icon: <FaTag className="w-4 h-4 text-purple-400" />,
                label: "Best Price",
              },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/3 border border-white/6"
              >
                {icon}
                <span className="text-xs text-white/50 font-medium">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Order Review ── */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-[#12121a] rounded-2xl border border-white/8 p-6">
            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <FaBoxOpen className="text-blue-400 w-4 h-4" />
              Order Summary
            </h2>

            {/* Items */}
            <div className="flex flex-col gap-3 max-h-[240px] overflow-y-auto pr-1 scrollbar-thin">
              {reviewItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/6"
                >
                  <ItemThumb title={item.title} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white/85 line-clamp-1">
                      {item.title || "N/A"}
                    </p>
                    <p className="text-xs text-white/40 mt-0.5">
                      Qty: {item.qty}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-white shrink-0">
                    Rs. {item.price}
                  </span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/8 my-5" />

            {/* Pricing breakdown */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm text-white/50">
                <span>Subtotal</span>
                <span>Rs. {subTotal.toLocaleString()}</span>
              </div>
              {/* <div className="flex justify-between text-sm text-white/50">
                <span>Delivery Charge</span>
                <span>Rs. {DELIVERY}</span>
              </div> */}
              <div className="h-px bg-white/6" />
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">Total</span>
                <span className="text-2xl font-black text-white">
                  Rs. {subTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Pay button */}
          <button
            onClick={makePayment}
            disabled={!formValid}
            className={`w-full h-13 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer
              ${
                formValid
                  ? "bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/25 active:scale-[0.98]"
                  : "bg-white/8 border border-white/10 text-white/30 cursor-not-allowed"
              }`}
          >
            <FaLock className="w-3.5 h-3.5" />
            {formValid
              ? `Pay Rs. ${total.toLocaleString()}`
              : "Complete the form to continue"}
          </button>

          <p className="text-center text-xs text-white/25">
            Powered by Stripe · 256-bit SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
