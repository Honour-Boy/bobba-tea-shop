import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Footer } from "../components";
import { Alert } from "./mainComponent";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { flavor1, flavor2, flavor3, flavor4 } from "../assets";

const menu = [
  {
    id: 1,
    src: flavor1,
    name: "Tropical Kiwi",
    tag: "Bestseller",
    price: 6.5,
    desc: "Sweet raspberry syrup over ice with your choice of milk or tea and chewy tapioca pearls.",
  },
  {
    id: 2,
    src: flavor2,
    name: "Kiwi Paradise",
    tag: "Fruity",
    price: 6.0,
    desc: "Tangy kiwi meets creamy milk tea for a refreshing taste of the tropics in every sip.",
  },
  {
    id: 3,
    src: flavor3,
    name: "Citrus Splash",
    tag: "Zesty",
    price: 6.0,
    desc: "Bright orange and zesty lemon blended with tea for a burst of citrusy goodness.",
  },
  {
    id: 4,
    src: flavor4,
    name: "Berry Splash",
    tag: "New",
    price: 7.0,
    desc: "Sweet blueberries and mixed berries shaken into a satisfying, flavour-packed boba.",
  },
];

const priceOf = (name) => menu.find((m) => m.name === name)?.price ?? 0;

const Menu = () => {
  const [msg, setMsg] = useState({ value: "", show: false });
  const [checkout, setCheckout] = useState({ show: false, guest: false });
  const { isAuthenticated } = useAuth();
  const { items, addItem, removeItem, totalCount, clear } = useCart();
  const navigate = useNavigate();

  const total = items.reduce((sum, i) => sum + priceOf(i.name) * i.count, 0);

  const addToCart = (item) => {
    addItem(item.name);
    setMsg({ value: `${item.name} added to your cart!`, show: true });
  };

  const placeOrder = () => {
    if (items.length === 0) return;
    const guest = !isAuthenticated;
    clear();
    setCheckout({ show: true, guest });
  };

  const overlay = msg.show || checkout.show;

  return (
    <div className="min-h-screen bg-white-100 text-[#2b2b2b]">
      <div className={overlay ? "brightness-50 pointer-events-none" : ""}>
        <Navbar />

        <section className="mx-auto max-w-6xl px-5 pb-6 pt-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-tertiary">
            Freshly Shaken
          </p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Our Menu</h1>
          <p className="mx-auto mt-4 max-w-md text-[#5b5b5b]">
            Pick your favourite, choose your sweetness, and we will shake it to
            order — no account needed.
          </p>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-12 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {menu.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col rounded-3xl border border-tertiary/15 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative flex h-48 items-center justify-center rounded-2xl bg-tertiary/5">
                <span className="absolute left-3 top-3 rounded-full bg-tertiary px-3 py-1 text-xs font-semibold text-white">
                  {item.tag}
                </span>
                <img
                  src={item.src}
                  alt={item.name}
                  className="h-40 transition duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-5 text-lg font-bold">{item.name}</h3>
              <p className="mt-2 flex-1 text-sm text-[#5b5b5b]">{item.desc}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-xl font-extrabold text-tertiary">
                  ${item.price.toFixed(2)}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  className="rounded-full bg-tertiary px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Cart summary */}
        {items.length > 0 && (
          <section className="mx-auto max-w-2xl px-5 pb-20">
            <div className="rounded-3xl border border-tertiary/15 bg-white p-7 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Your order</h2>
                <span className="text-sm text-[#828282]">
                  {totalCount} item{totalCount > 1 ? "s" : ""}
                </span>
              </div>
              <ul className="mt-5 divide-y divide-tertiary/10">
                {items.map((i) => (
                  <li
                    key={i.name}
                    className="flex items-center justify-between py-3"
                  >
                    <div>
                      <p className="font-medium">{i.name}</p>
                      <p className="text-sm text-[#828282]">
                        {i.count} × ${priceOf(i.name).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold">
                        ${(priceOf(i.name) * i.count).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(i.name)}
                        className="text-sm text-tertiary hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center justify-between border-t border-tertiary/10 pt-5">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-extrabold text-tertiary">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button
                onClick={placeOrder}
                className="mt-6 w-full rounded-full bg-tertiary py-3 font-semibold text-white transition hover:opacity-90"
              >
                Checkout
              </button>
              {!isAuthenticated && (
                <p className="mt-3 text-center text-xs text-[#828282]">
                  Checking out as a guest. You can save your order after.
                </p>
              )}
            </div>
          </section>
        )}

        <Footer />
      </div>

      <Alert msg={msg} setMsg={setMsg} />

      {/* Post-checkout confirmation (with optional sign-in to save the order) */}
      {checkout.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-5 pointer-events-none">
          <div className="pointer-events-auto w-full max-w-sm rounded-2xl bg-white-100 p-7 text-center shadow-2xl">
            <p className="text-4xl">🎉</p>
            <h2 className="mt-2 text-2xl font-bold">Order placed!</h2>
            <p className="mt-2 text-[#5b5b5b]">
              Thanks for your order — it’ll be shaken fresh.
            </p>
            {checkout.guest ? (
              <>
                <p className="mt-5 text-sm text-[#5b5b5b]">
                  Want to save your order history and check out faster next time?
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => navigate("/access")}
                    className="flex-1 rounded-lg bg-tertiary py-2.5 font-semibold text-white transition hover:opacity-90"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => setCheckout({ show: false, guest: false })}
                    className="flex-1 rounded-lg border-2 border-tertiary py-2.5 font-semibold text-tertiary transition hover:bg-tertiary/5"
                  >
                    Maybe later
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => setCheckout({ show: false, guest: false })}
                className="mt-6 w-full rounded-lg bg-tertiary py-2.5 font-semibold text-white transition hover:opacity-90"
              >
                Done
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
