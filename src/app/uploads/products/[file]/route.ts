import { readFile } from "node:fs/promises";
import path from "node:path";
import { connection, NextResponse } from "next/server";

const UPLOAD_DIR = process.env.ANKA_UPLOADS_DIR
  ? path.resolve(process.env.ANKA_UPLOADS_DIR)
  : path.join(process.cwd(), "public", "uploads", "products");

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  await connection();

  const { file } = await params;
  const name = path.basename(file);
  const type = CONTENT_TYPES[path.extname(name).toLowerCase()];

  if (!type) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const data = await readFile(path.join(UPLOAD_DIR, name));
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
