import Link from "next/link";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ProductCard } from "@/components/product-card";
import {
  ArrowRight,
  ArrowUpRight,
  CategoryIcon,
  Check,
  Star,
} from "@/components/icons";
import { getContent } from "@/lib/content";
import { deriveSite, type Product } from "@/data/types";

// Content is edited from /admin, so this route reads the store per request.
export const instant = false;

export default async function HomePage() {
  const content = await getContent();
  const site = deriveSite(content.settings);
  const { categories, products, hero, stats, values, process, testimonials } =
    content;
  const featuredProducts: Product[] = products
    .filter((p) => p.featured)
    .slice(0, 8);
  const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="shell grid items-center gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-muted">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                {hero.eyebrow} — Sejak {site.established}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-balance font-display text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-ink">
                {hero.headline}{" "}
                <span className="font-serif font-normal italic text-accent">
                  {hero.accent}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-7 max-w-xl text-[1.02rem] leading-relaxed text-muted">
                {hero.subcopy}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href={hero.primaryHref}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-accent"
                >
                  {hero.primaryLabel}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href={hero.secondaryHref}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-ink px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  {hero.secondaryLabel}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                {hero.points.map((point) => (
                  <span key={point} className="flex items-center gap-2">
                    <Check className="size-4 text-accent" />
                    {point}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Hero visual */}
          <Reveal delay={200} className="relative">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="border border-ink bg-paper p-2.5 shadow-[6px_6px_0_0_var(--color-ink)] sm:shadow-[10px_10px_0_0_var(--color-ink)]">
                <div className="blueprint relative bg-paper-2 p-3">
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <span className="eyebrow text-ink">Katalog / Indeks</span>
                    <span className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-muted">
                      Vol. 12 — 2026
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2.5">
                    {categories.slice(0, 4).map((cat, i) => (
                      <Link
                        key={cat.slug}
                        href={`/katalog?kategori=${cat.slug}`}
                        className="group relative flex aspect-4/3 flex-col justify-between overflow-hidden p-3 transition-transform duration-300 hover:-translate-y-0.5"
                        style={{ backgroundColor: cat.tint, color: cat.ink }}
                      >
                        <div className="flex items-start justify-between">
                          <CategoryIcon
                            name={cat.icon}
                            className="size-8 sm:size-10"
                            strokeWidth={1.2}
                          />
                          <span className="font-display text-[0.6rem] font-semibold opacity-50">
                            0{i + 1}
                          </span>
                        </div>
                        <div>
                          <p className="font-display text-[0.78rem] font-semibold leading-tight tracking-tight sm:text-sm">
                            {cat.name}
                          </p>
                          <span className="mt-1 flex items-center gap-1 text-[0.58rem] font-semibold uppercase tracking-[0.12em] opacity-60">
                            Lihat
                            <ArrowUpRight className="size-3" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                    <span className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted">
                      480+ SKU aktif
                    </span>
                    <Link
                      href="/katalog"
                      className="flex items-center gap-1 font-display text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-accent"
                    >
                      Semua produk
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-3 hidden border border-ink bg-accent px-3 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-white sm:block">
                {hero.badge}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Stats strip */}
        <div className="border-t border-line bg-paper-2/50">
          <div className="shell grid grid-cols-2 divide-x divide-line lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={i * 70}
                className="px-2 py-6 first:pl-0 lg:px-8 lg:py-7"
              >
                <p className="font-display text-2xl font-semibold tracking-[-0.03em] text-ink lg:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Marquee items={hero.marquee} />

      {/* ── Value props ──────────────────────────────────────── */}
      <section className="shell py-24 lg:py-32">
        <SectionHeading
          index="01"
          eyebrow="Kenapa ANKA"
          title={
            <>
              Bukan sekadar katalog.{" "}
              <span className="font-serif font-normal italic">
                Rantai pasok.
              </span>
            </>
          }
          description="Kami menjaga hal-hal yang sering membuat proyek tertunda: ketersediaan stok, harga yang jelas, dan pengiriman yang bisa dijanjikan."
        />

        <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <Reveal
              key={value.index}
              delay={i * 80}
              className="group flex flex-col bg-paper p-7 transition-colors hover:bg-paper-2 lg:p-8"
            >
              <span className="font-display text-xs font-semibold tracking-[0.14em] text-accent">
                ({value.index})
              </span>
              <h3 className="mt-8 font-display text-lg font-semibold leading-snug tracking-tight text-ink">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {value.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────── */}
      <section className="border-y border-line bg-paper-2/40">
        <div className="shell py-24 lg:py-32">
          <SectionHeading
            index="02"
            eyebrow="Kategori"
            title="Enam lini produk, satu pemasok."
            description="Semua kebutuhan aksesoris konstruksi dikelompokkan agar mudah dicari — dari hardware halus sampai perlengkapan keselamatan."
            link={{ label: "Lihat seluruh katalog", href: "/katalog" }}
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <Reveal key={cat.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/katalog?kategori=${cat.slug}`}
                  className="group relative flex h-full min-h-56 flex-col justify-between overflow-hidden border border-line bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink"
                >
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ backgroundColor: cat.tint }}
                  />

                  <div className="relative flex items-start justify-between">
                    <span
                      className="flex size-14 items-center justify-center border border-line transition-colors duration-300 group-hover:border-current/20"
                      style={{ color: cat.ink }}
                    >
                      <CategoryIcon
                        name={cat.icon}
                        className="size-7"
                        strokeWidth={1.3}
                      />
                    </span>
                    <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                      0{i + 1}
                    </span>
                  </div>

                  <div className="relative mt-10">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                      {cat.name}
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-ink/70">
                      {cat.blurb}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink">
                      Jelajahi
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured products ────────────────────────────────── */}
      <section className="shell py-24 lg:py-32">
        <SectionHeading
          index="03"
          eyebrow="Pilihan"
          title="Produk yang paling sering dipesan."
          description="Kurasi dari SKU dengan perputaran tertinggi di gudang — siap untuk proyek maupun kebutuhan harian."
          link={{ label: "Semua produk", href: "/katalog" }}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.slice(0, 8).map((product, i) => (
            <Reveal key={product.slug} delay={i * 70}>
              <ProductCard
                product={product}
                category={categoryBySlug.get(product.category) ?? categories[0]}
                index={i}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────── */}
      <section className="border-y border-line bg-ink text-paper">
        <div className="shell py-24 lg:py-32">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow flex items-center gap-3 text-paper/50">
                <span className="text-accent">(04)</span>
                Cara Kerja
                <span className="h-px w-8 bg-line-dark" />
              </p>
              <h2 className="mt-5 text-balance font-display text-[clamp(1.9rem,4vw,3.1rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
                Dari daftar kebutuhan ke{" "}
                <span className="font-serif font-normal italic text-accent">
                  lokasi proyek.
                </span>
              </h2>
            </div>
            <Link
              href="/kontak"
              className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink md:self-auto"
            >
              Mulai sekarang
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((item, i) => (
              <Reveal key={item.step} delay={i * 90} className="relative">
                <div className="flex items-center gap-4">
                  <span className="flex size-11 items-center justify-center rounded-full border border-line-dark font-display text-sm font-semibold text-accent">
                    {item.step}
                  </span>
                  {i < process.length - 1 && (
                    <span className="hidden h-px flex-1 bg-line-dark lg:block" />
                  )}
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/60">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="shell py-24 lg:py-32">
        <SectionHeading
          index="05"
          eyebrow="Testimoni"
          title="Dipercaya oleh yang tahu detailnya."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <Reveal
              key={item.name}
              delay={i * 90}
              className="flex flex-col justify-between border border-line bg-paper p-7 lg:p-8"
            >
              <div>
                <div className="flex gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-3.5" />
                  ))}
                </div>
                <blockquote className="mt-5 font-display text-lg font-medium leading-snug tracking-[-0.01em] text-ink">
                  “{item.quote}”
                </blockquote>
              </div>
              <div className="mt-8 flex items-center gap-3 border-t border-line pt-5">
                <span className="flex size-10 items-center justify-center rounded-full bg-paper-2 font-display text-sm font-semibold text-ink">
                  {item.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{item.name}</p>
                  <p className="text-xs text-muted">{item.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="shell pb-20 lg:pb-28">
        <Reveal className="relative overflow-hidden border border-ink bg-accent">
          <div className="blueprint absolute inset-0 text-white opacity-30" />
          <div className="relative flex flex-col gap-8 p-8 sm:p-12 lg:flex-row lg:items-end lg:justify-between lg:p-16">
            <div className="max-w-2xl">
              <p className="eyebrow text-white/70">Siap mengadakan?</p>
              <h2 className="mt-4 text-balance font-display text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">
                Kirim daftar kebutuhan.{" "}
                <span className="font-serif font-normal italic">
                  Kami hitung sisanya.
                </span>
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/80">
                Penawaran resmi, ketersediaan stok, dan estimasi pengiriman
                dalam 24 jam kerja. Tanpa biaya, tanpa komitmen.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/kontak"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-paper transition-colors hover:bg-white hover:text-ink"
              >
                Minta Penawaran
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Chat WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
