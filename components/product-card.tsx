"use client"

import Image from "next/image"
import type { Product } from "@/lib/types"
import { CATEGORY_COLORS, formatRupiah } from "@/lib/types"
import { ArrowRight } from "lucide-react"

interface ProductCardProps {
  product: Product
  onOrder: (product: Product) => void
  priority?: boolean
}

export function ProductCard({ product, onOrder, priority = false }: ProductCardProps) {
  return (
    <div
      className="card-glow group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/5 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-cyan/30"
      onClick={() => onOrder(product)}
    >
      {/* Product Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-5xl">
            {product.icon}
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        {/* Category Badge on image */}
        <span
          className={`absolute left-3 top-3 inline-flex rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${
            CATEGORY_COLORS[product.category] || CATEGORY_COLORS["Lainnya"]
          }`}
        >
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Name */}
        <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
          {product.name}
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        {/* Price & CTA */}
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xl font-bold text-cyan">
              {formatRupiah(product.price)}
            </span>
            <span className="ml-1 text-xs text-muted-foreground">
              /{product.unit}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onOrder(product)
            }}
            className="inline-flex items-center gap-1 rounded-lg bg-cyan/10 px-3 py-2 text-sm font-medium text-cyan transition-colors hover:bg-cyan/20"
          >
            Pesan
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
