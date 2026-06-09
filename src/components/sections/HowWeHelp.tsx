import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Italic } from "../Italic";

import cardPalm from "@/assets/card-palm.jpg";
import cardColumns from "@/assets/card-columns.jpg";
import cardBw from "@/assets/card-bw.jpg";

export function HowWeHelp() {
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);

  // Track scroll progress across the 320vh track height
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 28,
    mass: 0.6,
    restDelta: 0.0001
  });

  // Card 01 Motion Values
  const y1 = useTransform(
    smoothProgress,
    [0, 0.3, 0.45, 0.65, 0.8],
    ["0%", "0%", "-4%", "-4%", "-8%"]
  );
  const scale1 = useTransform(
    smoothProgress,
    [0, 0.3, 0.45, 0.65, 0.8],
    [1, 1, 0.92, 0.92, 0.84]
  );
  const rotate1 = useTransform(
    smoothProgress,
    [0, 0.3, 0.45, 0.65, 0.8],
    [2, 2, -2, -2, -4]
  );
  const blur1 = useTransform(
    smoothProgress,
    [0, 0.3, 0.45, 0.65, 0.8],
    [0, 0, 4, 4, 8]
  );
  const brightness1 = useTransform(
    smoothProgress,
    [0, 0.3, 0.45, 0.65, 0.8],
    [1, 1, 0.85, 0.85, 0.7]
  );
  const filter1 = useMotionTemplate`blur(${blur1}px) brightness(${brightness1})`;

  // Card 02 Motion Values
  const y2 = useTransform(
    smoothProgress,
    [0, 0.3, 0.45, 0.65, 0.8],
    ["120%", "120%", "0%", "0%", "-4%"]
  );
  const scale2 = useTransform(
    smoothProgress,
    [0, 0.3, 0.45, 0.65, 0.8],
    [1, 1, 1, 1, 0.92]
  );
  const rotate2 = useTransform(
    smoothProgress,
    [0, 0.3, 0.45, 0.65, 0.8],
    [8, 8, 2, 2, -2]
  );
  const blur2 = useTransform(
    smoothProgress,
    [0, 0.3, 0.45, 0.65, 0.8],
    [0, 0, 0, 0, 4]
  );
  const brightness2 = useTransform(
    smoothProgress,
    [0, 0.3, 0.45, 0.65, 0.8],
    [1, 1, 1, 1, 0.85]
  );
  const filter2 = useMotionTemplate`blur(${blur2}px) brightness(${brightness2})`;

  // Card 03 Motion Values (Stays in foreground)
  const y3 = useTransform(
    smoothProgress,
    [0, 0.65, 0.8],
    ["120%", "120%", "0%"]
  );
  const rotate3 = useTransform(
    smoothProgress,
    [0, 0.65, 0.8],
    [8, 8, 2]
  );
  const scale3 = 1;
  const filter3 = "none";

  // Map motion values to indexes
  const cardTransforms = [
    { scale: scale1, y: y1, rotate: rotate1, filter: filter1, zIndex: 10 },
    { scale: scale2, y: y2, rotate: rotate2, filter: filter2, zIndex: 20 },
    { scale: scale3, y: y3, rotate: rotate3, filter: filter3 as any, zIndex: 30 },
  ];

  const services = [
    {
      n: "01",
      title: "Creative Direction",
      bg: "var(--color-teal-card)",
      heading: "Build a Visual World Worth Believing In.",
      body: "When the music is strong but the visual direction is unclear, even great releases can feel disconnected.",
      img: cardPalm,
    },
    {
      n: "02",
      title: "Packaging",
      bg: "var(--color-pink-card)",
      heading: "Bring Everything Together.",
      body: "Production creates the assets. Packaging turns them into a rollout.",
      img: cardColumns,
    },
    {
      n: "03",
      title: "Adaptation",
      bg: "var(--color-blue-card)",
      heading: "Turn One Release Into Months of Momentum.",
      body: "Because we maintain the creative system behind the rollout, we can keep building as the campaign grows.",
      img: cardBw,
    },
  ];

  return (
    <section ref={ref} className="relative h-[320vh] w-full bg-[#fbf9f4]">
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 py-8">

        {/* Permanent Section Title */}
        <div className="text-center select-none w-full mb-10 md:mb-16 z-0">
          <h2 className="font-display text-[clamp(3rem,8vw,6rem)] font-black leading-[0.9] tracking-tight text-[#1a1c18]">
            How We <Italic>Help.</Italic>
          </h2>
        </div>

        {/* Stacking Cards Container */}
        <div className="relative w-full max-w-5xl h-[460px] md:h-[500px] flex items-center justify-center z-10">
          {services.map((s, i) => {
            const transform = cardTransforms[i];

            return (
              <motion.div
                key={s.n}
                style={{
                  y: transform.y,
                  scale: transform.scale,
                  rotate: transform.rotate,
                  filter: transform.filter,
                  zIndex: transform.zIndex,
                  backgroundColor: s.bg,
                }}
                className="absolute inset-0 rounded-[24px] md:rounded-[32px] p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] flex flex-col origin-top select-none border border-black/5 will-change-transform"
              >
                {/* Card Header Row */}
                <div className="flex items-start justify-between w-full">
                  <h3 className="text-3xl md:text-[48px] font-black leading-none tracking-tight text-[#1a1c18]">
                    {s.title}
                  </h3>
                  <span className="text-3xl md:text-[48px] font-black leading-none tracking-tight text-[#1a1c18]">
                    {s.n}
                  </span>
                </div>

                {/* Card Content Grid */}
                <div className="flex-1 grid md:grid-cols-2 gap-8 md:gap-12 mt-4 md:mt-6 overflow-hidden">

                  {/* Left Column (Copy & Button) */}
                  <div className="flex flex-col justify-end pb-1 md:pb-4">
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-[#1a1c18] mb-2 md:mb-4 max-w-sm">
                        {s.heading}
                      </h4>
                      <p className="font-geist text-xs md:text-sm font-medium leading-relaxed text-[#1a1c18]/80 max-w-sm mb-6 md:mb-8">
                        {s.body}
                      </p>
                    </div>

                    {/* Animated Layout-Swapping CTA button */}
                    <div
                      onMouseEnter={() => setHoveredButton(i)}
                      onMouseLeave={() => setHoveredButton(null)}
                      className="mt-4 flex items-center justify-start cursor-pointer w-fit select-none"
                    >
                      <motion.div
                        layout
                        transition={{ type: "spring", stiffness: 220, damping: 20 }}
                        className={`flex items-center gap-0 ${
                          hoveredButton === i ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <motion.span
                          layout
                          className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#1a1c18] text-[#fbf9f4] flex items-center justify-center shrink-0 shadow-lg"
                        >
                          <motion.div
                            animate={{
                              opacity: hoveredButton === i ? 0 : 1,
                              scale: hoveredButton === i ? 0 : 1,
                            }}
                            transition={{ duration: 0.15 }}
                          >
                            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                          </motion.div>
                        </motion.span>

                        <motion.span
                          layout
                          animate={{ rotate: hoveredButton === i ? -6 : 0 }}
                          transition={{ type: "spring", stiffness: 220, damping: 15 }}
                          className="px-5 py-2 md:px-6 md:py-2.5 rounded-full bg-[#1a1c18] text-[#fbf9f4] font-medium text-xs md:text-sm shadow-lg"
                        >
                          View Details
                        </motion.span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Right Column (Tilted Image Showcase) */}
                  <div className="flex justify-end items-center h-full pb-1 md:pb-4">
                    <div
                      className="h-full max-h-[260px] md:max-h-[300px] aspect-[4/5] rounded-[16px] md:rounded-[20px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-black/5 bg-[#F4F2EB]"
                      style={{
                        transform: `rotate(${i % 2 === 0 ? 3 : -3}deg)`,
                      }}
                    >
                      <motion.img
                        src={s.img}
                        alt=""
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
