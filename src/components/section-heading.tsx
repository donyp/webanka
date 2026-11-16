import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "./icons";
import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  link,
  className,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  link?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-3xl">
        <p className="eyebrow flex items-center gap-3 text-muted">
          <span className="text-accent">({index})</span>
          {eyebrow}
          <span className="h-px w-8 bg-line" />
        </p>
        <h2 className="mt-5 text-balance font-display text-[clamp(1.9rem,4vw,3.1rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
          {title}
        </h2>
        {description && (
          <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-muted">
            {description}
          </p>
        )}
      </div>

      {link && (
        <Link
          href={link.href}
          className="arrow-link group inline-flex shrink-0 items-center gap-2 self-start border-b border-ink pb-1.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent md:self-auto"
        >
          {link.label}
          <ArrowUpRight className="size-4" />
        </Link>
      )}
    </div>
  );
}
