import { GiSoccerBall, GiGloves, GiShirt } from "react-icons/gi";
import { PiSneakerFill } from "react-icons/pi";


// Category → gradient + icon config
export const categoryConfig = {
  "football balls": {
    gradient: "from-blue-900 via-blue-800 to-indigo-900",
    shimmer: "from-blue-500/20 to-indigo-500/20",
    icon: <GiSoccerBall className="w-20 h-20 text-blue-300/60" />,
    dot: "bg-blue-500",
  },
  "football boots": {
    gradient: "from-orange-900 via-red-900 to-rose-900",
    shimmer: "from-orange-500/20 to-rose-500/20",
    icon: <PiSneakerFill className="w-20 h-20 text-orange-300/60" />,
    dot: "bg-orange-500",
  },
  "football jerseys": {
    gradient: "from-green-900 via-emerald-900 to-teal-900",
    shimmer: "from-green-500/20 to-teal-500/20",
    icon: <GiShirt className="w-20 h-20 text-green-300/60" />,
    dot: "bg-green-500",
  },
  "gk gloves": {
    gradient: "from-purple-900 via-violet-900 to-fuchsia-900",
    shimmer: "from-purple-500/20 to-fuchsia-500/20",
    icon: <GiGloves className="w-20 h-20 text-purple-300/60" />,
    dot: "bg-purple-500",
  },
};

export const fallbackConfig = {
  gradient: "from-gray-900 via-slate-800 to-gray-900",
  shimmer: "from-gray-500/10 to-slate-500/10",
  icon: <GiSoccerBall className="w-20 h-20 text-white/20" />,
  dot: "bg-gray-500",
};

export const ProductImgPlaceholder = ({ category,parent }) => {
  const config = categoryConfig[category] ?? fallbackConfig;

  return (
    <div
      className={`relative ${parent === "checkout" ? "w-16 h-16 rounded-lg":"w-full h-full"} bg-gradient-to-br ${config.gradient} flex flex-col items-center justify-center overflow-hidden`}
    >
      {/* Animated shimmer blob */}
      <div
        className={`absolute w-48 h-48 rounded-full bg-gradient-to-br ${config.shimmer} blur-3xl animate-pulse`}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Icon */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="p-5 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-sm">
          {config.icon}
        </div>
      </div>

      {/* Category label pill at bottom */}
     {parent !== "featuredPicks" || "checkout"  &&  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm">
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
          <span className="text-[11px] font-semibold text-white/60 uppercase tracking-widest whitespace-nowrap">
            {category}
          </span>
        </div>
      </div>}
    </div>
  );
};
