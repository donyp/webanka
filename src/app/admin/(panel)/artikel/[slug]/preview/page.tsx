import Link from "next/link";
import { notFound } from "next/navigation";
import { readContent } from "@/lib/store";
import { BackLink, PageHeader } from "@/components/admin/ui";
import { Markdown } from "@/components/markdown";
import { ArrowUpRight } from "@/components/icons";

export default async function ArticlePreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await readContent();
  const article = content.articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <div className="space-y-6">
      <BackLink href={`/admin/artikel/${slug}`} label="Edit artikel" />
      <PageHeader
        eyebrow="Preview"
        title={article.title}
        description={`${article.status} · ${article.category}`}
        action={
          <Link
            href={`/admin/artikel/${slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-ink"
          >
            Edit
            <ArrowUpRight className="size-4" />
          </Link>
        }
      />
      <div className="border border-line bg-white p-6 sm:p-8">
        {article.coverImage && (
          <img
            src={article.coverImage}
            alt={article.title}
            className="mb-6 h-48 w-full object-cover"
          />
        )}
        <p className="mb-4 text-sm text-muted">{article.excerpt}</p>
        <Markdown content={article.content} />
      </div>
    </div>
  );
}

export const instant = false;