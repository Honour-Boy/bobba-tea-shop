import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

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
  const { isAuthenticated, user, logout } = useAuth();
  const { totalCount } = useCart();

  const linkClass = ({ isActive }) =>
    `text-[15px] font-medium transition hover:text-tertiary ${
      isActive ? "text-tertiary" : "text-[#2b2b2b]"
    }`;

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  const CartButton = () => (
    <Link
      to="/menu"
      onClick={() => setOpen(false)}
      className="relative flex items-center gap-1 text-[#2b2b2b] transition hover:text-tertiary"
      aria-label="Cart"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      {totalCount > 0 && (
        <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-tertiary px-1 text-[10px] font-bold text-white">
          {totalCount}
        </span>
      )}
    </Link>
  );

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

        <div className="flex items-center gap-4">
          <CartButton />
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="hidden rounded-full border-2 border-tertiary px-5 py-1.5 text-sm font-semibold text-tertiary transition hover:bg-tertiary/5 sm:block"
            >
              Log out
            </button>
          ) : (
            <button
              onClick={() => navigate("/access")}
              className="hidden text-sm font-medium text-[#2b2b2b] transition hover:text-tertiary sm:block"
            >
              Log in
            </button>
          )}
          <button
            onClick={() => navigate("/menu")}
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
              navigate("/menu");
            }}
            className="w-full rounded-full bg-tertiary px-5 py-2 text-sm font-semibold text-white"
          >
            Shop Now
          </button>
          {isAuthenticated ? (
            <>
              {user?.email && (
                <li className="text-xs text-[#828282]">
                  Signed in as {user.email}
                </li>
              )}
              <button
                onClick={handleLogout}
                className="w-full rounded-full border-2 border-tertiary px-5 py-2 text-sm font-semibold text-tertiary"
              >
                Log out
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setOpen(false);
                navigate("/access");
              }}
              className="w-full rounded-full border-2 border-tertiary px-5 py-2 text-sm font-semibold text-tertiary"
            >
              Log in
            </button>
          )}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
