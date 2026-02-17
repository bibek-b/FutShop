import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter, FaYoutube, FaInstagram, FaPinterest, FaTiktok } from "react-icons/fa6";

const socials = [
  { href: "https://facebook.com",  icon: <FaFacebookSquare className="w-4 h-4" />, hover: "hover:text-blue-400"  },
  { href: "https://twitter.com",   icon: <FaSquareXTwitter  className="w-4 h-4" />, hover: "hover:text-white"    },
  { href: "https://youtube.com",   icon: <FaYoutube         className="w-4 h-4" />, hover: "hover:text-red-500"  },
  { href: "https://instagram.com", icon: <FaInstagram       className="w-4 h-4" />, hover: "hover:text-pink-400" },
  { href: "https://pinterest.com", icon: <FaPinterest       className="w-4 h-4" />, hover: "hover:text-red-400"  },
  { href: "https://tiktok.com",    icon: <FaTiktok          className="w-4 h-4" />, hover: "hover:text-white"    },
];

const links = {
  "About Us": ["Our Story", "Affiliate Program", "Wholesale Program", "Press Inquiries", "Careers"],
  "Support":  ["Returns & Exchanges", "Shipping Information", "Track Your Order", "Promo Code Lookup", "Gift Card Lookup"],
};

const Footer = () => (
  <footer className="bg-[#0d0d14] border-t border-white/8 text-white">

    {/* Main row */}
    <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">

      {/* Brand + socials */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-black tracking-widest" style={{ fontFamily: "Georgia, serif" }}>
          FUT<span className="text-blue-500">SHOP</span>
        </h2>
        <p className="text-xs text-white/35 leading-relaxed max-w-[180px]">
          Official kits &amp; gear from the world's top clubs.
        </p>
        <div className="flex items-center gap-3">
          {socials.map(({ href, icon, hover }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer"
              className={`text-white/35 ${hover} transition-colors duration-200`}>
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Link columns */}
      {Object.entries(links).map(([heading, items]) => (
        <div key={heading}>
          <h3 className="text-[10px] font-bold tracking-[3px] uppercase text-white/35 mb-3">
            {heading}
          </h3>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item}>
                <a href="#" className="text-xs text-white/50 hover:text-white transition-colors duration-200">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Disclaimer col */}
      <div className="flex flex-col justify-between gap-4">
        <p className="text-[10px] text-white/25 italic leading-relaxed">
          Personal portfolio project — not affiliated with or endorsed by any football club.
        </p>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-white/6 py-3 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-white/25">
        <span>&copy; {new Date().getFullYear()} FutShop. All rights reserved.</span>
        <div className="flex items-center gap-3">
          {["Privacy Policy", "Terms & Conditions", "Accessibility"].map((item, i, arr) => (
            <span key={item} className="flex items-center gap-3">
              <a href="#" className="hover:text-white/60 transition-colors duration-200">{item}</a>
              {i < arr.length - 1 && <span className="text-white/15">|</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;