import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const PRODUCTS_FILE = path.join(process.cwd(), "data", "products.json")

function readProducts() {
  try {
    const data = fs.readFileSync(PRODUCTS_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

function writeProducts(products: unknown[]) {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2))
}

export async function GET() {
  const products = readProducts()
  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const products = readProducts()

  const maxId = products.reduce(
    (max: number, p: { id: number }) => Math.max(max, p.id),
    0
  )

  const newProduct = {
    id: maxId + 1,
    name: body.name,
    category: body.category,
    price: Number(body.price),
    unit: body.unit,
    description: body.description,
    icon: body.icon || "\ud83d\udce6",
    featured: body.featured || false,
  }

  products.push(newProduct)
  writeProducts(products)

  return NextResponse.json(newProduct, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const products = readProducts()

  const index = products.findIndex((p: { id: number }) => p.id === body.id)
  if (index === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  products[index] = { ...products[index], ...body, price: Number(body.price) }
  writeProducts(products)
  return NextResponse.json(products[index])
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = Number(searchParams.get("id"))

  const products = readProducts()
  const filtered = products.filter((p: { id: number }) => p.id !== id)
  writeProducts(filtered)
  return NextResponse.json({ message: "Product deleted" })
}
