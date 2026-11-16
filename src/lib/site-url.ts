const configured =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  "https://anka.co.id";

export const SITE_URL = configured.replace(/\/+$/, "");
