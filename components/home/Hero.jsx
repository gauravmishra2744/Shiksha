"use client";
import NeuralNetworkHero from "@/components/ui/neural-network-hero";

export default function Hero() {
  return (
    <NeuralNetworkHero
      title="Learn. Share. Grow."
      description="A friendly platform for teachers and students to share knowledge and collaborate."
      badgeText="Generative Surfaces"
      badgeLabel="New"
      ctaButtons={[{ text: "Get started", href: "#get-started", primary: true }, { text: "Explore", href: "#explore" }]}
      microDetails={["Low‑weight font", "Tight tracking", "Subtle motion"]}
    />
  );
}

