import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const cookieStore = cookies()
  const token = (await cookieStore).get("token")

  if (!token || !token.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const decoded = verifyToken(token.value)

  if (!decoded || !decoded.userId) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }

  const { avatar } = await request.json()

  try {
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: { avatar },
    })

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error("Error updating user avatar:", error)
    return NextResponse.json({ error: "Failed to update avatar" }, { status: 500 })
  }
}

