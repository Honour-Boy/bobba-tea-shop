import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logo } from "../assets";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/donation", label: "Give Back" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `text-[15px] font-medium transition hover:text-tertiary ${
      isActive ? "text-tertiary" : "text-[#2b2b2b]"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white-100/90 backdrop-blur border-b border-tertiary/20">
      <nav className="max-w-6xl mx-auto px-5 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} className="w-12 h-12" alt="Bobba" />
          <span className="hidden font-bold text-lg text-[#2b2b2b] sm:block">
            Bobba
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} className={linkClass}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/access")}
            className="hidden rounded-full bg-tertiary px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90 sm:block"
          >
            Shop Now
          </button>
          <button
            className="flex flex-col gap-[5px] p-1 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span
              className={`h-[2px] w-6 bg-[#2b2b2b] transition ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-6 bg-[#2b2b2b] transition ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[2px] w-6 bg-[#2b2b2b] transition ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <ul className="flex flex-col gap-4 border-t border-tertiary/20 bg-white-100 px-5 py-4 md:hidden">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              navigate("/access");
            }}
            className="w-full rounded-full bg-tertiary px-5 py-2 text-sm font-semibold text-white"
          >
            Shop Now
          </button>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
