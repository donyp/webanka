import Link from "next/link";
import { readContent } from "@/lib/store";
import {
  BackLink,
  Notice,
  PageHeader,
  btnPrimary,
} from "@/components/admin/ui";
import { DeleteForm } from "@/components/admin/delete-form";
import { deleteCategoryAction } from "@/app/admin/actions";
import { PencilIcon, TrashIcon } from "@/components/admin/icons";
import { CategoryIcon, Plus } from "@/components/icons";

export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { saved, error } = await searchParams;
  const content = await readContent();

  const count = (slug: string) =>
    content.products.filter((p) => p.category === slug).length;

  return (
    <div className="space-y-6">
      <BackLink href="/admin" label="Ringkasan" />
      <PageHeader
        eyebrow="Katalog"
        title="Kategori"
        description="Kelompokkan produk. Kategori tampil di beranda, filter katalog, dan footer."
        action={
          <Link href="/admin/kategori/baru" className={btnPrimary}>
            <Plus className="size-4" />
            Tambah kategori
          </Link>
        }
      />

      <Notice saved={saved} error={error} />

      <div className="grid gap-4 sm:grid-cols-2">
        {content.categories.map((category) => (
          <div
            key={category.slug}
            className="flex flex-col border border-line bg-white"
          >
            <div
              className="relative flex h-24 items-center justify-center border-b border-line"
              style={{ backgroundColor: category.tint, color: category.ink }}
            >
              <div className="blueprint absolute inset-0 opacity-30" />
              <CategoryIcon
                name={category.icon}
                className="relative size-8"
                strokeWidth={1.3}
              />
              <span className="absolute top-3 left-4 font-display text-[0.58rem] font-semibold uppercase tracking-[0.16em] opacity-60">
                {category.slug}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
                    {category.name}
                  </h2>
                  <p className="mt-1 text-xs text-muted">
                    {count(category.slug)} produk · ikon {category.icon}
                  </p>
                </div>
                <span className="font-display text-xs font-semibold text-muted">
                  {String(count(category.slug)).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
                {category.blurb || "Belum ada deskripsi."}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                <Link
                  href={`/admin/kategori/${category.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:text-accent"
                >
                  <PencilIcon className="size-3.5" />
                  Edit
                </Link>
                <DeleteForm
                  action={deleteCategoryAction}
                  message={`Hapus kategori "${category.name}"? Kategori yang masih dipakai produk tidak bisa dihapus.`}
                >
                  <input type="hidden" name="slug" value={category.slug} />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted transition-colors hover:text-red-600"
                  >
                    <TrashIcon className="size-3.5" />
                    Hapus
                  </button>
                </DeleteForm>
              </div>
            </div>
          </div>
        ))}
      </div>

      {content.categories.length === 0 && (
        <div className="border border-dashed border-line bg-white px-6 py-16 text-center">
          <p className="font-display text-lg font-semibold text-ink">
            Belum ada kategori
          </p>
          <p className="mt-1 text-sm text-muted">
            Tambahkan kategori pertama sebelum membuat produk.
          </p>
        </div>
      )}
    </div>
  );
}

export const instant = false;
