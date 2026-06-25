import { useState } from "react";
import { Navbar, Footer } from "../components";
import { Alert } from "./mainComponent";
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

const Menu = () => {
  const [msg, setMsg] = useState({ value: "", show: false });

  const addToCart = (item) => {
    setMsg({
      value: `${item.name} added to your cart!`,
      show: true,
    });
  };

  return (
    <div className="min-h-screen bg-white-100 text-[#2b2b2b]">
      <div className={msg.show ? "brightness-50 pointer-events-none" : ""}>
        <Navbar />

        <section className="mx-auto max-w-6xl px-5 pb-6 pt-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-tertiary">
            Freshly Shaken
          </p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Our Menu</h1>
          <p className="mx-auto mt-4 max-w-md text-[#5b5b5b]">
            Pick your favourite, choose your sweetness, and we will shake it to
            order.
          </p>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-20 pt-6 sm:grid-cols-2 lg:grid-cols-4">
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

        <Footer />
      </div>

      <Alert msg={msg} setMsg={setMsg} />
    </div>
  );
};

export default Menu;
