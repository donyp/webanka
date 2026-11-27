import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { ProductVisual } from "@/components/product-visual";
import { SizeVisual } from "@/components/size-visual";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  WhatsApp,
} from "@/components/icons";
import { getContent } from "@/lib/content";
import {
  deriveSite,
  getRelated,
} from "@/data/types";
import { explainSpec } from "@/data/spec-glossary";

export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent();
  const product = content.products.find((p) => p.slug === slug);

  if (!product) {
    return { title: "Produk tidak ditemukan" };
  }

  return {
    title: product.name,
    description: product.short,
    openGraph: {
      title: product.name,
      description: product.short,
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getContent();
  const site = deriveSite(content.settings);
  const product = content.products.find((p) => p.slug === slug);

  if (!product) notFound();

  const category =
    content.categories.find((c) => c.slug === product.category) ??
    content.categories[0];
  const related = getRelated(content.products, product);
  const waText = encodeURIComponent(
    `Halo ANKA, saya ingin menanyakan produk ${product.name} .`,
  );

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.short,
    category: category.name,
    brand: { "@type": "Brand", name: product.brand },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-line">
        <div className="shell flex flex-wrap items-center gap-2 py-4 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
          <Link href="/katalog" className="transition-colors hover:text-ink">
            Katalog
          </Link>
          <span className="text-line">/</span>
          <Link
            href={`/katalog?kategori=${category.slug}`}
            className="transition-colors hover:text-ink"
          >
            {category.name}
          </Link>
          <span className="text-line">/</span>
          <span className="text-ink">{product.name}</span>
        </div>
      </div>

      {/* Main */}
      <section className="shell py-10 lg:py-16">
        <Link
          href="/katalog"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Kembali ke produk
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Visual */}
          <div>
            <div className="border border-line bg-paper p-3">
              {product.image ? (
                <div className="aspect-square overflow-hidden">
                  <img loading="lazy" src={product.image} alt={product.name} className="h-full w-full object-cover" />
                </div>
              ) : (
                <ProductVisual
                  product={product}
                  category={category}
                  className="aspect-square"
                />
              )}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {[
                { label: "Merek", value: product.brand },
                { label: "Satuan", value: product.unit },
                { label: "Kategori", value: category.name.split(" & ")[0] },
              ].map((item) => (
                <div key={item.label} className="border border-line p-3">
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-muted">
                    {item.label}
                  </p>
                  <p className="mt-1 truncate font-display text-sm font-semibold text-ink">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em]"
                style={{ backgroundColor: category.tint, color: category.ink }}
              >
                {category.name}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted">
                <span className="size-1.5 rounded-full bg-green-600" />
                Stok tersedia
              </span>
              {product.badge && (
                <span className="inline-flex items-center rounded-full bg-ink px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-paper">
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="mt-5 text-balance font-display text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink">
              {product.name}
            </h1>

            <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">
              {product.short}
            </p>

            <div className="mt-8 flex items-end justify-between gap-6 border-y border-line py-6">
              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  Satuan
                </p>
                <p className="mt-1 font-display text-3xl font-semibold tracking-[-0.03em] text-ink">
                  {product.unit}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  Merek
                </p>
                <p className="mt-1 font-display text-sm font-semibold text-ink">
                  {product.brand}
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/kontak"
                className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-semibold text-paper transition-colors hover:bg-accent"
              >
                Minta penawaran
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href={`https://wa.me/${site.whatsapp}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-ink px-6 py-4 text-sm font-semibold text-ink transition-colors hover:bg-paper-2"
              >
                <WhatsApp className="size-4" />
                WhatsApp
              </a>
              {product.catalogUrl && (
                <a
                  href={product.catalogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-line px-6 py-4 text-sm font-semibold text-muted transition-colors hover:border-ink hover:text-ink"
                >
                  <ArrowUpRight className="size-4" />
                  Link katalog
                </a>
              )}
            </div>

            <ul className="mt-6 grid gap-2 text-sm text-muted sm:grid-cols-2">
              {[
                "Harga volume proyek tersedia",
                "Pengiriman Jabodetabek & luar kota",
                "Faktur & surat jalan resmi",
                "Konsultasi spesifikasi gratis",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Description & specs */}
      <section className="border-y border-line bg-paper-2/40">
        <div className="shell grid gap-12 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="eyebrow text-muted">Deskripsi</p>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
              Detail produk
            </h2>
            <p className="mt-5 text-[0.98rem] leading-[1.8] text-muted">
              {product.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow text-muted">Spesifikasi</p>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
              Lembar data
            </h2>
            <dl className="mt-5 divide-y divide-line border-y border-line">
              {product.specs.map((spec) => {
                 const note = explainSpec(spec.label);
                 return (
                   <div
                     key={spec.label}
                     className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                   >
                     <div className="sm:max-w-[45%]">
                       <dt className="text-sm text-muted">{spec.label}</dt>
                       {note && (
                         <p className="mt-0.5 text-[0.7rem] leading-snug text-muted/80">
                           {note}
                         </p>
                       )}
                     </div>
                     <dd className="text-right text-sm font-semibold text-ink">
                       {spec.value}
                     </dd>
                   </div>
                 );
               })}
              <div className="flex items-baseline justify-between gap-6 py-3.5">
                <dt className="text-sm text-muted">Satuan</dt>
                <dd className="text-right text-sm font-semibold text-ink">
                  {product.unit}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Visual ukuran */}
      <section className="border-y border-line bg-paper-2/40">
        <div className="shell grid gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="eyebrow text-muted">Visual ukuran</p>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
              Ukuran produk
            </h2>
            <p className="mt-5 text-[0.98rem] leading-[1.8] text-muted">
              Ilustrasi proporsi dan foto ukuran asli (jika tersedia) untuk membantu
              membayangkan ukuran produk sebelum memesan.
            </p>
            {product.dimensionImage && (
              <div className="mt-6 overflow-hidden border border-line bg-paper">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.dimensionImage}
                  alt={`Foto ukuran ${product.name}`}
                  className="h-auto w-full object-contain"
                />
                <p className="border-t border-line px-4 py-2 text-xs text-muted">
                  Foto ukuran asli (dengan skala/penggaris).
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center">
            <div className="w-full">
              <SizeVisual product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Panduan untuk awam */}
      {product.guide && (
        <section className="border-y border-line bg-paper">
          <div className="shell py-14 lg:py-20">
            <p className="eyebrow text-muted">Panduan</p>
            <h2 className="mt-4 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-semibold tracking-tight text-ink">
              Penjelasan untuk awam
            </h2>
            <div className="mt-6 max-w-3xl space-y-4 text-[0.98rem] leading-[1.8] text-muted">
              {product.guide.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="shell py-16 lg:py-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-muted">Produk terkait</p>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-semibold tracking-[-0.03em] text-ink">
                Dari kategori yang sama
              </h2>
            </div>
            <Link
              href={`/katalog?kategori=${category.slug}`}
              className="arrow-link inline-flex items-center gap-2 self-start border-b border-ink pb-1.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent sm:self-auto"
            >
              Lihat semua {category.name}
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, i) => (
              <ProductCard key={item.slug} product={item} category={category} index={i} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}