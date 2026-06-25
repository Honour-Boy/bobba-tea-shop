import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Footer } from "../components";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import {
  createOrder,
  makeReference,
  LAST_ORDER_KEY,
  PENDING_ORDER_KEY,
} from "../api/orders";
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

const EMPTY_CARD = { number: "", name: "", expiry: "", cvc: "" };
const onlyDigits = (v) => v.replace(/\D/g, "");
const formatCardNumber = (v) =>
  onlyDigits(v)
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
const formatExpiry = (v) => {
  const d = onlyDigits(v).slice(0, 4);
  return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

const validatePayment = (card) => {
  const errors = {};
  if (onlyDigits(card.number).length !== 16) {
    errors.number = "Enter a valid 16-digit card number.";
  }
  if (!card.name.trim()) {
    errors.name = "Enter the name on the card.";
  }
  const m = card.expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!m) {
    errors.expiry = "Use MM/YY format.";
  } else {
    const mm = Number(m[1]);
    const yy = Number(m[2]);
    const now = new Date();
    const curYY = now.getFullYear() % 100;
    const curMM = now.getMonth() + 1;
    if (mm < 1 || mm > 12) errors.expiry = "Invalid month.";
    else if (yy < curYY || (yy === curYY && mm < curMM))
      errors.expiry = "Card has expired.";
  }
  if (!/^\d{3,4}$/.test(card.cvc)) {
    errors.cvc = "Enter a 3 or 4 digit CVC.";
  }
  return errors;
};

