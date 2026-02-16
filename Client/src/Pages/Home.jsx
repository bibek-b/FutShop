import FeaturedPicks from "../Components/FeaturedPicks";
import { motion } from "framer-motion";
import HeroImgCarousel from "../Components/HeroImgCarousel";
import { useEffect, useContext, useRef } from "react";
import { ProductContext } from "../Context/ProductContext";

const TICKER =
  "🚚 Free Delivery  ·  🔒 Secure Payments  ·  🛡️ Authentic Products  ·  📦 Easy Returns  ·  ";

const Home = () => {
  const { showModal, setShowModal } = useContext(ProductContext);
  const featuredRef = useRef(null);

  useEffect(() => {
    if (showModal) setShowModal(true);
  }, [showModal]);

  const scrollToFeatured = () => {
    featuredRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#07070d] text-white overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 pt-10">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          {/* Soft radial gradients via background-image — no filter blur needed */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 600px 500px at 0% 40%, rgba(37,99,235,0.12) 0%, transparent 70%), " +
                "radial-gradient(ellipse 500px 400px at 100% 35%, rgba(124,58,237,0.12) 0%, transparent 70%)",
            }}
          />
          {/* Grid overlay — static div, will-change: nothing */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px)," +
                "linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12 max-w-7xl mx-auto w-full">
          {/* Left: copy */}
          <motion.div
            className="flex-1 space-y-6 text-center md:text-left will-change-transform"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-blue-400 border border-blue-500/30 bg-blue-500/10 px-3 py-1 rounded-full">
              Official Kits &amp; Gear
            </span>

            <h1
              className="text-5xl md:text-7xl font-black leading-none tracking-tight"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Gear Up
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Like the Pros
              </span>
            </h1>

            <p className="text-base md:text-lg text-white/50 max-w-sm leading-relaxed">
              Official jerseys, boots &amp; more from the world's top clubs —
              delivered to your door.
            </p>

            <div className="flex items-center gap-4 justify-center md:justify-start pt-2">
              <button
                onClick={scrollToFeatured}
                className="px-7 py-3 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-sm font-semibold rounded-xl transition-colors duration-200 shadow-[0_0_24px_rgba(37,99,235,0.5)] hover:shadow-[0_0_36px_rgba(37,99,235,0.7)] cursor-pointer"
              >
                Shop Now
              </button>
              <button
                onClick={scrollToFeatured}
                className="px-7 py-3 border border-white/15 hover:border-white/30 hover:bg-white/5 text-white/70 hover:text-white text-sm font-medium rounded-xl transition-colors duration-200 cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="flex items-center gap-8 justify-center md:justify-start pt-4">
              {[
                { value: "50K+", label: "Happy Customers" },
                { value: "200+", label: "Official Kits" },
                { value: "4.9★", label: "Avg. Rating" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center md:text-left">
                  <p className="text-xl font-black text-white">{value}</p>
                  <p className="text-xs text-white/40 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right img carousel */}
          <HeroImgCarousel />
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="relative overflow-hidden border-y border-white/8 bg-white/3 py-3">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#07070d] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#07070d] to-transparent z-10 pointer-events-none" />

        {/* CSS-only ticker — zero JS, zero layout thrash */}
        <div
          className="flex will-change-transform"
          style={{ animation: "ticker 28s linear infinite" }}
        >
          {Array(8)
            .fill(TICKER)
            .map((t, i) => (
              <span
                key={i}
                className="text-sm font-medium text-white/50 tracking-wide px-8 whitespace-nowrap"
              >
                {t}
              </span>
            ))}
        </div>

        <style>{`
          @keyframes ticker {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* ── FEATURED PICKS ── */}
      <div ref={featuredRef} className="px-6 md:px-16 py-16 max-w-7xl mx-auto">
        <FeaturedPicks />
      </div>
    </div>
  );
};

export default Home;
