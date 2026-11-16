import { WhatsApp } from "./icons";

export function WhatsAppButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi ANKA via WhatsApp"
      className="group fixed right-4 bottom-4 z-40 flex items-center gap-3 rounded-full bg-ink py-3 pr-4 pl-3 text-paper shadow-[0_12px_30px_-12px_rgba(11,27,43,0.7)] transition-colors hover:bg-accent sm:right-6 sm:bottom-6"
    >
      <span className="flex size-9 items-center justify-center rounded-full bg-accent text-white transition-colors group-hover:bg-white group-hover:text-accent">
        <WhatsApp className="size-5" />
      </span>
      <span className="hidden text-sm font-semibold sm:block">
        Chat via WhatsApp
      </span>
    </a>
  );
}
