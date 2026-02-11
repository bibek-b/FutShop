import nepal from "../assets/nepal-flag-icon.webp";
import boots from "../assets/boots.webp";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { useState } from "react";
import { UserContext } from "../Context/UserContext";
import { loadStripe } from '@stripe/stripe-js'
import apiCall from "../Custom-Hooks/apiCall";

const CheckOut = () => {
  const [productList, setProductList] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [formValid, setFormValid] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNum: null,
    province: "",
    city: "",
    address: "",
    // checked: false
  })
  const location = useLocation();

const cart = location?.state?.cart;
const directBuy = location?.state?.directBuy;
const quantity = location?.state?.quantity;
const { user } = useContext(UserContext);
const { isBuyAllCart } = useContext(CartContext);
const nav = useNavigate();
useEffect(() => {
console.log({user})
  if(!user) {
    nav("/");
    return ;
  }
  window.scrollTo({top: 0, behavior: "smooth"})
  if(cart || directBuy){
    setSubTotal(cart?.price || directBuy?.price)
  }
},[])
  useEffect(() => {
    const {fullName, email, phoneNum, province, city,address} = formData;
    if(fullName && email && phoneNum && province && city && address){
      setFormValid(true)
    }
  },[formData])
  useEffect(() => {
    if (!user) return;

    if(isBuyAllCart){
      const allProducts = JSON.parse(localStorage.getItem("cartProducts"));
    const userProducts = allProducts?.filter(
      (item) => item.userId === user?._id
    );
    if (!userProducts) return;
    // const productPrices = userProducts.map(product => product.price);
    const subTotal =  userProducts?.reduce((accumulator, item, i) => {
      const q = quantity?.[i] || 1;
      return accumulator +  item.price* q
    },0);
    setSubTotal(subTotal);

    setProductList(userProducts);
    }
  }, [user]);


  const handleSubmit = (e) => {
    e.preventDefault();
    
  }


  const handleChange = (field, value) => {

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }
const secret = "pk_test_51RoeLf00kSCIOUlPJjh6MauDGZFWrJyQVWwUkSpRezbWhsr8bmdeFPAyGFomkKV4kGM8Fc9nZVDsLlYEneM7h0QO00DKJsoFCx";

  const makePayment = async () => {
    console.log(quantity)
    const stripe = await loadStripe(secret);
    const body = {
      products: productList,
      quantity
    }
  
   try {
     const response = await apiCall.post("/payment/create-checkout-session", body
     );
     const session = response.data;
 
     const result = stripe.redirectToCheckout({
       sessionId:session.id
     });
     if(result.error){
       console.log(result.error)
     }
   } catch (error) {
    console.log("payment error:",error.response?.data || error.message);
    alert("Something went wrong. Please try again!")
   }
  }
  return (
    <div className="flex flex-col items-center  bg-blue-100 h-[100%] p-6">
      <div className="p-2 shadow-lg bg-white rounded flex flex-col w-[80%] ">
        <div>
          <span className="text-4xl font-bold ">Checkout</span>
          <hr className="mt-2 border-gray-400" />
        </div>
          <form className="flex w-full  p-2 justify-between w-[50%]" onSubmit={e => handleSubmit(e)}>
            <div className="space-y-6">
              <h1 className="font-semibold text-xl ">Shipping Information</h1>
            <div className="flex flex-col">
              <label htmlFor="fullName">Full Name</label>
              <input
                required
                className="border border-gray-300 rounded p-2 w-[90%] outline-0 placeholder:text-sm mt-2"
                type="text"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange = {e => handleChange("fullName", e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email">Email Address</label>
              <input
                required
                className="border border-gray-300 rounded p-2 w-[90%] outline-0 placeholder:text-sm mt-2"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange = {e => handleChange("email", e.target.value)}


              />
            </div>

            <div className="relative flex flex-col">
              <label htmlFor="phoneNum">Phone Number</label>
              <img
                src={nepal}
                alt="Nepal"
                className="w-6 absolute top-10 left-2"
              />
              <input
                required
                className="border border-gray-300 rounded pl-9 pt-2 pb-2 pr-2 w-[90%] outline-0 placeholder:text-sm mt-2"
                type="tel"
                placeholder="Enter phone number"
                value={formData.phoneNum}
                onChange = {e => handleChange("phoneNum", e.target.value)}

              />
            </div>

            <div className="flex w-[600px]">
              <div className="flex flex-col ">
                <label htmlFor="province">Province</label>
                <input
                  required
                  type="text"
                  className="border border-gray-300 rounded p-2 w-[70%] outline-0 placeholder:text-sm mt-2"
                  placeholder="Enter province"
                value={formData.province}
                onChange = {e => handleChange("province", e.target.value)}

                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="city">City</label>
                <input
                  required
                  type="text"
                  className="border border-gray-300 rounded p-2 w-[70%] outline-0 placeholder:text-sm mt-2"
                  placeholder="Enter city"
                value={formData.city}
                onChange = {e => handleChange("city", e.target.value)}


                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="address">Address</label>
                <input
                  required
                  type="text"
                  className="border border-gray-300 rounded p-2 w-[70%] outline-0 placeholder:text-sm mt-2"
                  placeholder="Enter address"
                value={formData.address}
                onChange = {e => handleChange("address", e.target.value)}


                />
              </div>
            </div>
            <div className="flex gap-1 mt-4">
              <input type="checkbox" 
                value={formData.checked}
                onChange = {e => handleChange("checkbox", e.target.value)}
               className="w-4 cursor-pointer" />
              <span className="text-sm opacity-70">
                I have read and agree to the Terms and Conditions.
              </span>
            </div>
            </div>
          <span className="border border-gray-400 opacity-50 h-[66.2%] absolute right-184 top-[150px]"></span>
          <div className="flex flex-col gap-8 w-[38%]">
            <h1 className="font-bold text-xl">Review your Cart</h1>
            <ul className="space-y-4 max-h-[190px] overflow-y-scroll">
              {productList.length > 0 ? productList.map((item, idx) => (
                <li className="flex gap-4">
                <img
                  src={boots}
                  alt="product"
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    <span>
                      {item?.title || "N/A"}
                    </span>
                    <span className="text-gray-500 text-[13px]">
                      {quantity[idx] || 1 || "N/A"}x
                    </span>
                  </div>
                  <span className="font-bold">
                    Rs. {item?.price || "N/A"}
                  </span>
                </div>
              </li>
              )) : <li className="flex gap-4">
                <img
                  src={boots}
                  alt="product"
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    <span>
                      {cart?.title || directBuy?.title || "N/A"}
                    </span>
                    <span className="text-gray-500 text-[13px]">
                      {quantity || 1}x
                    </span>
                  </div>
                  <span className="font-bold">
                    Rs. {cart?.price || directBuy?.price ||  "N/A"}
                  </span>
                </div>
              </li>}

            </ul>
            <div className="space-y-4 mt-8">
              <div className="flex gap-20">
                <span className="opacity-70 w-[150px]">Subtotal</span>
                <span>Rs. {subTotal }</span>
              </div>
              <div className="flex gap-20 ">
                <span className="opacity-70 w-[150px]">Delivery Charge</span>
                <span>Rs. 100</span>
              </div>
              <div className="flex gap-20 ">
                <span className="opacity-70 w-[150px]">Total</span>
                <span>Rs. {subTotal + 100}</span>
              </div>
              <button onClick={makePayment} className=" outline-0  flex justify-center bg-blue-600 text-white p-2 w-[70%] rounded cursor-pointer hover:bg-blue-700">
              Order Now & Pay {formValid ? subTotal + 100 : null}
                
              </button>
            </div>
          </div>
          </form>
      </div>
    </div>
  );
};

export default CheckOut;
