import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(req: NextRequest) {
  const body = await req.json()

  if (body.action === "reset") {
    // Reset all data
    const productsFile = path.join(process.cwd(), "data", "products.json")
    const ordersFile = path.join(process.cwd(), "data", "orders.json")
    fs.writeFileSync(ordersFile, "[]")
    fs.writeFileSync(productsFile, "[]")
    return NextResponse.json({ message: "All data reset" })
  }

  return NextResponse.json({ message: "OK" })
}
