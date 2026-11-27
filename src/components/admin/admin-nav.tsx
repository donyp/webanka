"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { logoutAction } from "@/app/admin/actions";
import {
  BoxIcon,
  ContentIcon,
  DashboardIcon,
  PencilIcon,
  ExternalIcon,
  LogOutIcon,
  SettingsIcon,
  TagIcon,
} from "./icons";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Ringkasan", icon: DashboardIcon },
  { href: "/admin/produk", label: "Produk", icon: BoxIcon },
  { href: "/admin/kategori", label: "Kategori", icon: TagIcon },
  { href: "/admin/konten", label: "Konten", icon: ContentIcon },
  { href: "/admin/media", label: "Media", icon: ContentIcon },
  { href: "/admin/artikel", label: "Artikel", icon: PencilIcon },
  { href: "/admin/permintaan", label: "Permintaan", icon: ContentIcon },
  { href: "/admin/pengaturan", label: "Pengaturan", icon: SettingsIcon },
];

export function AdminNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-line-dark px-5 py-5">
        <Logo variant="light" />
        <span className="rounded-full border border-line-dark px-2 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-paper/50">
          Admin
        </span>
      </div>

      <nav className="no-scrollbar flex gap-1 overflow-x-auto px-3 py-4 lg:flex-col lg:gap-1.5 lg:px-4">
        {links.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-paper text-ink"
                  : "text-paper/65 hover:bg-paper/10 hover:text-paper",
              )}
            >
              <Icon className="size-4.5 shrink-0" />
              <span>{link.label}</span>
              {active && (
                <span className="ml-auto hidden size-1.5 rounded-full bg-accent lg:block" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto hidden border-t border-line-dark p-4 lg:block">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-paper/65 transition-colors hover:bg-paper/10 hover:text-paper"
        >
          <ExternalIcon className="size-4.5" />
          Lihat situs
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-left text-sm font-medium text-paper/65 transition-colors hover:bg-paper/10 hover:text-paper"
          >
            <LogOutIcon className="size-4.5" />
            Keluar
          </button>
        </form>
        <p className="mt-4 px-3.5 text-[0.6rem] leading-relaxed text-paper/30">
          ANKA Panel · v1.0
        </p>
      </div>
    </div>
  );
}