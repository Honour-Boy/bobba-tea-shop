import { useState } from "react";
import { Navbar, Footer } from "../components";
import { Alert } from "./mainComponent";

const causes = [
  {
    title: "Community Cups",
    body: "Free boba and warm meals for students and families in need across our neighbourhoods.",
  },
  {
    title: "Greener Sips",
    body: "Funding compostable cups, paper straws and zero-waste kitchens in every store.",
  },
  {
    title: "Local Farmers",
    body: "Fair pricing and support for the small farms that grow our fruit and tea leaves.",
  },
];

const amounts = ["$10", "$25", "$50"];

const Donation = () => {
  const [msg, setMsg] = useState({ value: "", show: false });
  const [showCustom, setShowCustom] = useState(false);
  const [cause, setCause] = useState("");
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("$");
  const [isValidInput, setIsValidInput] = useState(true);
  const [frequency, setFrequency] = useState("");

  const handleCustom = (e) => {
    const { value } = e.target;
    const regex = /^\$[0-9]+(\.[0-9][0-9])?$/;
    setIsValidInput(regex.test(value));
    setCustomAmount(value);
    setAmount(value);
  };

  const reset = () => {
    setCause("");
    setAmount("");
    setCustomAmount("$");
    setFrequency("");
    setShowCustom(false);
  };

  const checkout = (e) => {
    e.preventDefault();
    if (!cause || !amount || !frequency) {
      setMsg({ value: "Please choose a cause, an amount and a frequency.", show: true });
      return;
    }
    setMsg({
      value: `Thank you! Your ${frequency.toLowerCase()} gift of ${amount} supports ${cause}.`,
      show: true,
    });
    reset();
  };

  return (
    <div className="min-h-screen bg-white-100 text-[#2b2b2b]">
      <div>
        <Navbar />

        {/* Hero */}
        <section className="bg-gradient-to-br from-tertiary to-[#a9632b] text-white">
          <div className="mx-auto max-w-6xl px-5 py-20 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
              Boba for a Cause
            </p>
            <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
              Every cup can do a little good.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-white/90">
              A share of every Bobba you buy goes back into the community. Add a
              donation and help us pour a little kindness into the world.
            </p>
          </div>
        </section>

        {/* Causes */}
        <section className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-center text-3xl font-bold">Where your gift goes</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {causes.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-tertiary/20 bg-white p-7 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-tertiary">{c.title}</h3>
                <p className="mt-3 text-sm text-[#5b5b5b]">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Donation form */}
        <section className="mx-auto max-w-3xl px-5 pb-20">
          <form className="rounded-3xl border border-tertiary/15 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Make a donation</h2>
            <p className="mt-2 text-sm text-[#828282]">
              Fill out the form below — it only takes a minute. Thank you!
            </p>

            <label className="mb-2 mt-6 block font-medium">Choose a cause</label>
            <select
              className="w-full rounded-lg border border-tertiary/40 bg-white-100 p-3 outline-none"
              value={cause}
              onChange={(e) => setCause(e.target.value)}
            >
              <option value="">Select a cause</option>
              {causes.map((c) => (
                <option key={c.title} value={c.title}>
                  {c.title}
                </option>
              ))}
            </select>

            <label className="mb-3 mt-6 block font-medium">Choose an amount</label>
            <div className="flex flex-wrap gap-3">
              {amounts.map((a) => (
                <button
                  type="button"
                  key={a}
                  onClick={() => {
                    setAmount(a);
                    setShowCustom(false);
                    setIsValidInput(true);
                  }}
                  className={`rounded-full border-2 px-6 py-2 font-semibold transition ${
                    amount === a && !showCustom
                      ? "border-tertiary bg-tertiary text-white"
                      : "border-tertiary/40 text-tertiary hover:border-tertiary"
                  }`}
                >
                  {a}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setShowCustom(true);
                  setAmount(customAmount);
                }}
                className={`rounded-full border-2 px-6 py-2 font-semibold transition ${
                  showCustom
                    ? "border-tertiary bg-tertiary text-white"
                    : "border-tertiary/40 text-tertiary hover:border-tertiary"
                }`}
              >
                Custom
              </button>
            </div>
            {showCustom && (
              <input
                type="text"
                placeholder="$0.00"
                onChange={handleCustom}
                value={customAmount}
                className={`mt-4 h-[44px] w-40 rounded-lg border-2 p-3 outline-none ${
                  isValidInput
                    ? "border-tertiary text-tertiary"
                    : "border-red-100 text-red-100"
                }`}
              />
            )}

            <label className="mb-3 mt-6 block font-medium">Frequency</label>
            <div className="flex flex-wrap gap-3">
              {["Monthly", "One time"].map((f) => (
                <button
                  type="button"
                  key={f}
                  onClick={() => setFrequency(f)}
                  className={`rounded-lg border px-5 py-2 transition ${
                    frequency === f
                      ? "border-tertiary bg-tertiary/10 text-tertiary"
                      : "border-tertiary/30 text-[#5b5b5b] hover:border-tertiary"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <p className="mt-2 min-h-[18px] text-xs text-[#828282]">
              {frequency === "Monthly"
                ? "This will deduct the amount above from your account every month."
                : frequency === "One time"
                ? "This will deduct the amount above once."
                : ""}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={reset}
                className="flex-1 rounded-lg border-2 border-tertiary py-3 font-semibold text-tertiary transition hover:bg-tertiary/5"
              >
                Reset
              </button>
              <button
                type="submit"
                onClick={checkout}
                disabled={!isValidInput}
                className="flex-1 rounded-lg bg-tertiary py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
              >
                Donate now
              </button>
            </div>
          </form>
        </section>

        <Footer />
      </div>

      <Alert msg={msg} setMsg={setMsg} />
    </div>
  );
};

export default Donation;
