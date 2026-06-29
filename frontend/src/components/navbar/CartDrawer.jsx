import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import SlideDrawer from "./SlideDrawer.jsx";

const CartDrawer = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  return (
    <SlideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={`Your Cart (${itemCount})`}
      ariaLabel="Shopping cart"
      footer={
        items.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600">Subtotal</span>
              <span className="text-lg font-bold text-neutral-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-neutral-500">
              Shipping and taxes calculated at checkout.
            </p>
            <button
              type="button"
              className="h-11 w-full rounded-xl bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Proceed to Checkout
            </button>
            <Link
              to="/products"
              onClick={onClose}
              className="block text-center text-sm font-medium text-primary hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        ) : null
      }
    >
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
            <ShoppingBag className="h-8 w-8 text-neutral-400" strokeWidth={1.5} />
          </div>
          <p className="mt-4 text-base font-medium text-neutral-800">
            Your cart is empty
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            Add items to get started
          </p>
          <Link
            to="/products"
            onClick={onClose}
            className="mt-6 inline-flex h-10 items-center rounded-xl bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Browse Products
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
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${item.name} from cart`}
                    onClick={() => onRemove(item.id)}
                    className="shrink-0 rounded p-1 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={2} />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex items-center rounded-lg border border-neutral-200">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() =>
                        onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="flex h-8 w-8 items-center justify-center text-neutral-600 hover:bg-neutral-50"
                    >
                      <Minus className="h-3.5 w-3.5" strokeWidth={2} />
                    </button>
                    <span className="flex h-8 w-8 items-center justify-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center text-neutral-600 hover:bg-neutral-50"
                    >
                      <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                    </button>
                  </div>
                  <span className="text-sm font-semibold text-neutral-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </SlideDrawer>
  );
};

export default CartDrawer;
