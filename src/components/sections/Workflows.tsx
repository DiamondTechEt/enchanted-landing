import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Italic } from "../Italic";
import { fadeUp } from "./animations";
import { useIsMobile } from "@/hooks/use-mobile";

import cardDesert from "@/assets/card-desert.jpg";
import cardBw from "@/assets/card-bw.jpg";

export function Workflows() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const isMobile = useIsMobile();

  const getCardStyle = (index: number) => {
    // Baseline resting positions
    const base = [
      { rotate: -8, x: 0, y: 0, zIndex: 10 },
      { rotate: 10, x: 0, y: 0, zIndex: 20 },
      { rotate: -5, x: 0, y: 0, zIndex: 30 },
    ][index];

    if (isMobile || hoveredCard === null) return { ...base, scale: 1 };

    if (index === hoveredCard) {
      return { rotate: 0, scale: 1.08, x: 0, y: 0, zIndex: 50 };
    }

    // Non-hovered cards get pushed away
    let x = base.x, y = base.y, rotate = base.rotate;

    if (hoveredCard === 1) {
      if (index === 0) { x = isMobile ? -50 : -160; y = isMobile ? -5 : -20; rotate = -14; }
      if (index === 2) { x = isMobile ? -50 : -160; y = isMobile ? 30 : 80; rotate = -12; }
    } else if (hoveredCard === 0) {
      if (index === 1) { x = isMobile ? 60 : 180; y = isMobile ? -5 : -20; rotate = 16; }
      if (index === 2) { x = isMobile ? 60 : 180; y = isMobile ? 20 : 60; rotate = -8; }
    } else if (hoveredCard === 2) {
      if (index === 0) { x = isMobile ? -50 : -150; y = isMobile ? -20 : -50; rotate = -12; }
      if (index === 1) { x = isMobile ? 60 : 180; y = isMobile ? -5 : -20; rotate = 14; }
    }

    return { rotate, scale: 0.95, x, y, zIndex: base.zIndex };
  };

  const spring = { type: "spring" as const, stiffness: 200, damping: 22 };

  if (isMobile) {
    return (
      <section className="py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col gap-12 items-center">
          {/* Card stack (mobile) - separated left/right, fixed position, no hover */}
          <div className="relative w-full h-[315px] select-none mb-16">
            {/* Left Card: Desert */}
            <img
              src={cardDesert}
              alt=""
              className="absolute left-[-35px] top-2 w-[235px] h-[290px] object-cover rounded-3xl shadow-2xl rotate-[-6deg] z-20"
            />

            {/* Right Card: Red/Yellow Poster */}
            <div
              style={{
                background:
                  "linear-gradient(180deg, var(--color-red-poster) 0%, var(--color-red-poster) 50%, var(--color-yellow-poster) 50%, var(--color-yellow-poster) 100%)",
              }}
              className="absolute right-[-35px] top-8 w-[225px] h-[275px] rounded-3xl shadow-xl flex flex-col justify-end overflow-hidden rotate-[8deg] z-10"
            >
              <div className="h-1/2 w-full flex items-center justify-center relative">
                <div className="w-10 h-10 rounded-full border border-black/10 bg-white/20 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center text-[10px]">
                    👤
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="w-full">
            <h2 className="text-[3rem] font-black leading-[0.95] tracking-tight">
              Workflows<br />
              that keeps<br />
              <Italic>moving.</Italic>
            </h2>
            <p className="font-geist mt-6 text-base leading-6 font-normal max-w-md text-[#1a1c18]">
              From creative direction to final deliverables, we keep the rollout moving.
            </p>

            {/* CTA button */}
            <div
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              className="mt-8 flex items-center justify-start cursor-pointer w-fit select-none"
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className={`flex items-center gap-0 ${isButtonHovered ? "flex-row-reverse" : "flex-row"}`}
              >
                <motion.span
                  layout
                  className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center shrink-0 shadow-lg"
                >
                  <motion.div
                    animate={{
                      opacity: isButtonHovered ? 0 : 1,
                      scale: isButtonHovered ? 0 : 1,
                    }}
                    transition={{ duration: 0.15 }}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </motion.div>
                </motion.span>

                <motion.span
                  layout
                  animate={{ rotate: isButtonHovered ? -6 : 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 15 }}
                  className="px-6 py-3 rounded-full bg-foreground text-background font-medium whitespace-nowrap shadow-lg"
                >
                  See How We Work
                </motion.span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-0 items-center">

        {/* Card stack */}
        <div className="relative h-[360px] md:h-[520px] select-none">

          {/* Card 0: Desert */}
          <motion.img
            src={cardDesert}
            alt=""
            initial={{ opacity: 0, rotate: -20, y: 40 }}
            animate={
              hasEntered
                ? {
                    opacity: 1,
                    x: getCardStyle(0).x,
                    y: getCardStyle(0).y,
                    rotate: getCardStyle(0).rotate,
                    scale: getCardStyle(0).scale,
                    zIndex: getCardStyle(0).zIndex,
                  }
                : { opacity: 0, rotate: -20, y: 40 }
            }
            onViewportEnter={() => setHasEntered(true)}
            viewport={{ once: true }}
            transition={{
              ...spring,
              opacity: { duration: 0.8 },
              y: hasEntered ? spring : { duration: 0.8 },
              rotate: hasEntered ? spring : { duration: 0.8 },
            }}
            onMouseEnter={() => !isMobile && setHoveredCard(0)}
            onMouseLeave={() => !isMobile && setHoveredCard(null)}
            className="absolute top-0 left-2 md:left-4 w-48 h-64 md:w-64 md:h-80 object-cover rounded-3xl shadow-2xl cursor-pointer"
          />

          {/* Card 1: Red/Yellow Poster */}
          <motion.div
            initial={{ opacity: 0, rotate: 20, y: 40 }}
            animate={
              hasEntered
                ? {
                    opacity: 1,
                    x: getCardStyle(1).x,
                    y: getCardStyle(1).y,
                    rotate: getCardStyle(1).rotate,
                    scale: getCardStyle(1).scale,
                    zIndex: getCardStyle(1).zIndex,
                  }
                : { opacity: 0, rotate: 20, y: 40 }
            }
            onViewportEnter={() => setHasEntered(true)}
            viewport={{ once: true }}
            transition={{
              ...spring,
              opacity: { duration: 0.8, delay: 0.15 },
              y: hasEntered ? spring : { duration: 0.8, delay: 0.15 },
              rotate: hasEntered ? spring : { duration: 0.8, delay: 0.15 },
            }}
            onMouseEnter={() => !isMobile && setHoveredCard(1)}
            onMouseLeave={() => !isMobile && setHoveredCard(null)}
            style={{
              background:
                "linear-gradient(180deg, var(--color-red-poster) 0%, var(--color-red-poster) 50%, var(--color-yellow-poster) 50%, var(--color-yellow-poster) 100%)",
            }}
            className="absolute top-12 left-32 md:top-20 md:left-48 w-[170px] h-[220px] md:w-56 md:h-72 rounded-3xl shadow-2xl cursor-pointer flex flex-col justify-end overflow-hidden"
          >
            <div className="h-1/2 w-full flex items-center justify-center relative select-none">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black/10 bg-white/20 flex items-center justify-center">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-foreground/10 flex items-center justify-center text-[10px]">
                  👤
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Bw */}
          {!isMobile && (
            <motion.img
              src={cardBw}
              alt=""
              initial={{ opacity: 0, rotate: -15, y: 60 }}
              animate={
                hasEntered
                  ? {
                      opacity: 1,
                      x: getCardStyle(2).x,
                      y: getCardStyle(2).y,
                      rotate: getCardStyle(2).rotate,
                      scale: getCardStyle(2).scale,
                      zIndex: getCardStyle(2).zIndex,
                    }
                  : { opacity: 0, rotate: -15, y: 60 }
              }
              onViewportEnter={() => setHasEntered(true)}
              viewport={{ once: true }}
              transition={{
                ...spring,
                opacity: { duration: 0.8, delay: 0.3 },
                y: hasEntered ? spring : { duration: 0.8, delay: 0.3 },
                rotate: hasEntered ? spring : { duration: 0.8, delay: 0.3 },
              }}
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
              className="absolute top-36 left-12 md:top-56 md:left-20 w-44 h-56 md:w-60 md:h-72 object-cover rounded-3xl shadow-2xl cursor-pointer"
            />
          )}
        </div>

        {/* Text column */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[0.95] tracking-tight">
            Workflows<br />
            that keeps<br />
            <Italic>moving.</Italic>
          </h2>
          <p className="font-geist mt-8 text-base leading-6 font-normal max-w-md text-[#1a1c18]">
              From creative direction to final deliverables, we keep the rollout moving.
          </p>

          {/* CTA button */}
          <div
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            className="mt-8 flex items-center justify-start cursor-pointer w-fit select-none"
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className={`flex items-center gap-0 ${isButtonHovered ? "flex-row-reverse" : "flex-row"}`}
            >
              <motion.span
                layout
                className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center shrink-0 shadow-lg"
              >
                <motion.div
                  animate={{
                    opacity: isButtonHovered ? 0 : 1,
                    scale: isButtonHovered ? 0 : 1,
                  }}
                  transition={{ duration: 0.15 }}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </motion.div>
              </motion.span>

              <motion.span
                layout
                animate={{ rotate: isButtonHovered ? -6 : 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 15 }}
                className="px-6 py-3 rounded-full bg-foreground text-background font-medium whitespace-nowrap shadow-lg"
              >
                See How We Work
              </motion.span>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}