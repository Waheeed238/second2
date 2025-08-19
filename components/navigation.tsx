"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-[#f5f2f0] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-10 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 text-[#181411]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em]">ReSaleHub</h2>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <Link
                href="/"
                className="text-[#181411] text-sm font-medium leading-normal hover:text-[#f8b782] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/dashboard/sell"
                className="text-[#181411] text-sm font-medium leading-normal hover:text-[#f8b782] transition-colors"
              >
                Sell
              </Link>
              <Link
                href="/orders"
                className="text-[#181411] text-sm font-medium leading-normal hover:text-[#f8b782] transition-colors"
              >
                Orders
              </Link>
              <Link
                href="/products"
                className="text-[#181411] text-sm font-medium leading-normal hover:text-[#f8b782] transition-colors"
              >
                Product
              </Link>
            </div>
            <div className="flex gap-2">
              <Link href="/dashboard/sell">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f8b782] text-[#181411] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#f7a66b] transition-colors">
                  <span className="truncate">Sell Now</span>
                </button>
              </Link>
              <Link href="/auth/sign-up">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f5f2f0] text-[#181411] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#ede8e3] transition-colors">
                  <span className="truncate">Register</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#181411]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#f5f2f0] mt-3">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-[#181411] text-sm font-medium leading-normal hover:text-[#f8b782] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/dashboard/sell"
                className="text-[#181411] text-sm font-medium leading-normal hover:text-[#f8b782] transition-colors"
              >
                Sell
              </Link>
              <Link
                href="/orders"
                className="text-[#181411] text-sm font-medium leading-normal hover:text-[#f8b782] transition-colors"
              >
                Orders
              </Link>
              <Link
                href="/products"
                className="text-[#181411] text-sm font-medium leading-normal hover:text-[#f8b782] transition-colors"
              >
                Product
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Link href="/sell">
                  <button className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-[#f8b782] text-[#181411] text-sm font-bold leading-normal tracking-[0.015em]">
                    Sell Now
                  </button>
                </Link>
                <Link href="/auth/sign-up">
                  <button className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-[#f5f2f0] text-[#181411] text-sm font-bold leading-normal tracking-[0.015em]">
                    Register
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
