import { readContent } from "@/lib/store";
import { createArticleAction } from "@/app/admin/actions";
import { ArticleForm } from "@/components/admin/article-form";
import { BackLink, PageHeader } from "@/components/admin/ui";

export default async function NewArticlePage() {
  const content = await readContent();
  return (
    <div className="space-y-6">
      <BackLink href="/admin/artikel" label="Artikel" />
      <PageHeader eyebrow="Konten" title="Tulis artikel" />
      <ArticleForm categories={content.articleCategories} action={createArticleAction} submitLabel="Simpan artikel" cancelHref="/admin/artikel" />
    </div>
  );
}

export const instant = false;
