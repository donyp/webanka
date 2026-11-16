import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { Markdown } from "@/components/markdown";
import { getContent } from "@/lib/content";
import { deriveSite } from "@/data/types";

export const instant = false;

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getContent();
  const site = deriveSite(content.settings);
  const article = content.articles.find(
    (a) => a.slug === slug && a.status === "published",
  );
  if (!article) notFound();

  return (
    <main className="shell py-10">
      <h1 className="font-display text-3xl font-semibold">{article.title}</h1>
      <Markdown content={article.content} />
    </main>
  );
}