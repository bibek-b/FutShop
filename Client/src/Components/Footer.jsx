import React from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
  <footer className="bg-gray-800 bg-opacity-80 text-white py-4 mt-0">
  <div className="flex flex-col items-center max-w-4xl mx-auto px-4">
    <div className="flex space-x-4 mb-2">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
        <FaFacebookSquare className="w-7 h-7" />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
        <FaSquareXTwitter className="w-7 h-7" />
      </a>
    </div>
    <hr className="w-full border-gray-600 my-2 opacity-50" />
    <div className="text-sm text-gray-300">
      &copy; {new Date().getFullYear()} FutShop. All rights reserved.
    </div>
  </div>
</footer>
  )
}

export default Footer