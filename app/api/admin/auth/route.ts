import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { username, password } = body

  const adminUser = process.env.ADMIN_USERNAME || "FreisDigitalStore"
  const adminPass = process.env.ADMIN_PASSWORD || "Freis123"

  if (username === adminUser && password === adminPass) {
    const token = Buffer.from(`${username}:${Date.now()}`).toString("base64")
    const cookieStore = await cookies()
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_token")
  return NextResponse.json({ success: true })
}

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_token")

  if (token) {
    return NextResponse.json({ authenticated: true })
  }
  return NextResponse.json({ authenticated: false }, { status: 401 })
}
