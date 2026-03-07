"use client"

import { useState } from "react"
import productsData from "@/data/products.json"
import type { Product } from "@/lib/types"
import { ProductCard } from "@/components/product-card"
import { OrderModal } from "@/components/order-modal"

const featuredProducts = (productsData as Product[]).filter((p) => p.featured)

export function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <section className="relative bg-dots py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            Produk <span className="gradient-text">Unggulan</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Layanan dan source code terpopuler pilihan pelanggan kami.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onOrder={setSelectedProduct}
              priority={index < 4}
            />
          ))}
        </div>
      </div>

      {/* Order Modal */}
      <OrderModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  )
}