const Menu = () => {
  const [checkout, setCheckout] = useState({ show: false });
  const [card, setCard] = useState(EMPTY_CARD);
  const [touched, setTouched] = useState({});
  const { isAuthenticated } = useAuth();
  const { items, addItem, decrementItem, removeItem, totalCount, clear } =
    useCart();
  const navigate = useNavigate();

  const hasItems = items.length > 0;
  const countOf = (name) => items.find((i) => i.name === name)?.count ?? 0;
  const total = items.reduce((sum, i) => sum + priceOf(i.name) * i.count, 0);

  const payErrors = validatePayment(card);
  const payValid = Object.keys(payErrors).length === 0;

  const updateCard = (field, value) =>
    setCard((c) => ({ ...c, [field]: value }));
  const blurField = (field) =>
    setTouched((t) => ({ ...t, [field]: true }));

  const startCheckout = () => {
    if (!hasItems) return;
    setCard(EMPTY_CARD);
    setTouched({});
    setCheckout({ show: true });
  };

  const pay = async (e) => {
    e.preventDefault();
    if (!payValid) {
      setTouched({ number: true, name: true, expiry: true, cvc: true });
      return;
    }

    const order = {
      reference: makeReference(),
      items: items.map((i) => ({
        name: i.name,
        count: i.count,
        price: priceOf(i.name),
      })),
      total,
      date: new Date().toISOString(),
      saved: false,
    };

    if (isAuthenticated) {
      try {
        const saved = await createOrder({
          items: order.items,
          total: order.total,
        });
        order.saved = true;
        order._id = saved?._id;
        if (saved?.reference) order.reference = saved.reference;
        if (saved?.createdAt) order.date = saved.createdAt;
      } catch {
        // Saving failed — still show the receipt; order stays unsaved.
      }
    } else {
      // Keep it locally so the guest can save it by logging in later.
      localStorage.setItem(PENDING_ORDER_KEY, JSON.stringify(order));
    }

    localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
    clear();
    setCheckout({ show: false });
    navigate("/receipt", { state: { order } });
  };

  const closeCheckout = () => {
    setCard(EMPTY_CARD);
    setTouched({});
    setCheckout({ show: false });
  };

  return (
    <div className="min-h-screen bg-white-100 text-[#2b2b2b]">
      <div>
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

        <div className="mx-auto max-w-6xl px-5 pb-20 pt-6">
          <div
            className={`flex flex-col gap-8 ${
              hasItems ? "lg:flex-row lg:items-start" : ""
            }`}
          >
            {/* Menu items */}
            <section
              className={`grid gap-8 ${
                hasItems
                  ? "flex-1 sm:grid-cols-2 xl:grid-cols-3"
                  : "w-full sm:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {menu.map((item) => {
                const count = countOf(item.name);
                return (
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
                    <p className="mt-2 flex-1 text-sm text-[#5b5b5b]">
                      {item.desc}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-xl font-extrabold text-tertiary">
                        ${item.price.toFixed(2)}
                      </span>
                      {count === 0 ? (
                        <button
                          onClick={() => addItem(item.name)}
                          className="rounded-full bg-tertiary px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                        >
                          Add to cart
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 rounded-full bg-tertiary px-2 py-1 text-white">
                          <button
                            onClick={() => decrementItem(item.name)}
                            aria-label={`Remove one ${item.name}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-xl leading-none transition hover:bg-white/20"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm font-bold">
                            {count}
                          </span>
                          <button
                            onClick={() => addItem(item.name)}
                            aria-label={`Add one ${item.name}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-xl leading-none transition hover:bg-white/20"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </section>

            {/* Cart / checkout panel */}
            {hasItems && (
              <aside className="w-full lg:sticky lg:top-24 lg:w-[360px] lg:shrink-0">
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
                        <div className="flex items-center gap-3">
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
                    onClick={startCheckout}
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
              </aside>
            )}
          </div>
        </div>

        <Footer />
      </div>

      {/* Checkout: placeholder payment layer; confirmation lives on /receipt */}
      {checkout.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-5 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white-100 p-7 shadow-2xl">
            <form onSubmit={pay} className="text-left">
                <h2 className="text-center text-2xl font-bold">Payment</h2>
                <p className="mt-3 rounded-lg bg-tertiary/10 px-4 py-2 text-center text-xs font-medium text-tertiary">
                  🔒 Demo checkout — please don’t enter any real card details.
                </p>

                <div className="mt-5 flex items-center justify-between rounded-lg bg-white px-4 py-3">
                  <span className="text-sm text-[#5b5b5b]">Total due</span>
                  <span className="text-xl font-extrabold text-tertiary">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <label className="mt-4 block">Card number</label>
                <input
                  className="input-text mb-1 block w-full"
                  placeholder="1234 5678 9012 3456"
                  inputMode="numeric"
                  autoComplete="off"
                  value={card.number}
                  onChange={(e) =>
                    updateCard("number", formatCardNumber(e.target.value))
                  }
                  onBlur={() => blurField("number")}
                  style={
                    touched.number && payErrors.number
                      ? { borderColor: "#ef4444" }
                      : undefined
                  }
                />
                {touched.number && payErrors.number && (
                  <p className="mb-3 text-xs text-red-500">{payErrors.number}</p>
                )}

                <label className="block">Name on card</label>
                <input
                  className="input-text mb-1 block w-full"
                  placeholder="Jane Doe"
                  autoComplete="off"
                  value={card.name}
                  onChange={(e) => updateCard("name", e.target.value)}
                  onBlur={() => blurField("name")}
                  style={
                    touched.name && payErrors.name
                      ? { borderColor: "#ef4444" }
                      : undefined
                  }
                />
                {touched.name && payErrors.name && (
                  <p className="mb-3 text-xs text-red-500">{payErrors.name}</p>
                )}

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block">Expiry</label>
                    <input
                      className="input-text mb-1 block w-full"
                      placeholder="MM/YY"
                      inputMode="numeric"
                      autoComplete="off"
                      value={card.expiry}
                      onChange={(e) =>
                        updateCard("expiry", formatExpiry(e.target.value))
                      }
                      onBlur={() => blurField("expiry")}
                      style={
                        touched.expiry && payErrors.expiry
                          ? { borderColor: "#ef4444" }
                          : undefined
                      }
                    />
                    {touched.expiry && payErrors.expiry && (
                      <p className="text-xs text-red-500">{payErrors.expiry}</p>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block">CVC</label>
                    <input
                      className="input-text mb-1 block w-full"
                      placeholder="123"
                      inputMode="numeric"
                      autoComplete="off"
                      value={card.cvc}
                      onChange={(e) =>
                        updateCard("cvc", onlyDigits(e.target.value).slice(0, 4))
                      }
                      onBlur={() => blurField("cvc")}
                      style={
                        touched.cvc && payErrors.cvc
                          ? { borderColor: "#ef4444" }
                          : undefined
                      }
                    />
                    {touched.cvc && payErrors.cvc && (
                      <p className="text-xs text-red-500">{payErrors.cvc}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!payValid}
                  className="mt-4 w-full rounded-lg bg-tertiary py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Pay ${total.toFixed(2)}
                </button>
                <button
                  type="button"
                  onClick={closeCheckout}
                  className="mt-3 w-full text-center text-sm font-medium text-[#828282] hover:text-tertiary"
                >
                  Cancel
                </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
