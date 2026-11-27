"use server";

import { mkdir, writeFile, readdir, unlink } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateContent } from "@/lib/store";
import { checkRateLimit, endSession, isAdmin, startSession, verifyPassword } from "@/lib/auth";
import {
  slugify,
  type Article,
  type ArticleCategory,
  type Category,
  type Content,
  type FaqItem,
  type NavItem,
  type ProcessItem,
  type Inquiry,
  type Product,
  type ServiceItem,
  type StatItem,
  type TestimonialItem,
  type ValueItem,
} from "@/data/types";

const SECTIONS = [
  "articleCategories",
  "nav",
  "stats",
  "values",
  "services",
  "process",
  "testimonials",
  "faqs",
] as const;
type Section = (typeof SECTIONS)[number];

function text(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

function lines(form: FormData, key: string) {
  return text(form, key)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function commaList(form: FormData, key: string) {
  return text(form, key)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseSpecs(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const index = line.search(/[:=]/);
      if (index === -1) return null;
      return {
        label: line.slice(0, index).trim(),
        value: line.slice(index + 1).trim(),
      };
    })
    .filter((item): item is { label: string; value: string } =>
      Boolean(item && item.label && item.value),
    );
}

function message(error: unknown) {
  return error instanceof Error ? error.message : "Terjadi kesalahan.";
}

async function guard() {
  if (!(await isAdmin())) redirect("/admin/login");
}

function refresh() {
  revalidatePath("/", "layout");
}

function slugOrName(form: FormData) {
  return slugify(text(form, "slug") || text(form, "name"));
}

function audit(draft: Content, action: string, entity: string, slug?: string) {
  if (!draft.auditLog) draft.auditLog = [];
  draft.auditLog.unshift({ action, entity, slug, at: new Date().toISOString() });
  draft.auditLog = draft.auditLog.slice(0, 100);
}

async function saveUpload(file: File, slug: string) {
  if (!(file instanceof File) || file.size === 0) return undefined;
  if (file.size > 5 * 1024 * 1024) throw new Error("Ukuran foto maksimal 5 MB.");
  const ext = path.extname(file.name).toLowerCase();
  const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)
    ? ext
    : ".jpg";
  const dir = process.env.ANKA_UPLOADS_DIR
    ? path.resolve(process.env.ANKA_UPLOADS_DIR)
    : path.join(process.cwd(), "public", "uploads", "products");
  await mkdir(dir, { recursive: true });
  const filename = slug + "-" + Date.now() + safeExt;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);
  return "/uploads/products/" + filename;
}

/* Auth */
export async function loginAction(form: FormData) {
  if (!(await checkRateLimit())) {
    redirect("/admin/login?error=Terlalu+banyak+percobaan.+Coba+lagi+15+menit.");
  }
  const password = text(form, "password");
  if (!verifyPassword(password)) {
    redirect("/admin/login?error=Password+salah");
  }
  await startSession();
  redirect("/admin");
}

export async function logoutAction() {
  await endSession();
  redirect("/admin/login");
}

/* Settings & hero */
export async function saveSettingsAction(form: FormData) {
  await guard();
  await updateContent((draft) => {
    draft.settings = {
      ...draft.settings,
      name: text(form, "name") || draft.settings.name,
      fullName: text(form, "fullName"),
      legalName: text(form, "legalName"),
      tagline: text(form, "tagline"),
      description: text(form, "description"),
      phone: text(form, "phone"),
      whatsapp: text(form, "whatsapp"),
      email: text(form, "email"),
      address: text(form, "address"),
      addressShort: text(form, "addressShort"),
      hours: text(form, "hours"),
      mapQuery: text(form, "mapQuery"),
      established: Number(text(form, "established")) || draft.settings.established,
      adminEmail: text(form, "adminEmail"),
    };
    audit(draft, "update", "settings");
  });
  refresh();
  redirect("/admin/pengaturan?saved=identitas#identitas");
}

export async function saveHeroAction(form: FormData) {
  await guard();
  await updateContent((draft) => {
    draft.hero = {
      ...draft.hero,
      eyebrow: text(form, "eyebrow"),
      headline: text(form, "headline"),
      accent: text(form, "accent"),
      subcopy: text(form, "subcopy"),
      primaryLabel: text(form, "primaryLabel"),
      primaryHref: text(form, "primaryHref"),
      secondaryLabel: text(form, "secondaryLabel"),
      secondaryHref: text(form, "secondaryHref"),
      badge: text(form, "badge"),
      points: lines(form, "points"),
      marquee: lines(form, "marquee"),
    };
    audit(draft, "update", "hero");
  });
  refresh();
  redirect("/admin/pengaturan?saved=hero#hero");
}

