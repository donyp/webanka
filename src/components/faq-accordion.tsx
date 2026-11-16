"use client";

import { useState } from "react";
import { Minus, Plus } from "./icons";
import type { FaqItem } from "@/data/types";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span
                className={cn(
                  "font-display text-base font-semibold transition-colors sm:text-lg",
                  isOpen ? "text-accent" : "text-ink",
                )}
              >
                {faq.q}
              </span>
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors",
                  isOpen
                    ? "border-accent bg-accent text-white"
                    : "border-line text-ink",
                )}
              >
                {isOpen ? (
                  <Minus className="size-4" />
                ) : (
                  <Plus className="size-4" />
                )}
              </span>
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen
                  ? "grid-rows-[1fr] pb-5 opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <p className="max-w-2xl overflow-hidden pr-12 text-sm leading-relaxed text-muted">
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
