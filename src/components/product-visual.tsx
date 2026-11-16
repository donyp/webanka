import { CategoryIcon } from "./icons";
import type { Category, Product } from "@/data/types";
import { cn } from "@/lib/utils";

export function ProductVisual({
  product,
  category,
  index = 0,
  className,
}: {
  product: Product;
  category: Category;
  index?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("relative aspect-4/3 overflow-hidden", className)}
      style={{ backgroundColor: category.tint, color: category.ink }}
    >
      <div className="blueprint absolute inset-0 opacity-40" />

      <span className="absolute top-4 left-4 font-display text-[0.6rem] font-semibold uppercase tracking-[0.2em] opacity-60">
        {product.sku}
      </span>

      <span className="absolute top-3 right-4 font-display text-[0.6rem] font-semibold uppercase tracking-[0.2em] opacity-40">
        {String(index + 1).padStart(2, "0")}
      </span>

      <CategoryIcon
        name={category.icon}
        className="absolute top-1/2 left-1/2 h-auto w-[34%] max-w-44 -translate-x-1/2 -translate-y-1/2"
        strokeWidth={1}
      />

      <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-current/20 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] opacity-70">
        <span className="size-1.5 rounded-full bg-current" />
        {category.name}
      </span>

      {/* corner ticks */}
      <span className="absolute bottom-4 right-4 flex flex-col items-end gap-1 opacity-40">
        <span className="h-px w-6 bg-current" />
        <span className="h-px w-3 bg-current" />
      </span>
    </div>
  );
}
