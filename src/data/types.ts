export type CategorySlug = string;

export type Category = {
  slug: CategorySlug;
  name: string;
  blurb: string;
  icon: string;
  tint: string;
  ink: string;
};

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  brand: string;
  sku: string;
  unit: string;
  short: string;
  description: string;
  specs: { label: string; value: string }[];
  guide?: string;
  tags: string[];
  featured?: boolean;
  badge?: string;
  image?: string;
  catalogUrl?: string;
};

export type SiteSettings = {
  name: string;
  fullName: string;
  legalName: string;
  tagline: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  addressShort: string;
  hours: string;
  mapQuery: string;
  established: number;
  adminEmail?: string;
};

export type HeroContent = {
  eyebrow: string;
  headline: string;
  accent: string;
  subcopy: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  badge: string;
  points: string[];
  marquee: string[];
};

export type NavItem = { label: string; href: string };
export type StatItem = { value: string; label: string };
export type ValueItem = { index: string; title: string; body: string };
export type ServiceItem = {
  index: string;
  title: string;
  body: string;
  points: string[];
};
export type ProcessItem = { step: string; title: string; body: string };
export type TestimonialItem = { quote: string; name: string; role: string };
export type FaqItem = { q: string; a: string };

export type ArticleCategory = { slug: string; name: string; blurb?: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  tags: string[];
  author: string;
  status: "draft" | "scheduled" | "published";
  featured?: boolean;
  publishedAt: string;
  updatedAt: string;
};

export type AuditEntry = { action: string; entity: string; slug?: string; at: string };

export type Content = {
  settings: SiteSettings;
  hero: HeroContent;
  nav: NavItem[];
  stats: StatItem[];
  values: ValueItem[];
  services: ServiceItem[];
  process: ProcessItem[];
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
  categories: Category[];
  products: Product[];
  articleCategories: ArticleCategory[];
  articles: Article[];
  auditLog: AuditEntry[];
  updatedAt: string;
};

/** Derived contact links (not stored, always in sync with settings). */
export type SiteLinks = SiteSettings & {
  phoneHref: string;
  emailHref: string;
  whatsappHref: string;
  mapsHref: string;
};

export function deriveSite(settings: SiteSettings): SiteLinks {
  const digits = settings.phone.replace(/[^\d+]/g, "");
  return {
    ...settings,
    phoneHref: `tel:${digits}`,
    emailHref: `mailto:${settings.email}`,
    whatsappHref: `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`,
    mapsHref: `https://maps.google.com/?q=${encodeURIComponent(
      settings.mapQuery || settings.address,
    )}`,
  };
}

export const formatPrice = (price: number | null) =>
  price === null
    ? "Hubungi kami"
    : new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(price);

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

export const categoryMap = (categories: Category[]) =>
  Object.fromEntries(categories.map((c) => [c.slug, c])) as Record<
    string,
    Category
  >;

export const getRelated = (
  products: Product[],
  product: Product,
  limit = 3,
) =>
  products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);