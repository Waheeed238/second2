import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import AreaCoverageClient from "@/components/area-coverage-client"

export default async function AreaCoveragePage() {
  let pincodes: any[] = []

  if (isSupabaseConfigured) {
    const supabase = createClient()
    const { data } = await supabase.from("pincodes").select("*").eq("is_active", true).order("city").order("pincode")

    pincodes = data || []
  }

  // Group pincodes by city
  const pincodesByCity = pincodes.reduce(
    (acc, pincode) => {
      if (!acc[pincode.city]) {
        acc[pincode.city] = []
      }
      acc[pincode.city].push(pincode)
      return acc
    },
    {} as Record<string, any[]>,
  )

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-green-100 text-green-800 mb-6">
            <MapPin className="h-4 w-4 mr-2" />
            Service Coverage
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Service Areas</h1>
          <p className="text-xl text-gray-600 mb-8">
            We provide pickup services across major cities in India. Check if we serve your area.
          </p>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AreaCoverageClient pincodesByCity={pincodesByCity} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
