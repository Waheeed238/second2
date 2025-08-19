"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X } from "lucide-react"

// Country codes data
const countryCodes = [
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+55", country: "BR", flag: "🇧🇷" },
  { code: "+7", country: "RU", flag: "🇷🇺" },
]

interface UploadedFile {
  url: string
  filename: string
  size: number
}

export default function SellForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    countryCode: "+91", // Set Indian country code as default
    phoneNumber: "",
    verificationCode: "",
    itemName: "",
    description: "",
    category: "",
    price: "",
    location: "", // Added location field
  })

  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isCodeVerified, setIsCodeVerified] = useState(false)
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [isVerifyingCode, setIsVerifyingCode] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSendCode = async () => {
    if (!formData.phoneNumber || !formData.countryCode) return

    setIsSendingCode(true)
    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: formData.phoneNumber,
          countryCode: formData.countryCode,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setIsCodeSent(true)
        alert(`OTP sent to ${formData.countryCode}${formData.phoneNumber}`)
        if (data.otp) {
          console.log("Development OTP:", data.otp)
          alert(`Development mode - OTP: ${data.otp}`)
        }
      } else {
        alert("Failed to send OTP: " + data.error)
      }
    } catch (error) {
      console.error("Error sending OTP:", error)
      alert("Failed to send OTP")
    } finally {
      setIsSendingCode(false)
    }
  }

  const handleVerifyCode = async () => {
    if (!formData.verificationCode) return

    setIsVerifyingCode(true)
    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: formData.phoneNumber,
          countryCode: formData.countryCode,
          code: formData.verificationCode,
        }),
      })

      const data = await response.json()
      if (data.verified) {
        setIsCodeVerified(true)
        alert("Phone number verified successfully!")
      } else {
        alert("Invalid verification code")
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      alert("Failed to verify OTP")
    } finally {
      setIsVerifyingCode(false)
    }
  }

  const handleFileUpload = async (files: FileList) => {
    if (!files || files.length === 0) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      Array.from(files).forEach((file) => {
        formData.append("files", file)
      })

      const response = await fetch("/api/upload-images", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (data.success) {
        setUploadedFiles((prev) => [...prev, ...data.files])
      } else {
        alert("Failed to upload files")
      }
    } catch (error) {
      console.error("Error uploading files:", error)
      alert("Failed to upload files")
    } finally {
      setIsUploading(false)
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isCodeVerified) {
      alert("Please verify your phone number first")
      return
    }

    try {
      const submitData = {
        ...formData,
        images: uploadedFiles.map((f) => f.url),
      }

      const response = await fetch("/api/submit-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      })

      const data = await response.json()
      if (data.success) {
        alert("Item listed successfully!")
        router.push("/orders")
      } else {
        alert("Failed to submit item: " + data.error)
      }
    } catch (error) {
      console.error("Error submitting item:", error)
      alert("Failed to submit item")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4">
        <h1 className="text-[#181411] text-[32px] font-bold leading-tight">Sell your item</h1>
      </div>

      {/* Full Name */}
      <div className="px-4">
        <label className="flex flex-col">
          <p className="text-[#181411] text-base font-medium leading-normal pb-2">Full name</p>
          <Input
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className="h-14 border-[#e6e0db] bg-white focus:border-[#e6e0db] text-[#181411] placeholder:text-[#8a7360]"
            required
          />
        </label>
      </div>

      {/* Phone Number with Country Code */}
      <div className="px-4">
        <label className="flex flex-col">
          <p className="text-[#181411] text-base font-medium leading-normal pb-2">Phone number</p>
          <div className="flex gap-2">
            <Select value={formData.countryCode} onValueChange={(value) => handleInputChange("countryCode", value)}>
              <SelectTrigger className="w-fit px-4 py-4 h-14 border-[#e6e0db] bg-white focus:border-[#e6e0db] text-[#181411]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countryCodes.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <div className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.code}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className="flex-1 h-14 border-[#e6e0db] bg-white focus:border-[#e6e0db] text-[#181411] placeholder:text-[#8a7360]"
              required
            />
          </div>
        </label>
      </div>

      {/* Send Code Button */}
      <div className="flex px-4 justify-end">
        <Button
          type="button"
          onClick={handleSendCode}
          disabled={!formData.phoneNumber || isCodeSent || isSendingCode}
          className="bg-[#f8b782] hover:bg-[#f8b782]/90 text-[#181411] font-bold"
        >
          {isSendingCode ? "Sending..." : isCodeSent ? "Code sent" : "Send code"}
        </Button>
      </div>

      {/* Verification Code */}
      {isCodeSent && (
        <div className="px-4">
          <label className="flex flex-col">
            <p className="text-[#181411] text-base font-medium leading-normal pb-2">Verification code</p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter 6-digit code"
                value={formData.verificationCode}
                onChange={(e) => handleInputChange("verificationCode", e.target.value)}
                className="flex-1 h-14 border-[#e6e0db] bg-white focus:border-[#e6e0db] text-[#181411] placeholder:text-[#8a7360]"
                maxLength={6}
                required
              />
              {!isCodeVerified && (
                <Button
                  type="button"
                  onClick={handleVerifyCode}
                  disabled={!formData.verificationCode || isVerifyingCode}
                  className="bg-[#f8b782] hover:bg-[#f8b782]/90 text-[#181411] font-bold"
                >
                  {isVerifyingCode ? "Verifying..." : "Verify"}
                </Button>
              )}
              {isCodeVerified && (
                <div className="flex items-center px-3 bg-green-100 rounded-md">
                  <span className="text-green-600 text-sm font-medium">✓ Verified</span>
                </div>
              )}
            </div>
          </label>
        </div>
      )}

      {/* Item Name */}
      <div className="px-4">
        <label className="flex flex-col">
          <p className="text-[#181411] text-base font-medium leading-normal pb-2">Item name</p>
          <Input
            placeholder="Enter item name"
            value={formData.itemName}
            onChange={(e) => handleInputChange("itemName", e.target.value)}
            className="h-14 border-[#e6e0db] bg-white focus:border-[#e6e0db] text-[#181411] placeholder:text-[#8a7360]"
            required
          />
        </label>
      </div>

      {/* Description */}
      <div className="px-4">
        <label className="flex flex-col">
          <p className="text-[#181411] text-base font-medium leading-normal pb-2">Description</p>
          <Textarea
            placeholder="Describe your item (optional)"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="min-h-36 border-[#e6e0db] bg-white focus:border-[#e6e0db] text-[#181411] placeholder:text-[#8a7360] resize-none"
          />
        </label>
      </div>

      {/* Category */}
      <div className="px-4">
        <label className="flex flex-col">
          <p className="text-[#181411] text-base font-medium leading-normal pb-2">Category</p>
          <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
            <SelectTrigger className="h-14 border-[#e6e0db] bg-white focus:border-[#e6e0db] text-[#181411]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="furniture">Furniture</SelectItem>
              <SelectItem value="appliances">Appliances</SelectItem>
              <SelectItem value="books">Books</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="vehicles">Vehicles</SelectItem>
              <SelectItem value="art">Art</SelectItem>
            </SelectContent>
          </Select>
        </label>
      </div>

      {/* Price */}
      <div className="px-4">
        <label className="flex flex-col">
          <p className="text-[#181411] text-base font-medium leading-normal pb-2">Price</p>
          <Input
            type="number"
            placeholder="Enter price"
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            className="h-14 border-[#e6e0db] bg-white focus:border-[#e6e0db] text-[#181411] placeholder:text-[#8a7360]"
            required
          />
        </label>
      </div>

      {/* Location */}
      <div className="px-4">
        <label className="flex flex-col">
          <p className="text-[#181411] text-base font-medium leading-normal pb-2">Location</p>
          <Input
            placeholder="Enter item location"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            className="h-14 border-[#e6e0db] bg-white focus:border-[#e6e0db] text-[#181411] placeholder:text-[#8a7360]"
            required
          />
        </label>
      </div>

      {/* Photo Upload */}
      <div className="px-4">
        <div className="space-y-4">
          <p className="text-[#181411] text-base font-medium leading-normal">Add photos</p>

          <div
            className="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-[#e6e0db] px-6 py-14 cursor-pointer hover:border-[#f8b782] transition-colors"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              const files = e.dataTransfer.files
              if (files) handleFileUpload(files)
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-[#8a7360]" />
              <p className="text-[#181411] text-lg font-bold leading-tight text-center">Add photos</p>
              <p className="text-[#181411] text-sm font-normal leading-normal text-center">
                Drag and drop or click to upload
              </p>
            </div>
            <Button
              type="button"
              className="bg-[#f5f2f0] hover:bg-[#f5f2f0]/90 text-[#181411] font-bold"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) handleFileUpload(e.target.files)
            }}
          />

          {uploadedFiles.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={file.url || "/placeholder.svg"}
                    alt={file.filename}
                    className="w-full h-32 object-cover rounded-lg border border-[#e6e0db]"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <p className="text-xs text-[#8a7360] mt-1 truncate">{file.filename}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="px-4">
        <Button
          type="submit"
          className="w-full bg-[#f8b782] hover:bg-[#f8b782]/90 text-[#181411] font-bold h-10"
          disabled={!isCodeVerified}
        >
          List item
        </Button>
      </div>
    </form>
  )
}
