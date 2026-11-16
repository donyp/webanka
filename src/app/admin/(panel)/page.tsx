import Link from "next/link";
import { readContent } from "@/lib/store";
import { PageHeader, Panel, btnPrimary, btnGhost } from "@/components/admin/ui";
import {
  ArrowUpRight,
  Star,
  Plus,
} from "@/components/icons";
import {
  BoxIcon,
  TagIcon,
  ContentIcon,
  SettingsIcon,
} from "@/components/admin/icons";

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

export const instant = false;

export default async function AdminDashboard() {
  const content = await readContent();

  const categoryName = (slug: string) =>
    content.categories.find((c) => c.slug === slug)?.name ?? slug;

  const featured = content.products.filter((p) => p.featured).length;
  const complete = content.products.filter(
    (p) => p.short && p.description && p.specs.length > 0 && p.category,
  ).length;
  const completeness = content.products.length
    ? Math.round((complete / content.products.length) * 100)
    : 0;

  const stats = [
    { label: "Produk", value: content.products.length, icon: BoxIcon },
    { label: "Kategori", value: content.categories.length, icon: TagIcon },
    { label: "Unggulan", value: featured, icon: Star },
  ];

  const recent = content.products.slice(0, 6);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Ringkasan"
        title="Selamat datang di panel ANKA."
        description="Kelola katalog, konten, dan identitas perusahaan. Semua perubahan langsung tampil di situs publik."
        action={
          <Link href="/admin/produk/baru" className={btnPrimary}>
            <Plus className="size-4" />
            Tambah produk
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="border border-line bg-white p-5">
              <div className="flex items-start justify-between">
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  {stat.label}
                </span>
                <Icon className="size-4 text-accent" />
              </div>
              <p className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em] text-ink">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <Panel
          title="Produk terbaru"
          description="Enam produk paling akhir ditambahkan."
          action={
            <Link
              href="/admin/produk"
              className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
            >
              Kelola semua
            </Link>
          }
        >
          <div className="divide-y divide-line">
            {recent.map((product) => (
              <div
                key={product.slug}
                className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">
                    {product.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {product.sku || "Tanpa SKU"} · {categoryName(product.category)}
                  </p>
                </div>
                <Link
                  href={`/admin/produk/${product.slug}`}
                  className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ink hover:text-ink"
                  aria-label={`Edit ${product.name}`}
                >
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            ))}
            {recent.length === 0 && (
              <p className="py-6 text-sm text-muted">
                Belum ada produk. Tambahkan produk pertama Anda.
              </p>
            )}
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel title="Kelengkapan data">
            <div className="flex items-end justify-between">
              <span className="font-display text-3xl font-semibold tracking-[-0.03em] text-ink">
                {completeness}%
              </span>
              <span className="text-xs text-muted">
                {complete}/{content.products.length} produk
              </span>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden bg-paper-2">
              <div
                className="h-full bg-accent transition-all"
                style={{ width: `${completeness}%` }}
              />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Produk dianggap lengkap bila punya deskripsi, ringkasan, dan
              spesifikasi.
            </p>
          </Panel>

          <Panel title="Aksi cepat">
            <div className="grid gap-2">
              {[
                { href: "/admin/produk/baru", label: "Tambah produk", icon: Plus },
                { href: "/admin/kategori/baru", label: "Tambah kategori", icon: TagIcon },
                { href: "/admin/konten", label: "Edit konten", icon: ContentIcon },
                { href: "/admin/pengaturan", label: "Pengaturan situs", icon: SettingsIcon },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${btnGhost} justify-between`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="size-4 text-accent" />
                      {item.label}
                    </span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                );
              })}
            </div>
          </Panel>
        </div>
      </div>

      <Panel title="Informasi">
        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted">
              Terakhir diperbarui
            </dt>
            <dd className="mt-1 font-medium text-ink">
              {dateFormatter.format(new Date(content.updatedAt))} WIB
            </dd>
          </div>
          <div>
            <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted">
              Penyimpanan
            </dt>
            <dd className="mt-1 font-medium text-ink">
              data/content.json
            </dd>
          </div>
        </dl>
      </Panel>
    </div>
  );
}