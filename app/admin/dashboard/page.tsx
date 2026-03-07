"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
} from "lucide-react"
import { toast } from "sonner"
import { DashboardTab } from "@/components/admin/dashboard-tab"
import { ProductsTab } from "@/components/admin/products-tab"
import { OrdersTab } from "@/components/admin/orders-tab"
import { SettingsTab } from "@/components/admin/settings-tab"
import type { Product, Order } from "@/lib/types"

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "produk", label: "Produk", icon: Package },
  { id: "pesanan", label: "Pesanan", icon: ShoppingCart },
  { id: "pengaturan", label: "Pengaturan", icon: Settings },
]

export default function AdminDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    checkAuth()
    fetchData()
  }, [])

  async function checkAuth() {
    try {
      const res = await fetch("/api/admin/auth")
      if (!res.ok) {
        router.push("/admin")
      }
    } catch {
      router.push("/admin")
    }
  }

  async function fetchData() {
    try {
      const [prodRes, ordRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/orders"),
      ])
      const prods = await prodRes.json()
      const ords = await ordRes.json()
      setProducts(prods)
      setOrders(ords)
    } catch {
      toast.error("Gagal memuat data")
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" })
    toast.success("Berhasil logout")
    router.push("/admin")
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-navy-light transition-transform duration-200 lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-2.5 border-b border-border p-4">
            <div className="relative h-9 w-9 overflow-hidden rounded-lg">
              <Image
                src="/images/logo.jpg"
                alt="WAI Logo"
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
            <span className="font-heading text-lg font-bold text-foreground">
              Admin
            </span>
          </div>

          {/* Nav items */}
          <nav className="flex-1 p-3">
            <div className="flex flex-col gap-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setSidebarOpen(false)
                  }}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? "bg-cyan/10 text-cyan"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Logout */}
          <div className="border-t border-border p-3">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        {/* Mobile header */}
        <div className="flex items-center border-b border-border p-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
            aria-label="Buka menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <span className="ml-3 font-heading font-semibold text-foreground">
            {sidebarItems.find((i) => i.id === activeTab)?.label}
          </span>
        </div>

        <div className="p-4 lg:p-8">
          {activeTab === "dashboard" && (
            <DashboardTab products={products} orders={orders} onRefresh={fetchData} />
          )}
          {activeTab === "produk" && (
            <ProductsTab products={products} onRefresh={fetchData} />
          )}
          {activeTab === "pesanan" && (
            <OrdersTab orders={orders} onRefresh={fetchData} />
          )}
          {activeTab === "pengaturan" && (
            <SettingsTab products={products} orders={orders} onRefresh={fetchData} />
          )}
        </div>
      </div>
    </div>
  )
}
