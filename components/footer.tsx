import { Twitter, Instagram, Facebook } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="flex justify-center bg-white">
      <div className="flex max-w-[960px] flex-1 flex-col">
        <footer className="flex flex-col gap-6 px-5 py-10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:flex-row sm:justify-around">
            <Link
              href="/about"
              className="text-[#8a7360] text-base font-normal leading-normal min-w-40 hover:text-[#181411] transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-[#8a7360] text-base font-normal leading-normal min-w-40 hover:text-[#181411] transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/terms"
              className="text-[#8a7360] text-base font-normal leading-normal min-w-40 hover:text-[#181411] transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-[#8a7360] text-base font-normal leading-normal min-w-40 hover:text-[#181411] transition-colors"
            >
              Privacy Policy
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#" className="text-[#8a7360] hover:text-[#181411] transition-colors">
              <Twitter size={24} />
            </Link>
            <Link href="#" className="text-[#8a7360] hover:text-[#181411] transition-colors">
              <Instagram size={24} />
            </Link>
            <Link href="#" className="text-[#8a7360] hover:text-[#181411] transition-colors">
              <Facebook size={24} />
            </Link>
          </div>

          <p className="text-[#8a7360] text-base font-normal leading-normal">@2024 ReSaleHub. All rights reserved.</p>
        </footer>
      </div>
    </footer>
  )
}
