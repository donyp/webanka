import { notFound } from "next/navigation";
import { readContent } from "@/lib/store";
import { deleteArticleAction, updateArticleAction } from "@/app/admin/actions";
import { ArticleForm } from "@/components/admin/article-form";
import { DeleteForm } from "@/components/admin/delete-form";
import { BackLink, PageHeader } from "@/components/admin/ui";
import { TrashIcon } from "@/components/admin/icons";

export default async function EditArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await readContent();
  const article = content.articles.find((a) => a.slug === slug);
  if (!article) notFound();
  return (
    <div className="space-y-6">
      <BackLink href="/admin/artikel" label="Artikel" />
      <PageHeader eyebrow="Edit artikel" title={article.title} />
      <ArticleForm article={article} categories={content.articleCategories} action={updateArticleAction} submitLabel="Simpan perubahan" cancelHref="/admin/artikel" />
    </div>
  );
}

export const instant = false;
