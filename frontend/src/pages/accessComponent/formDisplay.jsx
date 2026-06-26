import { useState } from "react";
import { styles } from "../../styles";
import { useNavigate } from "react-router-dom";
import { logo, google } from "../../assets";
import { useAuth } from "../../context/AuthContext";
import { apiError } from "../../api/errors";

const Form = ({ setMsg, msg, allow, setAllow }) => {
  const navigate = useNavigate();
  const { login, register, loginGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
  });

  function Change(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function setMessage(value) {
    setMsg((prev) => ({ ...prev, value, show: true }));
  }

  function clearFields() {
    setFormData((prev) => ({ ...prev, Name: "", Email: "", Password: "" }));
  }

  async function loginSubmit(event) {
    event.preventDefault();
    if (!formData.Email || !formData.Password) {
      setMessage("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      await login(formData.Email, formData.Password);
      clearFields();
      navigate("/menu");
    } catch (err) {
      setMessage(apiError(err));
    } finally {
      setLoading(false);
    }
  }

  async function signupSubmit(event) {
    event.preventDefault();
    if (!formData.Name || !formData.Email || !formData.Password) {
      setMessage("Please fill all the fields.");
      return;
    }
    setLoading(true);
    try {
      await register(formData.Email, formData.Password);
      clearFields();
      navigate("/menu");
    } catch (err) {
      setMessage(apiError(err));
    } finally {
      setLoading(false);
    }
  }

  async function login_google() {
    try {
      // Redirects to Google, then back to /menu where the session is picked up.
      await loginGoogle();
    } catch (err) {
      setMessage(apiError(err));
    }
  }

  const headings = allow ? (
    <div className="mt-20">
      <h1 className={`${styles.heroHeadText}`}>Welcome to the Bobba!</h1>
      <p className={`${styles.heroSubText} `}>
        Enter your details to get started
      </p>
    </div>
  ) : (
    <div className="mt-20">
      <h1 className={`${styles.heroHeadText}`}>Welcome Back!</h1>
      <p className={`${styles.heroSubText} `}>
        Enter details to continue to website
      </p>
    </div>
  );

  return (
    <div className="flex w-full lg:w-3/4 h-full bg-white-100 lg:flex-row flex-col overflow-auto">
      <form className={`md:w-[550px] w-full lg:mx-[10%] md:mx-0 ${styles.padding} relative`}>
        <img src={logo} className="h-fit inset-0 absolute m-5 w-[80px]" />
        {headings}
        <div className="mt-5 flex flex-col gap-5">
          <button
            type="button"
            className="border-2 border-tertiary text-tertiary rounded-2xl p-5 flex items-center justify-center gap-1 w-full"
            onClick={() => login_google()}
          >
            <img src={google} className="w-6" />
            Log In with Google
          </button>
          <div className="w-full flex items-center justify-center gap-1">
            <hr className="w-[35%] border-tertiary" />
            <p className="w-[30%] text-center">or sign in with email</p>
            <hr className="w-[35%] border-tertiary" />
          </div>
        </div>
        <div className="mt-[20px] w-full">
          <label className={`${allow ? "block" : "hidden"} w-full xs:w-3/4`}>
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter Your Name"
            onChange={Change}
            className={`${
              allow ? "block" : "hidden"
            } input-text w-full xs:w-3/4`}
            name="Name"
            value={formData.Name}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            onChange={Change}
            className="input-text block w-full xs:w-3/4"
            name="Email"
            value={formData.Email}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={Change}
            className="input-text block w-full xs:w-3/4"
            name="Password"
            value={formData.Password}
          />
          {allow && (
            <p className="-mt-3 mb-2 text-xs text-[#828282]">
              At least 8 characters, including a number and a symbol.
            </p>
          )}
          <button
            className="btn disabled:opacity-50"
            onClick={allow ? signupSubmit : loginSubmit}
            disabled={loading}
          >
            {loading ? "Please wait..." : allow ? "Sign up" : "Login"}
          </button>
          {allow ? (
            <div className="flex my-[20px] gap-1">
              Have an account?
              <a
                onClick={() => setAllow(false)}
                className=" text-tertiary font-medium w-fit block cursor-pointer"
              >
                Sign in
              </a>
            </div>
          ) : (
            <div className="flex my-[20px] gap-1">
              Don't Have an account?
              <a
                onClick={() => setAllow(true)}
                className=" text-tertiary font-medium w-fit block cursor-pointer"
              >
                Sign up
              </a>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
