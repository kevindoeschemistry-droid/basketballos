import { ShoppingBag, ExternalLink } from "lucide-react";

export const metadata = { title: "Spirit Pack Store" };

const mockProducts = [
  { id: 1, name: "Game Jersey — Home White", category: "Required Gear", price: 65, required: true, sizes: ["S", "M", "L", "XL", "XXL"], deadline: "Mar 20" },
  { id: 2, name: "Game Shorts — Blue", category: "Required Gear", price: 40, required: true, sizes: ["S", "M", "L", "XL"], deadline: "Mar 20" },
  { id: 3, name: "Warm-Up Jacket", category: "Practice Gear", price: 55, required: false, sizes: ["S", "M", "L", "XL", "XXL"], deadline: "Mar 17" },
  { id: 4, name: "Practice Jersey — Gray", category: "Practice Gear", price: 25, required: false, sizes: ["S", "M", "L", "XL"], deadline: null },
  { id: 5, name: "Lincoln Lions T-Shirt", category: "Spirit Wear", price: 20, required: false, sizes: ["S", "M", "L", "XL", "XXL"], deadline: null },
  { id: 6, name: "Drawstring Bag", category: "Accessories", price: 15, required: false, sizes: null, deadline: null },
];

export default function StorePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Spirit Pack Store</h1>
        <p className="mt-1 text-muted-foreground">Team gear, spirit wear, and accessories.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockProducts.map((product) => (
          <div key={product.id} className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ShoppingBag className="h-5 w-5" />
              </div>
              {product.required && (
                <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">Required</span>
              )}
            </div>
            <h3 className="mt-3 font-semibold">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <p className="mt-2 text-xl font-bold">${product.price}</p>
            {product.sizes && (
              <div className="mt-2 flex flex-wrap gap-1">
                {product.sizes.map((s) => (
                  <span key={s} className="rounded border border-border px-2 py-0.5 text-xs">{s}</span>
                ))}
              </div>
            )}
            {product.deadline && (
              <p className="mt-2 text-xs font-medium text-amber-700">Order by {product.deadline}</p>
            )}
            <button className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary bg-primary/5 px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/10 transition-colors">
              <ExternalLink className="h-4 w-4" /> Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
