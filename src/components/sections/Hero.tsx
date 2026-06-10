import { useState } from "react";
import { motion } from "framer-motion";
import { Italic } from "../Italic";
import { fadeUp } from "./animations";
import { useIsMobile } from "@/hooks/use-mobile";

import cardMan from "@/assets/card-man.jpg";
import cardOrange from "@/assets/card-orange.jpg";
import cardWoman from "@/assets/card-woman.jpg";

interface HeroCard {
  img?: string;
  bg?: string;
  rot: number;
  x: number;
  title?: string;
  sub?: string;
  body?: string;
  zIndex?: number;
}

export function Hero() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const cards: HeroCard[] = [
    { img: cardMan, bg: undefined, rot: -18, x: -380 },
    {
      img: undefined,
      bg: "var(--color-lavender)",
      rot: -9,
      x: -190,
      title: "Great\nPotential",
      sub: "No Structure",
      body: "We help emerging artists build a release framework that turns potential into momentum.",
    },
    { img: cardOrange, bg: undefined, rot: 0, x: 0 },
    {
      img: undefined,
      bg: "var(--color-teal-card)",
      rot: 9,
      x: 190,
      title: "Release\nModernized",
      sub: "Built Once, Everywhere",
      body: "One creative partner from strategy to delivery, built for how music is released today.",
    },
    { img: cardWoman, bg: undefined, rot: 18, x: 380 },
  ];

  const activeCards: HeroCard[] = isMobile
    ? [
      { img: cardMan, bg: undefined, rot: -6, x: -55, zIndex: 10 },
      { img: cardOrange, bg: undefined, rot: 6, x: 55, zIndex: 20 },
    ]
    : cards;

  const getCardTransform = (index: number) => {
    if (isMobile) {
      const card = activeCards[index];
      let x = card.x;
      let rot = card.rot;
      let scale = 1;
      let y = 0;
      let zIndex = card.zIndex || 10;

      if (hoveredIndex !== null) {
        if (index === hoveredIndex) {
          scale = 1.05;
          rot = 0;
          y = -10;
          zIndex = 50;
        } else if (index < hoveredIndex) {
          x = card.x - 15;
          rot = card.rot - 3;
          scale = 0.95;
        } else {
          x = card.x + 15;
          rot = card.rot + 3;
          scale = 0.95;
        }
      }
      return { x, rot, scale, y, zIndex };
    }

    const scaleFactor = 1.0;
    let x = cards[index].x * scaleFactor;
    let rot = cards[index].rot;
    let scale = 1;
    let y = 0;

    const defaultZIndices = [8, 10, 7, 9, 11];
    let zIndex = defaultZIndices[index];

    if (hoveredIndex !== null) {
      if (index === hoveredIndex) {
        scale = 1.06;
        rot = 0;
        y = -25;
        zIndex = 50;
      } else if (index < hoveredIndex) {
        x = (cards[index].x * scaleFactor) - 80;
        rot = cards[index].rot - 5;
        scale = 0.95;
        y = 0;
      } else {
        x = (cards[index].x * scaleFactor) + 80;
        rot = cards[index].rot + 5;
        scale = 0.95;
        y = 0;
      }
    }

    return { x, rot, scale, y, zIndex };
  };

  return (
    <section className="relative min-h-screen md:h-screen w-full overflow-hidden flex flex-col justify-between pt-24 pb-10 px-6 md:pt-10 md:px-20">
      {/* Title & Description Container */}
      <div className="flex-1 flex flex-col justify-center items-center max-w-5xl mx-auto px-6 text-center select-none z-10">
        <motion.h1
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="font-display text-[clamp(2.6rem,5.5vw,7.5rem)] font-black leading-[0.95] tracking-[-0.04em]"
        >
          Every artist<br />needs a <Italic>team.</Italic>
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.2 }}
          className="font-geist mt-6 text-[17px] sm:text-[19px] leading-7 font-normal max-w-xl mx-auto text-[#1a1c18]"
        >
          ROB PRODUCTION is the <strong className="font-bold">creative extension</strong> for artists who need to move faster without building an in-house team or juggling multiple vendors.
        </motion.p>
      </div>

      {/* Cards Container - placed at the bottom */}
      <div className="relative w-full h-[240px] md:h-[360px] flex items-end justify-center overflow-visible z-20 pb-16">
        {activeCards.map((c, i) => {
          const { x, rot, scale, y, zIndex } = getCardTransform(i);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80, rotate: 0, x: c.x }}
              animate={{
                opacity: 1,
                y,
                rotate: rot,
                x,
                scale,
                zIndex,
              }}
              transition={{
                default: { type: "spring", stiffness: 180, damping: 22 },
                opacity: { delay: 0.4 + i * 0.05, duration: 0.8 },
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="absolute bottom-0 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl cursor-pointer select-none origin-bottom border border-black/5"
              style={{
                left: "50%",
                width: isMobile ? "215px" : "260px",
                height: isMobile ? "285px" : "340px",
                marginLeft: isMobile ? "-107.5px" : "-130px", // centers the element horizontally
                backgroundColor: c.bg,
              }}
            >
              {c.img && <img src={c.img} alt="" className="w-full h-full object-cover pointer-events-none" />}
              {c.title && (
                <div className="p-4 md:p-6 h-full flex flex-col justify-between select-none">
                  <h3 className="text-lg md:text-3xl font-black whitespace-pre-line leading-tight tracking-tight">{c.title}</h3>
                  <div>
                    <div className="font-bold underline underline-offset-2 mb-0.5 md:mb-1 text-[10px] md:text-sm">{c.sub}</div>
                    <p className="font-geist text-[9.5px] md:text-sm leading-[1.3] md:leading-snug text-[#1a1c18]/85">{c.body}</p>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
