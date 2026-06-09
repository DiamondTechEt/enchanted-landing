import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function CTA() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative bg-foreground text-background py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-background/10 text-background text-sm font-bold"
        >
          IG
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 text-[clamp(3rem,8vw,10rem)] font-black leading-[0.9] tracking-[-0.04em]"
        >
          Ready To Build<br />Your Next<br />Release?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex items-center justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex items-center justify-center cursor-pointer select-none"
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className={`flex items-center gap-0 ${isHovered ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Circle */}
              <motion.span
                layout
                className="w-12 h-12 rounded-full bg-lime text-foreground flex items-center justify-center shrink-0 shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
              >
                <motion.div
                  animate={{
                    opacity: isHovered ? 0 : 1,
                    scale: isHovered ? 0 : 1,
                    rotate: isHovered ? 45 : 0
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 15 }}
                  className="flex items-center justify-center"
                >
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </motion.div>
              </motion.span>

              {/* Pill */}
              <motion.span
                layout
                animate={{ rotate: isHovered ? -5 : 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 15 }}
                className="px-7 py-3 rounded-full bg-lime text-foreground font-medium text-lg whitespace-nowrap shadow-[0_8px_30px_rgba(0,0,0,0.15)] origin-center"
              >
                Book a demo
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

