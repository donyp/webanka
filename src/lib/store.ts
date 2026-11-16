import "server-only";
import { connection } from "next/server";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Content } from "@/data/types";

const DATA_DIR = process.env.ANKA_DATA_DIR
  ? path.resolve(process.env.ANKA_DATA_DIR)
  : path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");
const SEED_FILE = process.env.ANKA_SEED_FILE
  ? path.resolve(process.env.ANKA_SEED_FILE)
  : path.join(process.cwd(), "data", "content.seed.json");

async function ensureStore(): Promise<string> {
  try {
    return await readFile(CONTENT_FILE, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;

    const seed = await readFile(SEED_FILE, "utf8");
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(CONTENT_FILE, seed, "utf8");
    return seed;
  }
}

export async function readContent(): Promise<Content> {
  await connection();
  const raw = await ensureStore();
  const parsed = JSON.parse(raw) as Partial<Content>;
  return {
    settings: parsed.settings!,
    hero: parsed.hero!,
    nav: parsed.nav ?? [],
    stats: parsed.stats ?? [],
    values: parsed.values ?? [],
    services: parsed.services ?? [],
    process: parsed.process ?? [],
    testimonials: parsed.testimonials ?? [],
    faqs: parsed.faqs ?? [],
    categories: parsed.categories ?? [],
    products: parsed.products ?? [],
    articleCategories: parsed.articleCategories ?? [],
    articles: parsed.articles ?? [],
    auditLog: parsed.auditLog ?? [],
    updatedAt: parsed.updatedAt ?? new Date().toISOString(),
  };
}

let writeQueue: Promise<unknown> = Promise.resolve();

/**
 * Serialize writes so two simultaneous admin saves cannot clobber each other.
 * The mutator receives a cloned draft; it may mutate it or return a new object.
 */
export function updateContent(
  mutator: (draft: Content) => Content | void,
): Promise<Content> {
  const run = writeQueue.then(async () => {
    const current = await readContent();
    const draft = structuredClone(current);
    const result = mutator(draft) ?? draft;
    result.updatedAt = new Date().toISOString();

    const temp = `${CONTENT_FILE}.${process.pid}.${Date.now()}.tmp`;
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(temp, `${JSON.stringify(result, null, 2)}\n`, "utf8");
    await rename(temp, CONTENT_FILE);
    return result;
  });

  writeQueue = run.then(
    () => undefined,
    () => undefined,
  );

  return run;
}
