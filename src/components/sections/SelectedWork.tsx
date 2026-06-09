import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Italic } from "../Italic";

import cardHands from "@/assets/card-hands.jpg";
import cardStones from "@/assets/card-stones.jpg";
import cardChecker from "@/assets/card-checker.jpg";
import cardOrange from "@/assets/card-orange.jpg";

interface CardProps {
  title: string;
  img: string;
  aspectClass: string;
  href: string;
}

function HoverCard({ title, img, aspectClass, href }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`group block rounded-3xl overflow-hidden relative cursor-pointer ${aspectClass} shadow-xl`}
    >
      {/* Background Image with Hover Scale */}
      <motion.img
        src={img}
        alt={title}
        animate={{ scale: isHovered ? 1.03 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full object-cover"
      />

      {/* Dark overlay on hover */}
      <motion.div
        animate={{ opacity: isHovered ? 0.15 : 0 }}
        className="absolute inset-0 bg-black pointer-events-none"
      />

      {/* Floating text label at bottom left */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl px-6 py-3.5 shadow-xl text-left select-none border border-black/5"
          >
            <span className="font-geist text-base font-bold text-foreground tracking-tight">
              {title}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
}

export function SelectedWork() {
  return (
    <section className="py-32 px-6">
      {/* Section Title & Subtitle */}
      <div className="text-center mb-16 select-none">
        <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[0.95] tracking-tight">
          Selected <Italic>work.</Italic>
        </h2>
        <p className="font-geist mt-4 text-base leading-6 font-normal text-[#1a1c18]/80">
          Worlds built around the release.
        </p>
      </div>

      {/* Card Grid Layout */}
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* Row 1: Full-width plate card (ETR) */}
        <HoverCard
          title="ETR"
          img={cardChecker}
          aspectClass="w-full aspect-[16/8]"
          href="https://ababa.io/work/etr"
        />

        {/* Row 2: Two-column grid (Yourgi) */}
        <div className="grid md:grid-cols-2 gap-6">
          <HoverCard
            title="Yourgi (Concept)"
            img={cardHands}
            aspectClass="w-full aspect-square"
            href="https://ababa.io/work/yourgi"
          />
          <HoverCard
            title="Yourgi"
            img={cardOrange}
            aspectClass="w-full aspect-square"
            href="https://ababa.io/work/yourgi"
          />
        </div>

        {/* Row 3: Full-width stones card (Mereba) */}
        <HoverCard
          title="Mereba"
          img={cardStones}
          aspectClass="w-full aspect-[16/8]"
          href="https://ababa.io/work/mereba"
        />
      </div>
    </section>
  );
}
