import type { Metadata } from "next";
import Image from "next/image";
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
    "Kenali ANKA — Aneka Aksesoris: supplier dan distributor aksesoris konstruksi asal Bekasi yang melayani kontraktor, toko bangunan, dan proyek sejak 2012.",
};

const timeline = [
  {
    year: "2012",
    title: "Dimulai dari satu gudang",
    body: "ANKA berdiri di Bekasi sebagai pemasok hardware pintu dan jendela untuk toko material di sekitar wilayah operasional.",
  },
  {
    year: "2016",
    title: "Menjadi distributor",
    body: "Lini produk diperluas ke pengencang, sealant, dan perkakas. Kemitraan dengan produsen utama mulai dibangun.",
  },
  {
    year: "2020",
    title: "Melayani proyek besar",
    body: "Sistem penawaran, stok, dan pengiriman bertahap dikembangkan untuk kebutuhan proyek komersial.",
  },
  {
    year: "2024",
    title: "Katalog digital",
    body: "Seluruh SKU aktif dipetakan dan dipublikasikan agar pelanggan dapat memeriksa kebutuhan lebih cepat.",
  },
  {
    year: "2026",
    title: "Terus bertumbuh",
    body: "Kategori, mitra logistik, dan kapasitas gudang terus ditambah agar layanan menjangkau lebih banyak kota.",
  },
];

const commitments = [
  "Barang yang dikirim sesuai spesifikasi penawaran",
  "Faktur, surat jalan, dan dokumen pengadaan lengkap",
  "Klaim barang cacat diproses maksimal 3 hari kerja",
  "Harga volume transparan untuk proyek dan reseller",
];

const missions = [
  "Menjaga stok yang relevan dan informasinya akurat.",
  "Membantu pelanggan memilih spesifikasi yang tepat.",
  "Menjaga janji kirim dan kelengkapan dokumen.",
  "Tumbuh bersama kontraktor, toko bangunan, dan reseller.",
];

