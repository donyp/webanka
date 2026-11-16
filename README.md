# ANKA — Aneka Aksesoris

Website profil dan katalog untuk **ANKA (Aneka Aksesoris)** — supplier dan
distributor aksesoris konstruksi.

Desain: **Industrial Precision** — bersih, tegas, tanpa efek kaca
(glassmorphism), dengan tipografi Space Grotesk + Manrope + aksen Instrument
Serif italic.

Rancangan lengkap dan alasan tech stack ada di [`DESIGN.md`](./DESIGN.md).

---

## Tech stack

- **Next.js 16** (App Router, React 19) + **TypeScript**
- **Tailwind CSS v4** — design token di `src/app/globals.css`
- **next/font** — Space Grotesk, Manrope, Instrument Serif
- Ikon SVG kustom (tanpa dependensi ikon eksternal)
- Deploy: Vercel / Node.js

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # jalankan hasil build
```

> Catatan: jika `next` tidak dikenali setelah clone, jalankan `npm install`
> sampai selesai — native binary SWC harus terunduh.

## Struktur

```
src/
  app/
    (site)/               # halaman publik (beranda, katalog, tentang, layanan, kontak)
    admin/
      login/              # halaman masuk panel
      (panel)/            # dashboard, produk, kategori, konten, pengaturan
    layout.tsx            # font, metadata, root shell
    sitemap.ts, robots.ts
  components/             # header, footer, kartu produk, form, reveal, dll.
  components/admin/       # UI panel admin
  data/types.ts           # tipe + helper (formatPrice, slugify, deriveSite)
  lib/
    store.ts              # baca/tulis data/content.json (server-only)
    content.ts            # loader request-time untuk halaman publik
    auth.ts               # sesi cookie admin
data/
  content.json            # data situs (produk, kategori, konten, pengaturan)
  content.seed.json       # salinan awal untuk reset
```

## Panel admin

Panel admin tersedia di `/admin`. Masuk dengan password dari `.env.local`:

```bash
ADMIN_PASSWORD=anka2026
ADMIN_SECRET=isi-dengan-string-acak-panjang
```

Fitur:
- **Ringkasan** — statistik katalog dan aksi cepat.
- **Produk** — tambah, edit, hapus, cari, filter kategori, unggah foto thumbnail, link katalog.
- **Kategori** — tambah/edit/hapus (tidak bisa dihapus bila masih dipakai produk).
- **Konten** — edit navigasi, statistik, nilai, layanan, alur, testimoni, FAQ.
- **Pengaturan** — identitas perusahaan, kontak, lokasi, hero beranda, marquee.

Semua perubahan disimpan ke `data/content.json` dan langsung tampil di situs publik. Backup file tersebut secara berkala. Untuk deployment serverless (Vercel), pindahkan penyimpanan ke database karena filesystem bersifat sementara.

## Menambah produk

Gunakan panel admin di `/admin/produk/baru`, atau edit langsung `data/content.json` / `src/data` seed. Struktur produk:

```ts
{
  slug: "nama-produk-unik",
  name: "Nama Produk",
  category: "pengencang",     // salah satu slug kategori
  brand: "Merek",
  sku: "SKU-001",
  unit: "pcs",
  price: 25000,               // null = "Hubungi kami"
  short: "Ringkasan singkat.",
  description: "Deskripsi lengkap.",
  specs: [{ label: "Material", value: "Baja" }],
  tags: ["kata", "kunci"],
  featured: true,             // tampil di beranda
}
```

Halaman detail, sitemap, dan filter katalog otomatis mengikuti data ini.

## Kustomisasi cepat

| Hal | Lokasi |
|---|---|
| Nomor telepon, WhatsApp, email, alamat | Panel admin → Pengaturan, atau `data/content.json` |
| Warna & font | `@theme` di `src/app/globals.css` |
| Menu navigasi | Panel admin → Konten, atau `data/content.json` |
| Domain SEO | `metadataBase` di `src/app/layout.tsx`, `sitemap.ts`, `robots.ts` |
| Password admin | `ADMIN_PASSWORD` di `.env.local` |

## Form penawaran

Form di `/kontak` menyusun ringkasan permintaan lalu membuka WhatsApp dengan
pesan yang sudah terisi. Tidak memerlukan backend.

Untuk integrasi email/CRM, ganti handler di
`src/components/contact-form.tsx` (mis. ke Resend, Formspree, atau API route).

## Langkah berikutnya

1. Ganti visual produk dengan foto asli (tambahkan `next/image` + `image` di data).
2. Sambungkan katalog ke CMS (Sanity/Payload) bila dikelola non-teknis.
3. Tambah analytics dan schema.org `Product` untuk SEO.
4. Ganti nomor WhatsApp/email placeholder dengan data resmi ANKA.
