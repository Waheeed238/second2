import { supabaseAdmin } from "@/lib/supabase/server"
import Navigation from "@/components/navigation"
import ProductsClient from "@/components/products-client"

async function getProducts() {
  const { data: items, error } = await supabaseAdmin
    .from("items")
    .select(`
      *,
      categories (
        id,
        name
      )
    `)
    .eq("status", "approved")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return items || []
}

async function getCategories() {
  const { data: categories, error } = await supabaseAdmin
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("name")

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return categories || []
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()])

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      <Navigation />
      <ProductsClient products={products} categories={categories} />
    </div>
  )
}
