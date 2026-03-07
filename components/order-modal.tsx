"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Send } from "lucide-react"
import { toast } from "sonner"
import type { Product } from "@/lib/types"
import { formatRupiah } from "@/lib/types"

interface OrderModalProps {
  product: Product | null
  onClose: () => void
}

export function OrderModal({ product, onClose }: OrderModalProps) {
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [email, setEmail] = useState("")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [product])

  if (!product) return null

  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || ""
  const greeting = process.env.NEXT_PUBLIC_WA_GREETING || "Halo! Saya ingin memesan:"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !contact.trim()) {
      toast.error("Nama dan kontak WhatsApp/Telegram wajib diisi!")
      return
    }

    setLoading(true)
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          productPrice: product.price,
          customerName: name,
          customerContact: contact,
          customerEmail: email || undefined,
          notes: notes || undefined,
        }),
      })

      const waText = encodeURIComponent(
        `${greeting}\n\nProduk: ${product.name}\nHarga: ${formatRupiah(product.price)}\nNama: ${name}\nKontak: ${contact}${email ? `\nEmail: ${email}` : ""}${notes ? `\nKeterangan: ${notes}` : ""}`
      )
      window.open(`https://wa.me/${waNumber}?text=${waText}`, "_blank")

      toast.success("Pesanan berhasil dikirim!")
      setName("")
      setContact("")
      setEmail("")
      setNotes("")
      onClose()
    } catch {
      toast.error("Gagal mengirim pesanan. Coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Tutup"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Product Info */}
        <div className="mb-6 flex gap-4">
          {product.image ? (
            <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>
          ) : (
            <div className="flex h-20 w-28 flex-shrink-0 items-center justify-center rounded-xl bg-muted text-3xl">
              {product.icon}
            </div>
          )}
          <div>
            <h3 className="font-heading text-xl font-bold text-foreground">
              {product.name}
            </h3>
            <p className="mt-1 text-lg font-semibold text-cyan">
              {formatRupiah(product.price)}
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                /{product.unit}
              </span>
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Nama Lengkap <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama lengkap"
              className="w-full rounded-lg border border-border bg-muted px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              WhatsApp / Telegram <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="08xxxxxxxxxx atau @username"
              className="w-full rounded-lg border border-border bg-muted px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Email <span className="text-muted-foreground">(opsional)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@contoh.com"
              className="w-full rounded-lg border border-border bg-muted px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Keterangan / Kebutuhan
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Jelaskan kebutuhan Anda..."
              rows={3}
              className="w-full resize-none rounded-lg border border-border bg-muted px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan to-purple px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {loading ? "Mengirim..." : "Kirim Pesanan via WhatsApp"}
          </button>
        </form>
      </div>
    </div>
  )
}
