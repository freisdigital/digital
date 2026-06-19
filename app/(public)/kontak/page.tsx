import { MessageCircle, Send, Mail, Instagram } from "lucide-react"

export default function KontakPage() {
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || "6288975319241"
  const telegram = process.env.NEXT_PUBLIC_CONTACT_TELEGRAM || "@FreisCracks"
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "freisdigitalstore@gmail.com"
  const instagram = process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM || "_"

  const contacts = [
    {
      icon: MessageCircle,
      platform: "WhatsApp",
      handle: waNumber,
      href: `https://wa.me/${waNumber}`,
      color: "hover:border-emerald-400/50 hover:shadow-emerald-400/10",
      iconColor: "text-emerald-400",
      bgColor: "bg-emerald-400/10",
    },
    {
      icon: Send,
      platform: "Telegram",
      handle: `@${telegram}`,
      href: `https://t.me/${telegram}`,
      color: "hover:border-sky-400/50 hover:shadow-sky-400/10",
      iconColor: "text-sky-400",
      bgColor: "bg-sky-400/10",
    },
    {
      icon: Mail,
      platform: "Email",
      handle: email,
      href: `mailto:${email}`,
      color: "hover:border-cyan/50 hover:shadow-cyan/10",
      iconColor: "text-cyan",
      bgColor: "bg-cyan/10",
    },
    {
      icon: Instagram,
      platform: "Instagram",
      handle: `@${instagram}`,
      href: `https://instagram.com/${instagram}`,
      color: "hover:border-pink-400/50 hover:shadow-pink-400/10",
      iconColor: "text-pink-400",
      bgColor: "bg-pink-400/10",
    },
  ]

  return (
    <div className="relative bg-dots">
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground md:text-5xl">
            Hubungi <span className="gradient-text">Kami</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Silakan hubungi kami melalui platform berikut. Kami siap melayani
            Anda kapan saja.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mx-auto grid max-w-3xl gap-4">
          {contacts.map((contact) => (
            <a
              key={contact.platform}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-4 rounded-2xl border border-white/5 bg-card p-6 shadow-lg transition-all duration-300 hover:translate-x-2 ${contact.color}`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${contact.bgColor}`}
              >
                <contact.icon className={`h-6 w-6 ${contact.iconColor}`} />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {contact.platform}
                </h3>
                <p className="text-sm text-muted-foreground">{contact.handle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
