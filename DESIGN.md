# ANKA — Aneka Aksesoris
## Rancangan Website & Rekomendasi Tech Stack

---

## 1. Ringkasan Proyek

Website profil + katalog untuk **ANKA (Aneka Aksesoris)** — supplier dan distributor
aksesoris konstruksi. Tujuan utama:

1. **Kredibilitas** — tampil sebagai distributor serius, bukan toko online kecil.
2. **Konversi** — pengunjung bisa langsung menjelajah katalog lalu minta penawaran (RFQ).
3. **Skalabilitas** — katalog mudah ditambah produk/kategori tanpa menyentuh layout.

Audiens: kontraktor, toko bangunan, project manager, arsitek, dan konsumen proyek.

---

## 2. Arah Desain — "Industrial Precision"

Bukan template startup, bukan glassmorphism. Karakternya:

> **Kertas cetak teknik × katalog industrial premium.**

| Prinsip | Implementasi |
|---|---|
| Clean | Banyak ruang kosong, grid 12 kolom, border 1px, hierarki tegas |
| Fancy | Tipografi display besar, aksen serif italic, nomor seksi, offset shadow |
| No glass | Semua permukaan solid — tanpa `backdrop-blur`, tanpa transparansi kaca |
| Teknis | Garis ukur, ticks, blueprint grid, label monospace-ish, nomor `(01)` |
| Motion halus | Reveal saat scroll, hover lift 4px, marquee. Tanpa parallax berat |

### Palet warna

| Token | Hex | Pemakaian |
|---|---|---|
| Ink | `#0B1B2B` | Teks utama, panel gelap |
| Ink soft | `#16304A` | Panel sekunder |
| Paper | `#F6F4EE` | Background halaman (warm off-white) |
| Paper 2 | `#EFEBE1` | Background seksi alternatif |
| Line | `#DCD5C7` | Border / garis |
| Muted | `#5E6B78` | Teks sekunder |
| Accent | `#FF5A1F` | CTA, highlight, aksen (ember orange) |
| Accent soft | `#FFE3D6` | Background badge |
| Steel | `#33506B` | Aksen dingin |

Kontras tinggi, aksen orange dipakai **hemat** (≤10% area) supaya terasa premium.

### Tipografi

| Peran | Font | Alasan |
|---|---|---|
| Display / Heading | **Space Grotesk** 500–700 | Geometris, teknis, berkarakter, tidak generik |
| Body / UI | **Manrope** 400–700 | Bersih, netral, sangat readable |
| Aksen editorial | **Instrument Serif** italic | Kontras "fancy" pada 1–2 kata kunci |

Contoh hero: *"Presisi di setiap **sambungan**."* — kata "sambungan" italic serif orange.

Skala: display `clamp(2.6rem, 7vw, 6rem)`, tracking negatif `-0.04em`, line-height `0.95`.

### Komponen kunci

- **Header** sticky solid paper + border bawah, logo wordmark, CTA "Minta Penawaran".
- **Section header** berpola: eyebrow `(01) — KATALOG` + heading besar + link kanan.
- **Product card**: panel visual solid bertint per kategori + ikon line-art, border 1px,
  hover border orange + translate -4px + arrow muncul.
- **Marquee** kata kunci/brand berjalan, dipisah simbol `✳`.
- **Stats strip** angka besar dengan label kecil uppercase.
- **CTA band** panel ink penuh dengan grid blueprint + tombol orange.

### Halaman

| Route | Isi |
|---|---|
| `/` | Hero, marquee, value props, kategori, produk unggulan, proses, testimoni, CTA |
| `/katalog` | Search, filter kategori, sort, grid produk, empty state |
| `/katalog/[slug]` | Detail produk, spesifikasi, CTA penawaran, produk terkait |
| `/tentang` | Cerita, nilai, timeline, statistik, sertifikasi |
| `/layanan` | Supply, distribusi, konsultasi proyek, custom sourcing |
| `/kontak` | Form RFQ, info kontak, jam operasional, FAQ singkat |

---

## 3. Rekomendasi Tech Stack

### Pilihan utama (dipakai di proyek ini)

| Layer | Teknologi | Alasan |
|---|---|---|
| Framework | **Next.js 16 (App Router) + React 19** | SSG/SSR, SEO kuat, routing file-based, image & font optimization |
| Bahasa | **TypeScript** | Data produk aman & autocomplete |
| Styling | **Tailwind CSS v4** | Token warna/font via CSS variables, iterasi cepat |
| Font | **next/font (Google)** | Self-host otomatis, zero layout shift |
| State katalog | React `useState`/`useMemo` (client component) | Cukup untuk <1.000 SKU |
| Ikon | SVG kustom inline | Ringan, konsisten dengan art direction |
| Deploy | **Vercel** (atau VPS + `next start`) | Zero-config, CDN global |

### Jika katalog akan dikelola non-teknis

Tambah **CMS headless**:

- **Sanity** — terbaik untuk konten + produk, real-time preview, gratis untuk skala kecil.
- **Payload CMS** — open source, bisa self-host, pakai Postgres/MySQL.
- Alternatif ringan: konten produk via **MDX/JSON** (kondisi sekarang) atau **Supabase** bila perlu stok & harga dinamis.

### Jika butuh e-commerce penuh nanti

- **Medusa.js** (headless commerce) + Next.js, atau **Shopify Storefront API**.
- Untuk B2B cukup: katalog + form RFQ + WhatsApp, tanpa checkout.

### Yang sengaja TIDAK dipakai

- ❌ Glassmorphism / backdrop-blur — permintaan eksplisit.
- ❌ Library animasi berat (GSAP/Framer) — CSS + IntersectionObserver cukup.
- ❌ Template UI kit generik — semua komponen dibuat khusus agar tidak terasa template.

---

## 4. Struktur Folder

```
src/
  app/
    layout.tsx          # font, metadata, header/footer
    globals.css         # design tokens + utilitas
    page.tsx            # Home
    katalog/page.tsx
    katalog/[slug]/page.tsx
    tentang/page.tsx
    layanan/page.tsx
    kontak/page.tsx
  components/
    site-header.tsx  site-footer.tsx  logo.tsx
    icons.tsx        reveal.tsx        marquee.tsx
    product-card.tsx product-visual.tsx catalog-client.tsx
    contact-form.tsx whatsapp-button.tsx
  data/
    products.ts     site.ts
  lib/
    utils.ts
```

---

## 5. Roadmap

1. **Fase 1 (sekarang)** — Design system, halaman inti, katalog statis, SEO dasar.
2. **Fase 2** — CMS (Sanity), gambar produk asli, form RFQ ke email/WhatsApp API.
3. **Fase 3** — Dashboard stok/harga, multi-bahasa, analytics, schema Product.
