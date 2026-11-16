import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { FaqAccordion } from "@/components/faq-accordion";
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  WhatsApp,
} from "@/components/icons";
import { getContent } from "@/lib/content";
import { deriveSite } from "@/data/types";

export const instant = false;

export const metadata: Metadata = {
  title: "Kontak & Penawaran",
  description:
    "Hubungi ANKA untuk penawaran aksesoris konstruksi. Kirim daftar kebutuhan melalui form, WhatsApp, atau email.",
};

export default async function ContactPage() {
  const content = await getContent();
  const site = deriveSite(content.settings);

  const contactItems = [
    {
      icon: MapPin,
      label: "Alamat gudang & kantor",
      value: site.address,
      href: site.mapsHref,
      external: true,
    },
    {
      icon: Phone,
      label: "Telepon",
      value: site.phone,
      href: site.phoneHref,
    },
    {
      icon: Mail,
      label: "Email",
      value: site.email,
      href: site.emailHref,
    },
    {
      icon: Clock,
      label: "Jam operasional",
      value: site.hours,
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="shell py-14 lg:py-20">
          <p className="eyebrow flex items-center gap-3 text-muted">
            <span className="text-accent">(Kontak)</span>
            Penawaran &amp; pertanyaan
            <span className="h-px w-8 bg-line" />
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <h1 className="text-balance font-display text-[clamp(2.5rem,6vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-ink">
              Mari mulai{" "}
              <span className="font-serif font-normal italic text-accent">
                percakapan.
              </span>
            </h1>
            <p className="max-w-md text-[0.98rem] leading-relaxed text-muted lg:pb-2">
              Kirim daftar kebutuhan Anda. Kami balas dengan ketersediaan stok,
              harga, dan estimasi pengiriman — maksimal 24 jam kerja.
            </p>
          </div>
        </div>
      </section>

      {/* Contact grid */}
      <section className="shell py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Left: info + map */}
          <div className="flex flex-col">
            <div className="divide-y divide-line border-y border-line">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-start gap-4 py-5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-paper-2 text-ink">
                      <Icon className="size-4.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-muted">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-medium leading-relaxed text-ink">
                        {item.value}
                      </p>
                    </div>
                    {item.href && (
                      <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted" />
                    )}
                  </div>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="group block transition-colors hover:bg-paper-2/40"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>

            {/* Embedded map */}
            <div className="mt-6 overflow-hidden border border-line bg-paper">
              <iframe
                title="Lokasi ANKA di Google Maps"
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery || site.address)}&z=16&output=embed`}
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={site.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-paper-2"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="size-4 text-accent" />
                  Buka di Google Maps
                </span>
                <ArrowUpRight className="size-4 text-muted" />
              </a>
            </div>

            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-between gap-4 rounded-full bg-ink px-6 py-4 text-sm font-semibold text-paper transition-colors hover:bg-accent"
            >
              <span className="flex items-center gap-3">
                <WhatsApp className="size-5" />
                Butuh respon cepat? WhatsApp kami
              </span>
              <ArrowUpRight className="size-4" />
            </a>
          </div>

          {/* Right: form */}
          <div>
            <div className="mb-5 flex items-baseline justify-between">
              <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
                Form permintaan penawaran
              </h2>
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-muted">
                RFQ
              </span>
            </div>
            <ContactForm categories={content.categories} site={site} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-paper-2/40">
        <div className="shell grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-24">
          <div>
            <p className="eyebrow text-muted">FAQ</p>
            <h2 className="mt-4 text-balance font-display text-[clamp(1.9rem,3.5vw,2.9rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
              Pertanyaan yang sering muncul.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Belum menemukan jawaban? Hubungi kami langsung — kami senang
              menjelaskan detail pengadaan.
            </p>
          </div>

          <FaqAccordion items={content.faqs} />
        </div>
      </section>
    </>
  );
}
