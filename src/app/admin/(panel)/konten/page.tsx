import { readContent } from "@/lib/store";
import { BackLink, Notice, PageHeader } from "@/components/admin/ui";
import {
  ListEditor,
  type EditorField,
} from "@/components/admin/list-editor";

type Section = {
  id: string;
  title: string;
  description: string;
  itemName: string;
  fields: EditorField[];
  initial: Record<string, unknown>[];
};

export default async function ContentPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { saved, error } = await searchParams;
  const content = await readContent();

  const sections: Section[] = [
  {
    id: "articleCategories",
    title: "Kategori Artikel",
    description: "Kelompok artikel di halaman Artikel.",
    itemName: "kategori",
    fields: [
      { key: "slug", label: "Slug", placeholder: "tips" },
      { key: "name", label: "Nama", placeholder: "Tips & Panduan" },
      { key: "blurb", label: "Deskripsi", type: "textarea" },
    ],
    initial: content.articleCategories as unknown as Record<string, unknown>[],
  },
    {
      id: "nav",
      title: "Navigasi",
      description: "Menu utama di header dan footer situs.",
      itemName: "tautan",
      fields: [
        { key: "label", label: "Label", placeholder: "Beranda" },
        { key: "href", label: "URL", placeholder: "/" },
      ],
      initial: content.nav as unknown as Record<string, unknown>[],
    },
    {
      id: "stats",
      title: "Statistik Singkat",
      description: "Empat angka di bawah hero beranda.",
      itemName: "statistik",
      fields: [
        { key: "value", label: "Angka", placeholder: "480+" },
        { key: "label", label: "Keterangan", placeholder: "SKU aktif" },
      ],
      initial: content.stats as unknown as Record<string, unknown>[],
    },
    {
      id: "values",
      title: "Nilai / Kenapa ANKA",
      description: "Kartu alasan memilih ANKA di beranda.",
      itemName: "nilai",
      fields: [
        { key: "index", label: "Nomor", placeholder: "01" },
        { key: "title", label: "Judul", placeholder: "Stok yang benar-benar ada" },
        { key: "body", label: "Deskripsi", type: "textarea" },
      ],
      initial: content.values as unknown as Record<string, unknown>[],
    },
    {
      id: "services",
      title: "Layanan",
      description: "Kartu layanan di halaman Layanan.",
      itemName: "layanan",
      fields: [
        { key: "index", label: "Nomor", placeholder: "01" },
        { key: "title", label: "Judul", placeholder: "Supply Material Proyek" },
        { key: "body", label: "Deskripsi", type: "textarea" },
        {
          key: "points",
          label: "Poin (satu per baris)",
          type: "list",
          placeholder: "Penawaran resmi (RFQ)\nHarga volume proyek",
        },
      ],
      initial: content.services as unknown as Record<string, unknown>[],
    },
    {
      id: "process",
      title: "Alur Pengadaan",
      description: "Langkah-langkah di beranda dan halaman Layanan.",
      itemName: "langkah",
      fields: [
        { key: "step", label: "Nomor", placeholder: "01" },
        { key: "title", label: "Judul", placeholder: "Kirim kebutuhan" },
        { key: "body", label: "Deskripsi", type: "textarea" },
      ],
      initial: content.process as unknown as Record<string, unknown>[],
    },
    {
      id: "testimonials",
      title: "Testimoni",
      description: "Kutipan pelanggan di beranda.",
      itemName: "testimoni",
      fields: [
        { key: "name", label: "Nama", placeholder: "Rendra Wibowo" },
        { key: "role", label: "Peran / instansi", placeholder: "Project Manager" },
        { key: "quote", label: "Kutipan", type: "textarea" },
      ],
      initial: content.testimonials as unknown as Record<string, unknown>[],
    },
    {
      id: "faqs",
      title: "FAQ",
      description: "Pertanyaan umum di halaman Kontak.",
      itemName: "FAQ",
      fields: [
        { key: "q", label: "Pertanyaan", placeholder: "Apakah bisa membeli dalam jumlah kecil?" },
        { key: "a", label: "Jawaban", type: "textarea" },
      ],
      initial: content.faqs as unknown as Record<string, unknown>[],
    },
  ];

  return (
    <div className="space-y-6">
      <BackLink href="/admin" label="Ringkasan" />
      <PageHeader
        eyebrow="Konten"
        title="Konten situs"
        description="Kelola bagian berulang: nilai, layanan, alur, testimoni, dan FAQ. Urutan item bisa diubah dengan tombol panah."
      />

      <Notice saved={saved} error={error} />

      <nav className="flex flex-wrap gap-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-muted transition-colors hover:border-ink hover:text-ink"
          >
            {section.title}
          </a>
        ))}
      </nav>

      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-20 border border-line bg-white"
        >
          <ListEditor
            section={section.id}
            title={section.title}
            description={section.description}
            itemName={section.itemName}
            fields={section.fields}
            initial={section.initial}
          />
        </section>
      ))}
    </div>
  );
}

export const instant = false;
