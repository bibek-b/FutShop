import hero from "../assets/heroImgs/hero.jpg";
import hero1 from "../assets/heroImgs/hero1.webp";
import hero2 from "../assets/heroImgs/hero2.webp";
import heroBall from "../assets/heroImgs/heroball.jpg";
import heroGloves from "../assets/heroImgs/herogloves.jpg";
import { useState } from "react";

const HeroMosaic = () => {
  const [hovered, setHovered] = useState(null);

  const small = [
    { src: heroBall,   label: "Balls"   },
    { src: heroGloves, label: "Gloves"  },
    { src: hero1,      label: "Kits"    },
    { src: hero2,      label: "Boots"   },
  ];

  return (
    <div className="w-full h-[480px] flex gap-2 rounded-2xl overflow-hidden">

      {/* LEFT — big hero image */}
      <div
        className="relative flex-[2] overflow-hidden rounded-2xl group cursor-pointer"
        onMouseEnter={() => setHovered("main")}
        onMouseLeave={() => setHovered(null)}
      >
        <img
          src={hero}
          alt="Hero"
          className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${
            hovered === "main" ? "scale-105" : "scale-100"
          }`}
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* label */}
        <div className="absolute bottom-5 left-5 z-10">
          <p className="text-white/60 text-xs font-semibold tracking-[3px] uppercase mb-1">
            New Season
          </p>
          <h2 className="text-white text-3xl font-black tracking-tight leading-none">
            Match Ready
          </h2>
          <div className={`mt-3 h-0.5 bg-blue-500 transition-all duration-500 ${hovered === "main" ? "w-16" : "w-8"}`} />
        </div>

        {/* corner badge */}
        <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-blue-600/90 backdrop-blur-sm text-white text-[11px] font-bold tracking-wider uppercase">
          Featured
        </div>
      </div>

      {/* RIGHT — 2x2 grid */}
      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-2">
        {small.map((item, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded-xl group cursor-pointer"
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          >
            <img
              src={item.src}
              alt={item.label}
              className={`w-full h-full object-cover transition-transform duration-500 ease-in-out ${
                hovered === idx ? "scale-110" : "scale-100"
              }`}
            />
            {/* dark overlay — stronger on hover */}
            <div
              className={`absolute inset-0 transition-colors duration-300 ${
                hovered === idx ? "bg-black/40" : "bg-black/20"
              }`}
            />

            {/* label pill — slides up on hover */}
            <div
              className={`absolute bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 text-white text-[11px] font-semibold tracking-widest uppercase whitespace-nowrap transition-all duration-300 ${
                hovered === idx
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroMosaic;