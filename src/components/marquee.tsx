import { Star } from "./icons";

type MarqueeProps = {
  items: string[];
};

export function Marquee({ items }: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div className="marquee-track overflow-hidden border-y border-ink bg-ink py-4 text-paper">
      <div className="animate-marquee flex w-max items-center">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-6 px-6 font-display text-sm font-medium uppercase tracking-[0.14em] whitespace-nowrap"
          >
            {item}
            <Star className="size-3 shrink-0 text-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
