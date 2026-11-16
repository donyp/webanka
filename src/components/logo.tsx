import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "dark",
  priority = false,
}: {
  className?: string;
  variant?: "dark" | "light";
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="ANKA — Aneka Aksesoris, beranda"
      className={cn("group flex shrink-0 items-center", className)}
    >
      <Image
        src={variant === "light" ? "/logo-anka-light.png" : "/logo-anka.png"}
        alt="ANKA — Aneka Aksesoris"
        width={2000}
        height={475}
        priority={priority}
        sizes="180px"
        quality={90}
        className="h-8 w-auto transition-opacity duration-300 group-hover:opacity-80"
      />
    </Link>
  );
}
