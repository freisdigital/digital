"use client"

import { useState } from "react"
import productsData from "@/data/products.json"
import type { Product } from "@/lib/types"
import { CATEGORIES } from "@/lib/types"
import { ProductCard } from "@/components/product-card"
import { OrderModal } from "@/components/order-modal"

const products = productsData as Product[]

export default function ProdukPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const filtered =
    selectedCategory === "Semua"
      ? products
      : products.filter((p) => p.category === selectedCategory)

  return (
    <div className="relative bg-dots">
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground md:text-5xl">
            Semua <span className="gradient-text">Produk</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Temukan layanan digital dan source code berkualitas untuk kebutuhan sosial dan store Anda.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "border-cyan/50 bg-cyan/10 text-cyan"
                  : "border-border bg-muted/50 text-muted-foreground hover:border-cyan/30 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onOrder={setSelectedProduct}
              priority={index < 3}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            Tidak ada produk dalam kategori ini.
          </div>
        )}
      </div>

      {/* Order Modal */}
      <OrderModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  )
}
