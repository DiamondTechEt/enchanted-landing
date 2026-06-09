import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Star } from "lucide-react";
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

/* ---------------- Bottleneck — word-by-word scroll reveal ---------------- */
function Bottleneck() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.4"] });

  const text = "Great Releases Lose Momentum When Creative Becomes the Bottleneck.";
  const words = text.split(" ");

  return (
    <section ref={ref} className="py-40 px-6">
      <h2 className="max-w-6xl mx-auto text-center text-[clamp(2.5rem,7vw,6rem)] font-black leading-[1.05] tracking-[-0.03em] flex flex-wrap justify-center gap-x-[0.25em] gap-y-2">
        {words.map((w, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
          const isLast = i === words.length - 1;
          return (
            <motion.span
              key={i}
              style={{ opacity }}
              className={isLast ? "font-serif italic text-muted-sage" : ""}
            >
              {w}
            </motion.span>
          );
        })}
      </h2>
    </section>
  );
}

/* ---------------- Workflows — images push apart on hover / scroll ---------------- */
function Workflows() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const spread = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const xA = useTransform(spread, [0, 1], [0, -60]);
  const xB = useTransform(spread, [0, 1], [0, 40]);
  const xC = useTransform(spread, [0, 1], [0, -30]);
  const yC = useTransform(spread, [0, 1], [0, 40]);

  return (
    <section className="py-32 px-6">
      <div ref={ref} className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative h-[520px] group">
          <motion.img
            src={cardDesert} alt=""
            initial={{ opacity: 0, rotate: -20, y: 40 }}
            whileInView={{ opacity: 1, rotate: -8, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ x: xA }}
            whileHover={{ rotate: -14, scale: 1.06, x: -90, zIndex: 30 }}
            className="absolute top-0 left-4 w-64 h-80 object-cover rounded-3xl shadow-2xl cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, rotate: 20, y: 40 }}
            whileInView={{ opacity: 1, rotate: 10, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{ x: xB, background: "linear-gradient(180deg, var(--color-red-poster) 0%, var(--color-red-poster) 50%, var(--color-yellow-poster) 50%, var(--color-yellow-poster) 100%)" }}
            whileHover={{ rotate: 16, scale: 1.06, x: 80, zIndex: 30 }}
            className="absolute top-20 left-48 w-56 h-72 rounded-3xl shadow-2xl cursor-pointer"
          />
          <motion.img
            src={cardBw} alt=""
            initial={{ opacity: 0, rotate: -15, y: 60 }}
            whileInView={{ opacity: 1, rotate: -5, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ x: xC, y: yC }}
            whileHover={{ rotate: -12, scale: 1.06, x: -60, y: 70, zIndex: 30 }}
            className="absolute top-56 left-20 w-60 h-72 object-cover rounded-3xl shadow-2xl cursor-pointer"
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

/* ---------------- Selected Work — hover overlay text ---------------- */
function SelectedWork() {
  const works = [
    { title: "Yourgi", overlay: "Selected\nwork.", img: cardHands },
    { title: "Mereba", overlay: "Worlds built\naround the release.", img: cardStones },
  ];

  return (
    <section className="py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        whileHover={{ scale: 1.01 }}
        className="group max-w-6xl mx-auto rounded-3xl overflow-hidden aspect-[16/8] relative cursor-pointer"
      >
        <img src={cardChecker} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-foreground/40">
          <h2 className="text-[clamp(3rem,8vw,6rem)] font-black text-background leading-[0.95] tracking-tight">
            Selected<br /><span className="font-serif italic font-normal">work.</span>
          </h2>
          <p className="mt-4 text-xl text-background">Worlds built around the release.</p>
        </div>
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
            <div className="aspect-square overflow-hidden relative">
              <img src={w.img} alt={w.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 flex items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-foreground/50 p-6">
                <h3 className="text-4xl md:text-5xl font-black text-background whitespace-pre-line leading-tight">{w.overlay}</h3>
              </div>
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

/* ---------------- Enter the World — full circle, 360° rotation ---------------- */
function EnterWorld() {
  const orbit = [cardMan, cardDesert, cardWoman, cardHands, cardOrange, cardBw, cardColumns, cardStones, cardPalm, cardChecker];
  const radius = 360;

  return (
    <section className="py-40 px-6 overflow-hidden">
      <div className="relative max-w-6xl mx-auto h-[820px] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          {orbit.map((img, i) => {
            const angle = (i / orbit.length) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const rot = ((i * 47) % 30) - 15;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 w-36 h-36 md:w-40 md:h-40 -ml-20 -mt-20 rounded-2xl overflow-hidden shadow-xl"
                style={{ transform: `translate(${x}px, ${y}px) rotate(${rot}deg)` }}
              >
                <motion.img
                  animate={{ rotate: -360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
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

/* ---------------- How We Help — sticky title, cards scroll past ---------------- */
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
    <section className="relative px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.3fr] gap-10 items-start">
        {/* Sticky title column */}
        <div className="md:sticky md:top-24 self-start py-20">
          <h2 className="text-[clamp(3rem,7vw,6rem)] font-black leading-[0.9] tracking-tight">
            How We <Italic>Help.</Italic>
          </h2>
          <p className="mt-6 text-lg max-w-sm text-foreground/70">
            Three connected services. One creative system that keeps every release moving.
          </p>
        </div>

        {/* Scrolling cards column */}
        <div className="py-20 space-y-6">
          {services.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="rounded-3xl p-8 md:p-10 shadow-2xl"
              style={{ backgroundColor: s.bg }}
            >
              <div className="flex items-start justify-between mb-10">
                <h3 className="text-3xl md:text-5xl font-black">{s.title}</h3>
                <span className="text-3xl md:text-5xl font-black">{s.n}</span>
              </div>
              <motion.img
                src={s.img} alt=""
                whileHover={{ rotate: 0, scale: 1.04 }}
                className="w-full aspect-[16/9] object-cover rounded-2xl shadow-xl"
                style={{ rotate: i % 2 === 0 ? "2deg" : "-2deg" }}
              />
              <h4 className="mt-8 text-2xl md:text-3xl font-bold leading-tight">{s.heading}</h4>
              <p className="mt-4 text-lg max-w-md">{s.body}</p>
              <button className="mt-8 inline-flex items-center gap-3 group">
                <span className="w-11 h-11 rounded-full bg-foreground text-background flex items-center justify-center group-hover:rotate-45 transition-transform">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
                <span className="px-6 py-2.5 rounded-full bg-foreground text-background font-medium">View Details</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
function Testimonials() {
  const cards = [
    { dark: false, stars: 5, body: "I truly appreciate the work they've helped our family studio with — such a careful and authentic attention to storytelling. Their passion has made an impact on our brand.", name: "Sarah Lee", role: "Creative Director" },
    { dark: true,  stars: 3, body: "We loved the energy and the way they captured the tension and rhythm of our latest record from the very first session.", name: "Marcus Bell", role: "Producer" },
    { dark: false, stars: 5, body: "From the start, the Ababa team was thoroughly engaged and thoughtful in their execution, offering solutions and suggestions on how to get our project over the line. I would partner with them again, and would refer them without question.", name: "Tom Coppola", role: "Label Founder" },
    { dark: true,  stars: 5, body: "From the very first conversation, Conusely felt more like a partner than an agency. They took the time to understand our challenges and translated complex ideas into a clean, intuitive digital experience.", name: "Jane Park", role: "Head of Marketing" },
    { dark: false, stars: 5, body: "Working with them was easy as A-B-A-B-A!", name: "Tom Greenwald", role: "Manager" },
  ];

  return (
    <section className="py-32 px-6 overflow-hidden">
      <motion.h2
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
        className="max-w-5xl mx-auto text-center text-[clamp(2.5rem,7vw,6rem)] font-black leading-[1] tracking-tight"
      >
        Trusted by teams who move <Italic>fast.</Italic>
      </motion.h2>

      <div className="mt-20 flex justify-center items-end gap-[-30px] flex-wrap px-4">
        {cards.map((c, i) => {
          const rot = (i - 2) * 4;
          const y = Math.abs(i - 2) * 14;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80, rotate: 0 }}
              whileInView={{ opacity: 1, y, rotate: rot }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: y - 30, rotate: rot * 0.3, scale: 1.04, zIndex: 30 }}
              className="relative w-[260px] min-h-[440px] rounded-3xl p-6 shadow-2xl flex flex-col -mx-3"
              style={{
                backgroundColor: c.dark ? "var(--color-foreground)" : "var(--color-background)",
                color: c.dark ? "var(--color-background)" : "var(--color-foreground)",
                border: c.dark ? "none" : "1px solid var(--color-border)",
                zIndex: 10 + (5 - Math.abs(i - 2)),
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: c.stars }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-lime stroke-lime" />
                  ))}
                </div>
                <span className="text-[10px] font-bold tracking-wider opacity-70">CONTACT SALES</span>
              </div>
              <p className="mt-8 text-base leading-snug flex-1">{c.body}</p>
              <div className="mt-6 pt-4 border-t border-current/10">
                <div className="font-bold">{c.name}</div>
                <div className="text-xs opacity-70">{c.role}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function CTA() {
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
          className="mt-16 text-[clamp(3rem,11vw,10rem)] font-black leading-[0.9] tracking-[-0.04em]"
        >
          Ready To Build<br />Your Next<br />Release?
        </motion.h2>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          className="mt-16 inline-flex items-center gap-2 group"
        >
          <span className="w-12 h-12 rounded-full bg-lime text-foreground flex items-center justify-center group-hover:rotate-45 transition-transform">
            <ArrowUpRight className="w-5 h-5" />
          </span>
          <span className="px-7 py-3 rounded-full bg-lime text-foreground font-medium text-lg">
            Book a demo
          </span>
        </motion.button>
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
      <Testimonials />
      <CTA />

      <footer className="py-16 text-center text-sm text-foreground/50">
        © ABABA — Every artist needs a team.
      </footer>
    </main>
  );
}
