"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { LogoutButton } from "@/components/LogoutButton"
import { AvatarUpload } from "@/components/AvatarUpload"

export default function ProfilePage() {
  const [user, setUser] = useState<{ id: string; username: string; email: string; avatar: string | null } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/user")
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        } else {
          const errorData = await response.json()
          setError(errorData.error || "Failed to fetch user data")
          if (response.status === 401) {
            router.push("/login")
          }
        }
      } catch (err) {
        setError("An error occurred while fetching user data")
        console.error("Error fetching user:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [router])

  const handleAvatarUpdate = async (avatar: string) => {
    if (!user) return

    try {
      const response = await fetch("/api/update-avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar }),
      })

      if (response.ok) {
        setUser({ ...user, avatar })
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Failed to update avatar")
      }
    } catch (err) {
      setError("An error occurred while updating avatar")
      console.error("Error updating avatar:", err)
    }
  }

  if (loading) {
    return <div>Загрузка...</div>
  }

  if (error) {
    return <div>Ошибка: {error}</div>
  }

  if (!user) {
    return <div>Пользователь не найден</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Профиль пользователя</div>
            <div className="mt-4">
              {user.avatar ? (
                <Image
                  src={user.avatar || "/placeholder.svg"}
                  alt="Avatar"
                  width={100}
                  height={100}
                  className="w-[100px] h-[100px] rounded-full"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-2xl">{user.username[0]}</span>
                </div>
              )}
            </div>
            <h1 className="mt-2 text-2xl font-bold text-gray-900">{user.username}</h1>
            <p className="mt-2 text-gray-600">{user.email}</p>
            <div className="mt-4">
              <AvatarUpload onAvatarUpdate={handleAvatarUpdate} />
            </div>
            <div className="mt-4">
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

