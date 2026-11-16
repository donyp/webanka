import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { updateContent } from "@/lib/store";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File tidak ditemukan." }, { status: 400 });
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(await file.text());
  } catch {
    return NextResponse.json({ error: "File bukan JSON valid." }, { status: 400 });
  }

  await updateContent((draft) => {
    Object.assign(draft, parsed);
    if (!draft.auditLog) draft.auditLog = [];
    draft.auditLog.unshift({ action: "restore", entity: "backup", at: new Date().toISOString() });
    draft.auditLog = draft.auditLog.slice(0, 100);
  });

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}