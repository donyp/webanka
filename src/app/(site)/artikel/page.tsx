import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getContent } from "@/lib/content";
import { deriveSite } from "@/data/types";

export const instant = false;

export const metadata = {
  title: "Artikel",
  description: "Artikel, tips, dan berita seputar aksesoris konstruksi dari ANKA.",
};

const PAGE_SIZE = 9;

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; kategori?: string; page?: string }>;
}) {
  const { q = "", kategori = "", page = "1" } = await searchParams;
  const content = await getContent();
  const site = deriveSite(content.settings);

  const query = q.trim().toLowerCase();
  const currentPage = Math.max(1, Number(page) || 1);

  const now = new Date();
  const published = content.articles.filter((a) => a.status === "published" || (a.status === "scheduled" && new Date(a.publishedAt) <= now));
  const filtered = published.filter((article) => {
    if (kategori && article.category !== kategori) return false;
    if (!query) return true;
    const haystack = [article.title, article.excerpt, ...article.tags]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const items = filtered.slice(start, start + PAGE_SIZE);

  const categoryName = (slug: string) =>
    content.articleCategories.find((c) => c.slug === slug)?.name ?? slug;

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat("id-ID", {
      dateStyle: "long",
      timeZone: "Asia/Jakarta",
    }).format(new Date(iso));

  return (
    <>
      <section className="border-b border-line">
        <div className="shell py-14 lg:py-20">
          <p className="eyebrow flex items-center gap-3 text-muted">
            <span className="text-accent">(Artikel)</span>
            {site.fullName}
            <span className="h-px w-8 bg-line" />
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink">
            Artikel &amp; tips konstruksi.
          </h1>
          <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-muted">
            Panduan memilih aksesoris, berita proyek, dan tips dari tim ANKA.
          </p>
        </div>
      </section>

      <section className="shell py-10 lg:py-14">
        <form method="get" action="/artikel" className="grid gap-3 border border-line bg-white p-4 sm:grid-cols-[1fr_14rem_auto]">
          <div className="relative">
            <input
              name="q"
              defaultValue={q}
              placeholder="Cari artikel…"
              className="h-12 w-full rounded-lg border border-line bg-paper px-4 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
            />
          </div>
          <select name="kategori" defaultValue={kategori} className="h-12 w-full rounded-lg border border-line bg-white px-3.5 text-sm text-ink outline-none transition-colors focus:border-ink">
            <option value="">Semua kategori</option>
            {content.articleCategories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
          <button type="submit" className="h-12 rounded-full bg-ink px-6 text-sm font-semibold text-paper transition-colors hover:bg-accent">
            Filter
          </button>
        </form>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((article, i) => (
            <Reveal key={article.slug} delay={i * 60}>
              <Link
                href={`/artikel/${article.slug}`}
                className="group flex h-full flex-col border border-line bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_18px_40px_-28px_rgba(11,27,43,0.55)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-paper-2">
                  {article.coverImage ? (
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center font-display text-sm font-semibold text-muted">
                      ANKA
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted">
                    <span>{categoryName(article.category)}</span>
                    <span className="text-line">·</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <h2 className="mt-3 font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-accent">
                    {article.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                    {article.excerpt}
                  </p>
                  <span className="mt-auto pt-4 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted">
                    {article.author}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {items.length === 0 && (
          <div className="border border-dashed border-line bg-paper-2/30 px-6 py-20 text-center">
            <p className="font-display text-xl font-semibold text-ink">
              Tidak ada artikel yang cocok
            </p>
            <p className="mt-2 text-sm text-muted">
              Coba ubah kata kunci atau kategori.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              const params = new URLSearchParams();
              if (q) params.set("q", q);
              if (kategori) params.set("kategori", kategori);
              params.set("page", String(p));
              return (
                <Link
                  key={p}
                  href={`/artikel?${params.toString()}`}
                  className={`flex size-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors ${
                    p === safePage
                      ? "border-ink bg-ink text-paper"
                      : "border-line text-muted hover:border-ink hover:text-ink"
                  }`}
                >
                  {p}
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}