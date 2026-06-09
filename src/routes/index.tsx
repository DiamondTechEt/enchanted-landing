import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Logo, MenuButton, MenuOverlay, SideNav, ContactSticker } from "@/components/Chrome";
import { Hero } from "@/components/sections/Hero";
import { Bottleneck } from "@/components/sections/Bottleneck";
import { Workflows } from "@/components/sections/Workflows";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { EnterWorld } from "@/components/sections/EnterWorld";
import { HowWeHelp } from "@/components/sections/HowWeHelp";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ROB PRODUCTION — Every artist needs a team" },
      { name: "description", content: "ROB PRODUCTION is the creative extension for artists who need to move faster without building an in-house team or juggling multiple vendors." },
    ],
  }),
  component: Index,
});

function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="relative  ">
      <Logo />
      <MenuButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
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
      <Footer />
    </main>
  );
}
