import Link from "next/link";
import { readContent } from "@/lib/store";
import { BackLink, PageHeader } from "@/components/admin/ui";
import { DeleteForm } from "@/components/admin/delete-form";
import { deleteArticleAction } from "@/app/admin/actions";
import { PencilIcon, TrashIcon } from "@/components/admin/icons";
import { Plus } from "@/components/icons";

export default async function AdminArticlesPage() {
  const content = await readContent();
  return (
    <div className="space-y-6">
      <BackLink href="/admin" label="Ringkasan" />
      <PageHeader eyebrow="Konten" title="Artikel" description={`${content.articles.length} artikel`} action={<Link href="/admin/artikel/baru" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper">Tulis artikel</Link>} />
      <div className="overflow-x-auto border border-line bg-white">
        <table className="w-full min-w-[32rem] border-collapse text-sm">
          <thead><tr className="border-b border-line text-left"><th className="px-4 py-3 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-muted">Judul</th><th className="px-4 py-3 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-muted">Status</th><th className="px-4 py-3"></th></tr></thead>
          <tbody>
            {content.articles.map((a) => (
              <tr key={a.slug} className="border-b border-line/70 last:border-0">
                <td className="px-4 py-3 font-semibold text-ink">{a.title}</td>
                <td className="px-4 py-3 text-muted">{a.status}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Link href={`/admin/artikel/${a.slug}`} className="flex size-8 items-center justify-center rounded-full border border-line text-muted hover:border-ink hover:text-ink"><PencilIcon className="size-3.5" /></Link>
                    <DeleteForm action={deleteArticleAction} message={`Hapus ${a.title}?`}>
                      <input type="hidden" name="slug" value={a.slug} />
                      <button type="submit" className="flex size-8 items-center justify-center rounded-full border border-line text-muted hover:border-red-400 hover:text-red-600"><TrashIcon className="size-3.5" /></button>
                    </DeleteForm>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export const instant = false;
