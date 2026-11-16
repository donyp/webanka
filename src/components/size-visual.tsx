import type { Product } from "@/data/types";

function numberFrom(value: string): number | null {
  const match = value.match(/[\d]+(?:[.,]\d+)?/);
  if (!match) return null;
  return parseFloat(match[0].replace(",", "."));
}

function findSpec(product: Product, patterns: RegExp[]): { label: string; value: string; num: number | null } | null {
  for (const spec of product.specs) {
    if (patterns.some((p) => p.test(spec.label))) {
      return { label: spec.label, value: spec.value, num: numberFrom(spec.value) };
    }
  }
  return null;
}

export function SizeVisual({ product }: { product: Product }) {
  const widthSpec =
    findSpec(product, [/lebar/i, /diameter/i]) ??
    findSpec(product, [/panjang/i]);
  const heightSpec =
    findSpec(product, [/tinggi/i]) ??
    (widthSpec?.label.match(/panjang/i) ? null : findSpec(product, [/panjang/i])) ??
    findSpec(product, [/tebal/i, /ketebalan/i]);
  const depthSpec = findSpec(product, [/tebal/i, /ketebalan/i, /grip/i]);

  const dims = product.specs.filter((s) =>
    /panjang|lebar|tinggi|diameter|tebal|ketebalan|arbor|backset/i.test(s.label),
  );

  let rectW = 120;
  let rectH = 70;
  if (widthSpec?.num && heightSpec?.num) {
    const ratio = widthSpec.num / heightSpec.num;
    if (ratio >= 1) {
      rectW = 140;
      rectH = Math.max(24, Math.round(140 / ratio));
    } else {
      rectH = 80;
      rectW = Math.max(24, Math.round(80 * ratio));
    }
  }

  const x = (200 - rectW) / 2;
  const y = (120 - rectH) / 2;

  return (
    <div className="border border-line bg-paper-2/40 p-4">
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted">
        Diagram ukuran (ilustrasi)
      </p>
      <svg
        viewBox="0 0 200 120"
        className="mt-3 w-full text-ink"
        role="img"
        aria-label="Ilustrasi ukuran produk"
      >
        <rect
          x={x}
          y={y}
          width={rectW}
          height={rectH}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        {/* width dimension */}
        {widthSpec && (
          <>
            <line
              x1={x}
              y1={y + rectH + 12}
              x2={x + rectW}
              y2={y + rectH + 12}
              stroke="currentColor"
              strokeWidth="0.8"
            />
            <text
              x={x + rectW / 2}
              y={y + rectH + 24}
              textAnchor="middle"
              fontSize="8"
              fill="currentColor"
            >
              {widthSpec.value}
            </text>
          </>
        )}
        {/* height dimension */}
        {heightSpec && (
          <>
            <line
              x1={x - 12}
              y1={y}
              x2={x - 12}
              y2={y + rectH}
              stroke="currentColor"
              strokeWidth="0.8"
            />
            <text
              x={x - 16}
              y={y + rectH / 2}
              textAnchor="middle"
              fontSize="8"
              fill="currentColor"
              transform={`rotate(-90 ${x - 16} ${y + rectH / 2})`}
            >
              {heightSpec.value}
            </text>
          </>
        )}
      </svg>
      {dims.length > 0 && (
        <ul className="mt-3 space-y-1 text-xs text-muted">
          {dims.map((s) => (
            <li key={s.label} className="flex justify-between gap-4">
              <span>{s.label}</span>
              <span className="font-semibold text-ink">{s.value}</span>
            </li>
          ))}
        </ul>
      )}
      {depthSpec && depthSpec.label !== widthSpec?.label && depthSpec.label !== heightSpec?.label && (
        <p className="mt-2 text-xs text-muted">
          {depthSpec.label}: <span className="font-semibold text-ink">{depthSpec.value}</span>
        </p>
      )}
      <p className="mt-3 text-[0.7rem] leading-snug text-muted/80">
        Ilustrasi proporsi, bukan skala layar. Ukuran aktual mengikuti spek.
      </p>
    </div>
  );
}