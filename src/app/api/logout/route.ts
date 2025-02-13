import { NextResponse } from "next/server"

export async function POST() {
  try {
    const response = NextResponse.json({ success: true, message: "Logged out successfully" })
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })
    return response
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ success: false, error: "An error occurred during logout" }, { status: 500 })
  }
}

