import { Link, useNavigate } from 'react-router-dom';
import cart from '../assets/cart.svg';
import Login from '../Pages/Login';
import { FaUser } from "react-icons/fa";
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import profile from '../assets/messi.jpg';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const nav = useNavigate();
  const { user, handleLogout } = useContext(UserContext);
  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();

    if(trimmedQuery !== ""){
     nav(`/products/${trimmedQuery}`)
    }
    setSearchQuery("");
  }
  return (
    <nav className="bg-gradient-to-r from-blue-900 from-50% to-purple-800 to-80% h-[70px] text-white flex items-center p-2 shadow-lg">
      <ul className='flex items-center justify-around w-full'>
        <div>
          <Link to='/' className="text-4xl font-bold cursor-pointer">
        FutShop
      </Link>
        </div>

      <div className='w-[40%] relative'>
        <li className='flex items-center justify-center'>
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} type="text" className="bg-white outline-0 text-black w-[100%] h-[40px] rounded-full p-3 " placeholder='What are you looking for...' />
          <button onClick={handleSearch} className='bg-black w-[95px] absolute right-0 h-[40px] p-1 rounded-r-[30px] cursor-pointer hover:bg-gray-800'>Search</button>
        </li>
        
      </div>

      <div className='flex gap-8'>
      <Link to='/Bibek_Bk_Cart/addProduct' className='flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all duration-500 text-lg'>
          <span>Add Product</span>
        </Link>
      {user &&     <Link to='/Bibek_Bk_Cart/myorders' className='flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all duration-500 text-lg'>
          <span>My Orders</span>
        </Link>}
         <Link to='/Bibek_Bk_Cart/mywishlist' className='flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all duration-500 text-lg'>
          <span>My WishList</span>
        </Link>
        <Link to='/Bibek_Bk_Cart/cartDetails' className='flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all duration-500'>
          <img src={cart} alt="Cart Icon"  className='w-6 text-lg'/>
          <span>Cart</span>
        </Link>
       {!user ? <>
         <Link to='/Login' className='flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all duration-500'>
          <span>Sign Up</span>
        </Link>

         <Link to='/register' className='flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-500  '>
          <span>Sign In</span>
        </Link> </>: <div className="flex items-center gap-3">
          <img src={profile} alt="Profile" className="w-15 h-15 rounded-full object-cover" />{user.username}
          <button className="ring rounded px-2 cursor-pointer hover:bg-gray-400" onClick={handleLogout}>Logout</button>
        </div>
       }
      </div>
        
      </ul>
      
      
    </nav>
  )
}

export default Navbar