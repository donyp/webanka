import Link from "next/link";
import { Logo } from "./logo";
import { ArrowUpRight, Mail, MapPin, Phone } from "./icons";
import type { Category, NavItem, SiteLinks } from "@/data/types";

// Resolved once at build time so the page can be fully prerendered.
const CURRENT_YEAR = new Date().getFullYear();

export function SiteFooter({
  categories,
  nav,
  site,
}: {
  categories: Category[];
  nav: NavItem[];
  site: SiteLinks;
}) {
  return (
    <footer className="bg-ink text-paper">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="max-w-sm">
            <Logo variant="light" />
            <p className="mt-6 text-sm leading-relaxed text-paper/60">
              {site.tagline}. Melayani kontraktor, toko bangunan, dan pemilik
              proyek dengan stok yang jelas dan pengiriman yang tepat waktu.
            </p>
            <Link
              href="/kontak"
              className="group mt-6 inline-flex items-center gap-2 border-b border-paper/25 pb-1 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              Mulai pengadaan
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div>
            <h3 className="eyebrow text-paper/40">Navigasi</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-paper/70 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-paper/40">Kategori</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/katalog?kategori=${cat.slug}`}
                    className="text-paper/70 transition-colors hover:text-accent"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-paper/40">Kontak</h3>
            <ul className="mt-5 space-y-4 text-sm text-paper/70">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>{site.address}</span>
              </li>
              <li>
                <a
                  href={site.phoneHref}
                  className="flex gap-3 transition-colors hover:text-accent"
                >
                  <Phone className="mt-0.5 size-4 shrink-0 text-accent" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.emailHref}
                  className="flex gap-3 transition-colors hover:text-accent"
                >
                  <Mail className="mt-0.5 size-4 shrink-0 text-accent" />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="shell flex flex-col items-start justify-between gap-3 py-6 text-xs text-paper/45 sm:flex-row sm:items-center">
          <p>
            © {CURRENT_YEAR} {site.legalName}. Seluruh hak cipta
            dilindungi.
          </p>
          <div className="flex items-center gap-6">
            <span>Senin – Sabtu · 08.00 – 17.00 WIB</span>
            <span className="hidden sm:inline">Bekasi, Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
