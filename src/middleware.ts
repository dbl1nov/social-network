import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")

  // Защищенные маршруты
  if (request.nextUrl.pathname.startsWith("/profile")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  // Маршруты для неавторизованных пользователей
  if (token && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register")) {
    return NextResponse.redirect(new URL("/profile", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/profile/:path*", "/login", "/register"],
}

