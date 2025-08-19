"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin } from "lucide-react"

interface Pincode {
  id: string
  pincode: string
  area_name: string
  city: string
  state: string
}

interface AreaCoverageClientProps {
  pincodesByCity: Record<string, Pincode[]>
}

export default function AreaCoverageClient({ pincodesByCity }: AreaCoverageClientProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter cities and pincodes based on search term
  const filteredCities = Object.entries(pincodesByCity).filter(([city, pincodes]) => {
    if (!searchTerm) return true

    const searchLower = searchTerm.toLowerCase()
    return (
      city.toLowerCase().includes(searchLower) ||
      pincodes.some(
        (p) =>
          p.pincode.includes(searchTerm) ||
          p.area_name.toLowerCase().includes(searchLower) ||
          p.state.toLowerCase().includes(searchLower),
      )
    )
  })

  const totalCities = Object.keys(pincodesByCity).length
  const totalPincodes = Object.values(pincodesByCity).flat().length

  return (
    <>
      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{totalCities}</div>
            <p className="text-gray-600">Cities Covered</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{totalPincodes}</div>
            <p className="text-gray-600">Pincodes Served</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by city, area, pincode, or state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* Cities and Pincodes */}
      <div className="space-y-8">
        {filteredCities.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No areas found</h3>
              <p className="text-gray-600">
                We couldn't find any service areas matching your search. Try a different search term.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredCities.map(([city, pincodes]) => {
            const filteredPincodes = searchTerm
              ? pincodes.filter(
                  (p) =>
                    p.pincode.includes(searchTerm) ||
                    p.area_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.state.toLowerCase().includes(searchTerm.toLowerCase()),
                )
              : pincodes

            if (filteredPincodes.length === 0) return null

            return (
              <Card key={city}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-green-600" />
                    {city}, {filteredPincodes[0]?.state}
                    <Badge variant="secondary">{filteredPincodes.length} areas</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPincodes.map((pincode) => (
                      <div
                        key={pincode.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{pincode.area_name}</p>
                          <p className="text-sm text-gray-600">Pincode: {pincode.pincode}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Contact for New Areas */}
      <Card className="mt-12 bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Don't see your area?</h3>
          <p className="text-gray-600 mb-6">
            We're constantly expanding our service areas. Contact us to check if we can serve your location.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@secondhandpro.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Email Us
            </a>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Call Us
            </a>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
