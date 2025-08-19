import { supabaseAdmin } from "@/lib/supabase/server"
import Navigation from "@/components/navigation"
import Link from "next/link"
import { notFound } from "next/navigation"

async function getOrder(id: string) {
  const { data: order, error } = await supabaseAdmin.from("orders").select("*").eq("id", id).single()

  if (error || !order) {
    return null
  }

  return order
}

export default async function OrderDetailsPage({ params }: { params: { id: string } }) {
  const order = await getOrder(params.id)

  if (!order) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#FCF5EB]">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/orders" className="text-[#8a7360] hover:text-[#181411]">
            Orders
          </Link>
          <span className="text-[#8a7360]">/</span>
          <span className="text-[#181411] font-medium">Order Details</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#181411] mb-2">Order Details</h1>
          <p className="text-[#8a7360]">Order ID: {order.order_id}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Item Details */}
          <div className="p-6 border-b border-[#e6e0db]">
            <h3 className="text-lg font-bold text-[#181411] mb-4">Item Details</h3>
            <div className="flex gap-6">
              <div className="flex-1">
                <p className="text-[#8a7360] text-sm mb-1">Category: {order.category}</p>
                <h4 className="text-[#181411] font-bold text-lg mb-2">{order.item_name}</h4>
                <p className="text-[#8a7360] text-sm">Price: ₹{order.price?.toLocaleString() || "N/A"}</p>
              </div>
              {order.images && order.images.length > 0 && (
                <div className="w-32 h-24 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={order.images[0] || "/placeholder.svg"}
                    alt={order.item_name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Seller Information */}
          <div className="p-6 border-b border-[#e6e0db]">
            <h3 className="text-lg font-bold text-[#181411] mb-4">Seller Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between py-2 border-t border-[#e6e0db]">
                <span className="text-[#8a7360] text-sm">Seller Name</span>
                <span className="text-[#181411] text-sm">{order.seller_name}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-[#e6e0db]">
                <span className="text-[#8a7360] text-sm">Phone Number</span>
                <span className="text-[#181411] text-sm">
                  {order.country_code} {order.seller_phone}
                </span>
              </div>
              {order.location && (
                <div className="flex justify-between py-2 border-t border-[#e6e0db] md:col-span-2">
                  <span className="text-[#8a7360] text-sm">Location</span>
                  <span className="text-[#181411] text-sm">{order.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Item Description */}
          {order.description && (
            <div className="p-6 border-b border-[#e6e0db]">
              <h3 className="text-lg font-bold text-[#181411] mb-4">Item Description</h3>
              <p className="text-[#181411]">{order.description}</p>
            </div>
          )}

          {/* Inspection Details */}
          {(order.inspection_date || order.inspection_time || order.inspection_location) && (
            <div className="p-6 border-b border-[#e6e0db]">
              <h3 className="text-lg font-bold text-[#181411] mb-4">Inspection Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {order.inspection_date && (
                  <div className="flex justify-between py-2 border-t border-[#e6e0db]">
                    <span className="text-[#8a7360] text-sm">Date</span>
                    <span className="text-[#181411] text-sm">
                      {new Date(order.inspection_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {order.inspection_time && (
                  <div className="flex justify-between py-2 border-t border-[#e6e0db]">
                    <span className="text-[#8a7360] text-sm">Time</span>
                    <span className="text-[#181411] text-sm">{order.inspection_time}</span>
                  </div>
                )}
                {order.inspection_location && (
                  <div className="flex justify-between py-2 border-t border-[#e6e0db] md:col-span-2">
                    <span className="text-[#8a7360] text-sm">Location</span>
                    <span className="text-[#181411] text-sm">{order.inspection_location}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="p-6">
            <div className="flex gap-3 mb-4">
              <button className="px-4 py-2 bg-[#f8b782] text-[#181411] font-medium rounded-lg hover:bg-[#f5a96b] transition-colors">
                Accept
              </button>
              <button className="px-4 py-2 bg-[#f5f2f0] text-[#181411] font-medium rounded-lg hover:bg-[#e6e0db] transition-colors">
                Reject
              </button>
              <button className="px-4 py-2 bg-[#f5f2f0] text-[#181411] font-medium rounded-lg hover:bg-[#e6e0db] transition-colors">
                Mark Completed
              </button>
            </div>
            <Link
              href="/orders"
              className="inline-flex px-4 py-2 bg-[#f5f2f0] text-[#181411] font-medium rounded-lg hover:bg-[#e6e0db] transition-colors"
            >
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
