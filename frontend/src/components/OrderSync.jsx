import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  createOrder,
  readLastOrder,
  LAST_ORDER_KEY,
  PENDING_ORDER_KEY,
} from "../api/orders";

// When a guest who placed an order logs in, persist that order to their
// account. Renders nothing.
const OrderSync = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;
    const raw = localStorage.getItem(PENDING_ORDER_KEY);
    if (!raw) return;

    let pending;
    try {
      pending = JSON.parse(raw);
    } catch {
      localStorage.removeItem(PENDING_ORDER_KEY);
      return;
    }

    createOrder({ items: pending.items, total: pending.total })
      .then((saved) => {
        localStorage.removeItem(PENDING_ORDER_KEY);
        // Mark the receipt's stored order as saved so it reflects correctly.
        const last = readLastOrder();
        if (last && last.reference === pending.reference) {
          localStorage.setItem(
            LAST_ORDER_KEY,
            JSON.stringify({ ...last, saved: true, _id: saved?._id })
          );
        }
      })
      .catch(() => {
        /* leave the pending order to retry on the next login */
      });
  }, [isAuthenticated]);

  return null;
};

export default OrderSync;
