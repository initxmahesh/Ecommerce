import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "../hooks/useAuth.js";
import { CartContext } from "./cartContext.js";

function storageKey(userId, bag) {
  return `cartify.${bag}.${userId}`;
}

function readBag(userId, bag) {
  if (!userId || typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(storageKey(userId, bag));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeBag(userId, bag, items) {
  if (!userId || typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey(userId, bag), JSON.stringify(items));
  } catch {
    // Ignore quota / private mode failures
  }
}

function toCartItem(product, quantity = 1) {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    image: product.image ?? product.gallery?.[0],
    price: product.price,
    quantity: Math.max(1, Number(quantity) || 1),
  };
}

function toWishlistItem(product) {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    image: product.image ?? product.gallery?.[0],
    price: product.price,
  };
}

export function CartProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const userId = user?.id ?? null;

  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);

    if (!isAuthenticated || !userId) {
      setCartItems([]);
      setWishlistItems([]);
      return;
    }

    setCartItems(readBag(userId, "cart"));
    setWishlistItems(readBag(userId, "wishlist"));
    setReady(true);
  }, [isAuthenticated, userId]);

  useEffect(() => {
    if (!ready || !userId) return;
    writeBag(userId, "cart", cartItems);
  }, [ready, userId, cartItems]);

  useEffect(() => {
    if (!ready || !userId) return;
    writeBag(userId, "wishlist", wishlistItems);
  }, [ready, userId, wishlistItems]);

  const addToCart = useCallback(
    (product, quantity = 1) => {
      if (!isAuthenticated) return false;
      setCartItems((current) => {
        const existing = current.find((item) => item.id === product.id);
        if (existing) {
          return current.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + Math.max(1, Number(quantity) || 1),
                }
              : item,
          );
        }
        return [...current, toCartItem(product, quantity)];
      });
      return true;
    },
    [isAuthenticated],
  );

  const updateCartQuantity = useCallback((id, quantity) => {
    setCartItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
      ),
    );
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const toggleWishlist = useCallback(
    (product) => {
      if (!isAuthenticated) return false;
      const exists = wishlistItems.some((item) => item.id === product.id);
      setWishlistItems((current) => {
        if (exists) {
          return current.filter((item) => item.id !== product.id);
        }
        return [...current, toWishlistItem(product)];
      });
      return !exists;
    },
    [isAuthenticated, wishlistItems],
  );

  const removeFromWishlist = useCallback((id) => {
    setWishlistItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const moveWishlistToCart = useCallback((item) => {
    setCartItems((current) => {
      const existing = current.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return current.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
    setWishlistItems((current) =>
      current.filter((wishlistItem) => wishlistItem.id !== item.id),
    );
  }, []);

  const isInWishlist = useCallback(
    (productId) => wishlistItems.some((item) => item.id === productId),
    [wishlistItems],
  );

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const value = useMemo(
    () => ({
      cartItems,
      wishlistItems,
      cartCount,
      wishlistCount: wishlistItems.length,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      toggleWishlist,
      removeFromWishlist,
      moveWishlistToCart,
      isInWishlist,
    }),
    [
      cartItems,
      wishlistItems,
      cartCount,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      toggleWishlist,
      removeFromWishlist,
      moveWishlistToCart,
      isInWishlist,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
