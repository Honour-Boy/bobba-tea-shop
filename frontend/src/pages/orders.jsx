import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer } from "../components";
import { useAuth } from "../context/AuthContext";
import { getOrders } from "../api/orders";

const Orders = () => {
  const { isAuthenticated, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    if (!isAuthenticated) return;
    let active = true;
    setStatus("loading");
    getOrders()
      .then((data) => {
        if (!active) return;
        setOrders(Array.isArray(data) ? data : []);
        setStatus("ready");
      })
      .catch((err) => {
        if (!active) return;
        if (err?.response?.status === 401) logout();
        setStatus("error");
      });
    return () => {
      active = false;
    };
  }, [isAuthenticated, logout]);

  return (
    <div className="min-h-screen bg-white-100 text-[#2b2b2b]">
      <Navbar />

      <section className="mx-auto min-h-[60vh] max-w-3xl px-5 py-14">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-tertiary">
          Your history
        </p>
        <h1 className="mt-3 text-center text-4xl font-extrabold sm:text-5xl">
          Your orders
        </h1>

        {!isAuthenticated ? (
          <div className="mt-12 rounded-3xl border border-tertiary/15 bg-white p-10 text-center shadow-sm">
            <p className="text-[#5b5b5b]">
              Log in to view and keep track of your orders.
            </p>
            <Link
              to="/access"
              className="mt-6 inline-block rounded-full bg-tertiary px-7 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Log in
            </Link>
          </div>
        ) : status === "loading" ? (
          <p className="mt-12 text-center text-[#828282]">Loading your orders…</p>
        ) : status === "error" ? (
          <p className="mt-12 text-center text-[#828282]">
            Sorry, we couldn’t load your orders. Please try again.
          </p>
        ) : orders.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-tertiary/15 bg-white p-10 text-center shadow-sm">
            <p className="text-[#5b5b5b]">You haven’t placed any orders yet.</p>
            <Link
              to="/menu"
              className="mt-6 inline-block rounded-full bg-tertiary px-7 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Browse the menu
            </Link>
          </div>
        ) : (
          <div className="mt-10 flex flex-col gap-5">
            {orders.map((o) => (
              <div
                key={o._id}
                className="rounded-3xl border border-tertiary/15 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-bold">{o.reference}</p>
                    <p className="text-sm text-[#828282]">
                      {new Date(o.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span className="text-xl font-extrabold text-tertiary">
                    ${Number(o.total).toFixed(2)}
                  </span>
                </div>
                <ul className="mt-4 divide-y divide-tertiary/10 border-t border-tertiary/10">
                  {o.items.map((i, idx) => (
                    <li
                      key={`${o._id}-${idx}`}
                      className="flex justify-between py-2 text-sm"
                    >
                      <span>
                        {i.name}{" "}
                        <span className="text-[#828282]">× {i.count}</span>
                      </span>
                      <span className="font-medium">
                        ${(Number(i.price) * i.count).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Orders;
