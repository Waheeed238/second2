"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  LogOut,
  Settings,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Search,
  Filter,
  Eye,
  Phone,
  Mail,
  MapPin,
  ImageIcon,
} from "lucide-react"
import { signOut } from "@/lib/actions"
import { supabase } from "@/lib/supabase/client"

interface Item {
  id: string
  title: string
  description: string
  condition: string
  estimated_price: number
  pickup_address: string
  pincode: string
  status: string
  admin_notes?: string
  created_at: string
  photos?: string[]
  categories?: { name: string }
  profiles?: {
    full_name: string
    email: string
    phone?: string
    address?: string
  }
}

interface Order {
  id: string
  offered_price: number
  final_price?: number
  pickup_date?: string
  pickup_time_slot?: string
  status: string
  payment_status: string
  admin_notes?: string
  created_at: string
  items?: {
    title: string
    condition: string
    categories?: { name: string }
  }
  profiles?: {
    full_name: string
    email: string
    phone?: string
  }
}

interface AdminDashboardProps {
  items: Item[]
  orders: Order[]
}

const itemStatusConfig = {
  pending: { label: "Pending Review", icon: Clock, color: "bg-yellow-100 text-yellow-800" },
  approved: { label: "Approved", icon: CheckCircle, color: "bg-green-100 text-green-800" },
  rejected: { label: "Rejected", icon: XCircle, color: "bg-red-100 text-red-800" },
  picked_up: { label: "Picked Up", icon: Truck, color: "bg-blue-100 text-blue-800" },
  completed: { label: "Completed", icon: CheckCircle, color: "bg-green-100 text-green-800" },
}

