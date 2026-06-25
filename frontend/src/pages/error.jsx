import { Link } from "react-router-dom";
import { logo } from "../assets";

const Error = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white-100 px-5 text-center text-[#2b2b2b]">
      <img src={logo} className="w-20" alt="Bobba" />
      <p className="mt-6 text-6xl font-extrabold text-tertiary">404</p>
      <h1 className="mt-2 text-2xl font-bold">This cup is empty</h1>
      <p className="mt-2 max-w-sm text-[#5b5b5b]">
        Oops — the page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-tertiary px-7 py-3 font-semibold text-white transition hover:opacity-90"
      >
        Back to home
      </Link>
    </div>
  );
};

export default Error;
