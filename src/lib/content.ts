import "server-only";
import { connection } from "next/server";
import { readContent } from "./store";
import { deriveSite, type Category, type Content } from "@/data/types";

/**
 * Reads the store at request time (admin edits must be visible immediately,
 * without a rebuild). `connection()` opts these pages into dynamic rendering.
 */
export async function getContent(): Promise<Content> {
  await connection();
  return readContent();
}

export async function getSite() {
  const content = await getContent();
  return { content, site: deriveSite(content.settings) };
}

export async function getProduct(slug: string) {
  const content = await getContent();
  return {
    content,
    product: content.products.find((p) => p.slug === slug) ?? null,
  };
}

export async function getCategory(slug: string): Promise<Category | null> {
  const content = await getContent();
  return content.categories.find((c) => c.slug === slug) ?? null;
}
