import type React from "react"
import type { Metadata } from "next"
import { Poppins, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SecondHand Pro - Turn Your Items into Cash",
  description: "Sell your second-hand items quickly and easily. Fair prices, instant offers, free pickup.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${plusJakartaSans.variable}`}>
      <body className="font-sans antialiased bg-[#FCF5EB] text-[#2D2D2D]">{children}</body>
    </html>
  )
}
