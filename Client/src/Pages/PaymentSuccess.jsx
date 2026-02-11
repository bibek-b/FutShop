import { FaDollarSign } from "react-icons/fa";
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center h-[100vh] bg-gray-200">
        <div className=" p-10  shadow-lg rounded flex flex-col items-center justify-center gap-2">
        <FaDollarSign className="bg-green-600 rounded-full h-8 w-8 text-white p-1"/>
            <h1 className="flex items-center gap-2 text-xl">Payment Successful </h1>
            <p className="text-[12px] text-gray-500">Thank you for your payment! </p>
            <Link to="/"  className="bg-green-600 text-white px-6 py-2 mt-5 cursor-pointer hover:scale-105 duration-300 transition-all rounded-full">Continue Shopping</Link>
        </div>
    </div>
  )
}

export default PaymentSuccess