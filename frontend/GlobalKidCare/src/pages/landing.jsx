import { useEffect, useState } from "react";
import { logo, flavor1, flavor2, flavor3, flavor4 } from "../assets";
import data from "./mainComponent/data";
import SliderPanel from "../utils/slider";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [num, setNum] = useState(1);
  const [navNum, setNavNum] = useState(0);
  const navigate = useNavigate();
  const [change, setChange] = useState({
    bg: ["bg-pattern-1", "bg-pattern-2", "bg-pattern-3", "bg-pattern-4"],
    rotate: [
      "-rotate-[25deg]",
      "-rotate-[115deg]",
      "-rotate-[205deg]",
      "-rotate-[295deg]",
    ],
  });
  const texts = ["Home", "About", "Contact"];
  const [objects, setObjects] = useState(data);
  const [className, setClassName] = useState("");

  useEffect(() => {
    setClassName("flavor-fruit");
    setTimeout(() => {
      setClassName("");
    }, 1000);
  }, [num]);

  const imageDisplay = objects.map((object, index) => {
    return (
      <div
        key={index}
        className={`w-[600px] h-[400px] absolute -top-1/4  -left-1/4 -rotate-45 ${
          object.id !== num && "hidden"
        } md:block hidden z-0 ${className}`}
      >
        <img src={object.id === num ? object.src : ""} />
      </div>
    );
  });

  const webInfo = objects.map((object, index) => {
    return (
      <div
        key={index}
        className={`md:w-1/2 w-full h-max ${
          object.id !== num && "hidden"
        } z-10`}
      >
        <h1 className="text-4xl mb-5 text-white">
          Quench Your Thirst with{" "}
          <span className={`font-semibold`}>Boba Tea</span>
        </h1>

        <h1 className="text-5xl mb-5 text-white font-extrabold">
          {object.textHead}
        </h1>
        <p className="w-full h-max text-lg text-white">{object.textContent}</p>
      </div>
    );
  });
  return (
    <div
      className={`${
        change.bg[num - 1]
      } h-screen relative m-0 overflow-hidden flex flex-col transition ease-in duration-[0.5s]`}
    >
      {imageDisplay}

      <div className="w-full h-32 flex items-center justify-around z-10">
        <img src={logo} className="w-24" />
        <div className={`w-[400px] md:flex flex-col hidden`}>
          <div className="flex justify-around">
            <h1 className="txt" onMouseOver={() => setNavNum(0)}>
              Home
            </h1>
            <h1 className="txt" onMouseOver={() => setNavNum(1)}>
              About
            </h1>
            <h1 className="txt" onMouseOver={() => setNavNum(2)}>
              Contact
            </h1>
          </div>
          <SliderPanel activeNumber={navNum} total={3} />
        </div>
        <button className="btn1" onClick={() => navigate("/access")}>
          shop now
        </button>
      </div>

      <div className=" w-full h-full md:pl-20 px-5 md:pt-20 py-5 flex flex-col md:justify-around justify-between z-10">
        {webInfo}
        <div className="w-[500px] flex flex-col gap-2 overflow-auto">
          <div className="flex items-center justify-around">
            <img
              src={flavor1}
              className="w-20 cursor-pointer"
              onClick={() => setNum(1)}
            />
            <img
              src={flavor2}
              className="w-20 cursor-pointer"
              onClick={() => setNum(2)}
            />
            <img
              src={flavor3}
              className="w-20 cursor-pointer"
              onClick={() => setNum(3)}
            />
            <img
              src={flavor4}
              className="w-20 cursor-pointer"
              onClick={() => setNum(4)}
            />
          </div>
          <SliderPanel activeNumber={num - 1} total={4} />
        </div>
      </div>

      <div
        className={`w-[600px] h-[600px] absolute top-[85.5%] left-[80.5%] transition ease-in-out duration-[0.5s] ${
          change.rotate[num - 1]
        }`}
      >
        <div className="w-full h-full relative">
          <img
            src={flavor1}
            className="absolute inset-x-1/4 -top-full w-[300px] h-[600px]"
          />
          <img
            src={flavor2}
            className="absolute -right-[75%] top-0 w-[300px] h-[600px] rotate-90"
          />
          <img
            src={flavor4}
            className="absolute -left-[75%] top-0 w-[300px] h-[600px] -rotate-90"
          />
          <img
            src={flavor3}
            className="absolute inset-x-1/4 -bottom-full w-[300px] h-[600px] rotate-180"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
