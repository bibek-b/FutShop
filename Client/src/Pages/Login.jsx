import React from 'react';
import { FaRegUser, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Register from './Register';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 from-50% to-purple-800 to-80%">
      <div className="bg-white rounded-lg shadow-lg p-8 w-80">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-2 tracking-wide">FUTSHOP</h1>
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Login</h2>
        <form className="space-y-4">
          {/* Username with FaRegUser */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaRegUser className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Username"
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
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded bg-gradient-to-r from-blue-900 from-50% to-purple-800 to-80% text-white font-semibold mt-2 hover:from-blue-600 hover:to-purple-500 transition"
          >
            LOGIN
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/register" className="text-blue-600 hover:underline font-semibold">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;