
import FeaturedPicks from "../Components/FeaturedPicks";
import { useState } from "react";
import { motion } from "framer-motion";
import HeroImgCarousel from "../Components/HeroImgCarousel";
import { useEffect } from "react";
import { useContext } from "react";
import { ProductContext } from "../Context/ProductContext";

const Home = () => {

    const { showModal, setShowModal } = useContext(ProductContext);

  useEffect(() => {
    if(showModal){
      setShowModal(true);
    }
  },[showModal])
  return (
    <div className="text-center space-y-5 overflow-auto">
      <div className="  mt-20  w-full  h-[90vh] ">
        <div className="flex items-center justify-center gap-5">
          <div className="text-center space-y-5 fade-in-left">
            <h2 className="text-4xl font-bold">Gear up Like the Pros</h2>
            <p className="text-lg">
              Get official jerseys, boots & more from top teams.
            </p>
            <button onClick= {() => window.scrollTo({top: 750, behavior: "smooth"})} className="bg-gradient-to-r from-blue-900 from-50% to-purple-800 to-80% text-white px-6 py-2 mt-5 cursor-pointer hover:scale-105 duration-300 transition-all rounded-full">
              Shop now
            </button>
          </div>
          <HeroImgCarousel />
        </div>
        <div className="mt-20 w-full flex items-center justify-center">
          <div className="overflow-hidden bg-gradient-to-r from-blue-900 to-purple-800 p-2 w-[80%] text-white text-xl">
            <motion.div
              className="flex whitespace-nowrap gap-16"
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <span>
                🚚 Free Delivery | 🔒 Secure Payments | 🛡️ Authentic Products |
                📦 Easy Returns
              </span>
              <span>
                🚚 Free Delivery | 🔒 Secure Payments | 🛡️ Authentic Products |
                📦 Easy Returns
              </span>
              <span>
                🚚 Free Delivery | 🔒 Secure Payments | 🛡️ Authentic Products |
                📦 Easy Returns
              </span>
            </motion.div>
          </div>
        </div>
      </div>
      <FeaturedPicks />
    </div>
  );
};

export default Home;
