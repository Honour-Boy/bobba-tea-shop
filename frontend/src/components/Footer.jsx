import { Link } from "react-router-dom";
import { logo, facebook, instagram, twitter } from "../assets";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} className="w-12 h-12" alt="Bobba" />
            <span className="text-xl font-bold">Bobba</span>
          </div>
          <p className="mt-4 max-w-[240px] text-sm text-white/70">
            Hand-shaken milk tea and fruit boba, made fresh with real
            ingredients and a whole lot of love.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-tertiary">
            Explore
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-white/80">
            <li>
              <Link to="/menu" className="hover:text-tertiary">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-tertiary">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/donation" className="hover:text-tertiary">
                Give Back
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-tertiary">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-tertiary">
            Visit Us
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-white/80">
            <li>24 Pearl Street, Lagos</li>
            <li>Mon – Sun, 10am – 10pm</li>
            <li>+234 800 000 0000</li>
            <li>hello@bobba.shop</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-tertiary">
            Follow
          </h4>
          <div className="flex gap-4">
            {[
              { src: facebook, label: "Facebook" },
              { src: instagram, label: "Instagram" },
              { src: twitter, label: "Twitter" },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-tertiary"
              >
                <img src={s.src} className="w-5 brightness-0 invert" alt={s.label} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Bobba Tea Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
