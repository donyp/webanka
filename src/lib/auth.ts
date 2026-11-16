import "server-only";
import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { headers } from "next/headers";
import { connection } from "next/server";
import { redirect } from "next/navigation";

const COOKIE_NAME = "anka_admin";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

const loginAttempts = new Map<string, { count: number; reset: number }>();

function secret() {
  return process.env.ADMIN_SECRET ?? "anka-development-secret-change-this-in-env-local";
}

function password() {
  return process.env.ADMIN_PASSWORD ?? "anka2026";
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function verifyPassword(input: string) {
  const hashed = process.env.ADMIN_PASSWORD_HASH;
  if (hashed) {
    const [salt, hash] = hashed.split(":");
    if (!salt || !hash) return false;
    try {
      const derived = scryptSync(input, salt, 64);
      return timingSafeEqual(Buffer.from(hash, "hex"), derived);
    } catch {
      return false;
    }
  }
  return safeEqual(input, password());
}

export async function checkRateLimit() {
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.reset) {
    loginAttempts.set(ip, { count: 1, reset: now + 15 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count += 1;
  return true;
}

export function createToken() {
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + SESSION_TTL_MS }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token: string) {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  if (!safeEqual(signature, sign(payload))) return false;

  try {
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { exp?: number };
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export async function isAdmin() {
  await connection();
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  return token ? verifyToken(token) : false;
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function startSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, createToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function endSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
