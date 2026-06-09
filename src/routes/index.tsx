import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Logo, MenuButton, SideNav, ContactSticker } from "@/components/Chrome";

import cardMan from "@/assets/card-man.jpg";
import cardWoman from "@/assets/card-woman.jpg";
import cardOrange from "@/assets/card-orange.jpg";
import cardDesert from "@/assets/card-desert.jpg";
import cardStones from "@/assets/card-stones.jpg";
import cardHands from "@/assets/card-hands.jpg";
import cardChecker from "@/assets/card-checker.jpg";
import cardPalm from "@/assets/card-palm.jpg";
import cardColumns from "@/assets/card-columns.jpg";
import cardBw from "@/assets/card-bw.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ABABA — Every artist needs a team" },
      { name: "description", content: "ABABA is the creative extension for artists who need to move faster without building an in-house team or juggling multiple vendors." },
    ],
  }),
  component: Index,
});

const fadeUp: import("framer-motion").Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

function Italic({ children }: { children: React.ReactNode }) {
  return <span className="font-serif italic font-normal text-muted-sage">{children}</span>;
}

/* ---------------- Hero ---------------- */
function Hero() {
  const cards = [
    { img: cardMan, bg: undefined, rot: -18, x: -380 },
    { img: undefined, bg: "var(--color-lavender)", rot: -9, x: -190, title: "Great\nPotential", sub: "No Structure", body: "We help emerging artists build a release framework that turns potential into momentum." },
    { img: cardOrange, bg: undefined, rot: 0, x: 0 },
    { img: undefined, bg: "var(--color-teal-card)", rot: 9, x: 190, title: "Release\nModernized", sub: "Built Once, Everywhere", body: "One creative partner from strategy to delivery, built for how music is released today." },
    { img: cardWoman, bg: undefined, rot: 18, x: 380 },
  ];

  return (
    <section className="relative min-h-screen pt-28 pb-10 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.h1
          initial="hidden" animate="show" variants={fadeUp}
          className="text-[clamp(3rem,9vw,8rem)] font-black leading-[0.95] tracking-[-0.04em]"
        >
          Every artist<br />needs a <Italic>team.</Italic>
        </motion.h1>
        <motion.p
          initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.2 }}
          className="mt-8 text-xl md:text-2xl leading-snug max-w-2xl mx-auto"
        >
          ABABA is the <strong className="font-bold">creative extension</strong> for artists who need to move faster without building an in-house team or juggling multiple vendors.
        </motion.p>
      </div>

      <div className="relative mt-20 h-[420px] flex items-end justify-center">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 80, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: c.rot }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -20, rotate: c.rot * 0.4, scale: 1.05, zIndex: 20 }}
            className="absolute bottom-0 w-[260px] h-[340px] rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
            style={{
              left: `calc(50% - 130px + ${c.x}px)`,
              backgroundColor: c.bg,
              zIndex: 10 - Math.abs(i - 2),
            }}
          >
            {c.img && <img src={c.img} alt="" className="w-full h-full object-cover" />}
            {c.title && (
              <div className="p-6 h-full flex flex-col justify-between">
                <h3 className="text-3xl font-black whitespace-pre-line leading-tight">{c.title}</h3>
                <div>
                  <div className="font-bold underline underline-offset-2 mb-1">{c.sub}</div>
                  <p className="text-sm leading-snug">{c.body}</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Bottleneck headline ---------------- */
function Bottleneck() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.7], [0.2, 1, 0.3]);

  return (
    <section ref={ref} className="py-40 px-6">
      <motion.h2 style={{ opacity }} className="max-w-6xl mx-auto text-center text-[clamp(2.5rem,7vw,6rem)] font-black leading-[1.02] tracking-[-0.03em]">
        Great Releases Lose Momentum When{" "}
        <span className="text-foreground/25">Creative Becomes the </span>
        <span className="font-serif italic text-foreground/20">Bottleneck.</span>
      </motion.h2>
    </section>
  );
}

