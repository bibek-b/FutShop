import { Link } from 'react-router-dom';
import cart from '../assets/cart.svg';
const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-900 from-50% to-purple-800 to-80% h-[70px] text-white flex items-center p-2 shadow-lg">
      <ul className='flex items-center justify-around w-full'>
        <div>
          <li className="text-4xl font-bold cursor-pointer">
        FutShop
      </li>
        </div>

      <div className='w-[40%] relative'>
        <li className='flex items-center justify-center'>
          <input type="text" className="bg-white outline-0 text-black w-[100%] h-[40px] rounded-full p-3 " placeholder='What are you looking for...' />
          <button className='bg-black w-[95px] absolute right-0 h-[40px] p-1 rounded-r-[30px] cursor-pointer hover:bg-gray-700'>Search</button>
        </li>
      </div>

      <div>
        <Link to='/cartDetails' className='flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all duration-500'>
          <img src={cart} alt="Cart Icon"  className='w-8 text-xl'/>
          <span>Cart</span>
        </Link>
      </div>
      </ul>
      
      
    </nav>
  )
}

export default Navbar