import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const ORDERS_FILE = path.join(process.cwd(), "data", "orders.json")

function readOrders() {
  try {
    const data = fs.readFileSync(ORDERS_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

function writeOrders(orders: unknown[]) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2))
}

export async function GET() {
  const orders = readOrders()
  return NextResponse.json(orders)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const orders = readOrders()

  const newOrder = {
    id: `ORD-${Date.now()}`,
    productId: body.productId,
    productName: body.productName,
    productPrice: body.productPrice,
    customerName: body.customerName,
    customerContact: body.customerContact,
    customerEmail: body.customerEmail || null,
    notes: body.notes || null,
    status: "pending",
    createdAt: new Date().toISOString(),
  }

  orders.push(newOrder)
  writeOrders(orders)

  return NextResponse.json(newOrder, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (id === "all") {
    writeOrders([])
    return NextResponse.json({ message: "All orders deleted" })
  }

  const orders = readOrders()
  const filtered = orders.filter((o: { id: string }) => o.id !== id)
  writeOrders(filtered)
  return NextResponse.json({ message: "Order deleted" })
}

export async function PATCH(req: NextRequest) {
  const body = await req.json()
  const orders = readOrders()

  const index = orders.findIndex((o: { id: string }) => o.id === body.id)
  if (index === -1) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 })
  }

  orders[index] = { ...orders[index], ...body }
  writeOrders(orders)
  return NextResponse.json(orders[index])
}
