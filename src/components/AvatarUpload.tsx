"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AvatarUploadProps {
  onAvatarUpdate: (url: string) => void
}

export function AvatarUpload({ onAvatarUpdate }: AvatarUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("avatar", file)

    try {
      const response = await fetch("/api/upload-avatar", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        onAvatarUpdate(data.avatar)
      } else {
        console.error("Ошибка при загрузке аватара")
      }
    } catch (error) {
      console.error("Ошибка при загрузке аватара", error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col space-y-2">
      <Input type="file" onChange={handleFileChange} accept="image/*" />
      <Button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? "Загрузка..." : "Загрузить аватар"}
      </Button>
    </div>
  )
}

