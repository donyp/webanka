"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { ArrowUpRight, Close, Menu } from "./icons";
import type { NavItem, SiteLinks } from "@/data/types";
import { cn } from "@/lib/utils";

export function SiteHeader({
  nav,
  site,
}: {
  nav: NavItem[];
  site: SiteLinks;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-line bg-paper transition-shadow duration-300",
        scrolled && "shadow-[0_1px_0_rgba(11,27,43,0.06),0_12px_30px_-24px_rgba(11,27,43,0.5)]",
      )}
    >
      {/* Main bar */}
      <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
        <Logo priority />

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative rounded-full px-3 py-2 text-sm font-semibold transition-colors",
                isActive(item.href)
                  ? "text-ink"
                  : "text-muted hover:text-ink",
              )}
            >
              {item.label}
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300 ease-out",
                  isActive(item.href)
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100",
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/kontak"
            className="group hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent lg:flex"
          >
            Minta Penawaran
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            className="flex size-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink lg:hidden"
          >
            {open ? <Close className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-[4.5rem] bottom-0 z-40 border-t border-line bg-paper transition-all duration-300 lg:hidden",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <div className="shell flex h-full flex-col justify-between py-8">
          <nav className="flex flex-col">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline justify-between border-b border-line py-4"
              >
                <span
                  className={cn(
                    "font-display text-3xl font-semibold tracking-tight transition-colors",
                    isActive(item.href)
                      ? "text-accent"
                      : "text-ink group-hover:text-accent",
                  )}
                >
                  {item.label}
                </span>
                <span className="eyebrow text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </nav>

          <div className="space-y-4">
            <Link
              href="/kontak"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-full bg-ink px-6 py-4 text-sm font-semibold text-paper"
            >
              Minta Penawaran
              <ArrowUpRight className="size-5" />
            </Link>
            <div className="flex flex-col gap-2 text-sm text-muted">
              <a href={site.phoneHref}>{site.phone}</a>
              <a href={site.emailHref}>{site.email}</a>
              <p>{site.hours}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
