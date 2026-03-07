import { Package, Users, Headphones, ShieldCheck } from "lucide-react"
import productsData from "@/data/products.json"

const stats = [
  {
    icon: Package,
    value: `${productsData.length}+`,
    label: "Total Produk",
  },
  {
    icon: Users,
    value: "200+",
    label: "Pelanggan Puas",
  },
  {
    icon: Headphones,
    value: "24/7",
    label: "Support",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Garansi",
  },
]

export function StatsBar() {
  return (
    <section className="relative border-y border-border bg-navy-light">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-2 px-6 py-8 text-center"
          >
            <stat.icon className="h-6 w-6 text-cyan" />
            <span className="font-heading text-2xl font-bold text-foreground">
              {stat.value}
            </span>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
