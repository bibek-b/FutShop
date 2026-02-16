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
    const { password, confirmPassword, username, email } = e.target;
    if (password.value !== confirmPassword.value) {
      toast.error("Passwords don't match!");
      return;
    }
    try {
      const res = await apiCall.post('/auth/user/register', {
        username: username.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      });
      if (res) {
        toast.success("Registration Successful!");
        setIsLoggedIn(true);
        nav("/");
      } else {
        toast.error("Failed to register. Please try again!");
      }
    } catch (error) {
      toast.error(error.response.data.error || "Something went wrong. Please try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07070d] px-4">
      {/* Glow blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/3 right-0 w-[350px] h-[350px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)" }} />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="bg-[#12121a] border border-white/8 rounded-2xl p-8 shadow-2xl shadow-black/50">

          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black tracking-widest text-white" style={{ fontFamily: "Georgia, serif" }}>
              FUT<span className="text-blue-500">SHOP</span>
            </h1>
            <div className="w-8 h-0.5 bg-blue-500 rounded-full mx-auto mt-3 mb-6" />
            <h2 className="text-2xl font-black text-white">Create Account</h2>
            <p className="text-sm text-white/40 mt-1">Join FutShop today</p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="relative">
              <FaRegUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                className="w-full h-11 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 text-white text-sm placeholder-white/25 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              />
            </div>

            <div className="relative">
              <FaRegEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                className="w-full h-11 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 text-white text-sm placeholder-white/25 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                minLength={8}
                className="w-full h-11 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 text-white text-sm placeholder-white/25 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                required
                minLength={8}
                className="w-full h-11 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 text-white text-sm placeholder-white/25 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer shadow-lg shadow-blue-500/20 mt-1"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;