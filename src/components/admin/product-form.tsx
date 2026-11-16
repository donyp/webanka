import Link from "next/link";
import type { Category, Product } from "@/data/types";
import {
  Field,
  Notice,
  Panel,
  btnGhost,
  btnPrimary,
  inputClass,
  selectClass,
  textareaClass,
} from "./ui";
import { SaveIcon } from "./icons";
import { ArrowUpRight } from "@/components/icons";

export function ProductForm({
  product,
  categories,
  action,
  submitLabel,
  saved,
  error,
  cancelHref = "/admin/produk",
}: {
  product?: Product;
  categories: Category[];
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
  saved?: string;
  error?: string;
  cancelHref?: string;
}) {
  return (
    <form action={action} className="space-y-6">
      {product && (
        <input type="hidden" name="originalSlug" value={product.slug} />
      )}

      <Notice saved={saved} error={error} />

      <Panel title="Informasi dasar" description="Data yang tampil di kartu katalog.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nama produk *" htmlFor="name" className="sm:col-span-2">
            <input
              id="name"
              name="name"
              required
              defaultValue={product?.name}
              placeholder="Contoh: Engsel Pintu Stainless 4 inci"
              className={inputClass}
            />
          </Field>

          <Field
            label="Slug URL *"
            htmlFor="slug"
            hint="Dipakai di alamat: /katalog/slug-ini. Kosongkan untuk dibuat otomatis dari nama."
          >
            <input
              id="slug"
              name="slug"
              defaultValue={product?.slug}
              placeholder="engsel-pintu-stainless-4-inci"
              className={inputClass}
            />
          </Field>

          <Field label="Kategori *" htmlFor="category">
            <select
              id="category"
              name="category"
              required
              defaultValue={product?.category ?? ""}
              className={selectClass}
            >
              <option value="" disabled>
                Pilih kategori
              </option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Merek" htmlFor="brand">
            <input
              id="brand"
              name="brand"
              defaultValue={product?.brand}
              placeholder="ANKA Pro"
              className={inputClass}
            />
          </Field>

          <Field label="SKU" htmlFor="sku">
            <input
              id="sku"
              name="sku"
              defaultValue={product?.sku}
              placeholder="ANK-DH-401"
              className={inputClass}
            />
          </Field>

          <Field label="Satuan" htmlFor="unit">
            <input
              id="unit"
              name="unit"
              defaultValue={product?.unit ?? "pcs"}
              placeholder="pcs / set / meter"
              className={inputClass}
            />
          </Field>

          <Field label="Label badge (opsional)" htmlFor="badge">
            <input
              id="badge"
              name="badge"
              defaultValue={product?.badge}
              placeholder="Terlaris / Baru / SNI"
              className={inputClass}
            />
          </Field>

          <label className="flex items-center gap-3 self-end rounded-lg border border-line bg-paper-2/40 px-4 py-3 text-sm text-ink">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={product?.featured}
              className="size-4 accent-[var(--color-accent)]"
            />
            Tampilkan sebagai produk unggulan di beranda
          </label>
        </div>
      </Panel>

      <Panel title="Media & link" description="Thumbnail produk dan tautan katalog eksternal.">
        <div className="grid gap-4 sm:grid-cols-2">
          <input type="hidden" name="imageCurrent" value={product?.image ?? ""} />

          <Field
            label="Foto thumbnail"
            htmlFor="image"
            hint="JPG/PNG/WebP. Kosongkan untuk mempertahankan foto saat ini."
            className="sm:col-span-2"
          >
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="block w-full text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:font-semibold file:text-paper hover:file:bg-accent"
            />
          </Field>

          {product?.image && (
            <label className="flex items-center gap-3 text-sm text-ink sm:col-span-2">
              <input type="checkbox" name="removeImage" className="size-4 accent-[var(--color-accent)]" />
              Hapus foto thumbnail saat ini
            </label>
          )}

          {product?.image && (
  <div className="sm:col-span-2">
              <p className="mb-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted">
                Thumbnail saat ini
              </p>
              <div className="relative h-32 w-32 overflow-hidden border border-line bg-paper-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}

          <input type="hidden" name="dimensionImageCurrent" value={product?.dimensionImage ?? ""} />

          <Field
            label="Foto ukuran / skala (opsional)"
            htmlFor="dimensionImage"
            hint="Foto produk dengan penggaris/skala untuk menunjukkan ukuran asli. JPG/PNG/WebP."
            className="sm:col-span-2"
          >
            <input
              id="dimensionImage"
              name="dimensionImage"
              type="file"
              accept="image/*"
              className="block w-full text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:font-semibold file:text-paper hover:file:bg-accent"
            />
          </Field>

          {product?.dimensionImage && (
            <label className="flex items-center gap-3 text-sm text-ink sm:col-span-2">
              <input
                type="checkbox"
                name="removeDimensionImage"
                className="size-4 accent-[var(--color-accent)]"
              />
              Hapus foto ukuran saat ini
            </label>
          )}

          {product?.dimensionImage && (
            <div className="sm:col-span-2">
              <p className="mb-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted">
                Foto ukuran saat ini
              </p>
              <div className="relative h-32 w-32 overflow-hidden border border-line bg-paper-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.dimensionImage}
                  alt={`Ukuran ${product.name}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}

          <Field
            label="Link katalog / brosur"
            htmlFor="catalogUrl"
            hint="URL eksternal (PDF, katalog supplier, dsb.)."
            className="sm:col-span-2"
          >
            <input
              id="catalogUrl"
              name="catalogUrl"
              type="url"
              defaultValue={product?.catalogUrl}
              placeholder="https://..."
              className={inputClass}
            />
          </Field>
        </div>
      </Panel>
      <Panel title="Konten & spesifikasi" description="Deskripsi yang membantu pelanggan memilih.">
        <div className="grid gap-4">
          <Field
            label="Ringkasan singkat *"
            htmlFor="short"
            hint="Muncul di kartu produk. Usahakan di bawah 120 karakter."
          >
            <input
              id="short"
              name="short"
              defaultValue={product?.short}
              placeholder="Engsel stainless 304 untuk pintu kayu, tahan karat."
              className={inputClass}
            />
          </Field>

          <Field label="Deskripsi lengkap" htmlFor="description">
            <textarea
              id="description"
              name="description"
              rows={5}
              defaultValue={product?.description}
              placeholder="Jelaskan material, kegunaan, dan keunggulan produk."
              className={textareaClass}
            />
          </Field>

          <Field
            label="Panduan untuk awam"
            htmlFor="guide"
            hint="Penjelasan sederhana: apa produknya, untuk apa, cara memilih ukuran, cara pakai, dan tips. Ditampilkan di halaman detail produk."
          >
            <textarea
              id="guide"
              name="guide"
              rows={7}
              defaultValue={product?.guide}
              placeholder="Contoh: Produk ini adalah engsel stainless untuk pintu kayu. Cocok untuk pintu rumah dan proyek. Pilih ukuran sesuai berat pintu. Pasang dengan sekrup yang disertakan. Jika ragu, konsultasikan ke tim ANKA."
              className={textareaClass}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Spesifikasi"
              htmlFor="specs"
              hint="Satu baris per spesifikasi, format: Label: Nilai"
            >
              <textarea
                id="specs"
                name="specs"
                rows={7}
                defaultValue={product?.specs
                  .map((spec) => `${spec.label}: ${spec.value}`)
                  .join("\n")}
                placeholder={"Material: Stainless steel 304\nUkuran: 4 inci\nBeban: 40 kg"}
                className={textareaClass}
              />
            </Field>

            <Field
              label="Tag pencarian"
              htmlFor="tags"
              hint="Pisahkan dengan koma. Membantu pencarian di katalog."
            >
              <textarea
                id="tags"
                name="tags"
                rows={7}
                defaultValue={product?.tags.join(", ")}
                placeholder="engsel, pintu, stainless, hardware"
                className={textareaClass}
              />
            </Field>
          </div>
        </div>
      </Panel>

      <div className="sticky bottom-0 z-20 flex flex-col gap-3 border border-line bg-paper/95 px-4 py-3 backdrop-blur-none sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button type="submit" className={btnPrimary}>
            <SaveIcon className="size-4" />
            {submitLabel}
          </button>
          <Link href={cancelHref} className={btnGhost}>
            Batal
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={product ? `/katalog/${product.slug}` : "/katalog"}
            target="_blank"
            className="flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
          >
            Lihat di situs
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </form>
  );
}