/* Products */
async function readProduct(form: FormData): Promise<Product> {
  const price = text(form, "price").replace(/[^\\d]/g, "");
  const slug = slugOrName(form);
  const uploaded = await saveUpload(form.get("image") as File, slug);
  const uploadedDimension = await saveUpload(form.get("dimensionImage") as File, slug);
  const currentImage = text(form, "imageCurrent") || undefined;
  const currentDimensionImage = text(form, "dimensionImageCurrent") || undefined;
  const removeImage = form.get("removeImage") === "on";
  const removeDimensionImage = form.get("removeDimensionImage") === "on";

  return {
    slug,
    name: text(form, "name"),
    category: text(form, "category"),
    brand: text(form, "brand"),
    sku: text(form, "sku"),
    unit: text(form, "unit") || "pcs",
    short: text(form, "short"),
    description: text(form, "description"),
    guide: text(form, "guide") || undefined,
    specs: parseSpecs(text(form, "specs")),
    tags: commaList(form, "tags"),
    featured: form.get("featured") === "on",
    badge: text(form, "badge") || undefined,
    image: uploaded ?? (removeImage ? undefined : currentImage),
    dimensionImage:
      uploadedDimension ?? (removeDimensionImage ? undefined : currentDimensionImage),
    stockStatus:
      (text(form, "stockStatus") as "available" | "low" | "out") || "available",
    stockQty: Number(text(form, "stockQty")) || undefined,
    catalogUrl: text(form, "catalogUrl") || undefined,
  };
}

export async function createProductAction(form: FormData) {
  await guard();
  const product = await readProduct(form);

  if (!product.name || !product.category) {
    redirect("/admin/produk/baru?error=Nama+dan+kategori+wajib+diisi");
  }
  if (!product.slug) {
    redirect("/admin/produk/baru?error=Slug+tidak+valid");
  }

  try {
    await updateContent((draft) => {
      if (!draft.categories.some((c) => c.slug === product.category)) {
        throw new Error("Kategori tidak ditemukan.");
      }
      if (draft.products.some((p) => p.slug === product.slug)) {
        throw new Error("Slug produk sudah dipakai. Ubah slug terlebih dahulu.");
      }
      draft.products.unshift(product);
      audit(draft, "create", "product", product.slug);
    });
  } catch (error) {
    redirect(`/admin/produk/baru?error=${encodeURIComponent(message(error))}`);
  }

  refresh();
  redirect("/admin/produk?saved=Produk+baru+ditambahkan");
}

export async function updateProductAction(form: FormData) {
  await guard();
  const original = slugify(text(form, "originalSlug"));
  const product = await readProduct(form);

  if (!product.name || !product.category) {
    redirect(`/admin/produk/${original}?error=Nama+dan+kategori+wajib+diisi`);
  }

  try {
    await updateContent((draft) => {
      const index = draft.products.findIndex((p) => p.slug === original);
      if (index === -1) throw new Error("Produk tidak ditemukan.");
      if (
        product.slug !== original &&
        draft.products.some((p) => p.slug === product.slug)
      ) {
        throw new Error("Slug produk sudah dipakai.");
      }
      draft.products[index] = product;
      audit(draft, "update", "product", product.slug);
    });
  } catch (error) {
    redirect(`/admin/produk/${original}?error=${encodeURIComponent(message(error))}`);
  }

  refresh();
  redirect(`/admin/produk/${product.slug}?saved=1`);
}

export async function deleteProductAction(form: FormData) {
  await guard();
  const slug = slugify(text(form, "slug"));

  await updateContent((draft) => {
    draft.products = draft.products.filter((p) => p.slug !== slug);
    audit(draft, "delete", "product", slug);
  });

  refresh();
  redirect("/admin/produk?saved=Produk+dihapus");
}

