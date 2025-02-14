import { NextResponse } from "next/server"
import { loginUser } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    const { user, token } = await loginUser(email, password)

    const response = NextResponse.json({ success: true, user: { id: user.id, name: user.username, email: user.email } })
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

