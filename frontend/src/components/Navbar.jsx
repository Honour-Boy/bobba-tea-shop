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

const Navbar = ({ transparent = false }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { totalCount } = useCart();

  // On the transparent (landing) variant, the bar sits over a dark hero, so
  // text and icons go light. The mobile dropdown stays solid and dark-on-light.
  const topText = transparent ? "text-white" : "text-[#2b2b2b]";

  const linkClass = ({ isActive }) =>
    `text-[15px] font-medium transition hover:text-tertiary ${
      isActive ? "text-tertiary" : transparent ? "text-white" : "text-[#2b2b2b]"
    }`;

  const mobileLinkClass = ({ isActive }) =>
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
      className={`relative flex items-center gap-1 transition hover:text-tertiary ${topText}`}
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
    <header
      className={`sticky top-0 z-50 ${
        transparent
          ? "bg-transparent"
          : "bg-white-100/90 backdrop-blur border-b border-tertiary/20"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            className={transparent ? "w-20 h-20" : "w-12 h-12"}
            alt="Bobba"
          />
          <span className={`hidden font-bold text-lg sm:block ${topText}`}>
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
          {isAuthenticated && (
            <button
              onClick={() => navigate("/orders")}
              className={`hidden text-sm font-medium transition hover:text-tertiary sm:block ${topText}`}
            >
              Orders
            </button>
          )}
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
              className={`hidden text-sm font-medium transition hover:text-tertiary sm:block ${topText}`}
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
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-[2px] w-6 transition ${
                  transparent ? "bg-white" : "bg-[#2b2b2b]"
                } ${
                  open && i === 0 ? "translate-y-[7px] rotate-45" : ""
                } ${open && i === 1 ? "opacity-0" : ""} ${
                  open && i === 2 ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            ))}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="flex flex-col gap-4 border-t border-tertiary/20 bg-white-100 px-5 py-4 md:hidden">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={mobileLinkClass}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          {isAuthenticated && (
            <li>
              <NavLink
                to="/orders"
                className={mobileLinkClass}
                onClick={() => setOpen(false)}
              >
                Orders
              </NavLink>
            </li>
          )}
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
