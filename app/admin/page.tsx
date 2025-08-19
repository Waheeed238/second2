import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminDashboard from "@/components/admin-dashboard"

export default async function AdminPage() {
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

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

  if (!profile?.is_admin) {
    redirect("/dashboard")
  }

  // Get all items with user details
  const { data: items } = await supabase
    .from("items")
    .select(`
      *,
      categories (
        name
      ),
      profiles (
        full_name,
        email,
        phone,
        address
      )
    `)
    .order("created_at", { ascending: false })

  // Get all orders with item and user details
  const { data: orders } = await supabase
    .from("orders")
    .select(`
      *,
      items (
        title,
        condition,
        categories (
          name
        )
      ),
      profiles (
        full_name,
        email,
        phone
      )
    `)
    .order("created_at", { ascending: false })

  return <AdminDashboard items={items || []} orders={orders || []} />
}
