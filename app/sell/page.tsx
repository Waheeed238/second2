import Navigation from "@/components/navigation"
import SellForm from "@/components/sell-form"

export default function SellPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="px-4 sm:px-10 lg:px-40 flex flex-1 justify-center py-5">
        <div className="w-full max-w-[512px] py-5">
          <SellForm />
        </div>
      </div>
    </div>
  )
}
