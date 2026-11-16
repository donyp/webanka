import type { ReactNode } from "react";

function inline(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />');
}

export function Markdown({ content, className }: { content: string; className?: string }) {
  const blocks = content.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);

  const rendered: ReactNode[] = blocks.map((block, index) => {
    const lines = block.split("\n");

    if (lines[0].startsWith("### ")) {
      return (
        <h3
          key={index}
          className="mt-8 font-display text-xl font-semibold tracking-tight text-ink"
          dangerouslySetInnerHTML={{ __html: inline(lines[0].slice(4)) }}
        />
      );
    }
    if (lines[0].startsWith("## ")) {
      return (
        <h2
          key={index}
          className="mt-10 font-display text-2xl font-semibold tracking-tight text-ink"
          dangerouslySetInnerHTML={{ __html: inline(lines[0].slice(3)) }}
        />
      );
    }
    if (lines[0].startsWith("# ")) {
      return (
        <h1
          key={index}
          className="mt-10 font-display text-3xl font-semibold tracking-tight text-ink"
          dangerouslySetInnerHTML={{ __html: inline(lines[0].slice(2)) }}
        />
      );
    }

    if (lines.every((line) => /^[-*]\s+/.test(line))) {
      return (
        <ul key={index} className="mt-4 list-disc space-y-2 pl-6 text-muted">
          {lines.map((line, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: inline(line.replace(/^[-*]\s+/, "")) }} />
          ))}
        </ul>
      );
    }

    if (lines.every((line) => /^\d+\.\s+/.test(line))) {
      return (
        <ol key={index} className="mt-4 list-decimal space-y-2 pl-6 text-muted">
          {lines.map((line, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: inline(line.replace(/^\d+\.\s+/, "")) }} />
          ))}
        </ol>
      );
    }

    return (
      <p
        key={index}
        className="mt-4 text-[1.02rem] leading-relaxed text-muted"
        dangerouslySetInnerHTML={{ __html: inline(block.replace(/\n/g, "<br />")) }}
      />
    );
  });

  return <div className={className}>{rendered}</div>;
}
