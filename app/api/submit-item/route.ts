import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Insert into orders table
    const { data, error } = await supabaseAdmin
      .from("orders")
      .insert([
        {
          seller_name: formData.fullName,
          seller_phone: formData.phoneNumber,
          country_code: formData.countryCode,
          item_name: formData.itemName,
          description: formData.description,
          category: formData.category,
          price: Number.parseFloat(formData.price),
          location: formData.location,
          images: formData.images || [],
          status: "submitted",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to submit item" }, { status: 500 })
    }

    return NextResponse.json({ success: true, order: data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
