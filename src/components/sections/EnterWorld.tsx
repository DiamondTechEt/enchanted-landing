import { useState } from "react";
import { motion } from "framer-motion";
import { Italic } from "../Italic";
import { useIsMobile } from "@/hooks/use-mobile";

import cardMan from "@/assets/card-man.jpg";
import cardDesert from "@/assets/card-desert.jpg";
import cardWoman from "@/assets/card-woman.jpg";
import cardHands from "@/assets/card-hands.jpg";
import cardOrange from "@/assets/card-orange.jpg";
import cardBw from "@/assets/card-bw.jpg";
import cardColumns from "@/assets/card-columns.jpg";
import cardStones from "@/assets/card-stones.jpg";
import cardPalm from "@/assets/card-palm.jpg";
import cardChecker from "@/assets/card-checker.jpg";

export function EnterWorld() {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  // Exact tilt array specified in the design requirements
  const tilts = [6, -9, 12, -5, 8, -11, 4, -7, 10, -3];

  const orbit = [
    cardMan,
    cardDesert,
    cardWoman,
    cardHands,
    cardOrange,
    cardBw,
    cardColumns,
    cardStones,
    cardPalm,
    cardChecker,
  ];

  const radius = isMobile ? 155 : 340;
  const cardSize = isMobile ? 65 : 160;
  const containerHeight = isMobile ? "h-[450px]" : "h-[800px]";

  // Shared transition configuration for synchronized container rotation
  const rotationTransition = {
    duration: 40,
    repeat: Infinity,
    ease: "linear"
  } as const;

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#F4F2EB] py-20 px-6">
      <div className={`relative w-full max-w-6xl ${containerHeight} flex items-center justify-center`}>

        {/* Orbit Ring Wrapper */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={rotationTransition}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        >
          {orbit.map((img, i) => {
            // Polar coordinate layout
            const angle = (i / orbit.length) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const tilt = tilts[i % tilts.length];

            // Calculate rotation so that the bottom of the card faces the center
            const angleDeg = angle * (180 / Math.PI);
            const finalRotation = angleDeg + 90 + tilt;

            // Calculate staggered deal delay (Top card in stack deals first)
            const dealDelay = 0.4 + (orbit.length - 1 - i) * 0.15;

            return (
              <motion.div
                key={i}
                // Starts as a stacked messy deck in the center, completely flat
                initial={{
                  x: 0,
                  y: 0,
                  rotate: tilt,
                  rotateY: 0,
                  scale: 0.75,
                  opacity: 0
                }}
                animate={{
                  x: x,
                  y: y,
                  rotate: finalRotation,
                  rotateY: 360, // 360 degree spin mimics front -> back -> front again
                  scale: 1,
                  opacity: 1
                }}
                transition={{
                  // 1. Distribute flat first
                  x: { type: "spring", stiffness: 60, damping: 14, delay: dealDelay },
                  y: { type: "spring", stiffness: 60, damping: 14, delay: dealDelay },
                  rotate: { type: "spring", stiffness: 60, damping: 14, delay: dealDelay },
                  scale: { type: "spring", stiffness: 60, damping: 14, delay: dealDelay },
                  opacity: { duration: 0.3 },
                  // 2. Flip triggers AFTER the cards have settled in the ring
                  rotateY: {
                    duration: 2,
                    ease: "easeInOut",
                    delay: dealDelay + 2.5, // Waits 2.5 seconds after dealing before flipping
                    repeat: Infinity, // Keeps performing the flip periodically
                    repeatDelay: 10 // Waits 10 seconds between flips
                  }
                }}
                className="absolute left-1/2 top-1/2 rounded-[14px] md:rounded-[24px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.18)] bg-background border border-black/5"
                style={{
                  perspective: 1000, // Adds depth dimension to the flip
                  width: cardSize,
                  height: cardSize,
                  marginLeft: -cardSize / 2,
                  marginTop: -cardSize / 2,
                }}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ scale: 1.15 }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Center Text Wrapper */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 2.2 }} // Delayed slightly so it appears after the deck finishes dealing out
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative text-center text-[clamp(1.8rem,4.5vw,4rem)] font-black leading-[0.92] tracking-tight text-foreground select-none font-display z-10 pointer-events-auto cursor-default"
        >
          <span className="block">Enter the</span>
          <span className="block"><Italic>World.</Italic></span>

          {/* Animated Underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 0.6 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="h-[4px] bg-foreground w-full origin-center mt-4 rounded-full"
          />
        </motion.h2>

      </div>
    </section>
  );
}