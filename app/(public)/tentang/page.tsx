import {
  Globe,
  MessageCircle,
  Code,
  Send,
  ShieldCheck,
  Zap,
  Diamond,
  Server,
} from "lucide-react"

const features = [
  {
    icon: Globe,
    title: "Website",
    description: "Pembuatan website profesional dengan desain modern dan responsif.",
  },
  {
    icon: Diamond,
    title: "Apps Prem",
    description: "berkualitas dan terjangakau dibanding seller lain.",
  },
   {
    icon: Server,
    title: "Panel",
    description: "Server terjaga, terurus dan yang pasti anti delay.",
  },
  {
    icon: MessageCircle,
    title: "Bot WhatsApp",
    description: "Bot WhatsApp custom untuk kebutuhan bisnis dan personal.",
  },
  {
    icon: Code,
    title: "Source Code",
    description: "Source code berkualitas siap pakai untuk berbagai kebutuhan.",
  },
  {
    icon: Send,
    title: "Bot Telegram",
    description: "Bot Telegram dengan fitur lengkap dan mudah dikustomisasi.",
  },
  {
    icon: ShieldCheck,
    title: "Bergaransi",
    description: "Semua layanan dilengkapi garansi dan support pasca-pembelian.",
  },
  {
    icon: Zap,
    title: "Fast Response",
    description: "Respons cepat dan pengerjaan tepat waktu untuk setiap order.",
  },
]

export default function TentangPage() {
  const shopName = process.env.NEXT_PUBLIC_SHOP_NAME || "WAI"

  return (
    <div className="relative bg-dots">
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground md:text-5xl">
            Tentang <span className="gradient-text">{shopName}</span>
          </h1>
        </div>

         {/* About Text */}
        <div className="mx-auto mb-20 max-w-3xl space-y-6 text-center">
          <p className="text-lg leading-relaxed text-muted-foreground">
            <strong className="text-foreground">{shopName}</strong> Freis Digital Store 
            adalah penyedia jasa kebutuhan digital yang fokus pada kualitas dan kepuasan pelanggan.
            Kami menyediakan berbagai layanan mulai dari aplikasi premium, pembuatan website,
            bot WhatsApp, bot Telegram, panel, sc bug, apk phising hingga source code siap pakai.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Dengan pengalaman melayani lebih dari 303 pelanggan, kami memahami
            kebutuhan digital Anda. Setiap project dikerjakan dengan penuh
            perhatian terhadap detail dan menggunakan teknologi terkini.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Kami berkomitmen memberikan layanan terbaik dengan harga terjangkau,
            garansi penuh, dan support 24/7. Kepercayaan Anda adalah prioritas
            utama kami.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="card-glow flex flex-col items-center rounded-2xl border border-white/5 bg-card p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-cyan/30"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-cyan/10">
                <feature.icon className="h-7 w-7 text-cyan" />
              </div>
              <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
