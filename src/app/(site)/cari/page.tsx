import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { getContent } from "@/lib/content";
import { deriveSite } from "@/data/types";

export const instant = false;

export const metadata = {
  title: "Pencarian",
  description: "Cari produk dan artikel ANKA.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const content = await getContent();
  const site = deriveSite(content.settings);
  const query = q.trim().toLowerCase();

  const products = query
    ? content.products.filter((p) =>
        [p.name, p.brand, p.sku, p.short, ...p.tags].join(" ").toLowerCase().includes(query),
      )
    : [];
  const articles = query
    ? content.articles.filter(
        (a) =>
          a.status === "published" &&
          [a.title, a.excerpt, ...a.tags].join(" ").toLowerCase().includes(query),
      )
    : [];

  return (
    <>
      <section className="border-b border-line">
        <div className="shell py-14 lg:py-20">
          <h1 className="font-display text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink">
            Pencarian.
          </h1>
          <form method="get" action="/cari" className="mt-6 flex gap-3">
            <input
              name="q"
              defaultValue={q}
              placeholder="Cari produk, artikel, tag…"
              className="h-12 flex-1 rounded-lg border border-line bg-paper px-4 text-sm text-ink outline-none transition-colors focus:border-ink"
            />
            <button type="submit" className="h-12 rounded-full bg-ink px-6 text-sm font-semibold text-paper transition-colors hover:bg-accent">
              Cari
            </button>
          </form>
          {query && (
            <p className="mt-4 text-sm text-muted">
              {products.length + articles.length} hasil untuk “{q}”.
            </p>
          )}
        </div>
      </section>

      {query && (
        <section className="shell py-10 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-ink">
                Produk ({products.length})
              </h2>
              <div className="mt-6 space-y-3">
                {products.slice(0, 20).map((p) => (
                  <Link
                    key={p.slug}
                    href={`/katalog/${p.slug}`}
                    className="flex items-center gap-4 border border-line bg-white p-3 transition-colors hover:border-ink"
                  >
                    {p.image && (
                      <img src={p.image} alt={p.name} loading="lazy" className="h-12 w-12 object-cover" />
                    )}
                    <div>
                      <p className="font-semibold text-ink">{p.name}</p>
                      <p className="text-xs text-muted">{p.sku} · {p.brand}</p>
                    </div>
                  </Link>
                ))}
                {products.length === 0 && <p className="text-sm text-muted">Tidak ada produk.</p>}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-ink">
                Artikel ({articles.length})
              </h2>
              <div className="mt-6 space-y-3">
                {articles.slice(0, 20).map((a) => (
                  <Link
                    key={a.slug}
                    href={`/artikel/${a.slug}`}
                    className="block border border-line bg-white p-3 transition-colors hover:border-ink"
                  >
                    <p className="font-semibold text-ink">{a.title}</p>
                    <p className="mt-1 text-xs text-muted">{a.excerpt}</p>
                  </Link>
                ))}
                {articles.length === 0 && <p className="text-sm text-muted">Tidak ada artikel.</p>}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
