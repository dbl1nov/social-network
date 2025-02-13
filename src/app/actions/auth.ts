"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function register(prevState: any, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await response.json()

    if (response.ok) {
      const cookieStore = await cookies()
      cookieStore.set("token", data.token, { httpOnly: true, secure: process.env.NODE_ENV === "production" })
      redirect("/profile")
    } else {
      return { error: data.error }
    }
  } catch (error) {
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (response.ok) {
      const cookieStore = await cookies()
      cookieStore.set("token", data.token, { httpOnly: true, secure: process.env.NODE_ENV === "production" })
      redirect("/profile")
    } else {
      return { error: data.error }
    }
  } catch (error) {
    return { error: "An unexpected error occurred. Please try again." }
  }
}

