import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AdminShortcut } from "@/components/admin-shortcut"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer />
      <AdminShortcut />
    </>
  )
}
