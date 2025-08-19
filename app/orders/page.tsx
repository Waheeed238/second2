import { createClient } from "@/lib/supabase/server"
'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import Navigation from "@/components/navigation"
import Link from "next/link"

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      try {
        const { data: orders, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false })
        
        if (error) {
          console.error("Error fetching orders:", error)
          setOrders([])
        } else {
          setOrders(orders || [])
        }
      } catch (error) {
        console.error("Error fetching orders:", error)
        setOrders([])
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const getStatusColors = (status: string) => {
    switch (status.toLowerCase()) {
      case "submitted":
        return "bg-blue-100 text-blue-800"
      case "under_review":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-[#f5f2f0] text-[#181411]"
    }
  }

  const formatStatus = (status: string) => {
    return status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      <Navigation />

      <div className="px-4 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
        <div className="flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-[#181411] tracking-light text-[32px] font-bold leading-tight min-w-72">Orders</p>
          </div>

          {loading ? (
            <div className="px-4 py-3 text-center">
              <p className="text-[#8a7360]">Loading orders...</p>
            </div>
          ) : (
          <div className="px-4 py-3 @container">
            <div className="flex overflow-hidden rounded-lg border border-[#e6e0db] bg-white">
              <table className="flex-1">
                <thead>
                  <tr className="bg-white">
                    <th className="orders-table-column-120 px-4 py-3 text-left text-[#181411] w-[400px] text-sm font-medium leading-normal">
                      Order ID
                    </th>
                    <th className="orders-table-column-240 px-4 py-3 text-left text-[#181411] w-[400px] text-sm font-medium leading-normal">
                      Date
                    </th>
                    <th className="orders-table-column-360 px-4 py-3 text-left text-[#181411] w-60 text-sm font-medium leading-normal">
                      Status
                    </th>
                    <th className="orders-table-column-480 px-4 py-3 text-left text-[#181411] w-[400px] text-sm font-medium leading-normal">
                      Total
                    </th>
                    <th className="orders-table-column-600 px-4 py-3 text-left text-[#8a7360] w-60 text-sm font-medium leading-normal">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="h-[72px] px-4 py-2 text-center text-[#8a7360] text-sm">
                        No orders found
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="border-t border-t-[#e6e0db]">
                        <td className="orders-table-column-120 h-[72px] px-4 py-2 w-[400px] text-[#181411] text-sm font-normal leading-normal">
                          {order.order_id}
                        </td>
                        <td className="orders-table-column-240 h-[72px] px-4 py-2 w-[400px] text-[#8a7360] text-sm font-normal leading-normal">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="orders-table-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                          <button
                            className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 text-sm font-medium leading-normal w-full ${getStatusColors(order.status)}`}
                          >
                            <span className="truncate">{formatStatus(order.status)}</span>
                          </button>
                        </td>
                        <td className="orders-table-column-480 h-[72px] px-4 py-2 w-[400px] text-[#8a7360] text-sm font-normal leading-normal">
                          ₹{order.price?.toLocaleString() || "N/A"}
                        </td>
                        <td className="orders-table-column-600 h-[72px] px-4 py-2 w-60 text-[#8a7360] text-sm font-bold leading-normal tracking-[0.015em] cursor-pointer hover:text-[#181411] transition-colors">
                          <Link href={`/orders/${order.id}`}>View Details</Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @container(max-width:120px){.orders-table-column-120{display: none;}}
        @container(max-width:240px){.orders-table-column-240{display: none;}}
        @container(max-width:360px){.orders-table-column-360{display: none;}}
        @container(max-width:480px){.orders-table-column-480{display: none;}}
        @container(max-width:600px){.orders-table-column-600{display: none;}}
      `}</style>
    </div>
  )
}
