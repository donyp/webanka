import { readContent } from "@/lib/store";
import { createProductAction } from "@/app/admin/actions";
import { ProductForm } from "@/components/admin/product-form";
import { BackLink, PageHeader } from "@/components/admin/ui";

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const content = await readContent();

  return (
    <div className="space-y-6">
      <BackLink href="/admin/produk" label="Produk" />
      <PageHeader
        eyebrow="Katalog"
        title="Tambah produk"
        description="Isi data produk. Setelah disimpan, produk langsung tampil di katalog publik."
      />

      <ProductForm
        categories={content.categories}
        action={createProductAction}
        submitLabel="Simpan produk"
        cancelHref="/admin/produk"
        error={error}
      />
    </div>
  );
}

export const instant = false;
