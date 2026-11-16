import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";
import { readContent } from "@/lib/store";

const base = SITE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await readContent();

  const staticRoutes = ["", "/katalog", "/layanan", "/tentang", "/kontak"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(content.updatedAt),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const productRoutes = content.products.map((product) => ({
    url: `${base}/katalog/${product.slug}`,
    lastModified: new Date(content.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const articleRoutes = content.articles
    .filter((a) => a.status === "published")
    .map((article) => ({
      url: base + "/artikel/" + article.slug,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...productRoutes, ...articleRoutes];
}