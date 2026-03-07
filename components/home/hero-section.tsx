import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MessageCircle } from "lucide-react"

export function HeroSection() {
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || ""

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden">
      {/* Grid background */}
      <div className="bg-grid absolute inset-0" />
      {/* Radial glow */}
      <div className="absolute inset-0 radial-glow" />
      {/* Additional glow orbs */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 text-center lg:px-8">
        {/* Logo */}
        <div className="mb-6 inline-flex items-center justify-center">
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl shadow-lg shadow-cyan/20 ring-2 ring-cyan/20">
            <Image
              src="/images/logo.jpg"
              alt="WAI Logo"
              fill
              className="object-cover"
              sizes="80px"
              priority
            />
          </div>
        </div>

        {/* Badge */}
        <div className="mb-8 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-4 py-2 text-sm text-cyan">
            <span className="text-base">&#9889;</span>
            <span>Jasa Digital Profesional</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
          <span className="text-foreground">Solusi Digital</span>
          <br />
          <span className="gradient-text">Cepat & Berkualitas</span>
        </h1>

        {/* Subtext */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Kami menyediakan jasa pembuatan website, bot WhatsApp, bot Telegram,
          dan source code berkualitas dengan harga terjangkau.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/produk"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan to-purple px-8 py-3.5 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Lihat Semua Produk
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-8 py-3.5 font-semibold text-foreground transition-colors hover:border-cyan/30 hover:bg-muted"
          >
            <MessageCircle className="h-4 w-4" />
            Hubungi Kami
          </a>
        </div>
      </div>
    </section>
  )
}
