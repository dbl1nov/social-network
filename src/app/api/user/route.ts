import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"

const prisma = new PrismaClient()

export async function GET() {
  const cookieStore = cookies()
  const token = (await cookieStore).get("token")

  if (!token || !token.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const decoded = verifyToken(token.value)

  if (!decoded || !decoded.userId) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, username: true, email: true, avatar: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

