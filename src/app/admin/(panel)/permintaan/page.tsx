import Link from "next/link";
import { readContent } from "@/lib/store";
import { BackLink, PageHeader } from "@/components/admin/ui";
import { DeleteForm } from "@/components/admin/delete-form";
import {
  deleteInquiryAction,
  markInquiryReadAction,
} from "@/app/admin/actions";
import { TrashIcon } from "@/components/admin/icons";
import { ArrowUpRight } from "@/components/icons";

export default async function AdminInquiriesPage() {
  const content = await readContent();
  const inquiries = content.inquiries ?? [];

  return (
    <div className="space-y-6">
      <BackLink href="/admin" label="Ringkasan" />
      <PageHeader
        eyebrow="CRM"
        title="Permintaan penawaran"
        description={`${inquiries.length} permintaan tersimpan.`}
      />

      <div className="overflow-x-auto border border-line bg-white">
        <table className="w-full min-w-[40rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left">
              {["Nama", "Kontak", "Kategori", "Pesan", "Waktu", ""].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-muted"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inquiries.map((item) => (
              <tr
                key={item.id}
                className={`border-b border-line/70 last:border-0 ${
                  item.read ? "bg-white" : "bg-accent-soft/30"
                }`}
              >
                <td className="px-4 py-3">
                  <p className="font-semibold text-ink">{item.name}</p>
                  {item.company && (
                    <p className="text-xs text-muted">{item.company}</p>
                  )}
                </td>
                <td className="px-4 py-3 text-muted">{item.contact}</td>
                <td className="px-4 py-3 text-muted">{item.category ?? "-"}</td>
                <td className="px-4 py-3 text-muted">
                  <p className="line-clamp-2 max-w-xs">{item.message}</p>
                </td>
                <td className="px-4 py-3 text-xs text-muted">
                  {new Date(item.createdAt).toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    {!item.read && (
                      <form action={markInquiryReadAction}>
                        <input type="hidden" name="id" value={item.id} />
                        <button
                          type="submit"
                          className="rounded-full border border-line px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-muted transition-colors hover:border-ink hover:text-ink"
                        >
                          Tandai dibaca
                        </button>
                      </form>
                    )}
                    <DeleteForm
                      action={deleteInquiryAction}
                      message="Hapus permintaan ini?"
                    >
                      <input type="hidden" name="id" value={item.id} />
                      <button
                        type="submit"
                        className="flex size-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-red-400 hover:text-red-600"
                      >
                        <TrashIcon className="size-3.5" />
                      </button>
                    </DeleteForm>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {inquiries.length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="font-display text-lg font-semibold text-ink">
              Belum ada permintaan
            </p>
            <p className="mt-1 text-sm text-muted">
              Permintaan dari form kontak akan tersimpan di sini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export const instant = false;