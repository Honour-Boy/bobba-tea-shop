import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Navbar, Footer } from "../components";
import { flavor1, flavor2, flavor3 } from "../assets";
import { fadeIn, staggerContainer, textVariant } from "../utils/motion";

const values = [
  {
    title: "Fresh Ingredients",
    body: "Real fruit, premium tea leaves, and pearls cooked in-house every single morning — never from a powder.",
  },
  {
    title: "Hand-Shaken",
    body: "Every cup is shaken to order so the flavour, ice, and sweetness land exactly the way you like them.",
  },
  {
    title: "Made for You",
    body: "Pick your base, your sweetness, your toppings. Your boba, your rules — we just bring it to life.",
  },
];

const stats = [
  { num: "12+", label: "Signature flavours" },
  { num: "50k", label: "Cups shaken" },
  { num: "4", label: "Cozy locations" },
  { num: "2019", label: "Brewing since" },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white-100 text-[#2b2b2b]">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          animate="show"
        >
          <motion.p
            variants={textVariant(0)}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-tertiary"
          >
            Our Story
          </motion.p>
          <motion.h1
            variants={textVariant(0.1)}
            className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl"
          >
            Crafted with love, one pearl at a time.
          </motion.h1>
          <motion.p
            variants={textVariant(0.2)}
            className="mt-5 max-w-md text-[#5b5b5b]"
          >
            Bobba started with a simple idea: that a cup of boba should taste
            like it was made just for you. What began as a tiny corner stand has
            grown into a neighbourhood favourite — but the promise has never
            changed. Fresh, fun, and full of flavour.
          </motion.p>
          <motion.div variants={fadeIn("up", "tween", 0.3, 0.6)}>
            <button
              onClick={() => navigate("/menu")}
              className="mt-8 rounded-full bg-tertiary px-7 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Explore the Menu
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeIn("left", "spring", 0.2, 1)}
          initial="hidden"
          animate="show"
          className="relative flex justify-center"
        >
          <div className="absolute h-64 w-64 rounded-full bg-tertiary/15 blur-2xl" />
          <img src={flavor1} className="relative w-56 drop-shadow-xl" alt="Boba cup" />
        </motion.div>
      </section>

      {/* Story strip */}
      <section className="bg-tertiary/10">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2">
          <img
            src={flavor2}
            className="mx-auto w-48 md:order-1"
            alt="Boba cup"
          />
          <div>
            <h2 className="text-3xl font-bold">From our kitchen to your hands</h2>
            <p className="mt-4 text-[#5b5b5b]">
              We brew our teas in small batches and simmer our tapioca pearls
              until they reach that perfect chewy bite. No shortcuts, no
              mystery syrups — just honest ingredients and recipes we are proud
              to share.
            </p>
            <p className="mt-4 text-[#5b5b5b]">
              Every store is built to feel like a hangout, not a queue. Come for
              the boba, stay for the vibe.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-center text-3xl font-bold">What we stand for</h2>
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 grid gap-6 sm:grid-cols-3"
        >
          {values.map((v) => (
            <motion.div
              key={v.title}
              variants={fadeIn("up", "tween", 0, 0.5)}
              className="rounded-2xl border border-tertiary/20 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-tertiary">{v.title}</h3>
              <p className="mt-3 text-sm text-[#5b5b5b]">{v.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-primary text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-14 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-extrabold text-tertiary">{s.num}</p>
              <p className="mt-2 text-sm text-white/70">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-20 text-center">
        <img src={flavor3} className="mx-auto w-40" alt="Boba cup" />
        <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
          Ready to find your flavour?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[#5b5b5b]">
          Browse our menu and build the boba of your dreams.
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="mt-8 rounded-full bg-tertiary px-8 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Order Now
        </button>
      </section>

      <Footer />
    </div>
  );
};

export default About;
