import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ArrowRight, ArrowUpRight, Check } from "@/components/icons";
import { getContent } from "@/lib/content";
import { deriveSite } from "@/data/types";

export const instant = false;

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Supply material proyek, distribusi reseller, konsultasi spesifikasi, dan custom sourcing aksesoris konstruksi bersama ANKA.",
};

const audiences = [
  {
    title: "Kontraktor & Pemborong",
    body: "Pengadaan material pendukung yang terkoordinasi dengan jadwal pekerjaan, termasuk pengiriman bertahap per tahap proyek.",
    points: ["Penawaran proyek", "Kirim bertahap", "Dokumen lengkap"],
  },
  {
    title: "Toko Bangunan & Reseller",
    body: "Pasokan rutin dengan harga distributor, dukungan katalog, dan prioritas stok untuk item yang cepat berputar.",
    points: ["Harga reseller", "Stok prioritas", "Katalog bersama"],
  },
  {
    title: "Pemilik & Manajer Proyek",
    body: "Bantuan memilih spesifikasi yang tepat agar hasil pemasangan awet dan sesuai anggaran yang direncanakan.",
    points: ["Konsultasi teknis", "Sampel produk", "Rekomendasi alternatif"],
  },
];

export default async function ServicesPage() {
  const content = await getContent();
  const site = deriveSite(content.settings);
  const { services, process } = content;

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="shell py-14 lg:py-24">
          <p className="eyebrow flex items-center gap-3 text-muted">
            <span className="text-accent">(Layanan)</span>
            Dari supply sampai solusi
            <span className="h-px w-8 bg-line" />
          </p>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <h1 className="text-balance font-display text-[clamp(2.5rem,6vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-ink">
              Lebih dari sekadar{" "}
              <span className="font-serif font-normal italic text-accent">
                kirim barang.
              </span>
            </h1>
            <p className="max-w-md text-[0.98rem] leading-relaxed text-muted lg:pb-3">
              Kami menyesuaikan cara kerja dengan kebutuhan pengadaan Anda — dari
              pembelian satuan sampai kontrak pasokan proyek berjalan.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="shell py-16 lg:py-24">
        <div className="grid gap-5 lg:grid-cols-2">
          {services.map((service, i) => (
            <Reveal
              key={service.index}
              delay={(i % 2) * 90}
              className="group flex flex-col border border-line bg-paper p-7 transition-colors hover:border-ink lg:p-9"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-4xl font-semibold tracking-[-0.04em] text-line transition-colors group-hover:text-accent">
                  {service.index}
                </span>
                <span className="eyebrow text-muted">Layanan</span>
              </div>

              <h2 className="mt-10 font-display text-2xl font-semibold tracking-[-0.025em] text-ink">
                {service.title}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                {service.body}
              </p>

              <ul className="mt-7 flex flex-wrap gap-2">
                {service.points.map((point) => (
                  <li
                    key={point}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted"
                  >
                    <Check className="size-3 text-accent" />
                    {point}
                  </li>
                ))}
              </ul>

              <Link
                href="/kontak"
                className="mt-9 inline-flex items-center gap-2 self-start border-b border-ink pb-1.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Diskusikan kebutuhan
                <ArrowUpRight className="size-4" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Audiences */}
      <section className="border-y border-line bg-paper-2/40">
        <div className="shell py-20 lg:py-28">
          <SectionHeading
            index="01"
            eyebrow="Untuk siapa"
            title="Cara kami bekerja menyesuaikan Anda."
            description="Setiap jenis pelanggan punya ritme pengadaan yang berbeda. Kami menyesuaikan penawaran, stok, dan jadwal kirim."
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {audiences.map((audience, i) => (
              <Reveal
                key={audience.title}
                delay={i * 80}
                className="flex flex-col border border-line bg-paper p-7"
              >
                <span className="font-display text-xs font-semibold tracking-[0.14em] text-accent">
                  0{i + 1}
                </span>
                <h3 className="mt-8 font-display text-xl font-semibold tracking-tight text-ink">
                  {audience.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {audience.body}
                </p>
                <ul className="mt-6 space-y-2 border-t border-line pt-5">
                  {audience.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted"
                    >
                      <Check className="size-3.5 text-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="shell py-20 lg:py-28">
        <SectionHeading
          index="02"
          eyebrow="Alur pengadaan"
          title="Empat langkah, tanpa drama."
        />

        <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {process.map((item) => (
            <div key={item.step} className="bg-paper p-7">
              <span className="flex size-10 items-center justify-center rounded-full bg-ink font-display text-xs font-semibold text-paper">
                {item.step}
              </span>
              <h3 className="mt-6 font-display text-lg font-semibold tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="shell pb-20 lg:pb-28">
        <div className="flex flex-col items-start justify-between gap-8 border border-ink bg-ink p-8 text-paper sm:p-12 lg:flex-row lg:items-center lg:p-14">
          <div className="max-w-2xl">
            <p className="eyebrow text-paper/50">Mulai dari sini</p>
            <h2 className="mt-4 text-balance font-display text-[clamp(1.9rem,3.5vw,3rem)] font-semibold leading-[1] tracking-[-0.035em]">
              Ceritakan kebutuhan proyek Anda.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-paper/60">
              Tim kami akan menyusun penawaran yang sesuai dengan volume,
              spesifikasi, dan jadwal pengiriman.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href="/kontak"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink"
            >
              Minta penawaran
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line-dark px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-paper"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
