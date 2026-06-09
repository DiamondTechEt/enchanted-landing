import { useState, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Star } from "lucide-react";
import { Italic } from "../Italic";
import { fadeUp } from "./animations";
import { useIsMobile } from "../../hooks/use-mobile";

export function Testimonials() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Only trigger the initial entrance animation once the section is in view
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const cards = [
    {
      dark: false,
      stars: 5,
      body: "I truly appreciate the work they've helped our family studio with — such a careful and authentic attention to storytelling. Their passion has made an impact on our brand.",
      name: "Kiruban",
      role: "Owner",
    },
    {
      dark: true,
      stars: 5,
      body: "We were moving fast on the Popeyes project, and AI only works at that pace if your post team really knows what they're doing. They turned everything around in three days.",
      name: "PJ Accetturo",
      role: "CEO of Genne.ai",
    },
    {
      dark: false,
      stars: 4,
      body: "From the start, the ROB PRODUCTION team was thoroughly engaged and thoughtful in their execution, offering solutions and suggestions on how to get our project over the line.",
      name: "Tom Coppola",
      role: "VP, Production",
    },
    {
      dark: true,
      stars: 5,
      body: "From the very first conversation, Conusely felt more like a partner than an agency. They took the time to understand our challenges and translated complex ideas into a clean experience.",
      name: "David Kilian",
      role: "Founder of Winding",
    },
    {
      dark: false,
      stars: 5,
      body: "Working with them was easy as ROB PRODUCTION !",
      name: "Tom Greenwald",
      role: "Co-Founder of SpotCo",
    },
  ];

  // Framer Motion Variants for exact mathematical control over states
  const cardVariants: Variants = {
    // Starting position before scrolling into view
    initial: {
      opacity: 0,
      y: 200,
      scale: 0.9
    },
    // Dynamic animate variant: responds to isMobile, isHovered, and hoveredCardIndex
    animate: (i: number) => {
      const isCurrentlyHovered = hoveredCardIndex === i;

      const baseOffsets = isMobile ? (
        isHovered ? [
          { x: -55, y: 10, rotate: -6 },
          { x: -28, y: 0, rotate: -3 },
          { x: 0, y: -10, rotate: 0 },
          { x: 28, y: 0, rotate: 3 },
          { x: 55, y: 10, rotate: 6 },
        ] : [
          { x: -35, y: 15, rotate: -8 },
          { x: -18, y: 5, rotate: -4 },
          { x: 0, y: -5, rotate: -1 },
          { x: 18, y: 5, rotate: 4 },
          { x: 35, y: 15, rotate: 8 },
        ]
      ) : (
        isHovered ? [
          { x: -370, y: 15, rotate: -7 },
          { x: -185, y: -10, rotate: -3 },
          { x: 0, y: -25, rotate: 0 },
          { x: 185, y: -10, rotate: 3 },
          { x: 370, y: 15, rotate: 6 },
        ] : [
          { x: -320, y: 30, rotate: -11 },
          { x: -160, y: 5, rotate: -6 },
          { x: 5, y: -18, rotate: -2 },
          { x: 165, y: -3, rotate: 4 },
          { x: 335, y: 28, rotate: 9 },
        ]
      );

      const base = baseOffsets[i % baseOffsets.length];

      let x = base.x;
      let y = base.y;
      let rotate = base.rotate;
      let scale = 1;
      let zIndex = 10 + i;

      if (hoveredCardIndex !== null) {
        if (isCurrentlyHovered) {
          y = -40; // Lift up
          rotate = 0; // Straighten out for reading
          scale = 1.05;
          zIndex = 50; // Pop to the absolute front
        } else {
          // Push unhovered cards far apart, keeping their original tilt and y-position!
          const pushAmount = isMobile ? 35 : 160;
          if (i < hoveredCardIndex) {
            x -= pushAmount;
          } else {
            x += pushAmount;
          }
        }
      }

      const isShifting = hoveredCardIndex !== null;

      return {
        opacity: 1,
        x,
        y,
        rotate,
        scale,
        zIndex,
        transition: {
          type: "spring" as const,
          stiffness: isShifting ? 180 : 70,
          damping: isShifting ? 20 : 15,
          delay: isShifting ? 0 : i * 0.05
        }
      };
    }
  };

  return (
    <section className="py-32 px-6 overflow-hidden bg-[#fbf9f4]">
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-5xl mx-auto text-center text-[clamp(2.5rem,7vw,6rem)] font-black leading-[1] tracking-tight text-foreground"
      >
        Trusted by teams who move <Italic>fast.</Italic>
      </motion.h2>

      {/* Interactive Container: Widened max-width to allow room for the spread margin */}
      <div
        ref={containerRef}
        className="mt-32 relative w-full max-w-[1400px] h-[480px] md:h-[500px] mx-auto flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {cards.map((c, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            onMouseEnter={() => setHoveredCardIndex(i)}
            onMouseLeave={() => setHoveredCardIndex(null)}
            className="absolute w-[280px] h-[420px] rounded-[28px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.12)] flex flex-col origin-bottom cursor-pointer transition-shadow hover:shadow-[0_30px_70px_rgba(0,0,0,0.18)]"
            style={{
              backgroundColor: c.dark ? "#1a1c18" : "#ffffff",
              color: c.dark ? "#ffffff" : "#1a1c18",
              border: c.dark ? "none" : "1px solid rgba(0,0,0,0.08)",
            }}
          >
            {/* Header: Stars & Contact Tag */}
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {Array.from({ length: c.stars }).map((_, s) => (
                  <Star key={s} className="w-[18px] h-[18px] fill-[#c4f022] stroke-[#c4f022]" />
                ))}
              </div>
              {i === 4 && (
                <span className="text-[10px] font-bold tracking-wider opacity-60">
                  CONTACT SALES
                </span>
              )}
            </div>

            {/* Body Copy */}
            <p className="font-geist mt-8 text-[15px] leading-relaxed font-medium opacity-90 flex-1">
              {c.body}
            </p>

            {/* Footer: Avatar & Info */}
            <div className="mt-8 pt-5 border-t border-current/15 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-current/10 shrink-0">
                <img
                  src={`https://i.pravatar.cc/150?u=${c.name}`}
                  alt={c.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div>
                <div className="font-bold text-sm tracking-tight">{c.name}</div>
                <div className="text-xs opacity-60 font-medium">{c.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}