/* ---------------- Workflows ---------------- */
function Workflows() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative h-[500px]">
          <motion.img
            src={cardDesert} alt=""
            initial={{ opacity: 0, rotate: -20, y: 40 }}
            whileInView={{ opacity: 1, rotate: -8, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ rotate: -2, scale: 1.05 }}
            className="absolute top-0 left-4 w-64 h-80 object-cover rounded-3xl shadow-2xl"
          />
          <motion.div
            initial={{ opacity: 0, rotate: 20, y: 40 }}
            whileInView={{ opacity: 1, rotate: 10, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            whileHover={{ rotate: 4, scale: 1.05 }}
            className="absolute top-20 left-48 w-56 h-72 rounded-3xl shadow-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(180deg, var(--color-red-poster) 0%, var(--color-red-poster) 50%, var(--color-yellow-poster) 50%, var(--color-yellow-poster) 100%)" }}
          />
          <motion.img
            src={cardBw} alt=""
            initial={{ opacity: 0, rotate: -15, y: 60 }}
            whileInView={{ opacity: 1, rotate: -5, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ rotate: 0, scale: 1.05 }}
            className="absolute top-56 left-20 w-60 h-72 object-cover rounded-3xl shadow-2xl"
          />
        </div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[0.95] tracking-tight">
            Workflows<br />that keeps<br /><Italic>moving.</Italic>
          </h2>
          <p className="mt-8 text-xl max-w-md">
            From creative direction to final deliverables, we keep the rollout moving.
          </p>
          <button className="mt-8 inline-flex items-center gap-3 group">
            <span className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center group-hover:rotate-45 transition-transform">
              <ArrowUpRight className="w-5 h-5" />
            </span>
            <span className="px-6 py-3 rounded-full bg-foreground text-background font-medium group-hover:bg-foreground/80 transition-colors">
              See How We Work
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Selected Work ---------------- */
function SelectedWork() {
  const works = [
    { title: "Yourgi", img: cardHands },
    { title: "Mereba", img: cardStones },
  ];

  return (
    <section className="py-32 px-6">
      <motion.h2
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
        className="text-center text-[clamp(3rem,8vw,7rem)] font-black leading-[0.95] tracking-tight"
      >
        Selected<br /><Italic>work.</Italic>
      </motion.h2>
      <motion.p
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
        className="text-center text-xl mt-6"
      >
        Worlds built around the release.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        whileHover={{ scale: 1.01 }}
        className="max-w-6xl mx-auto mt-16 rounded-3xl overflow-hidden aspect-[16/8]"
      >
        <img src={cardChecker} alt="" className="w-full h-full object-cover" />
      </motion.div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 mt-6">
        {works.map((w, i) => (
          <motion.a
            key={w.title}
            href="#"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            whileHover={{ y: -8 }}
            className="group block rounded-3xl overflow-hidden bg-mustard relative"
          >
            <div className="aspect-square overflow-hidden">
              <img src={w.img} alt={w.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="px-6 py-5 bg-background border-t border-border">
              <h3 className="text-2xl font-bold">{w.title}</h3>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Enter the World ---------------- */
function EnterWorld() {
  const orbit = [cardMan, cardWoman, cardOrange, cardDesert, cardStones, cardHands, cardChecker, cardPalm, cardColumns, cardBw];
  const radius = 320;

  return (
    <section className="py-40 px-6 overflow-hidden">
      <div className="relative max-w-5xl mx-auto h-[720px] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          {orbit.map((img, i) => {
            const angle = (i / orbit.length) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const rot = (i * 37) % 40 - 20;
            return (
              <motion.div
                key={i}
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute left-1/2 top-1/2 w-32 h-32 -ml-16 -mt-16 rounded-2xl overflow-hidden shadow-xl"
                style={{ transform: `translate(${x}px, ${y}px) rotate(${rot}deg)` }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </motion.div>
            );
          })}
        </motion.div>

        <motion.h2
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          className="relative text-center text-[clamp(3rem,8vw,7rem)] font-black leading-[0.95] tracking-tight"
        >
          Enter the<br />World.
        </motion.h2>
      </div>
    </section>
  );
}

/* ---------------- How We Help ---------------- */
function HowWeHelp() {
  const services = [
    {
      n: "01", title: "Creative Direction", bg: "var(--color-teal-card)",
      heading: "Build a Visual World Worth Believing In.",
      body: "When the music is strong but the visual direction is unclear, even great releases can feel disconnected.",
      img: cardPalm,
    },
    {
      n: "02", title: "Packaging", bg: "var(--color-pink-card)",
      heading: "Bring Everything Together.",
      body: "Production creates the assets. Packaging turns them into a rollout.",
      img: cardColumns,
    },
    {
      n: "03", title: "Adaptation", bg: "var(--color-blue-card)",
      heading: "Turn One Release Into Months of Momentum.",
      body: "Because we maintain the creative system behind the rollout, we can keep building as the campaign grows.",
      img: cardBw,
    },
  ];

  return (
    <section className="py-32 px-6">
      <motion.h2
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
        className="text-center text-[clamp(3rem,8vw,7rem)] font-black leading-[0.95] tracking-tight mb-20"
      >
        How We <Italic>Help.</Italic>
      </motion.h2>

      <div className="max-w-6xl mx-auto space-y-[-60px]">
        {services.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -10, scale: 1.01 }}
            className="relative rounded-3xl p-10 md:p-14 grid md:grid-cols-2 gap-8 items-end shadow-2xl"
            style={{ backgroundColor: s.bg, marginTop: i === 0 ? 0 : "-60px" }}
          >
            <div>
              <div className="flex items-start justify-between mb-16">
                <h3 className="text-4xl md:text-6xl font-black">{s.title}</h3>
                <span className="text-4xl md:text-6xl font-black">{s.n}</span>
              </div>
              <h4 className="text-2xl md:text-3xl font-bold leading-tight">{s.heading}</h4>
              <p className="mt-4 text-lg max-w-md">{s.body}</p>
              <button className="mt-8 inline-flex items-center gap-3 group">
                <span className="w-11 h-11 rounded-full bg-foreground text-background flex items-center justify-center group-hover:rotate-45 transition-transform">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
                <span className="px-6 py-2.5 rounded-full bg-foreground text-background font-medium">View Details</span>
              </button>
            </div>
            <motion.img
              src={s.img} alt=""
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="w-full max-w-sm justify-self-end aspect-[4/5] object-cover rounded-2xl shadow-xl"
              style={{ rotate: i % 2 === 0 ? "4deg" : "-4deg" }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="relative">
      <Logo />
      <MenuButton />
      <SideNav />
      <ContactSticker />

      <Hero />
      <Bottleneck />
      <Workflows />
      <SelectedWork />
      <EnterWorld />
      <HowWeHelp />

      <footer className="py-16 text-center text-sm text-foreground/50">
        © ABABA — Every artist needs a team.
      </footer>
    </main>
  );
}
