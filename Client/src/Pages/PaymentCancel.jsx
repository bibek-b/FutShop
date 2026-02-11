import { FaX } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

const PaymentCancel = () => {
    const nav = useNavigate();
  return (
     <div className="flex items-center justify-center h-[100vh] bg-gray-200">
            <div className=" p-10  shadow-lg rounded flex flex-col items-center justify-center gap-2">
            <FaX className="bg-red-600 rounded-full h-8 w-8 text-white p-1"/>
                <h1 className="flex items-center gap-2 text-xl">Payment Cancelled </h1>
                <p className="text-[12px] text-gray-500">You cancelled the checkout process. No payment was made. </p>
                <button onClick={() => nav("/")} className="bg-blue-600 text-white px-6 py-2 mt-5 cursor-pointer hover:scale-105 duration-300 transition-all rounded-full">Return to Home</button>
            </div>
        </div>
  )
}

export default PaymentCancel