import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaHeart, FaShoppingCart, FaBox, FaPlus, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { useState, useRef, useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import profile from '../assets/messi.jpg';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef(null);

  const nav = useNavigate();
  const { user, handleLogout } = useContext(UserContext);

  const handleSearch = () => {
    const trimmed = searchQuery.trim();
    if (trimmed) nav(`/products/${trimmed}`);
    setSearchQuery('');
    inputRef.current?.blur();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const NavLinks = ({ onClick }) => (
    <>
      {user?.role === 'admin' && (
        <Link
          to="/addProduct"
          onClick={onClick}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
        >
          <FaPlus size={11} />
          Add Product
          <span className="text-[10px] font-bold tracking-wider bg-red-500/20 text-red-400 border border-red-500/30 rounded px-1.5 py-0.5 uppercase">
            Admin
          </span>
        </Link>
      )}

      {user && (
        <Link
          to="/myorders"
          onClick={onClick}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          <FaBox size={12} />
          Orders
        </Link>
      )}

      <Link
        to="/mywishlist"
        onClick={onClick}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
      >
        <FaHeart size={12} />
        Wishlist
      </Link>

      <Link
        to="/cartDetails"
        onClick={onClick}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
      >
        <FaShoppingCart size={13} />
        Cart
      </Link>
    </>
  );

  return (
    <div className="sticky top-0 z-50">
      {/* Gradient accent line */}
      <div className="h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

      <nav className="bg-[#0a0a0f] border-b border-white/10 h-16 flex items-center px-6 gap-6">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-black tracking-widest text-white shrink-0 hover:opacity-80 transition-opacity"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          FUT<span className="text-blue-500">SHOP</span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-md relative">
          <input
            ref={inputRef}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Search products..."
            className="w-full h-10 bg-white/5 border border-white/10 rounded-lg pl-4 pr-12 text-white text-sm placeholder-white/30 outline-none focus:bg-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          />
          <button
            onClick={handleSearch}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-blue-600 hover:bg-blue-500 active:scale-95 rounded-md flex items-center justify-center transition-all duration-150 cursor-pointer"
          >
            <FaSearch size={11} className="text-white" />
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 ml-auto">
          <NavLinks />

          <div className="w-px h-5 bg-white/10 mx-2" />

          {!user ? (
            <>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg text-sm font-medium text-white/70 border border-white/15 hover:border-white/30 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all duration-200"
              >
                Sign In
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl border border-white/10 hover:bg-white/5 transition-all duration-200 cursor-default">
                <img
                  src={profile}
                  alt="Profile"
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-blue-500/60"
                />
                <span className="text-sm font-medium text-white/80 max-w-[90px] truncate">
                  {user.username}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-red-400 border border-red-500/25 bg-red-500/10 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-300 transition-all duration-200 cursor-pointer"
              >
                <FaSignOutAlt size={12} />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="md:hidden ml-auto p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
        >
          {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d0d14] border-b border-white/10 px-5 py-3 flex flex-col gap-1">
          <NavLinks onClick={() => setMenuOpen(false)} />

          <div className="h-px bg-white/10 my-2" />

          {!user ? (
            <div className="flex gap-2">
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-medium text-white/70 border border-white/15 hover:border-white/30 hover:text-white transition-all duration-200"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all duration-200"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2.5">
                <img
                  src={profile}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/60"
                />
                <span className="text-sm font-medium text-white/80">{user.username}</span>
              </div>
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-red-400 border border-red-500/25 bg-red-500/10 hover:bg-red-500/20 transition-all duration-200 cursor-pointer"
              >
                <FaSignOutAlt size={12} />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;