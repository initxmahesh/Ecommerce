import { FavouriteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import SlideDrawer from "./SlideDrawer.jsx";

const WishlistDrawer = ({ isOpen, onClose, items, onRemove, onMoveToCart }) => (
  <SlideDrawer
    isOpen={isOpen}
    onClose={onClose}
    title={`Wishlist (${items.length})`}
    ariaLabel="Wishlist"
    footer={
      items.length > 0 ? (
        <Link
          to="/products"
          onClick={onClose}
          className="flex h-10 w-full items-center justify-center rounded-xl border border-neutral-200 text-sm font-medium text-neutral-700 transition-colors hover:bg-white"
        >
          Discover More Products
        </Link>
      ) : null
    }
  >
    {items.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <HugeiconsIcon
          icon={FavouriteIcon}
          size={40}
          className="text-neutral-300"
          strokeWidth={1.5}
        />
        <p className="mt-4 text-base font-medium text-neutral-800">
          Your wishlist is empty
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          Save items you love for later
        </p>
        <Link
          to="/new-arrivals"
          onClick={onClose}
          className="mt-6 inline-flex h-10 items-center rounded-xl bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        >
          Explore New Arrivals
        </Link>
      </div>
    ) : (
      <ul className="divide-y divide-neutral-100">
        {items.map((item) => (
          <li key={item.id} className="flex gap-3 py-4 first:pt-0">
            <img
              src={item.image}
              alt={item.name}
              className="h-20 w-20 shrink-0 rounded-lg border border-neutral-100 object-contain p-1"
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-neutral-800">
                    {item.name}
                  </p>
                  <p className="text-xs text-neutral-500">{item.category}</p>
                  <p className="mt-1 text-sm font-semibold text-primary">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`Remove ${item.name} from wishlist`}
                  onClick={() => onRemove(item.id)}
                  className="shrink-0 rounded p-1 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => onMoveToCart(item)}
                className="mt-3 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-neutral-900 px-3 text-xs font-medium text-white transition-colors hover:bg-neutral-800 sm:text-sm"
              >
                <ShoppingCart className="h-3.5 w-3.5" strokeWidth={2} />
                Move to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </SlideDrawer>
);

export default WishlistDrawer;
