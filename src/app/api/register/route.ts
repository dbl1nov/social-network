import { NextResponse } from "next/server"
import { registerUser } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()
    const { user, token } = await registerUser(name, email, password)

    const response = NextResponse.json({ success: true, user: { id: user.id, name: user.username, email: user.email } })
    response.cookies.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" })
   
    return response 
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

