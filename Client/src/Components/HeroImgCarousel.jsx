import hero from "../assets/heroImgs/hero.jpg";
import hero1 from "../assets/heroImgs/hero1.webp";
import hero2 from "../assets/heroImgs/hero2.webp";
import heroBall from "../assets/heroImgs/heroball.jpg";
import heroGloves from "../assets/heroImgs/herogloves.jpg";
import { useState } from "react";
import { useEffect } from "react";

const images = [hero, heroBall, hero1, hero2, heroGloves];
const HeroImgCarousel = () => {

  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrent((current + 1) % length);
  };

//   const prevSlide = () => {
//     setCurrent((current - 1 + length) % length);
//   };

  useEffect(() => {
    const interval = setTimeout(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [current]);
  return (
    <div className="fade-in-right relative w-[50vw] h-[450px] overflow-hidden rounded-lg">
      {images.map((src, idx) => (
        <img
          src={src}
          alt="heroBg"
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-900 ease-in-out rounded-lg cursor-pointer ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}

      {/* dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2  z-[999]">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full ${
              idx === current ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroImgCarousel;
