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
} from "@/components/icons";
import { getContent } from "@/lib/content";
import { deriveSite, type Product, type Article } from "@/data/types";

export const instant = false;

export default async function HomePage() {
  const content = await getContent();
  const site = deriveSite(content.settings);
  const { categories, products, hero, articles } = content;
  const featuredProducts: Product[] = products
    .filter((p) => p.featured)
    .slice(0, 8);
  const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));
  const latestArticles: Article[] = (articles ?? [])
    .filter((a) => a.status === "published")
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, 3);

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
                {hero.eyebrow}
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
                      {products.length}+ SKU
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
                      {products.length}+ produk aktif
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
      </section>

      <Marquee items={hero.marquee} />

      {/* ── Categories ───────────────────────────────────────── */}
      <section className="border-y border-line bg-paper-2/40">
        <div className="shell py-20 lg:py-28">
          <SectionHeading
            index="01"
            eyebrow="Kategori"
            title="Semua kebutuhan, satu katalog."
            description="Pilih kategori untuk mulai menjelajah produk. Setiap produk dilengkapi spesifikasi dan panduan awam."
            link={{ label: "Lihat seluruh katalog", href: "/katalog" }}
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <Reveal key={cat.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/katalog?kategori=${cat.slug}`}
                  className="group relative flex h-full min-h-48 flex-col justify-between overflow-hidden border border-line bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink"
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

                  <div className="relative mt-8">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                      {cat.name}
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-ink/70">
                      {cat.blurb}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink">
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
      <section className="shell py-20 lg:py-28">
        <SectionHeading
          index="02"
          eyebrow="Produk"
          title="Produk yang paling sering dipesan."
          description="Kurasi dari SKU dengan perputaran tertinggi — siap untuk proyek maupun kebutuhan harian."
          link={{ label: "Semua produk", href: "/katalog" }}
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.slice(0, 6).map((product, i) => (
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

      {/* ── Latest articles ──────────────────────────────────── */}
      {latestArticles.length > 0 && (
        <section className="border-y border-line bg-paper-2/40">
          <div className="shell py-20 lg:py-28">
            <SectionHeading
              index="03"
              eyebrow="Artikel"
              title="Bacaan teknis & tips."
              description="Artikel singkat untuk membantu memilih dan memakai produk dengan benar."
              link={{ label: "Semua artikel", href: "/artikel" }}
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {latestArticles.map((article, i) => (
                <Reveal key={article.slug} delay={i * 80}>
                  <Link
                    href={`/artikel/${article.slug}`}
                    className="group flex h-full flex-col overflow-hidden border border-line bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-ink"
                  >
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted">
                        {article.category}
                      </p>
                      <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight text-ink">
                        {article.title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                        {article.excerpt}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink">
                        Baca
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="shell pb-20 lg:pb-28">
        <Reveal className="relative overflow-hidden border border-ink bg-accent">
          <div className="blueprint absolute inset-0 text-white opacity-30" />
          <div className="relative flex flex-col gap-8 p-8 sm:p-12 lg:flex-row lg:items-end lg:justify-between lg:p-16">
            <div className="max-w-2xl">
              <p className="eyebrow text-white/70">Butuh penawaran?</p>
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
                href="/katalog"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-paper transition-colors hover:bg-white hover:text-ink"
              >
                Jelajahi Katalog
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/artikel"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Baca Artikel
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}