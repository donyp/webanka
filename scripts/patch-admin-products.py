p=r"D:\DOWNLOAD\websiteanka\src\app\admin\(panel)\produk\page.tsx"
s=open(p,encoding="utf-8").read()
s=s.replace('sm:grid-cols-[1fr_14rem_auto]','sm:grid-cols-[1fr_14rem_12rem_auto]')
# add stock select after category select block
old='''        <select name="kategori" defaultValue={kategori} className={selectClass}>
          <option value="">Semua kategori</option>
          {content.categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit" className={btnGhost}>'''
new='''        <select name="kategori" defaultValue={kategori} className={selectClass}>
          <option value="">Semua kategori</option>
          {content.categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
        <select name="stok" defaultValue={stok} className={selectClass}>
          <option value="">Semua stok</option>
          <option value="available">Tersedia</option>
          <option value="low">Menipis</option>
          <option value="out">Habis</option>
        </select>
        <button type="submit" className={btnGhost}>'''
assert old in s
s=s.replace(old,new)
# update status column display
old2='''                <td className="px-4 py-3">
                  {product.featured ? (
                    <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-accent-dark">
                      Unggulan
                    </span>
                  ) : (
                    <span className="text-xs text-muted">—</span>
                  )}
                </td>'''
new2='''                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {product.featured && (
                      <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-accent-dark">
                        Unggulan
                      </span>
                    )}
                    <span
                      className={`rounded-full px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.1em] ${
                        (product.stockStatus ?? "available") === "available"
                          ? "bg-green-100 text-green-700"
                          : (product.stockStatus ?? "available") === "low"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {(product.stockStatus ?? "available") === "available"
                        ? "Tersedia"
                        : (product.stockStatus ?? "available") === "low"
                          ? "Menipis"
                          : "Habis"}
                    </span>
                  </div>
                </td>'''
assert old2 in s
s=s.replace(old2,new2)
open(p,"w",encoding="utf-8").write(s)
print("done")