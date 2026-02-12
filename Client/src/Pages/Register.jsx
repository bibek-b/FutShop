import { FaRegUser, FaRegEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import apiCall from "../Custom-Hooks/apiCall";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { toast } from "react-toastify";

const Register = () => {
  const nav = useNavigate();
    const { setIsLoggedIn } = useContext(UserContext);
  

  const handleSubmit = async e => {
    e.preventDefault();

    const {password, confirmPassword, username, email } = e.target;

    if(password.value !== confirmPassword.value){
      toast.error("Passwords don't match!");
    }
    const userNm = username.value;
    const eml = email.value;
    const psw = password.value;
    const confPsw = confirmPassword.value;

    try {
     const res = await apiCall.post('/auth/user/register', {username : userNm, email: eml, password: psw, confirmPassword: confPsw});
     if(res){
      toast.success("Registration Successful!");
       setIsLoggedIn(true);
      nav("/");
     } else {
      toast.error("Failed to register. Please try again!");
     }
      
    } catch (error) {
      toast.error(error.response.data.error || "Something went wrong.Please try again!");
    }
    


  }
  return (
    <div className="min-h-screen  flex items-center justify-center bg-gradient-to-r from-blue-200 from-50% to-purple-200 to-80%">
      <div className="bg-white rounded-lg h-130 shadow-lg p-8 w-95">
        <div>
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-5 tracking-wide">
            FUTSHOP <hr className="mt-4 border border-gray-400" />
          </h1>
          <h2 className="text-lg font-semibold text-center mb-4 text-gray-700">
            Create an Account{" "}
          </h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username with FaRegUser */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaRegUser className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
              required
            />
          </div>
          {/* Email with FaRegEnvelope */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaRegEnvelope className="w-5 h-5" />
            </span>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
              required
            />
          </div>
          {/* Password with FaLock */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaLock className="w-5 h-5" />
            </span>
            <input
              minLength={8}
              type="password"
              name="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
              required
            />
          </div>
          {/* Confirm Password with FaLock */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaLock className="w-5 h-5" />
            </span>
            <input
              minLength={8}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded bg-blue-600 rounded-full hover:bg-blue-700 cursor-pointer text-white font-semibold mt-2 "
          >
            REGISTER
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
