import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Logo } from "@/components/logo";
import { ArrowRight, Boxes, Check, Lock } from "@/components/icons";
import { loginAction } from "@/app/admin/actions";
import { isAdmin } from "@/lib/auth";

export const instant = false;

export const metadata: Metadata = {
  title: "Masuk Panel Admin",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdmin()) redirect("/admin");

  const { error } = await searchParams;

  return (
    <div className="grid min-h-screen bg-paper lg:grid-cols-[1.05fr_0.95fr]">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-ink p-12 text-paper lg:flex lg:flex-col lg:justify-between">
        <div className="blueprint absolute inset-0 text-paper opacity-30" />
        <div className="relative">
          <Logo variant="light" />
        </div>

        <div className="relative max-w-lg">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-accent">
            Panel Admin
          </p>
          <h1 className="mt-5 text-balance font-display text-[clamp(2.4rem,4.5vw,3.8rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            Kendali penuh atas{" "}
            <span className="font-serif font-normal italic text-accent">
              katalog Anda.
            </span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-paper/60">
            Kelola produk, kategori, konten, dan identitas perusahaan dari satu
            tempat. Perubahan langsung tampil di situs.
          </p>

          <ul className="mt-8 space-y-3 text-sm text-paper/70">
            {[
              "Tambah & ubah produk tanpa menyentuh kode",
              "Atur kategori dan tampilan katalog",
              "Perbarui kontak, hero, dan konten situs",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex size-5 items-center justify-center rounded-full bg-accent text-white">
                  <Check className="size-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-[0.62rem] uppercase tracking-[0.18em] text-paper/30">
          ANKA — Aneka Aksesoris · Bekasi
        </p>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="mb-10 lg:hidden">
            <Logo />
          </div>

          <span className="flex size-12 items-center justify-center rounded-full bg-ink text-paper">
            <Lock className="size-5" />
          </span>

          <h2 className="mt-6 font-display text-3xl font-semibold tracking-[-0.03em] text-ink">
            Masuk ke panel
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Masukkan password admin untuk melanjutkan.
          </p>

          <form action={loginAction} className="mt-8 space-y-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                autoComplete="current-password"
                placeholder="••••••••"
                className="h-12 w-full rounded-lg border border-line bg-white px-4 text-sm text-ink outline-none transition-colors placeholder:text-muted/40 focus:border-ink"
              />
            </div>

            {error && (
              <p className="border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-paper transition-colors hover:bg-accent"
            >
              Masuk
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-8 flex items-start gap-3 border-t border-line pt-6 text-xs leading-relaxed text-muted">
            <Boxes className="mt-0.5 size-4 shrink-0" />
            <p>
              Sesi berlaku 7 hari. Untuk mengubah password, edit{" "}
              <code className="rounded bg-paper-2 px-1 py-0.5 text-[0.7rem]">
                ADMIN_PASSWORD
              </code>{" "}
              di file <code className="text-[0.7rem]">.env.local</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
