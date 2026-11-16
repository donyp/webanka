"use client";

import { useState } from "react";
import { saveSectionAction } from "@/app/admin/actions";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  SaveIcon,
  TrashIcon,
} from "./icons";
import { Plus } from "@/components/icons";
import {
  btnGhost,
  btnPrimary,
  inputClass,
  labelClass,
  textareaClass,
} from "./ui";

export type EditorField = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "list";
  placeholder?: string;
};

type Editable = Record<string, string> & { __id: string };

function toEditable(
  item: Record<string, unknown>,
  fields: EditorField[],
): Editable {
  const row: Record<string, string> = {};
  for (const field of fields) {
    const value = item[field.key];
    row[field.key] = Array.isArray(value)
      ? value.join("\n")
      : value == null
        ? ""
        : String(value);
  }
  return { ...row, __id: crypto.randomUUID() };
}

export function ListEditor({
  section,
  title,
  description,
  fields,
  initial,
  itemName = "item",
}: {
  section: string;
  title: string;
  description?: string;
  fields: EditorField[];
  initial: Record<string, unknown>[];
  itemName?: string;
}) {
  const [items, setItems] = useState<Editable[]>(() =>
    initial.map((item) => toEditable(item, fields)),
  );

  const update = (id: string, key: string, value: string) => {
    setItems((current) =>
      current.map((item) => (item.__id === id ? { ...item, [key]: value } : item)),
    );
  };

  const add = () => {
    const row: Record<string, string> = {};
    for (const field of fields) {
      row[field.key] =
        field.key === "index" || field.key === "step"
          ? String(items.length + 1).padStart(2, "0")
          : "";
    }
    setItems((current) => [...current, { ...row, __id: crypto.randomUUID() }]);
  };

  const remove = (id: string) => {
    setItems((current) => current.filter((item) => item.__id !== id));
  };

  const move = (index: number, direction: -1 | 1) => {
    setItems((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const payload = items.map((item) => {
    const output: Record<string, unknown> = {};
    for (const field of fields) {
      const value = item[field.key] ?? "";
      output[field.key] =
        field.type === "list"
          ? value
              .split(/\r?\n/)
              .map((line) => line.trim())
              .filter(Boolean)
          : value;
    }
    return output;
  });

  return (
    <form action={saveSectionAction} className="space-y-4">
      <input type="hidden" name="section" value={section} />
      <input type="hidden" name="json" value={JSON.stringify(payload)} />

      <div className="flex flex-col gap-1 border-b border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-base font-semibold tracking-tight text-ink">
            {title}
          </h2>
          {description && (
            <p className="mt-0.5 text-xs leading-relaxed text-muted">
              {description}
            </p>
          )}
        </div>
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-muted">
          {items.length} {itemName}
        </span>
      </div>

      <div className="space-y-3 px-5">
        {items.map((item, index) => (
          <div key={item.__id} className="border border-line bg-paper-2/30 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-muted">
                {itemName} {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  aria-label="Naikkan"
                  className="flex size-7 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ink hover:text-ink disabled:opacity-30"
                >
                  <ChevronUpIcon className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === items.length - 1}
                  aria-label="Turunkan"
                  className="flex size-7 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ink hover:text-ink disabled:opacity-30"
                >
                  <ChevronDownIcon className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(item.__id)}
                  aria-label="Hapus item"
                  className="flex size-7 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-red-400 hover:text-red-600"
                >
                  <TrashIcon className="size-3.5" />
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {fields.map((field) => {
                const id = `${section}-${item.__id}-${field.key}`;
                const isWide =
                  field.type === "textarea" || field.type === "list";
                return (
                  <div
                    key={field.key}
                    className={`flex flex-col gap-1.5 ${isWide ? "sm:col-span-2" : ""}`}
                  >
                    <label htmlFor={id} className={labelClass}>
                      {field.label}
                    </label>
                    {isWide ? (
                      <textarea
                        id={id}
                        rows={field.type === "list" ? 3 : 3}
                        value={item[field.key] ?? ""}
                        onChange={(event) =>
                          update(item.__id, field.key, event.target.value)
                        }
                        placeholder={field.placeholder}
                        className={textareaClass}
                      />
                    ) : (
                      <input
                        id={id}
                        value={item[field.key] ?? ""}
                        onChange={(event) =>
                          update(item.__id, field.key, event.target.value)
                        }
                        placeholder={field.placeholder}
                        className={inputClass}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <p className="border border-dashed border-line bg-paper-2/20 px-4 py-8 text-center text-sm text-muted">
            Belum ada {itemName}. Klik tambah untuk membuat yang pertama.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" onClick={add} className={btnGhost}>
          <Plus className="size-4" />
          Tambah {itemName}
        </button>
        <button type="submit" className={btnPrimary}>
          <SaveIcon className="size-4" />
          Simpan {title.toLowerCase()}
        </button>
      </div>
    </form>
  );
}
