import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Italic } from "../Italic";

import cardPalm from "@/assets/card-palm.jpg";
import cardColumns from "@/assets/card-columns.jpg";
import cardBw from "@/assets/card-bw.jpg";

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutQuart(t: number): number {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

// Only for numeric output ranges
function useSmoothTransform(
  value: MotionValue<number>,
  inputRange: number[],
  outputRange: number[],
  easeFn: (t: number) => number = easeOutCubic
): MotionValue<number> {
  return useTransform(value, inputRange, outputRange, {
    mixer: (from, to) => (t: number) => from + (to - from) * easeFn(t),
  });
}

export function HowWeHelp() {
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // ─── Card 01 ─────────────────────────────────────────────────────────────
  // y uses plain useTransform (string output — % values)
  const y1 = useTransform(
    scrollYProgress,
    [0, 0.4, 0.55, 0.72, 0.85],
    ["0%", "0%", "-4%", "-4%", "-8%"]
  );
  const scale1 = useSmoothTransform(
    scrollYProgress,
    [0, 0.4, 0.55, 0.72, 0.85],
    [1, 1, 0.93, 0.93, 0.85],
    easeInOutQuart
  );
  const rotate1 = useSmoothTransform(
    scrollYProgress,
    [0, 0.4, 0.55, 0.72, 0.85],
    [1.5, 1.5, -1.5, -1.5, -3],
    easeInOutQuart
  );
  const opacity1 = useSmoothTransform(
    scrollYProgress,
    [0, 0.4, 0.55, 0.72, 0.85],
    [1, 1, 0.9, 0.9, 0.72],
    easeInOutQuart
  );
  const blur1 = useSmoothTransform(
    scrollYProgress,
    [0, 0.4, 0.55, 0.72, 0.85],
    [0, 0, 3, 3, 7],
    easeInOutQuart
  );
  const brightness1 = useSmoothTransform(
    scrollYProgress,
    [0, 0.4, 0.55, 0.72, 0.85],
    [1, 1, 0.88, 0.88, 0.72],
    easeInOutQuart
  );
  const filter1 = useMotionTemplate`blur(${blur1}px) brightness(${brightness1})`;

  // ─── Card 02 ─────────────────────────────────────────────────────────────
  const y2 = useTransform(
    scrollYProgress,
    [0, 0.38, 0.52, 0.7, 0.84],
    ["115%", "115%", "0%", "0%", "-4%"]
  );
  const scale2 = useSmoothTransform(
    scrollYProgress,
    [0, 0.38, 0.52, 0.7, 0.84],
    [1, 1, 1, 1, 0.93],
    easeInOutQuart
  );
  const rotate2 = useSmoothTransform(
    scrollYProgress,
    [0, 0.38, 0.52, 0.7, 0.84],
    [5, 5, 1.5, 1.5, -1.5],
    easeOutCubic
  );
  const opacity2 = useSmoothTransform(
    scrollYProgress,
    [0, 0.38, 0.52, 0.7, 0.84],
    [1, 1, 1, 1, 0.88],
    easeInOutQuart
  );
  const blur2 = useSmoothTransform(
    scrollYProgress,
    [0, 0.38, 0.52, 0.7, 0.84],
    [0, 0, 0, 0, 3],
    easeInOutQuart
  );
  const brightness2 = useSmoothTransform(
    scrollYProgress,
    [0, 0.38, 0.52, 0.7, 0.84],
    [1, 1, 1, 1, 0.88],
    easeInOutQuart
  );
  const filter2 = useMotionTemplate`blur(${blur2}px) brightness(${brightness2})`;

  // ─── Card 03 ─────────────────────────────────────────────────────────────
  const y3 = useTransform(
    scrollYProgress,
    [0, 0.72, 0.85],
    ["115%", "115%", "0%"]
  );
  const rotate3 = useSmoothTransform(
    scrollYProgress,
    [0, 0.72, 0.85],
    [5, 5, 1.5],
    easeOutCubic
  );

  const cardTransforms = [
    { scale: scale1, y: y1, rotate: rotate1, filter: filter1, opacity: opacity1, zIndex: 10 },
    { scale: scale2, y: y2, rotate: rotate2, filter: filter2, opacity: opacity2, zIndex: 20 },
    { scale: 1, y: y3, rotate: rotate3, filter: "none", opacity: 1, zIndex: 30 },
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
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 py-8">

        <div className="text-center select-none w-full mb-10 md:mb-16 z-0">
          <h2 className="font-display text-[clamp(3rem,8vw,6rem)] font-black leading-[0.9] tracking-tight text-[#1a1c18]">
            How We <Italic>Help.</Italic>
          </h2>
        </div>

        <div className="relative w-full max-w-5xl h-[70vh] md:h-[500px] flex items-center justify-center z-10">
          {services.map((s, i) => {
            const t = cardTransforms[i];

            return (
              <motion.div
                key={s.n}
                style={{
                  y: t.y,
                  scale: t.scale,
                  rotate: t.rotate,
                  filter: t.filter,
                  opacity: t.opacity,
                  zIndex: t.zIndex,
                  backgroundColor: s.bg,
                }}
                className="absolute inset-0 rounded-[24px] md:rounded-[32px] p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] flex flex-col origin-top select-none border border-black/5 will-change-transform"
              >
                <div className="flex items-start justify-between w-full">
                  <h3 className="text-3xl md:text-[48px] font-black leading-none tracking-tight text-[#1a1c18]">
                    {s.title}
                  </h3>
                  <span className="text-3xl md:text-[48px] font-black leading-none tracking-tight text-[#1a1c18]">
                    {s.n}
                  </span>
                </div>

                <div className="flex-1 flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-12 mt-4 md:mt-6 overflow-hidden">

                  <div className="flex flex-col justify-end pb-1 md:pb-4 order-2 md:order-1">
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-[#1a1c18] mb-2 md:mb-4 max-w-sm">
                        {s.heading}
                      </h4>
                      <p className="font-geist text-xs md:text-sm font-medium leading-relaxed text-[#1a1c18]/80 max-w-sm mb-6 md:mb-8">
                        {s.body}
                      </p>
                    </div>

                    <div
                      onMouseEnter={() => setHoveredButton(i)}
                      onMouseLeave={() => setHoveredButton(null)}
                      className="mt-4 flex items-center justify-start cursor-pointer w-fit select-none"
                    >
                      <motion.div
                        layout
                        transition={{ type: "spring", stiffness: 160, damping: 24 }}
                        className={`flex items-center gap-0 ${hoveredButton === i ? "flex-row-reverse" : "flex-row"
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
                            transition={{ duration: 0.2, ease: "easeOut" }}
                          >
                            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                          </motion.div>
                        </motion.span>

                        <motion.span
                          layout
                          animate={{ rotate: hoveredButton === i ? -6 : 0 }}
                          transition={{ type: "spring", stiffness: 160, damping: 24 }}
                          className="px-5 py-2 md:px-6 md:py-2.5 rounded-full bg-[#1a1c18] text-[#fbf9f4] font-medium text-xs md:text-sm shadow-lg"
                        >
                          View Details
                        </motion.span>
                      </motion.div>
                    </div>
                  </div>

                  <div className="flex justify-center md:justify-end items-center h-full pb-1 md:pb-4 order-1 md:order-2">
                    <div
                      className="h-[180px] md:h-full max-h-[260px] md:max-h-[300px] aspect-[4/5] rounded-[16px] md:rounded-[20px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-black/5 bg-[#F4F2EB]"
                      style={{ transform: `rotate(${i % 2 === 0 ? 3 : -3}deg)` }}
                    >
                      <motion.img
                        src={s.img}
                        alt=""
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
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