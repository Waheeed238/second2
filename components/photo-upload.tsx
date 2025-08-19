"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, ImageIcon, Loader2 } from "lucide-react"

interface PhotoUploadProps {
  photos: string[]
  onPhotosChange: (photos: string[]) => void
  maxPhotos?: number
}

export default function PhotoUpload({ photos, onPhotosChange, maxPhotos = 5 }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleFileUpload = useCallback(
    async (files: FileList) => {
      if (photos.length >= maxPhotos) {
        alert(`Maximum ${maxPhotos} photos allowed`)
        return
      }

      const remainingSlots = maxPhotos - photos.length
      const filesToUpload = Array.from(files).slice(0, remainingSlots)

      setUploading(true)

      try {
        const uploadPromises = filesToUpload.map(async (file) => {
          const formData = new FormData()
          formData.append("file", file)

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || "Upload failed")
          }

          const result = await response.json()
          return result.url
        })

        const uploadedUrls = await Promise.all(uploadPromises)
        onPhotosChange([...photos, ...uploadedUrls])
      } catch (error) {
        console.error("Upload error:", error)
        alert("Failed to upload photos. Please try again.")
      } finally {
        setUploading(false)
      }
    },
    [photos, onPhotosChange, maxPhotos],
  )

  const handleRemovePhoto = async (photoUrl: string) => {
    try {
      // Remove from Vercel Blob
      await fetch("/api/delete-photo", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: photoUrl }),
      })

      // Remove from local state
      onPhotosChange(photos.filter((url) => url !== photoUrl))
    } catch (error) {
      console.error("Delete error:", error)
      // Still remove from local state even if delete fails
      onPhotosChange(photos.filter((url) => url !== photoUrl))
    }
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileUpload(e.dataTransfer.files)
      }
    },
    [handleFileUpload],
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Photos ({photos.length}/{maxPhotos})
        </label>
        <p className="text-xs text-gray-500">Upload clear photos from multiple angles</p>
      </div>

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {photos.map((photoUrl, index) => (
            <Card key={index} className="relative group">
              <CardContent className="p-2">
                <div className="relative aspect-square">
                  <img
                    src={photoUrl || "/placeholder.svg"}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(photoUrl)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {photos.length < maxPhotos && (
        <Card
          className={`border-2 border-dashed transition-colors ${
            dragActive ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <CardContent className="p-8">
            <div className="text-center">
              <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                {uploading ? (
                  <Loader2 className="h-8 w-8 text-gray-600 animate-spin" />
                ) : (
                  <ImageIcon className="h-8 w-8 text-gray-600" />
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {uploading ? "Uploading photos..." : "Upload photos"}
              </h3>
              <p className="text-gray-600 mb-4">Drag and drop photos here, or click to select files</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                className="hidden"
                id="photo-upload"
                disabled={uploading}
              />
              <label htmlFor="photo-upload">
                <Button type="button" disabled={uploading} className="bg-green-600 hover:bg-green-700" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    {uploading ? "Uploading..." : "Choose Photos"}
                  </span>
                </Button>
              </label>
              <p className="text-xs text-gray-500 mt-2">Maximum 5MB per photo. JPG, PNG, WEBP supported.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
