import Link from "next/link";
import { ArrowUpRight } from "./icons";
import { ProductVisual } from "./product-visual";
import { type Category, type Product } from "@/data/types";

export function ProductCard({
  product,
  category,
  index = 0,
}: {
  product: Product;
  category: Category;
  index?: number;
}) {
  const href = "/katalog/" + product.slug;
  return (
    <Link href={href} className="group flex flex-col border border-line bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-ink">
      <div className="relative aspect-[4/5] overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <ProductVisual product={product} category={category} index={index} className="absolute inset-0" />
        )}
        {product.badge && (
          <span className="absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-ink px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-paper">
            {product.badge}
          </span>
        )}
        <span className="absolute bottom-3 right-3 flex size-9 translate-y-2 items-center justify-center rounded-full bg-ink text-paper opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted">
          <span>{product.brand}</span>
          <span>{category.name}</span>
        </div>

        <h3 className="mt-2 font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-accent">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
          {product.short}
        </p>

        <div className="mt-auto pt-5">
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted">
            Satuan: {product.unit}
          </span>
        </div>
      </div>
    </Link>
  );
}