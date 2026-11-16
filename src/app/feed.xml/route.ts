import { NextResponse } from "next/server";
import { readContent } from "@/lib/store";

const base = "https://anka.co.id";

export async function GET() {
  const content = await readContent();
  const articles = content.articles
    .filter((a) => a.status === "published")
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const items = articles
    .map(
      (a) => `
    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${base}/artikel/${a.slug}</link>
      <guid>${base}/artikel/${a.slug}</guid>
      <description><![CDATA[${a.excerpt}]]></description>
      <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
      <author>${a.author}</author>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>ANKA — Artikel</title>
    <link>${base}/artikel</link>
    <description>Artikel, tips, dan berita seputar aksesoris konstruksi dari ANKA.</description>
    <language>id</language>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}
