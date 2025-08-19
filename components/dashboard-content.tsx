"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LogOut, Plus, Package, Clock, CheckCircle, XCircle, Truck } from "lucide-react"
import Link from "next/link"
import { signOut } from "@/lib/actions"

interface Item {
  id: string
  title: string
  description: string
  condition: string
  estimated_price: number
  status: string
  created_at: string
  photos?: string[]
  categories?: { name: string }
}

interface User {
  id: string
  email: string
}

interface DashboardContentProps {
  user: User
  items: Item[]
}

const statusConfig = {
  pending: { label: "Pending Review", icon: Clock, color: "bg-yellow-100 text-yellow-800" },
  approved: { label: "Approved", icon: CheckCircle, color: "bg-green-100 text-green-800" },
  rejected: { label: "Rejected", icon: XCircle, color: "bg-red-100 text-red-800" },
  picked_up: { label: "Picked Up", icon: Truck, color: "bg-blue-100 text-blue-800" },
  completed: { label: "Completed", icon: CheckCircle, color: "bg-green-100 text-green-800" },
}

export default function DashboardContent({ user, items }: DashboardContentProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SecondHand Pro</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/sell">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Sell Item
                </Button>
              </Link>
              <form action={signOut}>
                <Button variant="outline" type="submit">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Items</h2>
          <p className="text-gray-600">Track and manage your submitted items</p>
        </div>

        {items.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <CardTitle className="text-xl text-gray-900 mb-2">No items yet</CardTitle>
              <CardDescription className="text-gray-600 mb-6">
                Start by submitting your first item for sale
              </CardDescription>
              <Link href="/dashboard/sell">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Sell Your First Item
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const status = statusConfig[item.status as keyof typeof statusConfig]
              const StatusIcon = status.icon

              return (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    {item.photos && item.photos.length > 0 && (
                      <div className="mb-4">
                        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={item.photos[0] || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          {item.photos.length > 1 && (
                            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                              +{item.photos.length - 1} more
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
                        <CardDescription className="mt-1">{item.categories?.name || "Uncategorized"}</CardDescription>
                      </div>
                      <Badge className={status.color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {status.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Estimated Price</p>
                        <p className="text-lg font-semibold text-green-600">
                          ₹{item.estimated_price?.toLocaleString() || "N/A"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Condition</p>
                        <p className="text-sm font-medium capitalize">{item.condition}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs text-gray-500">
                        Submitted on {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