/* Media library */
export async function deleteMediaAction(form: FormData) {
  await guard();
  const filename = text(form, "filename");
  if (!filename) return;
  const dir = process.env.ANKA_UPLOADS_DIR
    ? path.resolve(process.env.ANKA_UPLOADS_DIR)
    : path.join(process.cwd(), "public", "uploads", "products");
  const target = path.join(dir, filename);
  // prevent path traversal
  if (path.basename(target) !== filename) return;
  try {
    await unlink(target);
  } catch {
    // ignore
  }
  refresh();
}

/* Inquiries / RFQ */
export async function submitInquiryAction(form: FormData) {
  const inquiry: Inquiry = {
    id: crypto.randomUUID(),
    name: text(form, "name"),
    company: text(form, "company") || undefined,
    contact: text(form, "contact"),
    category: text(form, "category") || undefined,
    message: text(form, "message"),
    createdAt: new Date().toISOString(),
    read: false,
  };

  if (!inquiry.name || !inquiry.contact || !inquiry.message) return;

  await updateContent((draft) => {
    if (!draft.inquiries) draft.inquiries = [];
    draft.inquiries.unshift(inquiry);
    draft.inquiries = draft.inquiries.slice(0, 200);
    audit(draft, "create", "inquiry", inquiry.id);
  });
  refresh();
}

export async function markInquiryReadAction(form: FormData) {
  await guard();
  const id = text(form, "id");
  await updateContent((draft) => {
    if (!draft.inquiries) return;
    const item = draft.inquiries.find((i) => i.id === id);
    if (item) item.read = true;
  });
  refresh();
}

export async function deleteInquiryAction(form: FormData) {
  await guard();
  const id = text(form, "id");
  await updateContent((draft) => {
    if (!draft.inquiries) return;
    draft.inquiries = draft.inquiries.filter((i) => i.id !== id);
    audit(draft, "delete", "inquiry", id);
  });
  refresh();
}

/* Categories */
function readCategory(form: FormData): Category {
  return {
    slug: slugOrName(form),
    name: text(form, "name"),
    blurb: text(form, "blurb"),
    icon: text(form, "icon") || "door",
    tint: text(form, "tint") || "#e9e4d8",
    ink: text(form, "ink") || "#0b1b2b",
  };
}

export async function createCategoryAction(form: FormData) {
  await guard();
  const category = readCategory(form);

  if (!category.name || !category.slug) {
    redirect("/admin/kategori/baru?error=Nama+kategori+wajib+diisi");
  }

  try {
    await updateContent((draft) => {
      if (draft.categories.some((c) => c.slug === category.slug)) {
        throw new Error("Slug kategori sudah dipakai.");
      }
      draft.categories.push(category);
      audit(draft, "create", "category", category.slug);
    });
  } catch (error) {
    redirect(`/admin/kategori/baru?error=${encodeURIComponent(message(error))}`);
  }

  refresh();
  redirect("/admin/kategori?saved=Kategori+ditambahkan");
}

export async function updateCategoryAction(form: FormData) {
  await guard();
  const original = slugify(text(form, "originalSlug"));
  const category = readCategory(form);

  try {
    await updateContent((draft) => {
      const index = draft.categories.findIndex((c) => c.slug === original);
      if (index === -1) throw new Error("Kategori tidak ditemukan.");
      if (
        category.slug !== original &&
        draft.categories.some((c) => c.slug === category.slug)
      ) {
        throw new Error("Slug kategori sudah dipakai.");
      }
      draft.categories[index] = category;
      if (category.slug !== original) {
        draft.products = draft.products.map((p) =>
          p.category === original ? { ...p, category: category.slug } : p,
        );
      }
      audit(draft, "update", "category", category.slug);
    });
  } catch (error) {
    redirect(`/admin/kategori/${original}?error=${encodeURIComponent(message(error))}`);
  }

  refresh();
  redirect("/admin/kategori?saved=Kategori+diperbarui");
}

export async function deleteCategoryAction(form: FormData) {
  await guard();
  const slug = slugify(text(form, "slug"));

  try {
    await updateContent((draft) => {
      const used = draft.products.filter((p) => p.category === slug).length;
      if (used > 0) {
        throw new Error(`Kategori masih dipakai oleh ${used} produk. Pindahkan produk terlebih dahulu.`);
      }
      draft.categories = draft.categories.filter((c) => c.slug !== slug);
      audit(draft, "delete", "category", slug);
    });
  } catch (error) {
    redirect(`/admin/kategori?error=${encodeURIComponent(message(error))}`);
  }

  refresh();
  redirect("/admin/kategori?saved=Kategori+dihapus");
}

