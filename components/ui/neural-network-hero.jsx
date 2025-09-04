"use client";
import React from "react";
import { Button } from "@/components/ui/button";

export default function NeuralNetworkHero({
  title,
  description,
  badgeText,
  badgeLabel,
  ctaButtons = [],
  microDetails = [],
}) {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background: layered SVG blobs + subtle noise to mimic generative surface */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.85" />
            </linearGradient>
            <filter id="blur">
              <feGaussianBlur stdDeviation="40" />
            </filter>
          </defs>
          <g filter="url(#blur)">
            <circle cx="150" cy="200" r="220" fill="url(#g1)"></circle>
            <circle cx="600" cy="120" r="180" fill="#f59e0b" fillOpacity="0.14"></circle>
            <circle cx="520" cy="420" r="240" fill="#ef4444" fillOpacity="0.08"></circle>
          </g>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            {badgeLabel && (
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold px-2 py-1 rounded-sm bg-white/10">{badgeLabel}</span>
                <span className="text-sm opacity-90">{badgeText}</span>
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-heading leading-tight text-white">{title}</h1>
            <p className="mt-4 text-lg text-white/90">{description}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              {ctaButtons.map((b, i) => (
                <Button key={i} variant={b.primary ? undefined : "neutral"} asChild>
                  <a href={b.href || '#'}>{b.text}</a>
                </Button>
              ))}
            </div>

            {microDetails?.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-3 text-sm text-white/80">
                {microDetails.map((m, i) => (
                  <li key={i} className="bg-white/5 px-2 py-1 rounded-sm">{m}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-center">
            <div className="rounded-base border-4 border-border bg-secondary-background p-6 max-w-md w-full shadow-shadow">
              <h3 className="text-lg font-bold">Generative Surface</h3>
              <p className="mt-2 text-sm opacity-90">A minimal preview placeholder for a neural canvas or illustration.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
