"use client";

import { useRef } from "react";
import { textareaClass } from "./ui";

type Props = {
  name: string;
  defaultValue?: string;
  rows?: number;
  className?: string;
};

export function MarkdownEditor({ name, defaultValue, rows = 16, className }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  function focus() {
    ref.current?.focus();
  }

  function wrap(before: string, after: string = before) {
    const ta = ref.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const value = ta.value;
    const selected = value.slice(start, end) || "teks";
    const next = value.slice(0, start) + before + selected + after + value.slice(end);
    ta.value = next;
    ta.selectionStart = start + before.length;
    ta.selectionEnd = start + before.length + selected.length;
    focus();
  }

  function insertLine(prefix: string) {
    const ta = ref.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const value = ta.value;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const next = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    ta.value = next;
    ta.selectionStart = ta.selectionEnd = start + prefix.length;
    focus();
  }

  function insertText(text: string) {
    const ta = ref.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const value = ta.value;
    const next = value.slice(0, start) + text + value.slice(end);
    ta.value = next;
    ta.selectionStart = ta.selectionEnd = start + text.length;
    focus();
  }

  const btn =
    "rounded-md border border-line bg-paper px-2.5 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-paper-2 disabled:opacity-40";

  return (
    <div className={className}>
      <div className="mb-2 flex flex-wrap gap-1.5">
        <button type="button" className={btn} onClick={() => wrap("**")}>
          B
        </button>
        <button type="button" className={btn} onClick={() => wrap("*")}>
          I
        </button>
        <button type="button" className={btn} onClick={() => wrap("`")}>
          Code
        </button>
        <button type="button" className={btn} onClick={() => insertLine("# ")}>
          H1
        </button>
        <button type="button" className={btn} onClick={() => insertLine("## ")}>
          H2
        </button>
        <button type="button" className={btn} onClick={() => insertLine("- ")}>
          List
        </button>
        <button type="button" className={btn} onClick={() => insertLine("1. ")}>
          1.
        </button>
        <button type="button" className={btn} onClick={() => insertLine("> ")}>
          Quote
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => wrap("[", "](https://)")}
        >
          Link
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => insertText("![deskripsi gambar](https://)")}
        >
          Gambar
        </button>
        <button type="button" className={btn} onClick={() => insertText("\n---\n")}>
          Garis
        </button>
      </div>
      <textarea
        ref={ref}
        id="content"
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        className={textareaClass}
      />
      <p className="mt-2 text-xs text-muted">
        Gunakan toolbar untuk menebalkan, miringkan, membuat judul, list, link, dan gambar. Konten disimpan dalam format Markdown.
      </p>
    </div>
  );
}