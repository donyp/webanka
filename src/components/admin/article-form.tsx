import Link from "next/link";
import type { Article, ArticleCategory } from "@/data/types";
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

export function ArticleForm(props: { article?: Article; categories: ArticleCategory[]; action: (formData: FormData) => Promise<void>; submitLabel: string; saved?: string; error?: string; cancelHref?: string; }) {
  const { article, categories, action, submitLabel, saved, error, cancelHref = "/admin/artikel" } = props;
  return (
    <form action={action} className="space-y-6">
      {article && <input type="hidden" name="originalSlug" value={article.slug} />}
      <input type="hidden" name="coverCurrent" value={article?.coverImage ?? ""} />
      <Notice saved={saved} error={error} />
      <Panel title="Informasi artikel" description="Data utama artikel.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Judul artikel *" htmlFor="title" className="sm:col-span-2">
            <input id="title" name="title" required defaultValue={article?.title} className={inputClass} />
          </Field>
          <Field label="Slug URL *" htmlFor="slug">
            <input id="slug" name="slug" defaultValue={article?.slug} className={inputClass} />
          </Field>
          <Field label="Kategori" htmlFor="category">
            <select id="category" name="category" defaultValue={article?.category ?? categories[0]?.slug ?? ""} className={selectClass}>
              {categories.map((c: { slug: string; name: string }) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </Field>
          <Field label="Penulis" htmlFor="author">
            <input id="author" name="author" defaultValue={article?.author ?? "Tim ANKA"} className={inputClass} />
          </Field>
          <Field label="Status" htmlFor="status">
            <select id="status" name="status" defaultValue={article?.status ?? "draft"} className={selectClass}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>
          <Field label="Tanggal publikasi" htmlFor="publishedAt">
            <input id="publishedAt" name="publishedAt" type="date" defaultValue={article?.publishedAt?.slice(0, 10)} className={inputClass} />
          </Field>
          <Field label="Ringkasan *" htmlFor="excerpt" className="sm:col-span-2">
            <textarea id="excerpt" name="excerpt" rows={3} defaultValue={article?.excerpt} className={textareaClass} />
          </Field>
          <label className="flex items-center gap-3 self-end rounded-lg border border-line bg-paper-2/40 px-4 py-3 text-sm text-ink sm:col-span-2">
            <input type="checkbox" name="featured" defaultChecked={article?.featured} className="size-4 accent-[var(--color-accent)]" />
            Tampilkan sebagai artikel unggulan
          </label>
        </div>
      </Panel>
      <Panel title="Konten" description="Tulis dengan Markdown.">
        <Field label="Isi artikel" htmlFor="content">
          <textarea id="content" name="content" rows={16} defaultValue={article?.content} className={textareaClass} />
        </Field>
      </Panel>
      <Panel title="Media & tag">
        <div className="grid gap-4 sm:grid-cols-2">
          <input type="hidden" name="coverCurrent" value={article?.coverImage ?? ""} />
          <Field label="Foto cover" htmlFor="cover" hint="JPG/PNG/WebP." className="sm:col-span-2">
            <input id="cover" name="cover" type="file" accept="image/*" className="block w-full text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:font-semibold file:text-paper hover:file:bg-accent" />
          </Field>
          {article?.coverImage && (
            <div className="sm:col-span-2">
              <img loading="lazy" src={article.coverImage} alt={article.title} className="h-32 w-48 object-cover border border-line" />
              <label className="mt-3 flex items-center gap-3 text-sm text-ink">
                <input type="checkbox" name="removeCover" className="size-4 accent-[var(--color-accent)]" />
                Hapus cover saat ini
              </label>
            </div>
          )}
          <Field label="Tag pencarian" htmlFor="tags" hint="Pisahkan dengan koma." className="sm:col-span-2">
            <input id="tags" name="tags" defaultValue={article?.tags?.join(", ")} className={inputClass} />
          </Field>
        </div>
      </Panel>
      <div className="sticky bottom-0 z-20 flex flex-col gap-3 border border-line bg-paper/95 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button type="submit" className={btnPrimary}>
            <SaveIcon className="size-4" />
            {submitLabel}
          </button>
          <Link href={cancelHref} className={btnGhost}>Batal</Link>
        </div>
      </div>
    </form>
  );
}
