import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Tag, MessageSquare, PlaySquare, AtSign, ArrowUpRight } from "lucide-react";

export function Logo() {
  return (
    <div className="fixed top-4 left-4 md:top-6 md:left-6 z-40">
      <img
        src="https://robproduction.co/assets/wolf-CkpQj1_n.png"
        alt="Logo"
        className="w-14 h-14 object-contain"
      />
    </div>
  );
}

export function MenuButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        rotate: 5,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="fixed top-4 right-4 md:top-6 md:right-6 z-50 bg-foreground px-7 py-3 text-background text-sm font-medium cursor-pointer rounded-[16px]"
    >
      {isOpen ? "Menu Close" : "Menu"}
    </motion.button>
  );
}

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menuItems = [
    { number: "01", label: "HOME", href: "/" },
    { number: "02", label: "WORKS", href: "#works" },
    { number: "03", label: "SERVICES", href: "#services" },
    { number: "04", label: "ABOUT", href: "#about" },
    { number: "05", label: "PLANS", href: "#plans" },
    { number: "06", label: "CONTACT", href: "#contact" },
    { number: "07", label: "PORTAL", href: "#portal" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ type: "tween", duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 w-screen h-screen bg-[#fbf9f4] z-40 flex flex-col justify-center px-8 md:px-[10vw]"
        >
          {/* Logo inside the overlay */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6">
            <img
              src="https://robproduction.co/assets/wolf-CkpQj1_n.png"
              alt="Logo"
              className="w-14 h-14 object-contain"
            />
          </div>

          {/* Links List */}
          <div className="w-full max-w-5xl flex flex-col mt-12">
            {menuItems.map((item, i) => {
              const isHovered = hoveredIndex === i;
              return (
                <a
                  key={i}
                  href={item.href}
                  onClick={onClose}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="border-b border-foreground/10 py-4 md:py-5 flex items-center group cursor-pointer select-none"
                >
                  <div className="flex items-center gap-8 md:gap-12 transition-transform duration-300 group-hover:translate-x-4">
                    <span className="text-[10px] md:text-xs font-bold text-foreground/40 font-mono tracking-wider">
                      {item.number}
                    </span>
                    <span
                      className={`text-3xl md:text-5xl font-black tracking-tight transition-colors duration-300 ${isHovered ? "text-[#6c855a] italic" : "text-foreground"
                        }`}
                    >
                      {item.label}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Rotating Contact Badge inside overlay */}
          <div className="absolute bottom-4 right-4 w-20 h-20 md:bottom-6 md:right-6 md:w-28 md:h-28">
            <a
              href="#contact"
              onClick={onClose}
              className="group block w-full h-full"
            >
              <div className="relative w-full h-full rounded-full bg-lime flex items-center justify-center transition-transform group-hover:scale-110">
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-spin-slow">
                  <defs>
                    <path id="overlay-circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                  </defs>
                  <text fontSize="11.5" fontWeight="600" fill="currentColor" className="text-foreground" letterSpacing="1">
                    <textPath href="#overlay-circ">Contact Us * Contact Us * Contact Us * </textPath>
                  </text>
                </svg>
                <ArrowUpRight className="w-5 h-5 md:w-7 md:h-7 text-foreground" strokeWidth={2.2} />
              </div>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


export function SideNav() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const navItems = [
    { Icon: Home, label: "Home", href: "#" },
    { Icon: Tag, label: "Works", href: "#works" },
    { Icon: MessageSquare, label: "Services", href: "#services" },
    { Icon: PlaySquare, label: "About", href: "#about" },
    { Icon: AtSign, label: "Contact", href: "#contact" }
  ];

  return (
    <nav className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-5">
      {navItems.map((item, i) => {
        const isHovered = hoveredIndex === i;
        return (
          <div key={i} className="relative flex items-center">
            <motion.a
              href={item.href}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ rotate: -15, scale: 0.99, translateX: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-[58px] h-[58px] rounded-[16px] bg-[#e6e2da]  hover:bg-[#e6e2da] border border-foreground/5 transition-colors flex items-center justify-center cursor-pointer text-foreground/70 hover:text-foreground shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
            >
              <item.Icon className="w-[22px] h-[22px]" strokeWidth={2.2} />
            </motion.a>

            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute left-20 px-6 py-3 rounded-full bg-[#ebe7df] border border-foreground/5 text-foreground font-medium text-sm whitespace-nowrap shadow-[0_8px_30px_rgba(0,0,0,0.06)] pointer-events-none"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
}

export function ContactSticker() {
  return (
    <a
      href="#contact"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 group block w-20 h-20 md:w-28 md:h-28"
    >
      <div className="relative w-full h-full rounded-full bg-lime flex items-center justify-center transition-transform group-hover:scale-110">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-spin-slow">
          <defs>
            <path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
          </defs>
          <text fontSize="11.5" fontWeight="600" fill="currentColor" className="text-foreground" letterSpacing="1">
            <textPath href="#circ">Contact Us * Contact Us * Contact Us * </textPath>
          </text>
        </svg>
        <ArrowUpRight className="w-5 h-5 md:w-7 md:h-7 text-foreground" strokeWidth={2.2} />
      </div>
    </a>
  );
}
