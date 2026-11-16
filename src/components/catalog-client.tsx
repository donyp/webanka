"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "./product-card";
import { Search, Close, ChevronDown } from "./icons";
import type { Category, CategorySlug, Product } from "@/data/types";
import { cn } from "@/lib/utils";

type SortKey = "featured" | "name";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Unggulan" },
  { value: "name", label: "Nama A–Z" },
];

export function CatalogClient({
  products,
  categories,
  initialCategory,
}: {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
}) {
  const [category, setCategory] = useState<CategorySlug | "all">(
    (categories.some((c) => c.slug === initialCategory)
      ? initialCategory
      : "all") as CategorySlug | "all",
  );
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchCategory =
        category === "all" || product.category === category;
      if (!matchCategory) return false;
      if (!q) return true;

      const haystack = [
        product.name,
        product.brand,
        product.sku,
        product.short,
        ...product.tags,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });

    const sorted = [...result];
    switch (sort) {
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name, "id"));
        break;
      default:
        sorted.sort(
          (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
        );
    }
    return sorted;
  }, [category, query, sort, products]);

  const activeCategory = categories.find((c) => c.slug === category);
  const hasFilter = category !== "all" || query.trim() !== "";

  const reset = () => {
    setCategory("all");
    setQuery("");
    setSort("featured");
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="border-y border-line bg-paper-2/60">
        <div className="shell flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari produk, merek, atau SKU…"
              aria-label="Cari produk"
              className="h-12 w-full rounded-full border border-line bg-paper pr-10 pl-11 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-ink focus:ring-0"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Hapus pencarian"
                className="absolute top-1/2 right-3 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-line/60 hover:text-ink"
              >
                <Close className="size-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              <span className="text-ink">{filtered.length}</span> produk
            </p>

            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                aria-label="Urutkan produk"
                className="h-11 appearance-none rounded-full border border-line bg-paper pr-10 pl-4 text-sm font-semibold text-ink outline-none transition-colors hover:border-ink focus:border-ink"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted" />
            </div>
          </div>
        </div>
      </div>

      {/* Category chips */}
      <div className="shell">
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto py-5">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors",
              category === "all"
                ? "border-ink bg-ink text-paper"
                : "border-line bg-transparent text-muted hover:border-ink hover:text-ink",
            )}
          >
            Semua kategori
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setCategory(cat.slug)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors",
                category === cat.slug
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-transparent text-muted hover:border-ink hover:text-ink",
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className="shell pb-20">
        {activeCategory && (
          <div className="mb-6 flex items-baseline gap-3 border-t border-line pt-6">
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
              {activeCategory.name}
            </h2>
            <p className="text-sm text-muted">{activeCategory.blurb}</p>
          </div>
        )}

        {filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
            {filtered.map((product, i) => {
              const cat =
                categories.find((c) => c.slug === product.category) ??
                categories[0];
              return (
                <ProductCard
                  key={product.slug}
                  product={product}
                  category={cat}
                  index={i}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center border border-dashed border-line py-24 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-paper-2 text-muted">
              <Search className="size-6" />
            </div>
            <h2 className="mt-5 font-display text-xl font-semibold text-ink">
              Produk tidak ditemukan
            </h2>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Coba kata kunci lain, atau bersihkan filter untuk melihat seluruh
              katalog.
            </p>
            {hasFilter && (
              <button
                type="button"
                onClick={reset}
                className="mt-6 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent"
              >
                Reset filter
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}