import { Home, Tag, MessageSquare, PlaySquare, AtSign, ArrowUpRight } from "lucide-react";

export function Logo() {
  return (
    <div className="fixed top-6 left-6 z-40">
      <svg width="56" height="56" viewBox="0 0 64 64" className="text-foreground">
        <g fill="currentColor">
          <ellipse cx="32" cy="14" rx="11" ry="14" />
          <ellipse cx="50" cy="32" rx="14" ry="11" />
          <ellipse cx="32" cy="50" rx="11" ry="14" />
          <ellipse cx="14" cy="32" rx="14" ry="11" />
        </g>
        <circle cx="32" cy="32" r="6" fill="var(--background)" />
        <circle cx="32" cy="32" r="2.5" fill="currentColor" />
      </svg>
    </div>
  );
}

export function MenuButton() {
  return (
    <button className="fixed top-6 right-6 z-40 rounded-full bg-foreground px-7 py-3 text-background text-sm font-medium hover:scale-105 transition-transform">
      Menu
    </button>
  );
}

export function SideNav() {
  const items = [Home, Tag, MessageSquare, PlaySquare, AtSign];
  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
      {items.map((Icon, i) => (
        <button
          key={i}
          className="w-12 h-12 rounded-xl bg-foreground/5 hover:bg-foreground/15 transition-colors flex items-center justify-center"
        >
          <Icon className="w-5 h-5 text-foreground/70" strokeWidth={2} />
        </button>
      ))}
    </nav>
  );
}

export function ContactSticker() {
  return (
    <a
      href="#contact"
      className="fixed bottom-6 right-6 z-40 group block w-28 h-28"
    >
      <div className="relative w-full h-full rounded-full bg-lime flex items-center justify-center transition-transform group-hover:scale-110">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-spin-slow">
          <defs>
            <path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
          </defs>
          <text fontSize="11" fontWeight="600" fill="currentColor" className="text-foreground" letterSpacing="1">
            <textPath href="#circ">Contact Us * Contact Us * Contact Us * </textPath>
          </text>
        </svg>
        <ArrowUpRight className="w-7 h-7 text-foreground" strokeWidth={2.2} />
      </div>
    </a>
  );
}
