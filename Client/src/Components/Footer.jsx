import React from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube, FaInstagram, FaPinterest, FaTiktok } from "react-icons/fa6";

const Footer = () => {
  return (
  <>
      <footer className="bg-gray-800 bg-opacity-90 text-white pt-5 pb-4 mt-15 ">
    <span className="text-center w-full items-center flex justify-center mb-10 italic text-sm">“This is a personal portfolio project. Not affiliated with or endorsed by any football club.”</span>
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-8">
        {/* About Us */}
        <div>
          <h3 className="font-bold text-lg mb-3 tracking-wide">ABOUT US</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#" className="hover:underline">Our Story</a></li>
            <li><a href="#" className="hover:underline">Affiliate Program</a></li>
            <li><a href="#" className="hover:underline">Wholesale Program</a></li>
            <li><a href="#" className="hover:underline">Press Inquiries</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
          </ul>
        </div>
        {/* Customer Support */}
        <div>
          <h3 className="font-bold text-lg mb-3 tracking-wide">CUSTOMER SUPPORT</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#" className="hover:underline">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:underline">Shipping Information</a></li>
            <li><a href="#" className="hover:underline">Track Your Order</a></li>
            <li><a href="#" className="hover:underline">Promo Code Lookup</a></li>
            <li><a href="#" className="hover:underline">Gift Card Lookup</a></li>
          </ul>
        </div>
        {/* Connect With Us */}
        <div className="md:w-1/3">
          <h3 className="font-bold text-lg mb-3 tracking-wide">CONNECT WITH US</h3>
          <div className="flex space-x-3 mb-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition"><FaFacebookSquare className="w-6 h-6" /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition"><FaSquareXTwitter className="w-6 h-6" /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition"><FaYoutube className="w-6 h-6" /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition"><FaInstagram className="w-6 h-6" /></a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition"><FaPinterest className="w-6 h-6" /></a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition"><FaTiktok className="w-6 h-6" /></a>
          </div>
          <div className="text-gray-300 text-sm mb-3">
            Want $20 Off? Sign up for our Newsletter.<br />
            Sign up for SMS alerts and be the first to know!
          </div>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold text-sm transition">
            Get in the loop!
          </button>
        </div>
      </div>
      <hr className="w-full border-gray-600 my-6 opacity-50" />
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
        <div className="mb-2 md:mb-0">
          {/* You can add a badge or logo here if needed */}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:underline">Terms & Conditions</a>
          <span>|</span>
          <a href="#" className="hover:underline">Accessibility Statement</a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-2 text-[11px] text-gray-500 text-center">
        &copy; {new Date().getFullYear()} FutShop. All rights reserved.
      </div>
    </footer>
  </>
  )
}

export default Footer