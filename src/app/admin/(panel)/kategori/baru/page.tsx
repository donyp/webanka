import { createCategoryAction } from "@/app/admin/actions";
import { CategoryForm } from "@/components/admin/category-form";
import { BackLink, PageHeader } from "@/components/admin/ui";

export default async function NewCategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="space-y-6">
      <BackLink href="/admin/kategori" label="Kategori" />
      <PageHeader
        eyebrow="Katalog"
        title="Tambah kategori"
        description="Buat kelompok produk baru. Setelah dibuat, kategori bisa dipilih saat menambah produk."
      />

      <CategoryForm
        action={createCategoryAction}
        submitLabel="Simpan kategori"
        cancelHref="/admin/kategori"
        error={error}
      />
    </div>
  );
}

export const instant = false;
