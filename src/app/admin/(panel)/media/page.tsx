import { readdir } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { BackLink, PageHeader } from "@/components/admin/ui";
import { DeleteForm } from "@/components/admin/delete-form";
import { deleteMediaAction } from "@/app/admin/actions";
import { TrashIcon } from "@/components/admin/icons";

export const instant = false;

async function listUploads() {
  const dir = process.env.ANKA_UPLOADS_DIR
    ? path.resolve(process.env.ANKA_UPLOADS_DIR)
    : path.join(process.cwd(), "public", "uploads", "products");
  try {
    const files = await readdir(dir);
    return files.filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f));
  } catch {
    return [];
  }
}

export default async function MediaPage() {
  const files = await listUploads();
  return (
    <div className="space-y-6">
      <BackLink href="/admin" label="Ringkasan" />
      <PageHeader
        eyebrow="Media"
        title="Pustaka gambar"
        description={`${files.length} file di folder upload.`}
      />

      {files.length === 0 ? (
        <div className="border border-line bg-white px-6 py-16 text-center">
          <p className="font-display text-lg font-semibold text-ink">
            Belum ada gambar
          </p>
          <p className="mt-1 text-sm text-muted">
            Upload gambar dari form produk, lalu kelola di sini.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {files.map((file) => (
            <div
              key={file}
              className="overflow-hidden border border-line bg-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/uploads/products/${file}`}
                alt={file}
                className="aspect-square w-full object-cover"
              />
              <div className="flex items-center justify-between gap-2 p-3">
                <p className="truncate text-xs text-muted">{file}</p>
                <DeleteForm action={deleteMediaAction} message={`Hapus ${file}?`}>
                  <input type="hidden" name="filename" value={file} />
                  <button
                    type="submit"
                    className="flex size-7 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-red-400 hover:text-red-600"
                  >
                    <TrashIcon className="size-3.5" />
                  </button>
                </DeleteForm>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}