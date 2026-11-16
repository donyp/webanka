import { notFound } from "next/navigation";
import { readContent } from "@/lib/store";
import {
  deleteProductAction,
  updateProductAction,
} from "@/app/admin/actions";
import { ProductForm } from "@/components/admin/product-form";
import { DeleteForm } from "@/components/admin/delete-form";
import { BackLink, PageHeader } from "@/components/admin/ui";
import { TrashIcon } from "@/components/admin/icons";

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { slug } = await params;
  const { saved, error } = await searchParams;
  const content = await readContent();
  const product = content.products.find((p) => p.slug === slug);

  if (!product) notFound();

  return (
    <div className="space-y-6">
      <BackLink href="/admin/produk" label="Produk" />
      <PageHeader
        eyebrow="Edit produk"
        title={product.name}
        description={`${product.sku || "Tanpa SKU"} · ${product.brand || "Tanpa merek"}`}
      />

      <ProductForm
        product={product}
        categories={content.categories}
        action={updateProductAction}
        submitLabel="Simpan perubahan"
        saved={saved}
        error={error}
        cancelHref="/admin/produk"
      />

      <div className="border border-red-200 bg-red-50/40 p-5">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-red-600">
          Zona berbahaya
        </p>
        <p className="mt-1 text-sm text-muted">
          Hapus produk ini secara permanen. Tindakan tidak bisa dibatalkan.
        </p>
        <div className="mt-4">
          <DeleteForm
            action={deleteProductAction}
            message={`Hapus produk "${product.name}"? Tindakan ini tidak bisa dibatalkan.`}
          >
            <input type="hidden" name="slug" value={product.slug} />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:border-red-500 hover:bg-red-50"
            >
              <TrashIcon className="size-4" />
              Hapus produk
            </button>
          </DeleteForm>
        </div>
      </div>
    </div>
  );
}

export const instant = false;
