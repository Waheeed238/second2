"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import ProductGrid from "./product-grid"

interface Product {
  id: string
  title: string
  estimated_price: number
  photos: string[]
  categories: {
    id: string
    name: string
  }
}

interface Category {
  id: string
  name: string
}

interface ProductsClientProps {
  products: Product[]
  categories: Category[]
}

export default function ProductsClient({ products, categories }: ProductsClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || product.categories.name === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [products, searchTerm, selectedCategory])

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#181411] tracking-light text-[32px] font-bold leading-tight min-w-72">Products</p>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-3">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div className="text-[#8a7360] flex border-none bg-[#f5f2f0] items-center justify-center pl-4 rounded-l-lg border-r-0">
                <Search className="h-6 w-6" />
              </div>
              <input
                placeholder="Search for products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#181411] focus:outline-0 focus:ring-0 border-none bg-[#f5f2f0] focus:border-none h-full placeholder:text-[#8a7360] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              />
            </div>
          </label>
        </div>

        {/* Category Filters */}
        <div className="flex gap-3 p-3 flex-wrap pr-4">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 transition-colors ${
              selectedCategory === "All"
                ? "bg-[#f8b782] text-white"
                : "bg-[#f5f2f0] text-[#181411] hover:bg-[#f8b782] hover:text-white"
            }`}
          >
            <p className="text-sm font-medium leading-normal">All</p>
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 transition-colors ${
                selectedCategory === category.name
                  ? "bg-[#f8b782] text-white"
                  : "bg-[#f5f2f0] text-[#181411] hover:bg-[#f8b782] hover:text-white"
              }`}
            >
              <p className="text-sm font-medium leading-normal">{category.name}</p>
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} />

        {/* Pagination */}
        <div className="flex items-center justify-center p-4">
          <a href="#" className="flex size-10 items-center justify-center">
            <div className="text-[#181411]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
              </svg>
            </div>
          </a>
          <a
            className="text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-[#181411] rounded-full bg-[#f5f2f0]"
            href="#"
          >
            1
          </a>
          <a
            className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#181411] rounded-full"
            href="#"
          >
            2
          </a>
          <a
            className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#181411] rounded-full"
            href="#"
          >
            3
          </a>
          <a
            className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#181411] rounded-full"
            href="#"
          >
            4
          </a>
          <a
            className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#181411] rounded-full"
            href="#"
          >
            5
          </a>
          <a href="#" className="flex size-10 items-center justify-center">
            <div className="text-[#181411]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
