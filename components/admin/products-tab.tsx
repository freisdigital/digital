"use client"

import { useState } from "react"
import Image from "next/image"
import type { Product } from "@/lib/types"
import { CATEGORIES, CATEGORY_COLORS, formatRupiah } from "@/lib/types"
import { Plus, Pencil, Trash2, X } from "lucide-react"
import { toast } from "sonner"

interface ProductsTabProps {
  products: Product[]
  onRefresh: () => void
}

const emptyForm = {
  id: 0,
  name: "",
  category: "Website",
  price: 0,
  unit: "",
  description: "",
  icon: "",
  featured: false,
}

export function ProductsTab({ products, onRefresh }: ProductsTabProps) {
  const [form, setForm] = useState(emptyForm)
  const [editing, setEditing] = useState(false)
  const [showForm, setShowForm] = useState(false)

  function resetForm() {
    setForm(emptyForm)
    setEditing(false)
    setShowForm(false)
  }

  function startEdit(product: Product) {
    setForm(product)
    setEditing(true)
    setShowForm(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.price || !form.unit) {
      toast.error("Nama, harga, dan unit wajib diisi!")
      return
    }

    try {
      if (editing) {
        await fetch("/api/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
        toast.success("Produk berhasil diperbarui!")
      } else {
        await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
        toast.success("Produk berhasil ditambahkan!")
      }
      resetForm()
      onRefresh()
    } catch {
      toast.error("Gagal menyimpan produk")
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Yakin hapus produk ini?")) return
    try {
      await fetch(`/api/products?id=${id}`, { method: "DELETE" })
      toast.success("Produk berhasil dihapus!")
      onRefresh()
    } catch {
      toast.error("Gagal menghapus produk")
    }
  }

  const categories = CATEGORIES.filter((c) => c !== "Semua")

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Produk
        </h1>
        <button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-purple px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Tambah Produk
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-8 rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              {editing ? "Edit Produk" : "Tambah Produk Baru"}
            </h2>
            <button
              onClick={resetForm}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Nama Produk
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-border bg-muted px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Kategori
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-lg border border-border bg-muted px-4 py-2.5 text-sm text-foreground focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Harga (Rp)
              </label>
              <input
                type="number"
                value={form.price || ""}
                onChange={(e) =>
                  setForm({ ...form, price: Number(e.target.value) })
                }
                className="w-full rounded-lg border border-border bg-muted px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Unit
              </label>
              <input
                type="text"
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
                placeholder="per website, per script, dll"
                className="w-full rounded-lg border border-border bg-muted px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Icon (Emoji)
              </label>
              <input
                type="text"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                placeholder="contoh: &#x1F310;"
                className="w-full rounded-lg border border-border bg-muted px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Deskripsi
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                className="w-full resize-none rounded-lg border border-border bg-muted px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
              />
            </div>
            <div className="flex items-center gap-3 sm:col-span-2">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm({ ...form, featured: e.target.checked })
                  }
                  className="peer sr-only"
                />
                <div className="h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-muted-foreground after:transition-all peer-checked:bg-cyan/30 peer-checked:after:translate-x-full peer-checked:after:bg-cyan" />
              </label>
              <span className="text-sm text-foreground">Produk Unggulan</span>
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-purple px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                {editing ? "Simpan Perubahan" : "Tambah Produk"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-2xl border border-white/5 bg-card"
          >
            {/* Product Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted text-4xl">
                  {product.icon}
                </div>
              )}
              <span
                className={`absolute left-3 top-3 inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm ${
                  CATEGORY_COLORS[product.category] || CATEGORY_COLORS["Lainnya"]
                }`}
              >
                {product.category}
              </span>
            </div>
            <div className="p-5">
            <h3 className="mb-1 font-heading text-base font-semibold text-foreground">
              {product.name}
            </h3>
            <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
            <div className="mb-3 text-lg font-bold text-cyan">
              {formatRupiah(product.price)}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                /{product.unit}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(product)}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-cyan/30 hover:bg-muted/80"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Hapus
              </button>
            </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          Belum ada produk. Tambahkan produk pertama Anda.
        </div>
      )}
    </div>
  )
}
