import { motion} from 'framer-motion';
import boots from '../assets/boots.webp';
import balls from '../assets/balls.webp';
import gloves from '../assets/gloves.webp';
import jerseys from '../assets/jerseys.jpg';
import { Link } from 'react-router-dom';

const fadeIn = {
    hidden: {opacity: 0, y: 30},
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: 'easeOut'
        },
    }),
};

const FeaturedPicks = () => {
  return (
    <motion.div className='flex items-center flex-col gap-8' initial="hidden" whileInView="visible" viewport={{once: true, amount: 0.2}}>
        <motion.h2 className='text-3xl font-bold' variants={fadeIn} custom={0}>Featured Picks</motion.h2>
        <div className='bg-violet-100 h-[63vh] w-[85vw] rounded flex gap-8 p-2 items-center justify-around' variants={fadeIn} custom={0.2}>
                {[
                    {img: boots, label: 'Football Boots'},
                    {img: balls, label: 'Football Balls'},
                    {img: jerseys, label: 'Football Jerseys'},
                    {img: gloves, label: 'GK Gloves'}
                ].map((item, i) => (
                    <motion.div key={i} className='space-y-6' variants={fadeIn} custom={i + 1}>
                    <img src={item.img}
                    alt={item.label}
                    className={`w-[250px] object-cover rounded ${item.className || ''} hover:scale-105 transtion-all duration-300 ease-in-out`} />
                    <Link to={`/products/${item.label}`} className='border border-gray-500 px-4 py-2 rounded-full cursor-pointer hover:bg-black hover:text-white hover:border-0 transition-all duration-300 ease-in'>{item.label}</Link>
                    </motion.div>
                ))}
        </div>
    </motion.div>
  )
}

export default FeaturedPicks