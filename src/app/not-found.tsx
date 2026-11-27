import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col items-start justify-center py-20">
      <p className="eyebrow flex items-center gap-3 text-muted">
        <span className="text-accent">(404)</span>
        Halaman tidak ditemukan
        <span className="h-px w-8 bg-line" />
      </p>

      <h1 className="mt-6 text-balance font-display text-[clamp(3rem,9vw,7rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-ink">
        Off the{" "}
        <span className="font-serif font-normal italic text-accent">grid.</span>
      </h1>

      <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-muted">
        Halaman yang Anda cari mungkin sudah dipindahkan atau tidak pernah ada.
        Mari kembali ke jalur yang benar.
      </p>

      <div className="mt-9 flex flex-wrap gap-3">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-accent"
        >
          Ke beranda
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <Link
          href="/katalog"
          className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          Lihat produk
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
