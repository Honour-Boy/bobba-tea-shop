import { useState, useEffect } from "react";
import { logo } from "../assets";
import { Alert } from "./mainComponent";

const Donation = () => {
  const [msg, setMsg] = useState({
    value: "",
    show: false,
  });
  const [showCustom, setShowCustom] = useState(false);
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("$");
  const [isValidInput, setIsValidInput] = useState(true);
  const [frequency, setFrequency] = useState("");

  function Change(event) {
    const { name, value, type } = event.target;

    // Check if the input contains only numbers or "$"
    const regex = /^\$[0-9]+(\.[0-9][0-9])?$/;
    if (type === "text") {
      const isValid = regex.test(value);
      setIsValidInput(isValid);
    }

    // Update the state based on the input name
    if (name === "donation") {
      setAmount(value);
    } else if (name === "frequency") {
      setFrequency(value);
    } else if (name === "type") {
      setType(value);
    }
  }

  function setMessage(value) {
    setMsg((prevMsg) => {
      return {
        ...prevMsg,
        value: value,
        show: true,
      };
    });
  }

  useEffect(() => {
    if (!msg.show) {
      Cancel();
    }
  }, [msg.show]);

  function Cancel() {
    setAmount("");
    setFrequency("");
    setType("");
  }

  console.log(type);
  return (
    <div className="relative z-0">
      <div
        className={`bg-donation-pattern bg-no-repeat w-full min-h-screen h-full bg-cover flex items-center justify-center p-5 ${
          msg.show && "brightness-50 pointer-events-none"
        }`}
      >
        <div className="lg:w-3/5 w-full sm:h-[550px] rounded-xl bg-white p-3 flex sm:flex-row flex-col sm:gap-5 overflow-scroll">
          <div className="bg-donation-2-pattern bg-cover bg-no-repeat sm:w-1/2 w-full sm:h-full h-[500px] rounded-xl flex items-center justify-center">
            <h1 className="text-[45px] text-white font-semibold w-[180px] text-center">
              We Can Save The Future
            </h1>
          </div>
          <div className="sm:w-1/2 w-full sm:h-full h-[550px] rounded-xl p-2">
            <img src={logo} className="w-36" />
            <p className="text-[#828282] text-sm mt-4">
              Welcome to GlobalKidsCare donation, please fill out the form
              below. Thank you.
            </p>

            <label className="block mt-4 mb-2">Choose a destination type</label>
            <select
              className="bg-[#f4f4f4] p-1 text-[#828282] w-full outline-none"
              name="type"
              value={type}
              onChange={Change}
            >
              <option value="">select type</option>
              <option value="Cost of Education">Cost of Education</option>
              <option value="Health Cost">Health Cost</option>
              <option value="Cost of Provision">Cost of Provision</option>
            </select>

            <label className="mt-5 block mb-2">Choose a Donation Amount</label>
            <div className="flex items-center gap-1 mt-3">
              <input
                type="radio"
                name="donation"
                value="$20"
                onChange={Change}
                checked={amount === "$20"}
              />
              <label>$20</label>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <input
                type="radio"
                name="donation"
                value="$50"
                onChange={Change}
                checked={amount === "$50"}
              />
              <label>$50</label>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <input
                type="radio"
                name="donation"
                value="$100"
                onChange={Change}
                checked={amount === "$100"}
              />
              <label>$100</label>
            </div>
            <a
              className="text-xs underline text-[#27AE60] mt-3 block cursor-pointer"
              onClick={() => setShowCustom(!showCustom)}
            >
              {showCustom
                ? "Remove the custom donation amount?"
                : "Enter a custom donation amount?"}
            </a>
            <input
              type="text"
              name="donation"
              placeholder="$0.00"
              onChange={Change}
              value={amount}
              className={`h-[40px] w-50 border-2 ${isValidInput ? "border-[#27ae60] text-[#27ae60]" :"border-red-100 text-red-100"}  rounded-lg p-2 outline-none ${
                showCustom ? "block" : "hidden"
              }`}
            />

            <label className="mt-5 block mb-2">
              Choose a Donation Frequency
            </label>
            <div className="flex gap-2">
              <div className="flex items-center gap-1 w-[180px] bg-[#D6F7E4] h-[30px] p-2 rounded-md">
                <input
                  type="radio"
                  name="frequency"
                  value="Monthly"
                  onChange={Change}
                  checked={frequency === "Monthly"}
                />
                <label>Monthly</label>
              </div>
              <div className="flex items-center gap-1 w-[180px] bg-[#f4f4f4] h-[30px] p-2 text-[#828282] rounded-md">
                <input
                  type="radio"
                  name="frequency"
                  value="One time"
                  onChange={Change}
                  checked={frequency === "One time"}
                />
                <label>One time</label>
              </div>
            </div>
            <label className="text-[#828282] text-xs block mt-2">
              {frequency === ""
                ? ""
                : frequency === "Monthly"
                ? "This will deduct the stated donation amount above from your account every month"
                : "This will only deduct the stated donation amount above once."}
            </label>
            <div className="flex w-full mt-6 items-center gap-2">
              <button
                className="w-[180px] h-[35px] border-[#27ae60] text-[#27ae60] border-2 rounded-md"
                onClick={() => setMessage("Warning!!!.You will be redirected")}
                disabled={!isValidInput}
              >
                Cancel
              </button>
              <button className="w-[180px] h-[35px] bg-[#27ae60] text-white rounded-md">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Alert msg={msg} setMsg={setMsg} />
    </div>
  );
};

export default Donation;
