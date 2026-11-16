import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getContent } from "@/lib/content";
import { deriveSite } from "@/data/types";
import { SITE_URL } from "@/lib/site-url";

// Content is editable from /admin, so public pages render against the store
// at request time instead of being frozen at build time.
export const instant = false;

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getContent();
  const site = deriveSite(content.settings);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    url: SITE_URL,
    description: site.description,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: site.addressShort,
      addressCountry: "ID",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <SiteHeader nav={content.nav} site={site} />
      <main className="flex-1">{children}</main>
      <SiteFooter
        categories={content.categories}
        nav={content.nav}
        site={site}
      />
      <WhatsAppButton href={site.whatsappHref} />
    </>
  );
}
