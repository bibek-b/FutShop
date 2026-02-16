import FeaturedPicks from "../Components/FeaturedPicks";
import { motion } from "framer-motion";
import HeroImgCarousel from "../Components/HeroImgCarousel";
import { useEffect, useContext } from "react";
import { ProductContext } from "../Context/ProductContext";

const ticker = "🚚 Free Delivery  ·  🔒 Secure Payments  ·  🛡️ Authentic Products  ·  📦 Easy Returns  ·  ";

const Home = () => {
  const { showModal, setShowModal } = useContext(ProductContext);

  useEffect(() => {
    if (showModal) setShowModal(true);
  }, [showModal]);

  return (
    <div className="min-h-screen bg-[#07070d] text-white overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 pt-10">

        {/* Background glow blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-700/15 rounded-full blur-[100px]" />
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12 max-w-7xl mx-auto w-full">

          {/* Left: copy */}
          <motion.div
            className="flex-1 space-y-6 text-center md:text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Eyebrow tag */}
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-blue-400 border border-blue-500/30 bg-blue-500/10 px-3 py-1 rounded-full">
              Official Kits & Gear
            </span>

            {/* Headline */}
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
              Official jerseys, boots &amp; more from the world's top clubs — delivered to your door.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 justify-center md:justify-start pt-2">
              <button
                onClick={() => window.scrollTo({ top: 750, behavior: "smooth" })}
                className="px-7 py-3 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                Shop Now
              </button>
              <button
                onClick={() => window.scrollTo({ top: 750, behavior: "smooth" })}
                className="px-7 py-3 border border-white/15 hover:border-white/30 hover:bg-white/5 text-white/70 hover:text-white text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer"
              >
                View All
              </button>
            </div>

            {/* Trust stats */}
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

          {/* Right: carousel */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            {/* Glow ring behind carousel */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl scale-110" />
              <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/10">
                <HeroImgCarousel />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="relative overflow-hidden border-y border-white/8 bg-white/3 py-3">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#07070d] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#07070d] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex whitespace-nowrap gap-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {Array(6).fill(ticker).map((t, i) => (
            <span
              key={i}
              className="text-sm font-medium text-white/50 tracking-wide px-8"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── FEATURED PICKS ── */}
      <div className="px-6 md:px-16 py-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-400 mb-2">
                Handpicked
              </p>
              <h2
                className="text-4xl font-black tracking-tight"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Featured Picks
              </h2>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 750, behavior: "smooth" })}
              className="hidden md:block text-sm font-medium text-white/50 hover:text-white border border-white/10 hover:border-white/25 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer"
            >
              View all →
            </button>
          </div>
          <FeaturedPicks />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;