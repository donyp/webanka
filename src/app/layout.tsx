import type { Metadata } from "next";
import {
  Instrument_Serif,
  Manrope,
  Space_Grotesk,
} from "next/font/google";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.json",
  title: {
    default: "ANKA — Supplier & Distributor Aksesoris Konstruksi",
    template: "%s · ANKA",
  },
  description:
    "ANKA adalah supplier dan distributor aksesoris konstruksi: hardware pintu & jendela, pengencang, sealant, perkakas, railing, dan perlengkapan safety.",
  keywords: [
    "aksesoris konstruksi",
    "supplier aksesoris bangunan",
    "distributor hardware pintu",
    "sealant konstruksi",
    "baut dan sekrup proyek",
    "ANKA Aneka Aksesoris",
  ],
  openGraph: {
    title: "ANKA — Supplier & Distributor Aksesoris Konstruksi",
    description:
      "Aksesoris konstruksi yang tepat, stok yang jelas, dan pengiriman yang tidak menahan proyek.",
    type: "website",
    locale: "id_ID",
    siteName: "ANKA — Aneka Aksesoris",
  },
  twitter: {
    card: "summary_large_image",
    title: "ANKA — Supplier & Distributor Aksesoris Konstruksi",
    description:
      "Aksesoris konstruksi yang tepat, stok yang jelas, dan pengiriman yang tidak menahan proyek.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
