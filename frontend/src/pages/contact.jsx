import { useState } from "react";
import { Navbar, Footer } from "../components";
import { Alert } from "./mainComponent";
import { envelope, facebook, instagram, twitter } from "../assets";

const initialForm = { name: "", email: "", subject: "", message: "" };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [msg, setMsg] = useState({ value: "", show: false });

  const change = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setMsg({ value: "Please fill in your name, email and message.", show: true });
      return;
    }
    setMsg({
      value: `Thanks ${form.name}! We'll get back to you shortly.`,
      show: true,
    });
    setForm(initialForm);
  };

  const info = [
    { label: "Visit", value: "24 Pearl Street, Lagos" },
    { label: "Call", value: "+234 800 000 0000" },
    { label: "Email", value: "hello@bobba.shop" },
    { label: "Hours", value: "Mon – Sun, 10am – 10pm" },
  ];

  return (
    <div className="min-h-screen bg-white-100 text-[#2b2b2b]">
      <div className={msg.show ? "brightness-50 pointer-events-none" : ""}>
        <Navbar />

        <section className="mx-auto max-w-6xl px-5 pb-6 pt-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-tertiary">
            Say Hello
          </p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Get in touch</h1>
          <p className="mx-auto mt-4 max-w-md text-[#5b5b5b]">
            Questions, catering, or just want to share some boba love? Drop us a
            line.
          </p>
        </section>

        <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 pt-6 md:grid-cols-[1fr_1.2fr]">
          {/* Info panel */}
          <div className="rounded-3xl bg-primary p-8 text-white">
            <div className="flex items-center gap-3">
              <img src={envelope} className="w-7 brightness-0 invert" alt="" />
              <h2 className="text-2xl font-bold">Contact info</h2>
            </div>
            <ul className="mt-8 flex flex-col gap-6">
              {info.map((i) => (
                <li key={i.label}>
                  <p className="text-xs uppercase tracking-wider text-tertiary">
                    {i.label}
                  </p>
                  <p className="mt-1 text-white/90">{i.value}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex gap-4">
              {[facebook, instagram, twitter].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-tertiary"
                >
                  <img src={s} className="w-5 brightness-0 invert" alt="" />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={submit}
            className="rounded-3xl border border-tertiary/15 bg-white p-8 shadow-sm"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={change}
                  placeholder="Your name"
                  className="input-text block w-full"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={change}
                  placeholder="you@email.com"
                  className="input-text block w-full"
                />
              </div>
            </div>
            <label className="mb-2 block text-sm font-medium">Subject</label>
            <input
              name="subject"
              value={form.subject}
              onChange={change}
              placeholder="What's this about?"
              className="input-text block w-full"
            />
            <label className="mb-2 block text-sm font-medium">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={change}
              placeholder="Tell us more..."
              rows={5}
              className="input-text block w-full resize-none"
              style={{ height: "auto" }}
            />
            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-tertiary py-3 font-semibold text-white transition hover:opacity-90"
            >
              Send message
            </button>
          </form>
        </section>

        <Footer />
      </div>

      <Alert msg={msg} setMsg={setMsg} />
    </div>
  );
};

export default Contact;
