import type { Metadata } from "next";
import Link from "next/link";
import { AdminNav } from "@/components/admin/admin-nav";
import { logoutAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";

export const instant = false;

export const metadata: Metadata = {
  title: "Panel Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-paper-2/50 lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="bg-ink lg:sticky lg:top-0 lg:h-screen">
        <AdminNav />
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-paper px-5 lg:px-10">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted">
            Panel Pengelolaan
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
            >
              Lihat situs ↗
            </Link>
            <form action={logoutAction} className="lg:hidden">
              <button
                type="submit"
                className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
              >
                Keluar
              </button>
            </form>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-5 py-8 lg:px-10 lg:py-10">
          {children}
        </div>
      </div>
    </div>
  );
}