/* Articles */
async function readArticle(form: FormData) {
  const slug = slugOrName(form);
  const uploaded = await saveUpload(form.get("cover") as File, slug);
  const currentCover = text(form, "coverCurrent") || undefined;
  const removeCover = form.get("removeCover") === "on";

  return {
    slug,
    title: text(form, "title"),
    excerpt: text(form, "excerpt"),
    content: text(form, "content"),
    coverImage: uploaded ?? (removeCover ? undefined : currentCover),
    category: text(form, "category") || "berita",
    tags: commaList(form, "tags"),
    author: text(form, "author") || "Tim ANKA",
    status: (text(form, "status") as "draft" | "scheduled" | "published") || "draft",
    featured: form.get("featured") === "on",
    publishedAt: text(form, "publishedAt") || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export async function createArticleAction(form: FormData) {
  await guard();
  const article = await readArticle(form);

  if (!article.title) {
    redirect("/admin/artikel/baru?error=Judul+artikel+wajib+diisi");
  }
  if (!article.slug) {
    redirect("/admin/artikel/baru?error=Slug+tidak+valid");
  }

  try {
    await updateContent((draft) => {
      if (draft.articles.some((a) => a.slug === article.slug)) {
        throw new Error("Slug artikel sudah dipakai.");
      }
      draft.articles.unshift(article);
      audit(draft, "create", "article", article.slug);
    });
  } catch (error) {
    redirect(`/admin/artikel/baru?error=${encodeURIComponent(message(error))}`);
  }

  refresh();
  redirect("/admin/artikel?saved=Artikel+ditambahkan");
}

export async function updateArticleAction(form: FormData) {
  await guard();
  const original = slugify(text(form, "originalSlug"));
  const article = await readArticle(form);

  if (!article.title) {
    redirect(`/admin/artikel/${original}?error=Judul+artikel+wajib+diisi`);
  }

  try {
    await updateContent((draft) => {
      const index = draft.articles.findIndex((a) => a.slug === original);
      if (index === -1) throw new Error("Artikel tidak ditemukan.");
      if (
        article.slug !== original &&
        draft.articles.some((a) => a.slug === article.slug)
      ) {
        throw new Error("Slug artikel sudah dipakai.");
      }
      draft.articles[index] = article;
      audit(draft, "update", "article", article.slug);
    });
  } catch (error) {
    redirect(`/admin/artikel/${original}?error=${encodeURIComponent(message(error))}`);
  }

  refresh();
  redirect(`/admin/artikel/${article.slug}?saved=1`);
}

export async function deleteArticleAction(form: FormData) {
  await guard();
  const slug = slugify(text(form, "slug"));

  await updateContent((draft) => {
    draft.articles = draft.articles.filter((a) => a.slug !== slug);
    audit(draft, "delete", "article", slug);
  });

  refresh();
  redirect("/admin/artikel?saved=Artikel+dihapus");
}

/* Sections */
export async function saveSectionAction(form: FormData) {
  await guard();
  const section = text(form, "section") as Section;
  const raw = text(form, "json");

  if (!SECTIONS.includes(section)) {
    redirect("/admin/konten?error=Seksi+tidak+valid");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error("Data harus berupa array.");
  } catch (error) {
    redirect(`/admin/konten?error=${encodeURIComponent(message(error))}`);
  }

  await updateContent((draft) => {
    switch (section) {
      case "articleCategories":
        draft.articleCategories = parsed as { slug: string; name: string; blurb?: string }[];
        break;
      case "nav":
        draft.nav = parsed as NavItem[];
        break;
      case "stats":
        draft.stats = parsed as StatItem[];
        break;
      case "values":
        draft.values = parsed as ValueItem[];
        break;
      case "services":
        draft.services = parsed as ServiceItem[];
        break;
      case "process":
        draft.process = parsed as ProcessItem[];
        break;
      case "testimonials":
        draft.testimonials = parsed as TestimonialItem[];
        break;
      case "faqs":
        draft.faqs = parsed as FaqItem[];
        break;
    }
    audit(draft, "update", "section", section);
  });

  refresh();
  redirect(`/admin/konten?saved=${section}#${section}`);
}