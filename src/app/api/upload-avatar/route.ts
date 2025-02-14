import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"

export async function POST(request: Request) {
  const data = await request.formData()
  const file: File | null = data.get("avatar") as unknown as File

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const path = join(process.cwd(), "public", "uploads", file.name)
  await writeFile(path, buffer)

  const avatar = `/uploads/${file.name}`

  return NextResponse.json({ avatar })
}
