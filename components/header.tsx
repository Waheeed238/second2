"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { isSupabaseConfigured } from "@/lib/supabase/client"
import { signOut } from "@/lib/actions"

interface User {
  id: string
  email?: string
  user_metadata?: {
    avatar_url?: string
    full_name?: string
  }
}

export default function Header() {
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // If Supabase is not configured, set defaults and return early
    if (!isSupabaseConfigured) {
      setUser(null)
      setLoading(false)
      return
    }

    // Get initial session
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user || null)
      setLoading(false)
    }

    getSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true
    if (href !== "/" && pathname.startsWith(href)) return true
    return false
  }

  const getLinkClasses = (href: string) => {
    const baseClasses = "text-sm font-medium leading-normal transition-colors"
    const activeClasses = "text-[#f8b782] font-bold"
    const inactiveClasses = "text-[#181411] hover:text-[#f8b782]"

    return `${baseClasses} ${isActive(href) ? activeClasses : inactiveClasses}`
  }

  const handleSignOut = async () => {
    await signOut()
  }

  if (loading) {
    return (
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f5f2f0] px-10 py-3">
        <div className="flex items-center gap-4 text-[#181411]">
          <div className="size-4">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em]">ReSaleHub</h2>
        </div>
        <div className="flex flex-1 justify-end">
          <div className="animate-pulse bg-gray-200 h-10 w-20 rounded-lg"></div>
        </div>
      </header>
    )
  }

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f5f2f0] px-10 py-3">
      <div className="flex items-center gap-4 text-[#181411]">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em]">ReSaleHub</h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <Link className={getLinkClasses("/")} href="/">
            Home
          </Link>
          <Link className={getLinkClasses("/sell")} href="/sell">
            Sell
          </Link>
          <Link className={getLinkClasses("/orders")} href="/orders">
            Orders
          </Link>
          <Link className={getLinkClasses("/products")} href="/products">
            Product
          </Link>
        </div>
        <div className="flex gap-2">
          <Link
            href="/sell"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f8b782] text-[#181411] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#f6b070] transition-colors"
          >
            <span className="truncate">Sell Now</span>
          </Link>
          {user ? (
            <>
              <button
                onClick={handleSignOut}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f5f2f0] text-[#181411] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#ede8e3] transition-colors"
              >
                <span className="truncate">Sign Out</span>
              </button>
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 cursor-pointer"
                style={{
                  backgroundImage: user.user_metadata?.avatar_url
                    ? `url("${user.user_metadata.avatar_url}")`
                    : `url("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face")`,
                }}
                title={user.email || "User Profile"}
              />
            </>
          ) : (
            <Link
              href="/auth/sign-up"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f5f2f0] text-[#181411] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#ede8e3] transition-colors"
            >
              <span className="truncate">Register</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
