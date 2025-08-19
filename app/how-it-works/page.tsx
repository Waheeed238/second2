import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Upload, Search, CheckCircle, Truck, CreditCard, Clock, Shield, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-green-100 text-green-800 mb-6">
            <Package className="h-4 w-4 mr-2" />
            Simple Process
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">How It Works</h1>
          <p className="text-xl text-gray-600 mb-8">
            Selling your items is simple and straightforward. Follow these easy steps to get instant cash.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {[
              {
                step: "01",
                icon: Upload,
                title: "Submit Your Item",
                description:
                  "Create an account and submit details about your item including photos, condition, and expected price.",
                details: [
                  "Upload clear photos from multiple angles",
                  "Provide detailed description and condition",
                  "Set your expected price range",
                  "Enter pickup address and pincode",
                ],
                color: "from-blue-500 to-blue-600",
              },
              {
                step: "02",
                icon: Search,
                title: "Expert Review",
                description:
                  "Our team of experts reviews your item and provides a fair market price based on current demand.",
                details: [
                  "Professional evaluation within 24 hours",
                  "Market research for accurate pricing",
                  "Condition assessment based on photos",
                  "Transparent pricing with no hidden fees",
                ],
                color: "from-green-500 to-green-600",
              },
              {
                step: "03",
                icon: CheckCircle,
                title: "Accept Offer",
                description:
                  "Review our offer and accept if you're satisfied. You can also negotiate or decline if needed.",
                details: [
                  "Detailed breakdown of our offer",
                  "Option to negotiate the price",
                  "No obligation to accept",
                  "Instant notification of approval",
                ],
                color: "from-purple-500 to-purple-600",
              },
              {
                step: "04",
                icon: Truck,
                title: "Free Pickup",
                description:
                  "Schedule a convenient time for our team to collect your item from your doorstep at no extra cost.",
                details: [
                  "Flexible pickup scheduling",
                  "Professional and courteous team",
                  "Free pickup service across all areas",
                  "Real-time tracking of pickup status",
                ],
                color: "from-orange-500 to-orange-600",
              },
              {
                step: "05",
                icon: CreditCard,
                title: "Get Paid Instantly",
                description:
                  "Receive payment immediately after our team verifies the item condition matches your description.",
                details: [
                  "Instant payment upon verification",
                  "Multiple payment options available",
                  "Secure and encrypted transactions",
                  "Payment confirmation via SMS/email",
                ],
                color: "from-green-500 to-blue-500",
              },
            ].map((step, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row gap-8 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`bg-gradient-to-r ${step.color} text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center`}
                    >
                      {step.step}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{step.title}</h2>
                      <p className="text-lg text-gray-600 mt-2">{step.description}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <Card className="bg-gradient-to-br from-gray-50 to-white shadow-xl">
                    <CardContent className="p-12 text-center">
                      <div
                        className={`bg-gradient-to-r ${step.color} p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center`}
                      >
                        <step.icon className="h-12 w-12 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Step {step.step}</h3>
                      <p className="text-gray-600">{step.title}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Process</h2>
            <p className="text-xl text-gray-600">
              We've designed our process to be simple, transparent, and beneficial for you
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Quick & Efficient",
                description: "Get quotes within 24 hours and complete the entire process in just a few days",
              },
              {
                icon: Shield,
                title: "Safe & Secure",
                description: "All transactions are protected with secure payment methods and verified processes",
              },
              {
                icon: Star,
                title: "Fair Pricing",
                description: "Our experts ensure you get the best possible price for your items based on market value",
              },
            ].map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="bg-gradient-to-br from-green-100 to-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <benefit.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of satisfied customers who have successfully sold their items with us
          </p>
          <Link href="/auth/sign-up">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6">
              Start Selling Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
