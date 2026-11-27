"use client";

import { useEffect, useState } from "react";
import { WhatsApp } from "./icons";

export function WhatsAppButton({ href }: { href: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi ANKA via WhatsApp"
      className={`group fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-ink py-3 text-paper shadow-[0_12px_30px_-12px_rgba(11,27,43,0.7)] transition-all duration-300 hover:bg-accent sm:right-6 sm:bottom-6 ${
        scrolled ? "px-3" : "px-3 sm:pr-4 sm:pl-3"
      }`}
    >
      <span className="flex size-9 items-center justify-center rounded-full bg-accent text-white transition-colors group-hover:bg-white group-hover:text-accent">
        <WhatsApp className="size-5" />
      </span>
      <span
        className={`overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 ${
          scrolled
            ? "max-w-0 opacity-0"
            : "max-w-[140px] opacity-100 hidden sm:block"
        }`}
      >
        Chat via WhatsApp
      </span>
    </a>
  );
}