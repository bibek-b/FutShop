import { motion } from 'framer-motion';
import boots from '../assets/boots.webp';
import balls from '../assets/balls.webp';
import gloves from '../assets/gloves.webp';
import jerseys from '../assets/jerseys.jpg';
import { Link } from 'react-router-dom';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
};

const categories = [
  { img: boots,   label: 'Football Boots',   tag: 'Best Seller' },
  { img: balls,   label: 'Football Balls',   tag: 'New Arrival' },
  { img: jerseys, label: 'Football Jerseys', tag: 'Top Rated'   },
  { img: gloves,  label: 'GK Gloves',        tag: 'Pro Pick'    },
];

const FeaturedPicks = () => {
  return (
    <motion.section
      className="flex flex-col items-center gap-10 py-16 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={container}
    >
      {/* Heading */}
      <motion.div className="flex flex-col items-center gap-2" variants={fadeUp}>
        <p className="text-xs font-bold tracking-[4px] uppercase text-blue-400">Shop by Category</p>
        <h2 className="text-4xl font-black tracking-tight text-white">Featured Picks</h2>
        <div className="w-10 h-0.5 bg-blue-500 rounded-full mt-1" />
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full max-w-5xl">
        {categories.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/8 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10 transition-colors duration-300 will-change-transform"
          >
            {/* Tag badge */}
            <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 text-[10px] font-bold tracking-wider uppercase text-white/70">
              {item.tag}
            </div>

            {/* Image */}
            <div className="overflow-hidden h-52 bg-white/5">
              <img
                loading="lazy"
                decoding="async"
                src={item.img}
                alt={item.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>

            {/* Footer */}
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-white/85">{item.label}</span>
              <Link
                to={`/products/${item.label}`}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-colors duration-200 shrink-0"
                aria-label={`Browse ${item.label}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default FeaturedPicks;