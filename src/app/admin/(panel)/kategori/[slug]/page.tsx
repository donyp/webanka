import { notFound } from "next/navigation";
import { readContent } from "@/lib/store";
import {
  deleteCategoryAction,
  updateCategoryAction,
} from "@/app/admin/actions";
import { CategoryForm } from "@/components/admin/category-form";
import { DeleteForm } from "@/components/admin/delete-form";
import { BackLink, PageHeader } from "@/components/admin/ui";
import { TrashIcon } from "@/components/admin/icons";

export default async function EditCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { slug } = await params;
  const { saved, error } = await searchParams;
  const content = await readContent();
  const category = content.categories.find((c) => c.slug === slug);

  if (!category) notFound();

  const used = content.products.filter(
    (p) => p.category === category.slug,
  ).length;

  return (
    <div className="space-y-6">
      <BackLink href="/admin/kategori" label="Kategori" />
      <PageHeader
        eyebrow="Edit kategori"
        title={category.name}
        description={`${used} produk menggunakan kategori ini.`}
      />

      <CategoryForm
        category={category}
        action={updateCategoryAction}
        submitLabel="Simpan perubahan"
        saved={saved}
        error={error}
        cancelHref="/admin/kategori"
      />

      <div className="border border-red-200 bg-red-50/40 p-5">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-red-600">
          Zona berbahaya
        </p>
        <p className="mt-1 text-sm text-muted">
          Hapus kategori ini. Kategori yang masih dipakai produk tidak bisa dihapus.
        </p>
        <div className="mt-4">
          <DeleteForm
            action={deleteCategoryAction}
            message={`Hapus kategori "${category.name}"? Kategori yang masih dipakai produk tidak bisa dihapus.`}
          >
            <input type="hidden" name="slug" value={category.slug} />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:border-red-500 hover:bg-red-50"
            >
              <TrashIcon className="size-4" />
              Hapus kategori
            </button>
          </DeleteForm>
        </div>
      </div>
    </div>
  );
}

export const instant = false;
