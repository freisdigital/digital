export interface Product {
  id: number
  name: string
  category: string
  price: number
  unit: string
  description: string
  icon: string
  image?: string
  featured: boolean
}

export interface Order {
  id: string
  productId: number
  productName: string
  productPrice: number
  customerName: string
  customerContact: string
  customerEmail?: string
  notes?: string
  status: "pending" | "done" | "cancel"
  createdAt: string
}

export const CATEGORIES = [
  "Semua",
  "Website",
  "Bot WhatsApp",
  "Bot Telegram",
  "Source Code",
  "Desain",
  "Lainnya",
] as const

export const CATEGORY_COLORS: Record<string, string> = {
  Website: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Bot WhatsApp": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Bot Telegram": "bg-sky-500/20 text-sky-400 border-sky-500/30",
  "Source Code": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Desain: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  Lainnya: "bg-amber-500/20 text-amber-400 border-amber-500/30",
}

export const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  done: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  cancel: "bg-red-500/20 text-red-400 border-red-500/30",
}

export function formatRupiah(num: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num)
}
