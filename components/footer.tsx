import Image from "next/image"
import Link from "next/link"

export function Footer() {
  const shopName = process.env.NEXT_PUBLIC_SHOP_NAME || "WAI"

  return (
    <footer className="border-t border-border bg-navy-light">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative h-9 w-9 overflow-hidden rounded-lg">
              <Image
                src="/images/logo.jpg"
                alt={`${shopName} Logo`}
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
            <span className="font-heading text-lg font-bold text-foreground">
              {shopName}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-cyan transition-colors">
              Beranda
            </Link>
            <Link href="/produk" className="text-sm text-muted-foreground hover:text-cyan transition-colors">
              Produk
            </Link>
            <Link href="/tentang" className="text-sm text-muted-foreground hover:text-cyan transition-colors">
              Tentang
            </Link>
            <Link href="/kontak" className="text-sm text-muted-foreground hover:text-cyan transition-colors">
              Kontak
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {shopName}. All right reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
