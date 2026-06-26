import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar, Footer } from "../components";
import { useAuth } from "../context/AuthContext";
import { readLastOrder } from "../api/orders";

const Receipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [shareMsg, setShareMsg] = useState("");

  const order = useMemo(
    () => location.state?.order || readLastOrder(),
    [location.state]
  );

  if (!order) {
    return (
      <div className="min-h-screen bg-white-100 text-[#2b2b2b]">
        <Navbar />
        <div className="mx-auto flex max-w-md flex-col items-center px-5 py-28 text-center">
          <h1 className="text-2xl font-bold">No recent order</h1>
          <p className="mt-2 text-[#5b5b5b]">
            Place an order and your receipt will show up here.
          </p>
          <Link
            to="/menu"
            className="mt-8 rounded-full bg-tertiary px-7 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Browse the menu
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const dateStr = new Date(order.date || Date.now()).toLocaleString();

  const share = async () => {
    const text = `I just ordered from Bobba 🧋 — order ${order.reference}, $${order.total.toFixed(
      2
    )}.`;
    const url = window.location.origin;
    if (navigator.share) {
      try {
        await navigator.share({ title: "My Bobba order", text, url });
      } catch {
        /* user dismissed the share sheet */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      setShareMsg("Copied to clipboard!");
      setTimeout(() => setShareMsg(""), 2500);
    } catch {
      setShareMsg("Sharing isn't available on this device.");
      setTimeout(() => setShareMsg(""), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-white-100 text-[#2b2b2b]">
      <Navbar />

      <section className="mx-auto max-w-lg px-5 py-16">
        <div className="rounded-3xl border border-tertiary/15 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-tertiary/10">
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f65151"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h1 className="mt-4 text-2xl font-extrabold">Payment confirmed</h1>
            <p className="mt-1 text-[#5b5b5b]">
              Thanks for your order — it’ll be shaken fresh.
            </p>
          </div>

          <div className="mt-6 flex justify-between border-y border-tertiary/10 py-4 text-sm">
            <div>
              <p className="text-[#828282]">Reference</p>
              <p className="font-semibold">{order.reference}</p>
            </div>
            <div className="text-right">
              <p className="text-[#828282]">Date</p>
              <p className="font-semibold">{dateStr}</p>
            </div>
          </div>

          <ul className="mt-4 divide-y divide-tertiary/10">
            {order.items.map((i) => (
              <li key={i.name} className="flex justify-between py-3">
                <span>
                  {i.name}{" "}
                  <span className="text-[#828282]">× {i.count}</span>
                </span>
                <span className="font-semibold">
                  ${(i.price * i.count).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-2 flex justify-between border-t border-tertiary/10 pt-4">
            <span className="text-lg font-bold">Total paid</span>
            <span className="text-2xl font-extrabold text-tertiary">
              ${order.total.toFixed(2)}
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/")}
                className="flex-1 rounded-full border-2 border-tertiary py-2.5 font-semibold text-tertiary transition hover:bg-tertiary/5"
              >
                Return home
              </button>
              <button
                onClick={share}
                className="flex-1 rounded-full border-2 border-tertiary py-2.5 font-semibold text-tertiary transition hover:bg-tertiary/5"
              >
                Share
              </button>
            </div>

            {isAuthenticated ? (
              <button
                onClick={() => navigate("/orders")}
                className="w-full rounded-full bg-tertiary py-3 font-semibold text-white transition hover:opacity-90"
              >
                View my orders
              </button>
            ) : (
              <button
                onClick={() => navigate("/access")}
                className="w-full rounded-full bg-tertiary py-3 font-semibold text-white transition hover:opacity-90"
              >
                Log in to save this order
              </button>
            )}

            {shareMsg && (
              <p className="text-center text-sm text-tertiary">{shareMsg}</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Receipt;
