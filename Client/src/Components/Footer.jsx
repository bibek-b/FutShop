import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter, FaYoutube, FaInstagram, FaPinterest, FaTiktok } from "react-icons/fa6";
import { Link } from "react-router-dom";

const socials = [
  { href: "https://facebook.com",  icon: <FaFacebookSquare className="w-5 h-5" />, hover: "hover:text-blue-400"  },
  { href: "https://twitter.com",   icon: <FaSquareXTwitter  className="w-5 h-5" />, hover: "hover:text-white"    },
  { href: "https://youtube.com",   icon: <FaYoutube         className="w-5 h-5" />, hover: "hover:text-red-500"  },
  { href: "https://instagram.com", icon: <FaInstagram       className="w-5 h-5" />, hover: "hover:text-pink-400" },
  { href: "https://pinterest.com", icon: <FaPinterest       className="w-5 h-5" />, hover: "hover:text-red-400"  },
  { href: "https://tiktok.com",    icon: <FaTiktok          className="w-5 h-5" />, hover: "hover:text-white"    },
];

const links = {
  "About Us": ["Our Story", "Affiliate Program", "Wholesale Program", "Press Inquiries", "Careers"],
  "Support":  ["Returns & Exchanges", "Shipping Information", "Track Your Order", "Promo Code Lookup", "Gift Card Lookup"],
};

const Footer = () => {
  return (
    <footer className="bg-[#0d0d14] border-t border-white/8 text-white mt-16">

      {/* Disclaimer banner */}
      <div className="border-b border-white/6 py-2.5 px-6 text-center">
        <p className="text-[11px] text-white/30 italic tracking-wide">
          Personal portfolio project — not affiliated with or endorsed by any football club.
        </p>
      </div>

      {/* Main footer grid */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand col */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black tracking-widest" style={{ fontFamily: "Georgia, serif" }}>
            FUT<span className="text-blue-500">SHOP</span>
          </h2>
          <p className="text-sm text-white/40 leading-relaxed max-w-[200px]">
            Official kits &amp; gear from the world's top clubs, delivered to your door.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-3 pt-1">
            {socials.map(({ href, icon, hover }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-white/40 ${hover} transition-colors duration-200`}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(links).map(([heading, items]) => (
          <div key={heading}>
            <h3 className="text-[11px] font-bold tracking-[3px] uppercase text-white/40 mb-4">
              {heading}
            </h3>
            <ul className="space-y-2.5">
              {items.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter col */}
        <div className="space-y-4">
          <h3 className="text-[11px] font-bold tracking-[3px] uppercase text-white/40 mb-4">
            Newsletter
          </h3>
          <p className="text-sm text-white/50 leading-relaxed">
            Get <span className="text-white font-semibold">$20 off</span> your first order plus early access to drops.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 min-w-0 h-9 bg-white/5 border border-white/10 rounded-lg px-3 text-sm text-white placeholder-white/25 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
            />
            <button className="h-9 px-4 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors duration-200 shrink-0 cursor-pointer">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/6 py-4 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <span>&copy; {new Date().getFullYear()} FutShop. All rights reserved.</span>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms & Conditions", "Accessibility"].map((item, i, arr) => (
              <span key={item} className="flex items-center gap-4">
                <a href="#" className="hover:text-white/70 transition-colors duration-200">{item}</a>
                {i < arr.length - 1 && <span className="text-white/15">|</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;