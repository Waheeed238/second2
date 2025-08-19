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

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
      {products.map((product) => (
        <div key={product.id} className="flex flex-col gap-3 pb-3">
          <div
            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg bg-gray-200"
            style={{
              backgroundImage:
                product.photos && product.photos.length > 0
                  ? `url("${product.photos[0]}")`
                  : `url("/placeholder.svg?height=200&width=200")`,
            }}
          />
          <div>
            <p className="text-[#181411] text-base font-medium leading-normal line-clamp-2">{product.title}</p>
            <p className="text-[#8a7360] text-sm font-normal leading-normal">
              ₹{product.estimated_price?.toLocaleString() || "N/A"}
            </p>
          </div>
        </div>
      ))}

      {products.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-[#8a7360] text-lg">No products available at the moment.</p>
        </div>
      )}
    </div>
  )
}
