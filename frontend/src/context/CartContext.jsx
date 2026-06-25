import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useAuth } from "./AuthContext";
import * as cartApi from "../api/cart";

const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

const STORAGE_KEY = "bobba_cart";

function readLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const { isAuthenticated, logout } = useAuth();
  // The cart works for everyone. Guests keep it in localStorage; signed-in
  // users additionally have it saved to their account on the backend.
  const [items, setItems] = useState(readLocal);
  const [syncing, setSyncing] = useState(false);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  // Always mirror the cart to localStorage so it survives refreshes.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore quota / private-mode errors */
    }
  }, [items]);

  // On login: if there's a guest cart, save it to the account; otherwise pull
  // the account's saved cart down. (Idempotent, so StrictMode-safe.)
  useEffect(() => {
    if (!isAuthenticated) return;
    let active = true;
    (async () => {
      try {
        const local = itemsRef.current;
        if (local.length > 0) {
          await cartApi.updateCart(local);
        } else {
          const cart = await cartApi.getCart();
          const remote = (cart?.flavours ?? []).map((f) => ({
            name: f.name,
            count: f.count,
          }));
          if (active) setItems(remote);
        }
      } catch (err) {
        if (err?.response?.status === 401) logout();
      }
    })();
    return () => {
      active = false;
    };
  }, [isAuthenticated, logout]);

  const persistRemote = useCallback(
    async (next) => {
      if (!isAuthenticated) return;
      setSyncing(true);
      try {
        await cartApi.updateCart(next);
      } catch (err) {
        if (err?.response?.status === 401) logout();
      } finally {
        setSyncing(false);
      }
    },
    [isAuthenticated, logout]
  );

  // Compute next state from a ref so one click is one increment (StrictMode
  // double-invokes set-state updaters in dev).
  const addItem = useCallback(
    (name) => {
      const prev = itemsRef.current;
      const existing = prev.find((i) => i.name === name);
      const next = existing
        ? prev.map((i) => (i.name === name ? { ...i, count: i.count + 1 } : i))
        : [...prev, { name, count: 1 }];
      setItems(next);
      persistRemote(next);
    },
    [persistRemote]
  );

  const removeItem = useCallback(
    (name) => {
      const next = itemsRef.current.filter((i) => i.name !== name);
      setItems(next);
      persistRemote(next);
    },
    [persistRemote]
  );

  const clear = useCallback(() => {
    setItems([]);
    persistRemote([]);
  }, [persistRemote]);

  const totalCount = items.reduce((sum, i) => sum + i.count, 0);

  return (
    <CartContext.Provider
      value={{ items, totalCount, addItem, removeItem, clear, syncing }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
