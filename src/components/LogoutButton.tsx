"use client"

import { Button } from "@/components/ui/button"

export function LogoutButton() {
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      const data = await response.json()

      if (response.ok) {
        console.log("Logout successful:", data)
        window.location.href = "/login"
      } else {
        console.error("Logout failed:", data)
        throw new Error(data.error || "An error occurred during logout")
      }
    } catch (err: any) {
      console.error("Logout error:", err)
      alert("Ошибка при выходе из системы: " + (err.message || "Unknown error"))
    }
  }

  return (
    <Button onClick={handleLogout} variant="outline">
      Выйти
    </Button>
  )
}

