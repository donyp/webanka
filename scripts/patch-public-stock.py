p=r"D:\DOWNLOAD\websiteanka\src\app\(site)\katalog\[slug]\page.tsx"
s=open(p,encoding="utf-8").read()
old='''              <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted">
                <span className="size-1.5 rounded-full bg-green-600" />
                Stok tersedia
              </span>'''
new='''              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] ${
                  (product.stockStatus ?? "available") === "available"
                    ? "border-green-200 bg-green-50 text-green-700"
                    : (product.stockStatus ?? "available") === "low"
                      ? "border-amber-200 bg-amber-50 text-amber-700"
                      : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    (product.stockStatus ?? "available") === "available"
                      ? "bg-green-600"
                      : (product.stockStatus ?? "available") === "low"
                        ? "bg-amber-500"
                        : "bg-red-500"
                  }`}
                />
                {(product.stockStatus ?? "available") === "available"
                  ? "Stok tersedia"
                  : (product.stockStatus ?? "available") === "low"
                    ? "Stok menipis"
                    : "Stok habis"}
              </span>'''
assert old in s
s=s.replace(old,new)
open(p,"w",encoding="utf-8").write(s)
print("done")