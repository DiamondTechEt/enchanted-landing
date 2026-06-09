import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";

export function Bottleneck() {
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll progress of the parent container while it's in the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Track the maximum scroll progress reached to ensure once text is revealed, it stays bold/visible
  const maxProgress = useMotionValue(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > maxProgress.get()) {
        maxProgress.set(latest);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, maxProgress]);

  const text = "Great Releases Lose Momentum When Creative Becomes the Bottleneck.";
  const words = text.split(" ");

  // Distribute character fade starts across the middle 70% of scroll progress
  const startReveal = 0.15;
  const endReveal = 0.99;
  const revealRange = endReveal - startReveal;

  // Pre-calculate indices for each character to enable smooth letter-by-letter flow
  let charCounter = 0;
  const wordsWithCharIndices = words.map((word, wIdx) => {
    const chars = word.split("");
    const wordObj = {
      word,
      chars: chars.map((char) => {
        const index = charCounter;
        charCounter++;
        return { char, index };
      }),
    };
    // Account for spaces between words
    if (wIdx < words.length - 1) {
      charCounter++;
    }
    return wordObj;
  });

  const totalChars = charCounter;

  return (
    <section ref={ref} className="relative h-[180vh] w-full bg-background">
      {/* Sticky container that locks the content to the viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6">
        <h2 className="max-w-6xl mx-auto text-center text-[clamp(2.5rem,7vw,6rem)] font-black leading-[1.05] tracking-[-0.03em] flex flex-wrap justify-center gap-x-[0.25em] gap-y-2 select-none">
          {wordsWithCharIndices.map((wordObj, wIdx) => {
            const isLastWord = wIdx === words.length - 1;
            return (
              <span
                key={wIdx}
                className={`inline-block whitespace-nowrap ${
                  isLastWord ? "font-serif italic text-muted-sage" : ""
                }`}
              >
                {wordObj.chars.map(({ char, index }) => {
                  // Calculate scroll range for this specific letter
                  const start = startReveal + (index / totalChars) * revealRange;
                  const end = start + 0.08; // Each letter fades smoothly over 8% of the scroll track
                  const opacity = useTransform(maxProgress, [start, end], [0.15, 1]);

                  return (
                    <motion.span
                      key={index}
                      style={{ opacity }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            );
          })}
        </h2>
      </div>
    </section>
  );
}
