"use client";

import { useState } from "react";
import { ArrowRight, Check, WhatsApp } from "./icons";
import type { Category, SiteLinks } from "@/data/types";
import { submitInquiryAction } from "@/app/admin/actions";

const inputClass =
  "h-12 w-full rounded-lg border border-line bg-paper px-4 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink";

export function ContactForm({
  categories,
  site,
}: {
  categories: Category[];
  site: SiteLinks;
}) {
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      await submitInquiryAction(data);
    } catch {
      // Simpanan gagal tidak menghalangi pengiriman via WhatsApp.
    }

    const lines = [
      "Halo ANKA, saya ingin meminta penawaran.",
      "",
      `Nama: ${data.get("name")}`,
      `Perusahaan: ${data.get("company") || "-"}`,
      `Telepon/Email: ${data.get("contact")}`,
      `Kategori: ${data.get("category")}`,
      "",
      "Kebutuhan:",
      `${data.get("message")}`,
    ];

    const url = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
      lines.join("\n"),
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
    form.reset();
  }

  if (sent) {
    return (
      <div className="flex flex-col items-start justify-center border border-line bg-paper p-8 sm:p-12">
        <span className="flex size-14 items-center justify-center rounded-full bg-accent text-white">
          <Check className="size-7" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink">
          Permintaan siap dikirim
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
          Jendela WhatsApp seharusnya sudah terbuka dengan ringkasan kebutuhan
          Anda. Tekan kirim di WhatsApp — tim kami akan merespons maksimal dalam
          24 jam kerja.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent"
          >
            <WhatsApp className="size-4" />
            Buka WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
          >
            Isi form lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-line bg-paper p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-xs font-semibold uppercase tracking-[0.12em] text-muted"
          >
            Nama lengkap *
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="Nama Anda"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="company"
            className="text-xs font-semibold uppercase tracking-[0.12em] text-muted"
          >
            Perusahaan
          </label>
          <input
            id="company"
            name="company"
            placeholder="Nama perusahaan / toko"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact"
            className="text-xs font-semibold uppercase tracking-[0.12em] text-muted"
          >
            Telepon / Email *
          </label>
          <input
            id="contact"
            name="contact"
            required
            placeholder="08xx xxxx xxxx"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="category"
            className="text-xs font-semibold uppercase tracking-[0.12em] text-muted"
          >
            Kategori kebutuhan
          </label>
          <select
            id="category"
            name="category"
            className={`${inputClass} appearance-none`}
            defaultValue=""
          >
            <option value="" disabled>
              Pilih kategori
            </option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.name}>
                {cat.name}
              </option>
            ))}
            <option value="Lainnya">Lainnya / campuran</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label
            htmlFor="message"
            className="text-xs font-semibold uppercase tracking-[0.12em] text-muted"
          >
            Detail kebutuhan *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Contoh: Engsel pintu stainless 4&quot; — 200 set. Pengiriman ke Bekasi minggu depan."
            className="w-full resize-none rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-xs leading-relaxed text-muted">
          Dengan mengirim, Anda setuju dihubungi tim ANKA terkait permintaan ini.
        </p>
        <button
          type="submit"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          Kirim permintaan
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
}
