import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ArrowRight, ArrowUpRight, Check } from "@/components/icons";
import { getContent } from "@/lib/content";
import { deriveSite } from "@/data/types";

export const instant = false;

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "ANKA — Aneka Aksesoris adalah supplier dan distributor aksesoris konstruksi yang melayani kontraktor, toko bangunan, dan proyek sejak 2012.",
};

const timeline = [
  {
    year: "2012",
    title: "Dimulai dari satu gudang",
    body: "ANKA berdiri sebagai pemasok hardware pintu dan jendela untuk toko material di Bekasi.",
  },
  {
    year: "2016",
    title: "Menjadi distributor",
    body: "Lini produk diperluas ke pengencang, sealant, dan perkakas. Kemitraan dengan produsen utama dimulai.",
  },
  {
    year: "2020",
    title: "Melayani proyek besar",
    body: "Sistem penawaran dan pengiriman bertahap dikembangkan untuk kebutuhan proyek komersial.",
  },
  {
    year: "2024",
    title: "Katalog digital",
    body: "Seluruh SKU aktif dipetakan dan dipublikasikan agar pelanggan dapat memeriksa ketersediaan lebih cepat.",
  },
  {
    year: "2026",
    title: "Jaringan lebih luas",
    body: "Distribusi menjangkau lebih banyak kota dengan mitra logistik dan dukungan stok untuk reseller.",
  },
];

const commitments = [
  "Barang yang dikirim sesuai spesifikasi penawaran",
  "Faktur, surat jalan, dan dokumen pengadaan lengkap",
  "Klaim barang cacat diproses maksimal 3 hari kerja",
  "Harga volume transparan untuk proyek dan reseller",
];

export default async function AboutPage() {
  const content = await getContent();
  const site = deriveSite(content.settings);
  const { categories, stats, values } = content;

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="shell grid gap-12 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-24">
          <div>
            <p className="eyebrow flex items-center gap-3 text-muted">
              <span className="text-accent">(Tentang)</span>
              Sejak {site.established}
              <span className="h-px w-8 bg-line" />
            </p>
            <h1 className="mt-6 text-balance font-display text-[clamp(2.5rem,6vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-ink">
              Dibangun dari gudang,{" "}
              <span className="font-serif font-normal italic text-accent">
                bukan presentasi.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-muted">
              Kami tahu proyek tidak berhenti karena materi belum datang. Itulah
              sebabnya ANKA tumbuh dari kebiasaan sederhana: memastikan barang
              yang dijanjikan benar-benar ada, dan sampai tepat waktu.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto">
            <div className="border border-ink bg-ink p-6 text-paper">
              <p className="eyebrow text-paper/50">Prinsip kerja</p>
              <p className="mt-4 font-display text-2xl font-semibold leading-tight tracking-[-0.02em]">
                “Stok yang jelas. Harga yang jujur. Kirim yang bisa dijanjikan.”
              </p>
              <div className="mt-8 flex items-center justify-between border-t border-line-dark pt-4 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-paper/50">
                <span>ANKA</span>
                <span>Bekasi · {site.established}</span>
              </div>
            </div>
            <div className="absolute -right-3 -bottom-3 -z-10 size-full border border-ink" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-line bg-paper-2/50">
        <div className="shell grid grid-cols-2 divide-x divide-line lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="px-2 py-7 lg:px-8">
              <p className="font-display text-3xl font-semibold tracking-[-0.03em] text-ink">
                {stat.value}
              </p>
              <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="shell py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow text-muted">Cerita kami</p>
            <h2 className="mt-5 text-balance font-display text-[clamp(1.9rem,3.5vw,2.9rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
              Satu pemasok untuk banyak kebutuhan.
            </h2>
          </div>
          <div className="space-y-5 text-[0.98rem] leading-[1.85] text-muted">
            <p>
              Berawal sebagai pemasok hardware pintu untuk toko material di
              Bekasi, ANKA tumbuh bersama kebutuhan pelanggan. Setiap kali
              proyek membutuhkan lini produk baru, kami menambahkannya — bukan
              sekadar memperpanjang daftar, tetapi memastikan stok dan
              pemasoknya benar-benar bisa diandalkan.
            </p>
            <p>
              Hari ini ANKA memasok enam kategori aksesoris konstruksi untuk
              kontraktor, pemilik toko bangunan, dan tim pengadaan proyek.
              Fokus kami tetap sama: menjadi bagian dari rantai pasok yang tidak
              membuat pekerjaan menunggu.
            </p>
            <p>
              Kami percaya pemasok yang baik tidak hanya menjual barang, tetapi
              membantu pelanggan mengambil keputusan yang tepat — dari
              spesifikasi engsel sampai jenis anchor untuk beton tertentu.
            </p>
          </div>
        </div>
      </section>

      {/* Categories strip */}
      <section className="border-y border-line bg-ink text-paper">
        <div className="shell py-14 lg:py-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="eyebrow text-paper/50">Lini produk</p>
            <Link
              href="/katalog"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-paper transition-colors hover:text-accent"
            >
              Lihat katalog
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <div className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <div
                key={cat.slug}
                className="flex items-baseline gap-4 border-b border-line-dark pb-4"
              >
                <span className="font-display text-xs font-semibold text-accent">
                  0{i + 1}
                </span>
                <span className="font-display text-lg font-medium tracking-tight">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="shell py-20 lg:py-28">
        <SectionHeading
          index="01"
          eyebrow="Perjalanan"
          title="Tumbuh selangkah demi selangkah."
          description="Tidak ada lompatan besar — hanya penambahan kapasitas yang konsisten mengikuti kebutuhan pelanggan."
        />

        <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line lg:grid-cols-5">
          {timeline.map((item, i) => (
            <Reveal
              key={item.year}
              delay={i * 70}
              className="flex flex-col bg-paper p-6"
            >
              <span className="font-display text-2xl font-semibold tracking-[-0.03em] text-accent">
                {item.year}
              </span>
              <h3 className="mt-6 font-display text-base font-semibold leading-snug text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values + commitment */}
      <section className="border-t border-line bg-paper-2/40">
        <div className="shell grid gap-14 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="eyebrow text-muted">Nilai</p>
            <h2 className="mt-5 text-balance font-display text-[clamp(1.9rem,3.5vw,2.9rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
              Empat hal yang tidak kami kompromikan.
            </h2>
            <div className="mt-10 space-y-px overflow-hidden border border-line bg-line">
              {values.map((value) => (
                <div key={value.index} className="flex gap-5 bg-paper p-5">
                  <span className="font-display text-xs font-semibold tracking-[0.12em] text-accent">
                    ({value.index})
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink">
                      {value.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {value.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pt-16">
            <div className="border border-ink bg-paper p-7 lg:p-9">
              <p className="eyebrow text-muted">Komitmen kami</p>
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
                Yang selalu Anda dapatkan
              </h2>
              <ul className="mt-7 space-y-4">
                {commitments.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                      <Check className="size-3" />
                    </span>
                    <span className="text-sm leading-relaxed text-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/kontak"
                className="group mt-9 flex items-center justify-between border-t border-line pt-6 text-sm font-semibold text-ink transition-colors hover:text-accent"
              >
                Bicara dengan tim kami
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
