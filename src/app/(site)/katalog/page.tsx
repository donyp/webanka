import type { Metadata } from "next";
import Link from "next/link";
import { CatalogClient } from "@/components/catalog-client";
import { ArrowUpRight, WhatsApp } from "@/components/icons";
import { getContent } from "@/lib/content";
import { deriveSite } from "@/data/types";

export const metadata: Metadata = {
  title: "Katalog Produk",
  description:
    "Jelajahi produk aksesoris konstruksi ANKA: hardware pintu, pengencang, sealant, perkakas, railing, dan perlengkapan safety.",
};

// The category filter is read from the URL, so this route may block briefly.
export const instant = false;

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>;
}) {
  const { kategori } = await searchParams;
  const content = await getContent();
  const site = deriveSite(content.settings);

  return (
    <>
      <section className="border-b border-line">
        <div className="shell py-14 lg:py-20">
          <p className="eyebrow flex items-center gap-3 text-muted">
            <span className="text-accent">(Katalog)</span>
            {site.fullName}
            <span className="h-px w-8 bg-line" />
          </p>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-balance font-display text-[clamp(2.5rem,6vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink">
                Semua yang dibutuhkan{" "}
                <span className="font-serif font-normal italic text-accent">
                  proyek.
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-muted">
                Cari berdasarkan nama, merek, atau SKU. Filter kategori untuk
                mempersempit pilihan, lalu minta penawaran langsung untuk item
                yang Anda butuhkan.
              </p>
            </div>

            <Link
              href="/kontak"
              className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-accent lg:self-auto"
            >
              Butuh bantuan memilih?
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <CatalogClient
        products={content.products}
        categories={content.categories}
        initialCategory={kategori}
      />

      {/* Help band */}
      <section className="border-t border-line bg-paper-2/50">
        <div className="shell flex flex-col items-start justify-between gap-6 py-12 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
              Tidak menemukan item yang Anda cari?
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Katalog ini belum menampilkan seluruh stok gudang. Kirim daftar
              kebutuhan dan tim kami akan mencarikan spesifikasi yang cocok.
            </p>
          </div>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            <WhatsApp className="size-4" />
            Tanya via WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
