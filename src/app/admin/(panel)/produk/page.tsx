import Link from "next/link";
import { readContent } from "@/lib/store";
import {
  BackLink,
  Notice,
  PageHeader,
  btnPrimary,
  btnGhost,
  inputClass,
  selectClass,
} from "@/components/admin/ui";
import { DeleteForm } from "@/components/admin/delete-form";
import { deleteProductAction } from "@/app/admin/actions";
import { PencilIcon, TrashIcon } from "@/components/admin/icons";
import { ArrowUpRight, Plus, Search } from "@/components/icons";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; kategori?: string; stok?: string; saved?: string; error?: string }>;
}) {
  const { q = "", kategori = "", stok = "", saved, error } = await searchParams;
  const content = await readContent();

  const query = q.trim().toLowerCase();
  const products = content.products.filter((product) => {
    const matchCategory = !kategori || product.category === kategori;
    if (!matchCategory) return false;
    const matchStock = !stok || (product.stockStatus ?? "available") === stok;
    if (!matchStock) return false;
    if (!query) return true;
    return [product.name, product.sku, product.brand, ...product.tags]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  const categoryName = (slug: string) =>
    content.categories.find((c) => c.slug === slug)?.name ?? slug;

  return (
    <div className="space-y-6">
      <BackLink href="/admin" label="Ringkasan" />
      <PageHeader
        eyebrow="Katalog"
        title="Produk"
        description={`${content.products.length} produk dalam ${content.categories.length} kategori.`}
        action={
          <Link href="/admin/produk/baru" className={btnPrimary}>
            <Plus className="size-4" />
            Tambah produk
          </Link>
        }
      />

      <Notice saved={saved} error={error} />

      <form
        method="get"
        action="/admin/produk"
        className="grid gap-3 border border-line bg-white p-4 sm:grid-cols-[1fr_14rem_12rem_auto]"
      >
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Cari nama, SKU, merek, tag…"
            className={`${inputClass} pl-10`}
          />
        </div>
        <select name="kategori" defaultValue={kategori} className={selectClass}>
          <option value="">Semua kategori</option>
          {content.categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
        <select name="stok" defaultValue={stok} className={selectClass}>
          <option value="">Semua stok</option>
          <option value="available">Tersedia</option>
          <option value="low">Menipis</option>
          <option value="out">Habis</option>
        </select>
        <button type="submit" className={btnGhost}>
          Filter
        </button>
      </form>

      <div className="overflow-x-auto border border-line bg-white">
        <table className="w-full min-w-[46rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left">
              {["Produk", "Kategori", "Status", ""].map((head) => (
                <th
                  key={head}
                  className="px-4 py-3 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-muted"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.slug}
                className="border-b border-line/70 last:border-0 hover:bg-paper-2/30"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/produk/${product.slug}`}
                    className="font-semibold text-ink transition-colors hover:text-accent"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-0.5 text-xs text-muted">
                    {product.sku || "Tanpa SKU"} · {product.brand || "Tanpa merek"}
                  </p>
                </td>
                <td className="px-4 py-3 text-muted">
                  {categoryName(product.category)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {product.featured && (
                      <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-accent-dark">
                        Unggulan
                      </span>
                    )}
                    <span
                      className={`rounded-full px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.1em] ${
                        (product.stockStatus ?? "available") === "available"
                          ? "bg-green-100 text-green-700"
                          : (product.stockStatus ?? "available") === "low"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {(product.stockStatus ?? "available") === "available"
                        ? "Tersedia"
                        : (product.stockStatus ?? "available") === "low"
                          ? "Menipis"
                          : "Habis"}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/produk/${product.slug}`}
                      aria-label={`Edit ${product.name}`}
                      className="flex size-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ink hover:text-ink"
                    >
                      <PencilIcon className="size-3.5" />
                    </Link>
                    <DeleteForm
                      action={deleteProductAction}
                      message={`Hapus produk "${product.name}"? Tindakan ini tidak bisa dibatalkan.`}
                    >
                      <input type="hidden" name="slug" value={product.slug} />
                      <button
                        type="submit"
                        aria-label={`Hapus ${product.name}`}
                        className="flex size-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-red-400 hover:text-red-600"
                      >
                        <TrashIcon className="size-3.5" />
                      </button>
                    </DeleteForm>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="font-display text-lg font-semibold text-ink">
              Tidak ada produk
            </p>
            <p className="mt-1 text-sm text-muted">
              Ubah filter, atau tambahkan produk baru.
            </p>
            <Link href="/admin/produk/baru" className={`${btnPrimary} mt-5`}>
              <Plus className="size-4" />
              Tambah produk
            </Link>
          </div>
        )}
      </div>

      <p className="flex items-center gap-2 text-xs text-muted">
        <ArrowUpRight className="size-3.5" />
        Klik nama produk untuk mengedit detailnya.
      </p>
    </div>
  );
}

export const instant = false;