"use client"

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { LogoutButton } from "@/components/LogoutButton"

interface User {
  id: number
  username: string
  email: string
  status: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user")
        if (!response.ok) {
          throw new Error("Unauthorized")
        }
        const data = await response.json()
        setUser(data.user)
      } catch (error) {
        redirect("/login")
      }
    }

    fetchUser()
  }, [])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Профиль пользователя</div>
            <h1 className="mt-2 text-2xl font-bold text-gray-900">{user.username}</h1>
            <p className=" text-base text-gray-500">{user.status}</p>
            <div className="mt-4">
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