const orderStatusConfig = {
  pending: { label: "Pending", icon: Clock, color: "bg-yellow-100 text-yellow-800" },
  confirmed: { label: "Confirmed", icon: CheckCircle, color: "bg-green-100 text-green-800" },
  picked_up: { label: "Picked Up", icon: Truck, color: "bg-blue-100 text-blue-800" },
  completed: { label: "Completed", icon: CheckCircle, color: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelled", icon: XCircle, color: "bg-red-100 text-red-800" },
}

export default function AdminDashboard({ items, orders }: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.profiles?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.profiles?.full_name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || item.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.items?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.profiles?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.profiles?.full_name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleUpdateItemStatus = async (itemId: string, newStatus: string, adminNotes?: string) => {
    setIsUpdating(true)
    try {
      const { error } = await supabase
        .from("items")
        .update({
          status: newStatus,
          admin_notes: adminNotes,
          updated_at: new Date().toISOString(),
        })
        .eq("id", itemId)

      if (!error) {
        // Refresh the page to show updated data
        window.location.reload()
      }
    } catch (error) {
      console.error("Error updating item:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string, adminNotes?: string) => {
    setIsUpdating(true)
    try {
      const { error } = await supabase
        .from("orders")
        .update({
          status: newStatus,
          admin_notes: adminNotes,
          updated_at: new Date().toISOString(),
        })
        .eq("id", orderId)

      if (!error) {
        // Refresh the page to show updated data
        window.location.reload()
      }
    } catch (error) {
      console.error("Error updating order:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Manage items and orders</p>
              </div>
            </div>
            <form action={signOut}>
              <Button variant="outline" type="submit">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold text-gray-900">{items.length}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {items.filter((item) => item.status === "pending").length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                </div>
                <Truck className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {items.filter((item) => item.status === "completed").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by item title, customer name, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="picked_up">Picked Up</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="items" className="space-y-6">
          <TabsList>
            <TabsTrigger value="items">Items ({filteredItems.length})</TabsTrigger>
            <TabsTrigger value="orders">Orders ({filteredOrders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="items">
            <div className="grid gap-6">
              {filteredItems.map((item) => {
                const status = itemStatusConfig[item.status as keyof typeof itemStatusConfig]
                const StatusIcon = status.icon

                return (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      {item.photos && item.photos.length > 0 && (
                        <div className="mb-4">
                          <div className="flex gap-2 overflow-x-auto">
                            {item.photos.slice(0, 3).map((photo, index) => (
                              <div key={index} className="flex-shrink-0">
                                <img
                                  src={photo || "/placeholder.svg"}
                                  alt={`${item.title} photo ${index + 1}`}
                                  className="w-20 h-20 object-cover rounded-lg"
                                />
                              </div>
                            ))}
                            {item.photos.length > 3 && (
                              <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                  <ImageIcon className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                                  <p className="text-xs text-gray-500">+{item.photos.length - 3}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                            <Badge className={status.color}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {status.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.categories?.name || "Uncategorized"}</p>
                          <p className="text-gray-700 line-clamp-2">{item.description}</p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-lg font-semibold text-green-600">
                            ₹{item.estimated_price?.toLocaleString() || "N/A"}
                          </p>
                          <p className="text-sm text-gray-500 capitalize">{item.condition}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Customer Details</h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              {item.profiles?.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <Package className="h-4 w-4" />
                              {item.profiles?.full_name || "N/A"}
                            </div>
                            {item.profiles?.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                {item.profiles.phone}
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Pickup Details</h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 mt-0.5" />
                              <div>
                                <p>{item.pickup_address}</p>
                                <p>Pincode: {item.pincode}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {item.admin_notes && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-700 mb-1">Admin Notes:</p>
                          <p className="text-sm text-gray-600">{item.admin_notes}</p>
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-4 border-t">
                        <p className="text-xs text-gray-500">
                          Submitted on {new Date(item.created_at).toLocaleDateString()}
                        </p>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedItem(item)}>
                                <Eye className="h-4 w-4 mr-1" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Item Details & Actions</DialogTitle>
                                <DialogDescription>Review and update item status</DialogDescription>
                              </DialogHeader>
                              {selectedItem && (
                                <ItemDetailsDialog
                                  item={selectedItem}
                                  onUpdateStatus={handleUpdateItemStatus}
                                  isUpdating={isUpdating}
                                />
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div className="grid gap-6">
              {filteredOrders.map((order) => {
                const status = orderStatusConfig[order.status as keyof typeof orderStatusConfig]
                const StatusIcon = status.icon

                return (
                  <Card key={order.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{order.items?.title}</h3>
                            <Badge className={status.color}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {status.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {order.items?.categories?.name || "Uncategorized"}
                          </p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-lg font-semibold text-blue-600">
                            ₹{order.offered_price?.toLocaleString()}
                          </p>
                          {order.final_price && (
                            <p className="text-sm text-green-600">Final: ₹{order.final_price.toLocaleString()}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Customer Details</h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              {order.profiles?.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <Package className="h-4 w-4" />
                              {order.profiles?.full_name || "N/A"}
                            </div>
                            {order.profiles?.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                {order.profiles.phone}
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Order Details</h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p>Payment: {order.payment_status}</p>
                            {order.pickup_date && <p>Pickup Date: {order.pickup_date}</p>}
                            {order.pickup_time_slot && <p>Time Slot: {order.pickup_time_slot}</p>}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <p className="text-xs text-gray-500">
                          Order placed on {new Date(order.created_at).toLocaleDateString()}
                        </p>
                        <div className="flex gap-2">
                          {order.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleUpdateOrderStatus(order.id, "confirmed")}
                                disabled={isUpdating}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Confirm Order
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUpdateOrderStatus(order.id, "cancelled")}
                                disabled={isUpdating}
                              >
                                Cancel
                              </Button>
                            </>
                          )}
                          {order.status === "confirmed" && (
                            <Button
                              size="sm"
                              onClick={() => handleUpdateOrderStatus(order.id, "picked_up")}
                              disabled={isUpdating}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Mark Picked Up
                            </Button>
                          )}
                          {order.status === "picked_up" && (
                            <Button
                              size="sm"
                              onClick={() => handleUpdateOrderStatus(order.id, "completed")}
                              disabled={isUpdating}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Complete Order
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function ItemDetailsDialog({
  item,
  onUpdateStatus,
  isUpdating,
}: {
  item: Item
  onUpdateStatus: (itemId: string, status: string, notes?: string) => void
  isUpdating: boolean
}) {
  const [selectedStatus, setSelectedStatus] = useState(item.status)
  const [adminNotes, setAdminNotes] = useState(item.admin_notes || "")

  const handleSubmit = () => {
    onUpdateStatus(item.id, selectedStatus, adminNotes)
  }

  return (
    <div className="space-y-6">
      {item.photos && item.photos.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Photos</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {item.photos.map((photo, index) => (
              <div key={index} className="aspect-square">
                <img
                  src={photo || "/placeholder.svg"}
                  alt={`${item.title} photo ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Item Information</h4>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Title:</strong> {item.title}
            </p>
            <p>
              <strong>Category:</strong> {item.categories?.name || "Uncategorized"}
            </p>
            <p>
              <strong>Condition:</strong> {item.condition}
            </p>
            <p>
              <strong>Expected Price:</strong> ₹{item.estimated_price?.toLocaleString() || "N/A"}
            </p>
            <p>
              <strong>Description:</strong> {item.description}
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Customer Information</h4>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Name:</strong> {item.profiles?.full_name || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {item.profiles?.email}
            </p>
            <p>
              <strong>Phone:</strong> {item.profiles?.phone || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {item.pickup_address}
            </p>
            <p>
              <strong>Pincode:</strong> {item.pincode}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="picked_up">Picked Up</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes</label>
          <Textarea
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            placeholder="Add notes about this item..."
            rows={3}
          />
        </div>

        <Button onClick={handleSubmit} disabled={isUpdating} className="w-full bg-blue-600 hover:bg-blue-700">
          {isUpdating ? "Updating..." : "Update Item"}
        </Button>
      </div>
    </div>
  )
}
