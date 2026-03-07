import type { Metadata } from "next"
import { DM_Sans, Syne } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
})

export const metadata: Metadata = {
  title: "FREIS DIGITAL STORE - Jasa Digital Profesional",
  description:
    "Solusi digital cepat & berkualitas. Jasa pembuatan website, bot WhatsApp, bot Telegram, dan source code berkualitas.",
  metadataBase: new URL("https://www.waistore.pro"),
  openGraph: {
    title: "FREIS DIGITAL STORE - Jasa Digital Profesional",
    description:
      "Solusi digital cepat & berkualitas. Jasa pembuatan website, bot WhatsApp, bot Telegram, dan source code berkualitas.",
    url: "https://www.waistore.pro",
    siteName: "WAI Store",
    images: ["/images/logo.jpg"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`${dmSans.variable} ${syne.variable} font-sans antialiased`}>
        {children}
        <Toaster
          position="bottom-right"
          duration={3000}
          toastOptions={{
            style: {
              background: "#0c1220",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#e2e8f0",
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
