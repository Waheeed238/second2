"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Package, MapPin, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import PhotoUpload from "@/components/photo-upload"

interface Category {
  id: string
  name: string
  description: string
}

interface Pincode {
  id: string
  pincode: string
  area_name: string
  city: string
  state: string
}

interface SellItemFormProps {
  categories: Category[]
  pincodes: Pincode[]
}

export default function SellItemForm({ categories, pincodes }: SellItemFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [pincodeSearch, setPincodeSearch] = useState("")
  const [selectedPincode, setSelectedPincode] = useState<Pincode | null>(null)
  const [photos, setPhotos] = useState<string[]>([])

  const filteredPincodes = pincodes.filter(
    (p) =>
      p.pincode.includes(pincodeSearch) ||
      p.area_name.toLowerCase().includes(pincodeSearch.toLowerCase()) ||
      p.city.toLowerCase().includes(pincodeSearch.toLowerCase()),
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const formData = new FormData(e.currentTarget)

    if (!selectedPincode) {
      setError("Please select a valid pincode")
      setIsSubmitting(false)
      return
    }

    try {
      const { data: user } = await supabase.auth.getUser()

      if (!user.user) {
        setError("You must be logged in to submit an item")
        setIsSubmitting(false)
        return
      }

      const { error: insertError } = await supabase.from("items").insert({
        user_id: user.user.id,
        category_id: formData.get("category"),
        title: formData.get("title"),
        description: formData.get("description"),
        condition: formData.get("condition"),
        estimated_price: Number.parseFloat(formData.get("estimated_price") as string),
        pickup_address: formData.get("pickup_address"),
        pincode: selectedPincode.pincode,
        photos: photos, // Store photo URLs in database
      })

      if (insertError) {
        setError(insertError.message)
      } else {
        setIsSuccess(true)
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Item Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Your item has been submitted for review. We'll contact you soon with our offer.
            </p>
            <Link href="/dashboard">
              <Button className="bg-green-600 hover:bg-green-700">Go to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-3 ml-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Sell Your Item</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
            <CardDescription>
              Provide details about the item you want to sell. We'll review it and get back to you with an offer.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Item Title *
                  </label>
                  <Input id="title" name="title" placeholder="e.g., iPhone 13 Pro Max" required className="h-12" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category *
                  </label>
                  <Select name="category" required>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description *
                </label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your item in detail - condition, age, features, etc."
                  required
                  rows={4}
                />
              </div>

              <PhotoUpload photos={photos} onPhotosChange={setPhotos} maxPhotos={5} />

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
                    Condition *
                  </label>
                  <Select name="condition" required>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent - Like new</SelectItem>
                      <SelectItem value="good">Good - Minor wear</SelectItem>
                      <SelectItem value="fair">Fair - Noticeable wear</SelectItem>
                      <SelectItem value="poor">Poor - Significant wear</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="estimated_price" className="block text-sm font-medium text-gray-700">
                    Expected Price (₹)
                  </label>
                  <Input
                    id="estimated_price"
                    name="estimated_price"
                    type="number"
                    placeholder="e.g., 25000"
                    min="1"
                    className="h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="pickup_address" className="block text-sm font-medium text-gray-700">
                  Pickup Address *
                </label>
                <Textarea
                  id="pickup_address"
                  name="pickup_address"
                  placeholder="Enter your complete address for item pickup"
                  required
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                  Pincode *
                </label>
                <div className="space-y-2">
                  <Input
                    id="pincode"
                    value={pincodeSearch}
                    onChange={(e) => setPincodeSearch(e.target.value)}
                    placeholder="Search by pincode, area, or city"
                    className="h-12"
                  />
                  {pincodeSearch && (
                    <div className="max-h-40 overflow-y-auto border rounded-lg">
                      {filteredPincodes.slice(0, 10).map((pincode) => (
                        <button
                          key={pincode.id}
                          type="button"
                          onClick={() => {
                            setSelectedPincode(pincode)
                            setPincodeSearch(`${pincode.pincode} - ${pincode.area_name}, ${pincode.city}`)
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b last:border-b-0"
                        >
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="font-medium">{pincode.pincode}</p>
                              <p className="text-sm text-gray-600">
                                {pincode.area_name}, {pincode.city}, {pincode.state}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                      {filteredPincodes.length === 0 && (
                        <p className="px-4 py-2 text-gray-500">No matching pincodes found</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Link href="/dashboard">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isSubmitting || !selectedPincode}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? "Submitting..." : "Submit Item"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
