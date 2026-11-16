import Link from "next/link";
import type { Category } from "@/data/types";
import {
  Field,
  Notice,
  Panel,
  btnGhost,
  btnPrimary,
  inputClass,
  selectClass,
  textareaClass,
} from "./ui";
import { SaveIcon } from "./icons";

const iconOptions = [
  { value: "door", label: "Pintu / engsel" },
  { value: "screw", label: "Sekrup / baut" },
  { value: "tube", label: "Sealant / tabung" },
  { value: "drill", label: "Alat / bor" },
  { value: "railing", label: "Railing / tangga" },
  { value: "helmet", label: "Safety / helm" },
];

export function CategoryForm({
  category,
  action,
  submitLabel,
  saved,
  error,
  cancelHref = "/admin/kategori",
}: {
  category?: Category;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
  saved?: string;
  error?: string;
  cancelHref?: string;
}) {
  return (
    <form action={action} className="space-y-6">
      {category && (
        <input type="hidden" name="originalSlug" value={category.slug} />
      )}

      <Notice saved={saved} error={error} />

      <Panel
        title="Detail kategori"
        description="Kategori mengelompokkan produk dan muncul di beranda serta filter katalog."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nama kategori *" htmlFor="name">
            <input
              id="name"
              name="name"
              required
              defaultValue={category?.name}
              placeholder="Pintu & Jendela"
              className={inputClass}
            />
          </Field>

          <Field
            label="Slug URL *"
            htmlFor="slug"
            hint="Dipakai di /katalog?kategori=slug-ini. Kosongkan untuk otomatis."
          >
            <input
              id="slug"
              name="slug"
              defaultValue={category?.slug}
              placeholder="pintu-jendela"
              className={inputClass}
            />
          </Field>

          <Field
            label="Deskripsi singkat"
            htmlFor="blurb"
            className="sm:col-span-2"
          >
            <textarea
              id="blurb"
              name="blurb"
              rows={3}
              defaultValue={category?.blurb}
              placeholder="Engsel, handle, kunci tanam, door closer, dan komponen daun pintu."
              className={textareaClass}
            />
          </Field>

          <Field
            label="Ikon"
            htmlFor="icon"
            hint="Ilustrasi line-art yang tampil di kartu kategori dan produk."
          >
            <select
              id="icon"
              name="icon"
              defaultValue={category?.icon ?? "door"}
              className={selectClass}
            >
              {iconOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Warna latar" htmlFor="tint">
              <div className="flex items-center gap-2">
                <input
                  id="tint"
                  name="tint"
                  type="color"
                  defaultValue={category?.tint ?? "#f0d9a9"}
                  className="h-11 w-12 cursor-pointer rounded-lg border border-line bg-white p-1"
                />
                <span className="text-xs text-muted">Tint kartu</span>
              </div>
            </Field>

            <Field label="Warna ikon" htmlFor="ink">
              <div className="flex items-center gap-2">
                <input
                  id="ink"
                  name="ink"
                  type="color"
                  defaultValue={category?.ink ?? "#5b4312"}
                  className="h-11 w-12 cursor-pointer rounded-lg border border-line bg-white p-1"
                />
                <span className="text-xs text-muted">Kontras teks</span>
              </div>
            </Field>
          </div>
        </div>
      </Panel>

      <div className="flex flex-col gap-3 border border-line bg-paper/95 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button type="submit" className={btnPrimary}>
            <SaveIcon className="size-4" />
            {submitLabel}
          </button>
          <Link href={cancelHref} className={btnGhost}>
            Batal
          </Link>
        </div>
      </div>
    </form>
  );
}