export default async function AboutPage() {
  const content = await getContent();
  const site = deriveSite(content.settings);
  const { stats, values, services } = content;
  const skuStat =
    stats.find((stat) => stat.label.toLowerCase().includes("sku"))?.value ??
    "480+";

  const facts = [
    { label: "Nama resmi", value: site.legalName },
    { label: "Berdiri", value: String(site.established) },
    { label: "Basis operasional", value: site.addressShort },
    { label: "Fokus", value: "Aksesoris konstruksi" },
    { label: "Pelanggan", value: "Kontraktor, reseller, proyek" },
    { label: "Katalog", value: `${skuStat} SKU aktif` },
  ];

  return (
    <>
      {/* Hero — perkenalan perusahaan */}
      <section className="border-b border-line">
        <div className="shell grid gap-12 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-24">
          <div>
            <p className="eyebrow flex items-center gap-3 text-muted">
              <span className="text-accent">(Tentang ANKA)</span>
              Sejak {site.established}
              <span className="h-px w-8 bg-line" />
            </p>
            <h1 className="mt-6 text-balance font-display text-[clamp(2.5rem,6vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-ink">
              Kami tumbuh dari gudang,{" "}
              <span className="font-serif font-normal italic text-accent">
                bersama proyek yang kami layani.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-muted">
              ANKA — Aneka Aksesoris adalah supplier dan distributor aksesoris
              konstruksi asal Bekasi. Sejak {site.established}, kami membantu
              kontraktor, toko bangunan, dan tim pengadaan mendapatkan material
              yang tepat — dengan stok yang jelas dan pengiriman yang bisa
              dijanjikan.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/katalog"
                className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-accent"
              >
                Lihat katalog
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href="#cerita"
                className="group inline-flex items-center gap-2.5 rounded-full border border-ink px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                Kenali cerita kami
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Kartu identitas perusahaan */}
          <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto">
            <div
              className="absolute inset-0 translate-x-3 translate-y-3 border border-ink"
              aria-hidden
            />
            <div className="relative border border-ink bg-paper p-6">
              <div className="flex items-center justify-between border-b border-line pb-5">
                <Image
                  src="/logo-anka.png"
                  alt="ANKA — Aneka Aksesoris"
                  width={2000}
                  height={475}
                  sizes="180px"
                  quality={90}
                  className="h-7 w-auto"
                />
                <span className="eyebrow text-muted">Profil</span>
              </div>

              <dl className="mt-5 space-y-3.5">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-line pb-3 last:border-0 last:pb-0"
                  >
                    <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.13em] text-muted">
                      {fact.label}
                    </dt>
                    <dd className="text-sm font-medium leading-snug text-ink">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted">
                <span>{site.addressShort}</span>
                <span>Sejak {site.established}</span>
              </div>
            </div>
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

      {/* Cerita perusahaan */}
      <section id="cerita" className="shell scroll-mt-24 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow text-muted">Siapa ANKA</p>
            <h2 className="mt-5 text-balance font-display text-[clamp(1.9rem,3.5vw,2.9rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
              Satu perusahaan, satu tujuan: material tidak menahan pekerjaan.
            </h2>

            <div className="mt-9 border border-ink bg-ink p-6 text-paper">
              <p className="eyebrow text-paper/50">Prinsip kerja</p>
              <p className="mt-4 font-display text-xl font-semibold leading-snug tracking-[-0.02em]">
                “Stok yang jelas. Spesifikasi yang tepat. Kirim yang bisa
                dijanjikan.”
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-line-dark pt-4 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-paper/50">
                <span>ANKA</span>
                <span>Bekasi · {site.established}</span>
              </div>
            </div>
          </div>

          <div className="space-y-5 text-[0.98rem] leading-[1.85] text-muted">
            <p>
              ANKA lahir di Bekasi pada {site.established} dari kegiatan yang
              sederhana: menyiapkan hardware pintu dan jendela untuk toko
              material di sekitar wilayah kami. Waktu itu, yang kami jual bukan
              sekadar barang — tetapi kepastian bahwa pesanan benar-benar siap
              diambil atau dikirim.
            </p>
            <p>
              Seiring kebutuhan pelanggan berkembang, lini produk kami ikut
              bertambah: pengencang, sealant, perkakas, railing, perlengkapan
              safety, cat dan coating, hingga insulasi. Setiap kategori dibuka
              karena ada kebutuhan nyata di lapangan, bukan karena ingin terlihat
              lengkap di atas kertas.
            </p>
            <p>
              Hari ini ANKA melayani kontraktor, pemilik toko bangunan, reseller,
              dan tim pengadaan proyek. Kami menjaga satu hal yang sama sejak
              awal: memastikan barang yang dijanjikan ada, spesifikasinya sesuai,
              dan pengirimannya tidak membuat pekerjaan menunggu.
            </p>
            <p>
              Bagi kami, menjadi pemasok berarti ikut bertanggung jawab atas
              kelancaran pekerjaan pelanggan. Itulah sebabnya kami membangun tim
              gudang, penjualan, dan dukungan teknis yang bisa diajak berpikir
              soal detail — dari jenis anchor untuk beton tertentu sampai
              ketahanan sealant di area terbuka.
            </p>
          </div>
        </div>
      </section>

      {/* Visi & misi */}
      <section className="border-y border-line-dark bg-ink text-paper">
        <div className="shell grid gap-12 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-24">
          <div>
            <p className="eyebrow text-paper/50">Arah kami</p>
            <h2 className="mt-5 text-balance font-display text-[clamp(1.9rem,3.5vw,3rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
              Menjadi pemasok yang paling bisa diandalkan,{" "}
              <span className="font-serif font-normal italic text-accent-soft">
                bukan yang paling ramai.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-paper/65">
              Kami tidak mengejar jumlah SKU terbanyak. Kami mengejar stok yang
              tepat, informasi yang akurat, dan hubungan pasok yang bertahan
              lama.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="border border-line-dark p-6">
              <p className="eyebrow text-accent-soft">Visi</p>
              <p className="mt-4 font-display text-xl font-semibold leading-snug tracking-[-0.02em]">
                Menjadi mitra pasok aksesoris konstruksi yang membuat proyek
                berjalan tanpa hambatan material.
              </p>
            </div>

            <div className="border border-line-dark p-6">
              <p className="eyebrow text-accent-soft">Misi</p>
              <ul className="mt-4 space-y-3">
                {missions.map((mission) => (
                  <li
                    key={mission}
                    className="flex items-start gap-3 text-sm leading-relaxed text-paper/75"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-dark">
                      <Check className="size-3" />
                    </span>
                    {mission}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Yang dikerjakan */}
      <section id="layanan" className="shell scroll-mt-24 py-20 lg:py-28">
        <SectionHeading
          index="01"
          eyebrow="Yang kami kerjakan"
          title="Supply, distribusi, dan pendampingan teknis."
          description="Kami tidak berhenti di menjual barang. Tim ANKA membantu dari perencanaan kebutuhan sampai barang diterima di lokasi."
          link={{ label: "Lihat layanan lengkap", href: "/layanan" }}
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
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

              <h3 className="mt-10 font-display text-2xl font-semibold tracking-[-0.025em] text-ink">
                {service.title}
              </h3>
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
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section
        id="perjalanan"
        className="scroll-mt-24 border-y border-line bg-paper-2/40"
      >
        <div className="shell py-20 lg:py-28">
          <SectionHeading
            index="02"
            eyebrow="Perjalanan"
            title="Tumbuh selangkah demi langkah."
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
        </div>
      </section>

      {/* Nilai & komitmen */}
      <section id="nilai" className="shell scroll-mt-24 py-20 lg:py-28">
        <SectionHeading
          index="03"
          eyebrow="Nilai"
          title="Empat hal yang tidak kami kompromikan."
          description="Nilai ini bukan slogan di dinding. Kami memakainya untuk mengambil keputusan setiap hari — dari memilih pemasok sampai menjawab pertanyaan pelanggan."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.index} className="flex flex-col bg-paper p-6">
                <span className="font-display text-xs font-semibold tracking-[0.12em] text-accent">
                  ({value.index})
                </span>
                <h3 className="mt-6 font-display text-base font-semibold text-ink">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {value.body}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col border border-ink bg-paper p-7 lg:p-9">
            <p className="eyebrow text-muted">Komitmen kami</p>
            <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
              Yang selalu Anda dapatkan
            </h3>
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
              className="group mt-auto flex items-center gap-2 border-t border-line pt-6 text-sm font-semibold text-ink transition-colors hover:text-accent"
            >
              Bicara dengan tim kami
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-paper">
        <div className="shell grid gap-8 py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:py-20">
          <div>
            <p className="eyebrow text-paper/50">Mari berkenalan</p>
            <h2 className="mt-4 max-w-2xl text-balance font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
              Butuh pemasok yang bisa diajak berpikir soal detail?
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/65">
              Ceritakan kebutuhan proyek atau toko Anda. Tim ANKA akan membantu
              memeriksa stok, spesifikasi, dan jadwal pengiriman yang paling
              masuk akal.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/kontak"
              className="group inline-flex items-center gap-2.5 rounded-full bg-paper px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-soft"
            >
              Hubungi tim ANKA
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/katalog"
              className="inline-flex items-center gap-2.5 rounded-full border border-paper/30 px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
            >
              Lihat katalog
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
