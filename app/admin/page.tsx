"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Zap, LogIn } from "lucide-react"
import { toast } from "sonner"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        toast.success("Login berhasil!")
        router.push("/admin/dashboard")
      } else {
        toast.error("Username atau password salah!")
      }
    } catch {
      toast.error("Terjadi kesalahan. Coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-grid px-4">
      <div className="absolute inset-0 radial-glow" />
      <div className="relative w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-2xl">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan/10">
            <Zap className="h-7 w-7 text-cyan" />
          </div>
          <h1 className="font-heading text-xl font-bold text-foreground">
            Admin Panel
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Masuk untuk mengelola toko
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              className="w-full rounded-lg border border-border bg-muted px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="w-full rounded-lg border border-border bg-muted px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan to-purple px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <LogIn className="h-4 w-4" />
            {loading ? "Masuk..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  )
}
