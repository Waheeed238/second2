import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import SellItemForm from "@/components/sell-item-form"

export default async function SellItemPage() {
  // If Supabase is not configured, show setup message
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Connect Supabase to get started</h1>
      </div>
    )
  }

  // Get the user from the server
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If no user, redirect to login
  if (!user) {
    redirect("/auth/login")
  }

  // Get categories and pincodes
  const [{ data: categories }, { data: pincodes }] = await Promise.all([
    supabase.from("categories").select("*").eq("is_active", true).order("name"),
    supabase.from("pincodes").select("*").eq("is_active", true).order("pincode"),
  ])

  return <SellItemForm categories={categories || []} pincodes={pincodes || []} />
}
