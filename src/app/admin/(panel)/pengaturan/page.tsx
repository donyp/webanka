import { readContent } from "@/lib/store";
import {
  saveHeroAction,
  saveSettingsAction,
} from "@/app/admin/actions";
import {
  BackLink,
  Field,
  Notice,
  PageHeader,
  Panel,
  btnPrimary,
  inputClass,
  textareaClass,
} from "@/components/admin/ui";
import { SaveIcon } from "@/components/admin/icons";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { saved, error } = await searchParams;
  const content = await readContent();
  const { settings, hero } = content;

  return (
    <div className="space-y-6">
      <BackLink href="/admin" label="Ringkasan" />
      <PageHeader
        eyebrow="Pengaturan"
        title="Identitas & tampilan situs"
        description="Data perusahaan, kontak, dan teks hero. Perubahan langsung tampil di seluruh halaman."
      />

      <Notice saved={saved} error={error} />

      <form action={saveSettingsAction} className="space-y-6" id="identitas">
        <Panel
          title="Identitas perusahaan"
          description="Dipakai pada metadata, logo, dan footer."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nama singkat *" htmlFor="settings-name">
              <input
                id="settings-name"
                name="name"
                required
                defaultValue={settings.name}
                className={inputClass}
              />
            </Field>
            <Field label="Nama lengkap *" htmlFor="settings-fullName">
              <input
                id="settings-fullName"
                name="fullName"
                required
                defaultValue={settings.fullName}
                className={inputClass}
              />
            </Field>
            <Field label="Nama legal" htmlFor="settings-legalName">
              <input
                id="settings-legalName"
                name="legalName"
                defaultValue={settings.legalName}
                className={inputClass}
              />
            </Field>
            <Field label="Tahun berdiri" htmlFor="settings-established">
              <input
                id="settings-established"
                name="established"
                type="number"
                defaultValue={settings.established}
                className={inputClass}
              />
            </Field>
            <Field label="Tagline" htmlFor="settings-tagline" className="sm:col-span-2">
              <input
                id="settings-tagline"
                name="tagline"
                defaultValue={settings.tagline}
                className={inputClass}
              />
            </Field>
            <Field
              label="Deskripsi perusahaan"
              htmlFor="settings-description"
              hint="Dipakai untuk meta description dan cuplikan di mesin pencari."
              className="sm:col-span-2"
            >
              <textarea
                id="settings-description"
                name="description"
                rows={3}
                defaultValue={settings.description}
                className={textareaClass}
              />
            </Field>
            <Field
              label="Email admin (opsional)"
              htmlFor="settings-adminEmail"
              hint="Untuk notifikasi internal, tidak tampil di situs."
              className="sm:col-span-2"
            >
              <input
                id="settings-adminEmail"
                name="adminEmail"
                type="email"
                defaultValue={settings.adminEmail}
                placeholder="admin@anka.co.id"
                className={inputClass}
              />
            </Field>
          </div>
        </Panel>

        <Panel
          title="Kontak & lokasi"
          description="Tampil di header, footer, halaman kontak, dan tombol WhatsApp."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Telepon" htmlFor="settings-phone">
              <input
                id="settings-phone"
                name="phone"
                defaultValue={settings.phone}
                placeholder="+62 812-3456-7890"
                className={inputClass}
              />
            </Field>
            <Field
              label="Nomor WhatsApp"
              htmlFor="settings-whatsapp"
              hint="Format internasional tanpa +, contoh: 6281234567890"
            >
              <input
                id="settings-whatsapp"
                name="whatsapp"
                defaultValue={settings.whatsapp}
                placeholder="6281234567890"
                className={inputClass}
              />
            </Field>
            <Field label="Email" htmlFor="settings-email">
              <input
                id="settings-email"
                name="email"
                type="email"
                defaultValue={settings.email}
                className={inputClass}
              />
            </Field>
            <Field label="Jam operasional" htmlFor="settings-hours">
              <input
                id="settings-hours"
                name="hours"
                defaultValue={settings.hours}
                className={inputClass}
              />
            </Field>
            <Field label="Alamat lengkap" htmlFor="settings-address" className="sm:col-span-2">
              <textarea
                id="settings-address"
                name="address"
                rows={2}
                defaultValue={settings.address}
                className={textareaClass}
              />
            </Field>
            <Field label="Kota singkat" htmlFor="settings-addressShort">
              <input
                id="settings-addressShort"
                name="addressShort"
                defaultValue={settings.addressShort}
                className={inputClass}
              />
            </Field>
            <Field
              label="Query Google Maps"
              htmlFor="settings-mapQuery"
              hint="Dipakai untuk tautan peta, contoh: Bekasi Timur, Jawa Barat"
            >
              <input
                id="settings-mapQuery"
                name="mapQuery"
                defaultValue={settings.mapQuery}
                className={inputClass}
              />
            </Field>
          </div>
        </Panel>

        <div className="flex justify-end">
          <button type="submit" className={btnPrimary}>
            <SaveIcon className="size-4" />
            Simpan identitas
          </button>
        </div>
      </form>

      <form action={saveHeroAction} className="space-y-6" id="hero">
        <Panel
          title="Hero beranda"
          description="Teks utama yang pertama dilihat pengunjung."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Eyebrow" htmlFor="hero-eyebrow">
              <input
                id="hero-eyebrow"
                name="eyebrow"
                defaultValue={hero.eyebrow}
                className={inputClass}
              />
            </Field>
            <Field label="Badge pojok" htmlFor="hero-badge">
              <input
                id="hero-badge"
                name="badge"
                defaultValue={hero.badge}
                className={inputClass}
              />
            </Field>
            <Field
              label="Headline"
              htmlFor="hero-headline"
              hint="Bagian awal judul, tampil dengan font display."
            >
              <input
                id="hero-headline"
                name="headline"
                defaultValue={hero.headline}
                className={inputClass}
              />
            </Field>
            <Field
              label="Kata aksen"
              htmlFor="hero-accent"
              hint="Tampil italic serif berwarna orange di akhir judul."
            >
              <input
                id="hero-accent"
                name="accent"
                defaultValue={hero.accent}
                className={inputClass}
              />
            </Field>
            <Field label="Subcopy" htmlFor="hero-subcopy" className="sm:col-span-2">
              <textarea
                id="hero-subcopy"
                name="subcopy"
                rows={3}
                defaultValue={hero.subcopy}
                className={textareaClass}
              />
            </Field>

            <Field label="Tombol utama — label" htmlFor="hero-primaryLabel">
              <input
                id="hero-primaryLabel"
                name="primaryLabel"
                defaultValue={hero.primaryLabel}
                className={inputClass}
              />
            </Field>
            <Field label="Tombol utama — URL" htmlFor="hero-primaryHref">
              <input
                id="hero-primaryHref"
                name="primaryHref"
                defaultValue={hero.primaryHref}
                className={inputClass}
              />
            </Field>
            <Field label="Tombol kedua — label" htmlFor="hero-secondaryLabel">
              <input
                id="hero-secondaryLabel"
                name="secondaryLabel"
                defaultValue={hero.secondaryLabel}
                className={inputClass}
              />
            </Field>
            <Field label="Tombol kedua — URL" htmlFor="hero-secondaryHref">
              <input
                id="hero-secondaryHref"
                name="secondaryHref"
                defaultValue={hero.secondaryHref}
                className={inputClass}
              />
            </Field>

            <Field
              label="Poin kepercayaan"
              htmlFor="hero-points"
              hint="Satu poin per baris."
            >
              <textarea
                id="hero-points"
                name="points"
                rows={4}
                defaultValue={hero.points.join("\n")}
                className={textareaClass}
              />
            </Field>
            <Field
              label="Teks marquee"
              htmlFor="hero-marquee"
              hint="Satu item per baris. Tampil berjalan di bawah hero."
            >
              <textarea
                id="hero-marquee"
                name="marquee"
                rows={4}
                defaultValue={hero.marquee.join("\n")}
                className={textareaClass}
              />
            </Field>
          </div>
        </Panel>

        <div className="flex justify-end">
          <button type="submit" className={btnPrimary}>
            <SaveIcon className="size-4" />
            Simpan hero
          </button>
        </div>
      </form>

      <Panel title="Keamanan & penyimpanan">
        <div className="space-y-3 text-sm leading-relaxed text-muted">
          <p>
            Password admin diatur lewat variabel <code className="rounded bg-paper-2 px-1 py-0.5 text-xs">ADMIN_PASSWORD</code>{" "}
            dan secret sesi lewat <code className="rounded bg-paper-2 px-1 py-0.5 text-xs">ADMIN_SECRET</code>{" "}
            di file <code className="rounded bg-paper-2 px-1 py-0.5 text-xs">.env.local</code>. Restart server setelah mengubahnya.
          </p>
          <p>
            Seluruh data situs disimpan di <code className="rounded bg-paper-2 px-1 py-0.5 text-xs">data/content.json</code>.
            Backup file tersebut secara berkala. Untuk deployment serverless (Vercel), pindahkan penyimpanan ke database karena filesystem bersifat sementara.
          </p>
        </div>
      </Panel>

      <Panel title="Backup & restore">
        <div className="space-y-3 text-sm text-muted">
          <p>Unduh salinan data situs (JSON) untuk backup, atau pulihkan dari file backup.</p>
          <div className="flex flex-wrap gap-3">
            <a href="/api/backup" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent">
              Unduh backup
            </a>
            <form action="/api/restore" method="post" encType="multipart/form-data" className="flex items-center gap-3">
              <input type="file" name="file" accept="application/json" className="text-sm" required />
              <button type="submit" className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink">
                Pulihkan
              </button>
            </form>
          </div>
        </div>
      </Panel>

    </div>
  );
}

export const instant = false;
