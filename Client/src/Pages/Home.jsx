import heroImg from '../assets/hero.png';
import leftArrow from '../assets/arrow-left.svg';
import rightArrow from '../assets/arrow-right.svg';
import FeaturedPicks from '../Components/FeaturedPicks';
import { useState } from 'react';

const Home = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className='text-center space-y-5'>
    <div className='  mt-20  w-full  h-[90vh] '>
     <div className='flex items-center justify-center gap-5'>
       <div className='text-center space-y-5 fade-in-left'>
      <h2 className='text-4xl font-bold'>Gear up Like the Pros</h2>
      <p className='text-lg'>Get official jerseys, boots & more from top teams.</p>
      <button className='bg-gradient-to-r from-blue-900 from-50% to-purple-800 to-80% text-white px-6 py-2 mt-5 cursor-pointer hover:scale-105 duration-300 transition-all rounded-full'>Shop now</button>
    </div>
      <div className='fade-in-right relative'>
      {hover && <img src={leftArrow} alt="leftArrow"  className='w-9 h-9 cursor-pointer absolute top-1/2 left-3 hover:bg-black rounded-[50%] p-1 hover:scale-105 transition-all duration-300'/>}
     
        <img src={heroImg} alt="heroBg" className={`w-[50vw] h-fit object-cover rounded-lg hover:opacity-90 cursor-pointer`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}/>
         {hover && <img src={rightArrow} alt="rightArrow"  className='w-9 h-9 cursor-pointer absolute right-3 top-1/2 hover:bg-black rounded-[50%] p-1 hover:scale-105 transition-all duration-300'/>}
      </div>
     </div>
      <div className='mt-20  w-full flex items-center justify-center'>
     <span className='bg-gradient-to-r from-blue-900 from-50% to-purple-800 to-80% p-2  text-white w-[80%] text-xl '>
       🚚 Free Delivery |  🔒 Secure Payments |  🛡️ Authentic Products |  📦 Easy Returns
     </span>

     </div>
    </div>
      <FeaturedPicks />
    </div>
  )
}

export default Home